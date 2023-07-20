import { useReactiveVar } from "@apollo/client";
import { useRouter, usePathname } from "next/navigation";
import { Children, useEffect } from "react";
import authenticatedVar from "../constants/authenticated";
import useGetMe from "../hooks/useGetMe";

interface GuardProps {
  excludedRoutes?: string[];
  children: React.ReactNode;
}

const Guard = ({ excludedRoutes ,children}: GuardProps) => {
  const { data: user, refetch, loading } = useGetMe();
  const authenticated = useReactiveVar(authenticatedVar);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!excludedRoutes?.includes(pathname)) {
      refetch();
    }
  }, [pathname, refetch, excludedRoutes]);

  useEffect(() => {
    if (!loading) {
      if (!user && !excludedRoutes?.includes(pathname)) {
        router.push("/auth");
      } else {
        router.push("/dashboard");
      }
    }
  }, [authenticated, router, excludedRoutes]);

  return (
    <>
    {children}
    </>
  );
};

export default Guard;
