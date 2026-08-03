"use client";

import AdminEditor from "../../../components/admin/AdminEditor";

export default function FaqAdminPage() {
  return (
    <AdminEditor
      title="FAQ"
      description="Questions and answers shown in the FAQ section."
      apiPath="/api/faq"
      fields={[
        { name: "question", label: "Question", type: "text" },
        { name: "answer", label: "Answer", type: "textarea" },
      ]}
    />
  );
}
