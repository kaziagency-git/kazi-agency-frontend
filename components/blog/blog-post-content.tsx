"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Check, Tag } from "lucide-react";
import { type BlogPost, getRelatedPosts, formatDate } from "@/lib/blog-data";

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const relatedPosts = getRelatedPosts(post.slug, post.category);

  return (
    <main className="bg-white">
      {/* Back nav */}
      <div className="sticky top-0 bg-white/90 backdrop-blur border-b border-slate-200 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#046BAF] hover:text-[#035a94] font-semibold transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <section className="pt-16 pb-10 px-6 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 bg-blue-50 text-[#046BAF] text-sm font-semibold rounded-full border border-blue-200 mb-5">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">{post.excerpt}</p>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 ${post.author.avatarColor} rounded-full flex items-center justify-center text-white font-bold shrink-0`}
                >
                  {post.author.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{post.author.name}</p>
                  <p className="text-xs text-slate-500">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500 ml-auto flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} min read
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover Image Area */}
      <div className="px-6 -mt-px">
        <div className="max-w-3xl mx-auto">
          <div
            className={`h-64 md:h-80 bg-gradient-to-br ${post.gradientClasses} rounded-b-2xl`}
          />
        </div>
      </div>

      {/* Article Body */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Intro */}
            <p className="text-lg text-slate-700 leading-relaxed mb-12 border-l-4 border-[#046BAF] pl-5">
              {post.content.intro}
            </p>

            {/* Sections */}
            <div className="space-y-12">
              {post.content.sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-5">{section.heading}</h2>
                  <div className="space-y-4">
                    {section.paragraphs.map((para, j) => (
                      <p key={j} className="text-slate-600 leading-relaxed text-base">
                        {para}
                      </p>
                    ))}
                  </div>
                  {section.list && (
                    <ul className="mt-5 space-y-2.5">
                      {section.list.map((item, k) => (
                        <li key={k} className="flex gap-3 text-slate-600">
                          <Check className="w-5 h-5 text-[#046BAF] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Conclusion */}
            <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Key Takeaway</h3>
              <p className="text-slate-700 leading-relaxed">{post.content.conclusion}</p>
            </div>

            {/* Tags */}
            <div className="mt-10 flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-slate-400" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Author Box */}
      <section className="pb-14 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200 flex gap-5 items-start">
            <div
              className={`w-14 h-14 ${post.author.avatarColor} rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0`}
            >
              {post.author.initials}
            </div>
            <div>
              <p className="text-xs font-semibold text-[#046BAF] uppercase tracking-wide mb-1">
                About the Author
              </p>
              <p className="text-base font-bold text-slate-900">{post.author.name}</p>
              <p className="text-sm text-slate-500 mb-2">{post.author.role} at Kazi Agency</p>
              <p className="text-sm text-slate-600 leading-relaxed">{post.author.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-6 bg-slate-50 border-t border-slate-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`} className="group block">
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#046BAF] hover:shadow-md transition-all duration-300">
                    <div
                      className={`h-36 bg-gradient-to-br ${related.gradientClasses}`}
                    />
                    <div className="p-5">
                      <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-[#046BAF] text-xs font-semibold rounded-full border border-blue-200 mb-2">
                        {related.category}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#046BAF] transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-3">
                        <Clock className="w-3 h-3" />
                        <span>{related.readingTime} min read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6 bg-[#046BAF]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Get a free audit of your marketing strategy and discover exactly where your growth
            opportunities are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/free-business-audit"
              className="px-8 py-3.5 bg-white text-[#046BAF] font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Get Free Business Audit
            </Link>
            <Link
              href="/book-a-consultation"
              className="px-8 py-3.5 bg-transparent text-white font-semibold rounded-lg border border-white/40 hover:bg-white/10 transition-colors"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
