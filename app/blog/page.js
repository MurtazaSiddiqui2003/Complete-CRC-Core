import Link from "next/link";
import { getBlogPosts } from "../../lib/data";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ParticleBackground from "../../components/ParticleBackground";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog",
  description: "Practical insights on brand building, e-commerce, marketing, content, operations, and growth.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <main className="max-w-6xl mx-auto px-5 py-16">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm text-glow mb-3">CRC Core Blog</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Insights on <span className="grad">Growth</span>
            </h1>
            <p className="text-textSub">
              Practical knowledge from building brands, e-commerce systems, and growth engines.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-center text-textMuted">No blog posts published yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post._id}`}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:border-accent transition-colors"
                >
                  <div className="h-36 bg-surface flex items-center justify-center text-5xl">
                    {post.emoji}
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-glow">{post.category}</span>
                    <h2 className="font-semibold mt-2 mb-2">{post.title}</h2>
                    <p className="text-sm text-textSub mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-textMuted">
                      <span>{post.date}</span>
                      <span className="text-accentLight">Read More →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
