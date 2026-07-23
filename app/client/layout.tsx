import { ReduxProvider } from '@/store/ReduxProvider';

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
