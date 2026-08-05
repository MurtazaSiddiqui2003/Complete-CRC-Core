"use client";

import AdminEditor from "../../../components/admin/AdminEditor";

export default function PortfolioAdminPage() {
  return (
    <AdminEditor
      title="Portfolio Sites"
      description="Live website previews shown on the /portfolio page. Just paste the real, public URL of each site — no image upload needed, since visitors interact with the real thing."
      apiPath="/api/portfolio"
      fields={[
        { name: "title", label: "Site Name", type: "text", placeholder: "e.g. Sterling Bloom" },
        { name: "url", label: "Live URL", type: "text", placeholder: "https://sterlingbloom.com" },
        { name: "category", label: "Category", type: "text", placeholder: "e.g. E-commerce, Service Business" },
        { name: "description", label: "Short Description", type: "textarea", placeholder: "One or two sentences about the project" },
      ]}
    />
  );
}
