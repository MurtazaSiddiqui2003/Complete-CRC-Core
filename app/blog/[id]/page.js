import Link from "next/link";
import { getBlogPostById } from "../../../lib/data";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ParticleBackground from "../../../components/ParticleBackground";

// Renders fresh each visit so admin edits show up immediately -- same
// reasoning as the homepage.
export const dynamic = "force-dynamic";

// This runs on the SERVER before the page renders, and sets the browser
// tab title + search engine preview for THIS specific post (instead of
// every blog post sharing the same generic site title).
export async function generateMetadata({ params }) {
  const post = await getBlogPostById(params.id);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPostById(params.id);

  if (!post) {
    return (
      <>
        <ParticleBackground />
        <div className="relative z-10">
          <Navbar />
          <div className="max-w-2xl mx-auto px-5 py-24 text-center">
            <h1 className="text-2xl font-bold mb-3">Post Not Found</h1>
            <p className="text-textSub mb-6">
              This post may have been removed or the link is out of date.
            </p>
            <Link href="/#blog" className="text-accentLight hover:underline">
              ← Back to the blog
            </Link>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  // The admin panel saves paragraphs separated by a blank line.
  // Split on that so each paragraph gets its own <p> tag.
  const paragraphs = (post.content || post.excerpt || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />

        <article className="max-w-2xl mx-auto px-5 py-16">
          <Link href="/#blog" className="text-sm text-textSub hover:text-white">
            ← Back to the blog
          </Link>

          <div className="mt-6 mb-8">
            <span className="text-xs text-glow">{post.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-3">{post.title}</h1>
            <p className="text-sm text-textMuted">{post.date}</p>
          </div>

          <div className="text-6xl mb-8">{post.emoji}</div>

          <div className="space-y-5 text-textSub leading-relaxed">
            {paragraphs.length > 0 ? (
              paragraphs.map((para, i) => <p key={i}>{para}</p>)
            ) : (
              <p className="text-textMuted italic">
                This post doesn&apos;t have full content yet — add it from the admin panel.
              </p>
            )}
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
}
