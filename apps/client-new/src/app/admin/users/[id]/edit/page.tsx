"use client";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Chip,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { UserEditForm } from "@/components/users/user-edit-form";
import { UserData, UserVars, USER } from "@/graphql/users/queries";
import { useQuery } from "@apollo/client";
import StateHandler from "@/components/state-handler";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import NextLink from "next/link";
type Props = {
  params: {
    id: string;
  };
};
const Page = ({ params }: Props) => {
  const { data, error, loading } = useQuery<UserData, UserVars>(USER, {
    variables: {
      userId: params.id,
    },
  });

  return (
    <StateHandler loading={loading} error={error} empty={false}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link component={NextLink} href={"/admin/dashboard"}>
                  Dashboard
                </Link>
                <Link component={NextLink} href={"/admin/users"}>
                  Users
                </Link>
                <Typography>Edit</Typography>
              </Breadcrumbs>
              <Stack
                alignItems="flex-start"
                direction={{
                  xs: "column",
                  md: "row",
                }}
                justifyContent="space-between"
                spacing={4}
              >
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Avatar
                    // src={customer.avatar}
                    sx={{
                      height: 64,
                      width: 64,
                    }}
                  ></Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      {data?.user.firstName} {data?.user.lastName}
                    </Typography>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Typography variant="subtitle2">user_id:</Typography>
                      <Chip label={params.id} size="small" />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <UserEditForm user={data?.user} />
          </Stack>
        </Container>
      </Box>
    </StateHandler>
  );
};

export default Page;
