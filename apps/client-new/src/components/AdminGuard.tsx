"use client";
import React from "react";
import { usePathname, redirect } from "next/navigation";
import { useSession } from "next-auth/react";

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const { data } = useSession();
  if ((data?.user as any).role !== "ADMIN") {
    redirect("/");
  }
  return <div>{children}</div>;
};

export default AdminGuard;
