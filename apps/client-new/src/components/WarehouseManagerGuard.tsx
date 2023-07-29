"use client";
import React from "react";
import { usePathname, redirect } from "next/navigation";
import { useSession } from "next-auth/react";

interface WarehouseManagerGuardProps {
  children: React.ReactNode;
}

const WarehouseManagerGuard = ({ children }: WarehouseManagerGuardProps) => {
  const { data } = useSession();

  if ((data?.user as any).role !== "WAREHOUSE_MANAGER") {
    redirect("/dashboard");
  }
  return <div>{children}</div>;
};

export default WarehouseManagerGuard;
