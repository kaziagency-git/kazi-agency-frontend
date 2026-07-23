'use client';

import { useEffect, useCallback, useState } from 'react';
import Link from 'next/link';
import { Plus, Users2, RefreshCw, Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchClients } from '@/store/slices/clientsSlice';
import { toast } from 'sonner';
import { regenerateClientLink } from '@/lib/client-api';
import { useDebounce } from '@/hooks/use-debounce';

const PAGE_SIZE = 10;

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'inactive', label: 'Inactive' },
];

const statusStyles: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  inactive: 'bg-gray-100 text-gray-600',
};

export default function AdminClientsPage() {
  const dispatch = useAppDispatch();
  const { items: clients, total, page, totalPages, status } = useAppSelector((s) => s.clients);
  const loading = status === 'idle' || status === 'loading';

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(search, 400);

  const load = useCallback(() => {
    dispatch(fetchClients({
      search: debouncedSearch || undefined,
      status: statusFilter !== 'all' ? statusFilter : undefined,
      page: currentPage,
      limit: PAGE_SIZE,
    }));
  }, [dispatch, debouncedSearch, statusFilter, currentPage]);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleRegenerateLink(id: string, name: string) {
    try {
      const { setupLink } = await regenerateClientLink(id);
      await navigator.clipboard.writeText(setupLink);
      toast.success(`Setup link for ${name} copied to clipboard`);
    } catch {
      toast.error('Failed to regenerate link');
    }
  }

  const hasFilters = search !== '' || statusFilter !== 'all';

  function clearFilters() {
    setSearch('');
    setStatusFilter('all');
    setCurrentPage(1);
  }

  const startRow = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endRow = Math.min(page * PAGE_SIZE, total);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage client accounts and portal access</p>
        </div>
        <Button asChild>
          <Link href="/admin/clients/new">
            <Plus className="h-4 w-4 mr-2" /> Add Client
          </Link>
        </Button>
      </div>

      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Users2 className="h-4 w-4" />
              All Clients
              {!loading && (
                <span className="text-muted-foreground font-normal text-sm">({total})</span>
              )}
            </CardTitle>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-sm"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger size="sm" className="w-full sm:w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasFilters && (
              <Button size="sm" variant="ghost" className="h-8 px-2 text-xs gap-1 text-muted-foreground" onClick={clearFilters}>
                <X className="h-3 w-3" /> Clear
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Users2 className="h-10 w-10 text-muted-foreground mx-auto" />
              {hasFilters ? (
                <>
                  <p className="text-sm text-muted-foreground">No clients match your search.</p>
                  <Button size="sm" variant="outline" onClick={clearFilters}>Clear filters</Button>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">No clients yet.</p>
                  <Button asChild size="sm">
                    <Link href="/admin/clients/new">Add your first client</Link>
                  </Button>
                </>
              )}
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-6 w-[220px]">Client</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Services</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right pr-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client._id}>
                      {/* Name + avatar */}
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs">
                            {client.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-sm leading-tight">{client.name}</span>
                        </div>
                      </TableCell>

                      {/* Email */}
                      <TableCell className="text-sm text-muted-foreground">{client.email}</TableCell>

                      {/* Company */}
                      <TableCell className="text-sm">
                        {client.company || <span className="text-muted-foreground/50">—</span>}
                      </TableCell>

                      {/* Services */}
                      <TableCell>
                        {client.services.length > 0 ? (
                          <div className="flex gap-1 flex-wrap">
                            {client.services.slice(0, 2).map((s) => (
                              <Badge key={s} variant="outline" className="text-xs h-5 font-normal">{s}</Badge>
                            ))}
                            {client.services.length > 2 && (
                              <Badge variant="outline" className="text-xs h-5 font-normal text-muted-foreground">
                                +{client.services.length - 2}
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground/50 text-sm">—</span>
                        )}
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusStyles[client.status]}`}>
                          {client.status}
                        </span>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right pr-4">
                        <div className="flex items-center justify-end gap-1.5">
                          {client.status === 'pending' && (
                            <Button
                              size="sm" variant="outline"
                              className="h-7 px-2 text-xs gap-1"
                              onClick={() => handleRegenerateLink(client._id, client.name)}
                            >
                              <RefreshCw className="h-3 w-3" /> Setup Link
                            </Button>
                          )}
                          <Button asChild size="sm" variant="ghost" className="h-7 px-2 text-xs">
                            <Link href={`/admin/clients/${client._id}`}>View</Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination — always visible */}
              <div className="flex items-center justify-between px-6 py-3 border-t border-border/60">
                <p className="text-xs text-muted-foreground">
                  {total === 0 ? 'No clients' : `Showing ${startRow}–${endRow} of ${total} clients`}
                </p>

                {totalPages > 1 && (
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm" variant="outline"
                      className="h-7 w-7 p-0"
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                      .reduce<(number | 'ellipsis')[]>((acc, p, idx, arr) => {
                        if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('ellipsis');
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((item, idx) =>
                        item === 'ellipsis' ? (
                          <span key={`e-${idx}`} className="px-1.5 text-xs text-muted-foreground">…</span>
                        ) : (
                          <Button
                            key={item}
                            size="sm"
                            variant={item === currentPage ? 'default' : 'outline'}
                            className="h-7 w-7 p-0 text-xs"
                            onClick={() => setCurrentPage(item as number)}
                          >
                            {item}
                          </Button>
                        )
                      )}

                    <Button
                      size="sm" variant="outline"
                      className="h-7 w-7 p-0"
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
