import { usePopover } from "@/hooks/use-popover";
import NotificationIcon from "@/icons/notification-icon";
import { Tooltip, IconButton, Badge, SvgIcon } from "@mui/material";
import { NotificationsPopover } from "./notification-popover";
import {
  NOTIFICATIONS_BY_USERID,
  NotificationByUserIdData,
  NotificationByUserIdVars,
} from "@/graphql/notifications/queries";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";

export const NotificationsButton = () => {
  const popover = usePopover();
  const { data: sessionData } = useSession();
  const { data, error, loading } = useQuery<
    NotificationByUserIdData,
    NotificationByUserIdVars
  >(NOTIFICATIONS_BY_USERID, {
    variables: {
      userId: (sessionData?.user as any).id || "",
    },
  });
  const unread = data?.allNotificationsByUserId.filter((notification) => {
    if (notification.recipientType === "USER") {
      return !notification.isRead;
    } else {
      return !notification.notificationReads.some(
        (n) => n.userId === (sessionData?.user as any).id || ""
      );
    }
  });
  // const { handleRemoveOne, handleMarkAllAsRead, notifications, unread } = useNotifications();

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton ref={popover.anchorRef} onClick={popover.handleOpen}>
          <Badge color="error" badgeContent={unread?.length || 0}>
            <SvgIcon width={8}>
              <NotificationIcon />
            </SvgIcon>
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationsPopover
        anchorEl={popover.anchorRef.current}
        notifications={[...(data?.allNotificationsByUserId || [])].reverse()}
        onClose={popover.handleClose}
        //   onMarkAllAsRead={handleMarkAllAsRead}
        //   onRemoveOne={handleRemoveOne}
        open={popover.open}
      />
    </>
  );
};
