"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, BookOpen } from "lucide-react";
import {
  blogPosts,
  blogCategories,
  type BlogPost,
} from "@/lib/blog-data";

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#046BAF] hover:shadow-lg transition-all duration-300 h-full flex flex-col">
          <div
            className={`h-48 bg-gradient-to-br ${post.gradientClasses} relative flex-shrink-0 flex items-center justify-center`}
          >
            <BookOpen className="w-10 h-10 text-white/40" />
          </div>
          <div className="p-6 flex flex-col flex-1">
            <span className="inline-block px-3 py-1 bg-blue-50 text-[#046BAF] text-xs font-semibold rounded-full border border-blue-200 mb-3 w-fit">
              {post.category}
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#046BAF] transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 ${post.author.avatarColor} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}
                >
                  {post.author.initials}
                </div>
                <span className="text-xs font-medium text-slate-700 truncate max-w-[100px]">
                  {post.author.name}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const gridPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-white via-sky-50/50 to-blue-50 overflow-hidden mb-8">
        <div className="absolute top-16 left-1/4 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-200/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200 text-[#046BAF] text-sm font-semibold mb-6">
              <BookOpen className="w-4 h-4" />
              Our Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 leading-tight">
              Insights & Strategies
              <br />
              <span className="text-[#046BAF]">for Business Growth</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Expert marketing insights, proven strategies, and actionable advice to help your
              business attract more customers and grow faster.
            </p>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#046BAF] text-white border-[#046BAF]"
                      : "bg-white text-slate-600 border-slate-200 hover:border-[#046BAF] hover:text-[#046BAF]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {gridPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridPosts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p className="text-lg font-medium">No posts in this category yet.</p>
              <p className="text-sm mt-1">Check back soon — we publish weekly.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-6 bg-[#046BAF]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">Stay Ahead of the Curve</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Get the latest marketing insights and strategies delivered to your inbox every week.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-blue-200 focus:outline-none focus:border-white focus:bg-white/20 transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-[#046BAF] font-semibold rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              Subscribe Free
            </button>
          </form>
          <p className="text-blue-200 text-sm mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </main>
  );
}
