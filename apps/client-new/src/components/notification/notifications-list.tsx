import React from "react";
import NotificationItem from "./notification-item";
import { Notification } from "../../../types/notification";

type Props = {
  notifications: Notification[];
};

const NotificationsList = ({ notifications }: Props) => {
  return notifications.map((notification, idx) => {
    // const isSelected = selected.includes(emailId);

    // const href =
    //   currentLabelId && currentLabelId !== "inbox"
    //     ? paths.dashboard.mail + `?emailId=${emailId}&label=${currentLabelId}`
    //     : paths.dashboard.mail + `?emailId=${emailId}`;

    return <NotificationItem href="" notification={notification} key={idx} />;
  });
};

export default NotificationsList;
