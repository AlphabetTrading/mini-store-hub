"use client";
import { useSession } from "next-auth/react";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const { data } = useSession();
  return <div>{JSON.stringify(data?.user)}</div>;
};

export default Page;
