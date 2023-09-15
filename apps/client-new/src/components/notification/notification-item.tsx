import React from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { Notification, RecipientType } from "../../../types/notification";
import CustomChip from "../custom-chip";
import formatEnumValue from "@/helpers/formatEnum";
import dayjs from "dayjs";

type Props = {
  notification: Notification;
  isRead: boolean;
  isMyNotification: boolean;
};

const NotificationItem = ({
  notification,
  isRead,
  isMyNotification,
}: Props) => {

  return (
    <Box
      sx={{
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "divider",
        display: "flex",
        p: 2,
        ...(!isRead &&
          isMyNotification && {
            position: "relative",
            "&:before": {
              backgroundColor: "primary.main",
              content: '" "',
              height: "100%",
              left: 0,
              position: "absolute",
              top: 0,
              width: 4,
            },
            "& $name, & $subject": {
              fontWeight: 600,
            },
          }),

        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
      // {...other}
    >
      <Box
        // component={NextLink}
        // href={href}
        sx={{
          alignItems: "center",
          cursor: "pointer",
          display: "flex",
          flexGrow: 1,
          flexWrap: {
            xs: "wrap",
            md: "nowrap",
          },
          minWidth: 1,
          textDecoration: "none",
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Avatar />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            ml: {
              xs: 0,
              md: 2,
            },
            my: {
              xs: 2,
              md: 0,
            },
            overflow: "hidden",
            width: {
              xs: "100%",
              md: "auto",
            },
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              maxWidth: 800,
              width: "100%",
            }}
          >
            <Stack>
              <Stack direction="row">
                <Typography
                  color="text.primary"
                  sx={{
                    fontWeight: 500,
                    minWidth: 100,
                    maxWidth: 400,
                    mr: 1,
                    ...(!isRead &&
                      isMyNotification && {
                        fontWeight: 700,
                      }),
                  }}
                  noWrap
                  variant="body2"
                >
                  {notification.title}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    ...(!isRead &&
                      isMyNotification && {
                        fontWeight: 700,
                      }),
                  }}
                  noWrap
                  variant="body2"
                >
                  —{notification.body}
                </Typography>
              </Stack>
              <Typography
                color="text.secondary"
                sx={{
                  ...(!isRead &&
                    isMyNotification && {
                      fontWeight: 600,
                    }),
                }}
                variant="body2"
              >
                {dayjs(notification.createdAt).format(
                  "MMMM DD, YYYY hh:mm:ss A"
                )}
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Typography
          color="text.secondary"
          variant="caption"
          sx={{
            display: "block",
            textAlign: {
              xs: "left",
              md: "right",
            },
            whiteSpace: "nowrap",
          }}
        >
          {`To: `}
          <CustomChip label={formatEnumValue(notification.recipientType)} />
          {/* {createdAt} */}
        </Typography>
      </Box>
    </Box>
  );
};

export default NotificationItem;
