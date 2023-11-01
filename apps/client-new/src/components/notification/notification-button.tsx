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
import {Notification} from "../../../types/notification";

type Props = {
  notifications: Notification[];
  unreadNotifications: number;
};

export const NotificationsButton = ({unreadNotifications,notifications}:Props) => {
  const popover = usePopover();
  const { data: sessionData } = useSession();

  // const { handleRemoveOne, handleMarkAllAsRead, notifications, unread } = useNotifications();

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton ref={popover.anchorRef} onClick={popover.handleOpen}>
          <Badge color="error" badgeContent={unreadNotifications}>
            <SvgIcon width={8}>
              <NotificationIcon />
            </SvgIcon>
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationsPopover
        anchorEl={popover.anchorRef.current}
        notifications={[...notifications].reverse()}
        onClose={popover.handleClose}
        //   onMarkAllAsRead={handleMarkAllAsRead}
        //   onRemoveOne={handleRemoveOne}
        open={popover.open}
      />
    </>
  );
};
