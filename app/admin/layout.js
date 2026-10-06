"use client";

import AdminShell from "../../components/admin/AdminShell";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") return children;
  return <AdminShell>{children}</AdminShell>;
}
