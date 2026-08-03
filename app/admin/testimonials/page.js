"use client";

import AdminEditor from "../../../components/admin/AdminEditor";

export default function TestimonialsAdminPage() {
  return (
    <AdminEditor
      title="Testimonials"
      description="Client quotes. This section only appears on the live site once you add at least one."
      apiPath="/api/testimonials"
      fields={[
        { name: "name", label: "Client Name", type: "text" },
        { name: "role", label: "Role / Company", type: "text", placeholder: "e.g. Founder, Featherhead" },
        { name: "quote", label: "Quote", type: "textarea" },
      ]}
    />
  );
}
