"use client";

import AdminEditor from "../../../components/admin/AdminEditor";

export default function ServicesAdminPage() {
  return (
    <AdminEditor
      title="Services"
      description="The service cards in the 'Complete Growth System' section."
      apiPath="/api/services"
      fields={[
        { name: "icon", label: "Emoji Icon", type: "text", placeholder: "e.g. 🏗️" },
        { name: "title", label: "Service Title", type: "text" },
        { name: "items", label: "Bullet Points", type: "list", placeholder: "One bullet per line" },
      ]}
    />
  );
}
