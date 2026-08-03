"use client";

import AdminEditor from "../../../components/admin/AdminEditor";

export default function BlogAdminPage() {
  return (
    <AdminEditor
      title="Blog Posts"
      description="These show up as cards in the 'From The Blog' section."
      apiPath="/api/blog"
      fields={[
        { name: "title", label: "Post Title", type: "text" },
        { name: "category", label: "Category", type: "text", placeholder: "e.g. Shopify, Meta Ads" },
        { name: "excerpt", label: "Excerpt", type: "textarea", placeholder: "A short 1-2 sentence summary" },
        { name: "date", label: "Date Label", type: "text", placeholder: "e.g. June 2025" },
        { name: "emoji", label: "Emoji Icon", type: "text", placeholder: "e.g. 📉" },
      ]}
    />
  );
}
