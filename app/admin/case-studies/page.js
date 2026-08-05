"use client";

import AdminEditor from "../../../components/admin/AdminEditor";

export default function CaseStudiesAdminPage() {
  return (
    <AdminEditor
      title="Case Studies"
      description="These show up in the 'Trusted by Ambitious Brands' section."
      apiPath="/api/case-studies"
      fields={[
        { name: "title", label: "Client Name", type: "text", placeholder: "e.g. Featherhead" },
        { name: "badge", label: "Badge", type: "text", placeholder: "e.g. B2B & B2C" },
        { name: "market", label: "Market / Description", type: "text", placeholder: "e.g. E-commerce Brand — USA & Canada" },
        { name: "points", label: "Bullet Points", type: "list", placeholder: "One achievement per line" },
        { name: "image", label: "Thumbnail Image", type: "image" },
        { name: "videoFileId", label: "Upload Video (used if no image is set)", type: "video" },
        { name: "videoUrl", label: "Or paste a video link instead (YouTube, etc.)", type: "text", placeholder: "/videos/reel.mp4 or a link to your own video" },
        { name: "featured", label: "Featured (shows larger on the page)", type: "checkbox" },
      ]}
    />
  );
}
