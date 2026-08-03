import { getBlogPosts } from "../lib/data";

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <section id="blog" className="py-20 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-sm text-glow mb-3">From The Blog</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Insights on <span className="grad">Growth</span>
          </h2>
          <p className="text-textSub">
            No fluff. Just practical knowledge from building real brand systems.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-textMuted">No blog posts added yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post._id} className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="h-32 bg-surface flex items-center justify-center text-4xl">
                  {post.emoji}
                </div>
                <div className="p-5">
                  <span className="text-xs text-glow">{post.category}</span>
                  <h3 className="font-semibold mt-2 mb-2">{post.title}</h3>
                  <p className="text-sm text-textSub mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-textMuted">
                    <span>{post.date}</span>
                    <span className="text-accentLight">Read More →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
