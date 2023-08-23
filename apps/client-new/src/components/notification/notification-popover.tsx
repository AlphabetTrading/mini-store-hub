import {
  Popover,
  Stack,
  Typography,
  Tooltip,
  IconButton,
  SvgIcon,
  Box,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import dayjs from "dayjs";
import { Notification, RecipientType } from "../../../types/notification";
import NotificationDetails from "./notification-details-modal";
import { useState } from "react";
import { useSession } from "next-auth/react";
type Props = {
  anchorEl: any;
  notifications: Notification[];
  onClose: () => void;
  open: any;
};

export const NotificationsPopover = (props: Props) => {
  const { anchorEl, notifications, onClose, open } = props;
  const isEmpty = notifications.length === 0;

  const [notification, setNotification] = useState<Notification | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { data: sessionData } = useSession();
  return (
    <>
      <NotificationDetails
        handleClose={() => {
          setOpenModal(false);
          setNotification(null);
        }}
        isMyNotification={true}
        notification={notification}
        open={openModal}
      />
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        disableScrollLock
        onClose={onClose}
        open={open}
        //   PaperProps={{ sx: { width: 380 } }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Typography color="inherit" variant="h6">
            Notifications
          </Typography>
          {/* <Tooltip title="Mark all as read">
            <IconButton onClick={onMarkAllAsRead} size="small" color="inherit">
              <SvgIcon>
                <Mail04Icon />
              </SvgIcon>
            </IconButton>
          </Tooltip> */}
        </Stack>
        {isEmpty ? (
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2">
              There are no notifications
            </Typography>
          </Box>
        ) : (
          <List disablePadding sx={{ maxHeight: 400 }}>
            {notifications.map((notification: Notification) => {
              const createdAt = dayjs(notification.createdAt).format(
                "MMM dd, h:mm a"
              );
              const isRead =
                notification.recipientType === RecipientType.USER
                  ? notification.isRead
                  : notification.notificationReads.some(
                      (n) => n.userId === (sessionData?.user as any).id
                    );

              return (
                <ListItem
                  divider
                  onClick={() => {
                    setNotification(notification);
                    setOpenModal(true);
                  }}
                  key={notification.id}
                  sx={{
                    alignItems: "flex-start",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                    "& .MuiListItemSecondaryAction-root": {
                      top: "24%",
                    },
                    ...(!isRead && {
                      "&:hover": {
                        backgroundColor: "primary.light",
                      },
                      backgroundColor: "primary.lightest",
                      "&:before": {
                        backgroundColor: "primary.main",
                        content: '" "',
                        height: "100%",
                        left: 0,
                        position: "absolute",
                        top: 0,
                        width: 4,
                      },
                    }),
                  }}
                  //   secondaryAction={
                  //     <Tooltip title="Remove">
                  //       <IconButton
                  //         edge="end"
                  //         onClick={() => onRemoveOne?.(notification.id)}
                  //         size="small"
                  //       >
                  //         <SvgIcon>
                  //         <Close />
                  //       </SvgIcon>
                  //       </IconButton>
                  //     </Tooltip>
                  //   }
                >
                  <>
                    <ListItemAvatar sx={{ mt: 0.5 }}>
                      <Avatar>
                        <SvgIcon>{/* <MessageChatSquareIcon /> */}</SvgIcon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Stack
                        // sx={{
                        //   alignItems: "center",
                        //   display: "flex",
                        //   flexWrap: "wrap",
                        // }}
                        >
                          <Typography
                            sx={{
                              mr: 0.5,
                              minWidth: 200,
                              maxWidth: 300,
                            }}
                            noWrap
                            variant="subtitle2"
                          >
                            {notification.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              minWidth: 200,
                              maxWidth: 300,
                            }}
                            noWrap
                          >
                            {notification.body}
                          </Typography>
                        </Stack>
                      }
                      secondary={
                        <Typography color="text.secondary" variant="caption">
                          {createdAt}
                        </Typography>
                      }
                      sx={{ my: 0 }}
                    />
                  </>
                </ListItem>
              );
            })}
          </List>
        )}
      </Popover>
    </>
  );
};
