"use client";
import { NotificationComposer } from "@/components/notification/notification-composer";
import NotificationDetails from "@/components/notification/notification-details-modal";
import NotificationsList from "@/components/notification/notifications-list";
import StateHandler from "@/components/state-handler";
import {
  ALL_NOTIFICATIONS,
  NOTIFICATIONS_BY_USERID,
  AllNotificationData,
  NotificationByUserIdData,
  NotificationByUserIdVars,
} from "@/graphql/notifications/queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Add, Notifications } from "@mui/icons-material";
import {
  Tabs,
  Tab,
  Divider,
  Button,
  Stack,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { Notification } from "../../../../types/notification";

type Props = {};

const tabs = ["My Notifications", "Others"];

const Page = (props: Props) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [composerOpen, setComposerOpen] = useState(false);
  const handleTabsChange = useCallback((event: any, value: number) => {
    setCurrentTab(value);
  }, []);
  const [
    getAllNotifications,
    { data: dataAll, loading: loadingAll, error: errorAll },
  ] = useLazyQuery<AllNotificationData>(ALL_NOTIFICATIONS);

  const { data: sessionData } = useSession();

  const { data, error, loading } = useQuery<
    NotificationByUserIdData,
    NotificationByUserIdVars
  >(NOTIFICATIONS_BY_USERID, {
    variables: {
      userId: (sessionData?.user as any).id || "",
    },
  });

  useEffect(() => {
    if (currentTab === 1) {
      getAllNotifications();
    }
  }, [currentTab]);

  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  return (
    <>
      <NotificationDetails
        isMyNotification={currentTab === 0}
        handleClose={() => {
          setOpen(false);
          setNotification(null);
        }}
        open={open}
        notification={notification}
      />
      <Box component="main">
        <Container>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Notifications</Typography>
            <Button
              onClick={() => {
                setComposerOpen(true);
              }}
              variant="contained"
              startIcon={<Add />}
            >
              Compose
            </Button>
          </Stack>
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="primary"
            value={currentTab}
            variant="scrollable"
          >
            {tabs.map((tab, idx) => (
              <Tab key={idx} label={tab} value={idx} />
            ))}
          </Tabs>
          <Divider />
          {currentTab === 1 && (
            <StateHandler
              loading={loadingAll}
              error={errorAll}
              empty={dataAll?.getAllNotifications.length === 0}
            >
              <NotificationsList
                isMyNotification={false}
                notifications={[
                  ...(dataAll?.getAllNotifications || []),
                ].reverse()}
                setNotification={setNotification}
                setOpen={setOpen}
              />
            </StateHandler>
          )}
          {currentTab === 0 && (
            <StateHandler
              loading={loading}
              error={error}
              empty={data?.allNotificationsByUserId.length === 0}
            >
              <NotificationsList
                isMyNotification={true}
                notifications={[
                  ...(data?.allNotificationsByUserId || []),
                ].reverse()}
                setNotification={setNotification}
                setOpen={setOpen}
              />
            </StateHandler>
          )}
        </Container>
        <NotificationComposer
          onClose={() => {
            setComposerOpen(false);
          }}
          open={composerOpen}
        />
      </Box>
    </>
  );
};

export default Page;
