"use client";
import Asynchronous from "@/components/notification/async-comp";
import { NotificationComposer } from "@/components/notification/notification-composer";
import NotificationsList from "@/components/notification/notifications-list";
import StateHandler from "@/components/state-handler";
import {
  ALL_NOTIFICATIONS,
  NotificationData,
} from "@/graphql/notifications/queries";
import { useQuery } from "@apollo/client";
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
import React, { useCallback, useState } from "react";

type Props = {};

const tabs = ["All", "My Notifications"];

const Page = (props: Props) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [composerOpen, setComposerOpen] = useState(false);
  const handleTabsChange = useCallback((event: any, value: number) => {
    setCurrentTab(value);
  }, []);
  const { data, loading, error } =
    useQuery<NotificationData>(ALL_NOTIFICATIONS);

  return (
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
        {currentTab === 0 && (
          <StateHandler
            loading={loading}
            error={error}
            empty={data?.getAllNotifications.length === 0}
          >
            <NotificationsList
              notifications={data?.getAllNotifications || []}
            />
          </StateHandler>
        )}
        {currentTab === 1 && (
          <StateHandler
            loading={loading}
            error={error}
            empty={data?.getAllNotifications.length === 0}
          >
            <NotificationsList
              notifications={data?.getAllNotifications || []}
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
  );
};

export default Page;
