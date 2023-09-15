import {
  MarkNotificationAsReadData,
  MarkNotificationAsReadVars,
  MARK_NOTIFICATION_AS_READ,
} from "@/graphql/notifications/mutations";
import {
  NOTIFICATIONS_BY_USERID,
  NotificationByUserIdData,
} from "@/graphql/notifications/queries";
import { useMutation } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Notification, RecipientType } from "../../../types/notification";
import { useSession } from "next-auth/react";
import CustomChip from "../custom-chip";
import formatEnumValue from "@/helpers/formatEnum";
type Props = {
  open: boolean;
  handleClose: () => void;
  notification: Notification | null;
  isMyNotification: boolean;
};
const NotificationDetails = (props: Props) => {
  const [markAsRead, { data, error, loading }] = useMutation<
    MarkNotificationAsReadData,
    MarkNotificationAsReadVars
  >(MARK_NOTIFICATION_AS_READ);
  const { open, handleClose, notification, isMyNotification } = props;
  const { data: sessionData } = useSession();
  useEffect(() => {
    if (notification && isMyNotification) {
      markAsRead({
        variables: {
          userId: (sessionData?.user as any).id,
          notificationId: notification.id,
        },
        update(cache, { data }) {
          console.log(data);
          const existingNotifications =
            cache.readQuery<NotificationByUserIdData>({
              query: NOTIFICATIONS_BY_USERID,
            });
          const newNotifications =
            existingNotifications?.allNotificationsByUserId.map((n) => {
              if (n.id === data?.markNotificationAsRead.id) {
                return { ...n, ...data?.markNotificationAsRead ,isRead:true};
              } else return n;
            });

          cache.writeQuery<NotificationByUserIdData>({
            query: NOTIFICATIONS_BY_USERID,

            data: {
              allNotificationsByUserId: newNotifications as Notification[],
            },
          });
        },
      });
    }
  }, [notification]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="overline">
                  Notification Title
                </Typography>
                <Typography variant="subtitle2">
                  {notification?.title}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="overline">
                  Recipient Type
                </Typography>
                <div>
                  <CustomChip
                    label={formatEnumValue(
                      notification?.recipientType || RecipientType.USER
                    )}
                  />
                </div>
              </Stack>
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="overline">
                  Description
                </Typography>
                <Typography variant="subtitle2">
                  {notification?.body}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* <Paper
          elevation={12}
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              backgroundColor: "success.lightest",
              color: "success.main",
              mb: 2,
            }}
          ></Avatar>
          <Typography variant="h5">{notification?.title}</Typography>
          <Typography
            align="center"
            color="text.secondary"
            sx={{ mt: 1 }}
            variant="body2"
          >
            {notification?.body}
          </Typography>
          <Button fullWidth size="large" sx={{ mt: 4 }} variant="contained">
            Go back to dashboard
          </Button>
        </Paper> */}
      </Container>
    </Modal>
  );
};

export default NotificationDetails;
