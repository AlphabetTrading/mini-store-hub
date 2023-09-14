import React from "react";
import NotificationItem from "./notification-item";
import { Notification } from "../../../types/notification";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";

type Props = {
  notifications: Notification[];
  setNotification: React.Dispatch<React.SetStateAction<Notification | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMyNotification: boolean;
};

const NotificationsList = ({
  notifications,
  setNotification,
  setOpen,
  isMyNotification,
}: Props) => {
  const { data: sessionData } = useSession();
  const userId = (sessionData?.user as any).id || "";
  return (
    <Box>
      {notifications.map((notification, idx) => {
        // const isSelected = selected.includes(emailId);
        const isRead = notification.notificationReads?.some(
          (n) => userId === n.userId
        );
        // const href =
        //   currentLabelId && currentLabelId !== "inbox"
        //     ? paths.dashboard.mail + `?emailId=${emailId}&label=${currentLabelId}`
        //     : paths.dashboard.mail + `?emailId=${emailId}`;

        return (
          <Box
            onClick={() => {
              setNotification(notification);
              setOpen(true);
            }}
            key={idx}
          >
            <NotificationItem
              isMyNotification={isMyNotification}
              isRead={isRead}
              notification={notification}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default NotificationsList;
