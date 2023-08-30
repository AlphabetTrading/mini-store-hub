import { Stack } from "@mui/material";
import React from "react";
import SideNavItem from "./side-nav-item";
import { usePathname } from "next/navigation";
import { NavigationItem } from "../config";
import { useQuery } from "@apollo/client";
import {
  NOTIFICATIONS_BY_USERID,
  NotificationByUserIdData,
  NotificationByUserIdVars,
} from "@/graphql/notifications/queries";
import { useSession } from "next-auth/react";
import { RecipientType } from "../../../types/notification";

type Props = {
  navigationItems: NavigationItem[];
  unreadNotifications: number;
};

const SideNavSection = ({ navigationItems, unreadNotifications }: Props) => {
  const pathname = usePathname();
  const { data: sessionData } = useSession();
  const userId = (sessionData?.user as any).id || "";
  // const { data } = useQuery<NotificationByUserIdData, NotificationByUserIdVars>(
  //   NOTIFICATIONS_BY_USERID,
  //   {
  //     variables: {
  //       userId: userId,
  //     },
  //   }
  // );

  // const unreadNotifications =
  //   data?.allNotificationsByUserId.filter((notification) => {
  //     if (notification.recipientType === RecipientType.USER) {
  //       return !notification.isRead;
  //     } else {
  //       return !notification.notificationReads.some((n) => n.userId === userId);
  //     }
  //   }).length || 0;

  return (
    <Stack component="ul" spacing={0.5} sx={{ listStyle: "none", m: 0, p: 0 }}>
      {navigationItems.map((item) => (
        <SideNavItem
          icon={item.icon}
          title={item.title}
          path={item.path}
          active={pathname.includes(item.path)}
          key={item.title}
          label={item.chip && item.chip(unreadNotifications)}
          // label={item.label}
          // disabled={item.disabled}
        />
      ))}
    </Stack>
  );
};

export default SideNavSection;
