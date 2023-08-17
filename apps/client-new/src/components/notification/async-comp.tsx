import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { USERS, UsersData } from "@/graphql/users/queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import { User } from "../../../types/user";
import { useEffect, useState } from "react";

interface Film {
  title: string;
  year: number;
}

export default function Asynchronous() {
  const [openAutocomplete, setOpenAutocomplete] = useState(false);
  const [options, setOptions] = useState<User[]>([]);
  const [getUsers, { loading: usersLoading }] = useLazyQuery<UsersData>(USERS);

  useEffect(() => {
    if (openAutocomplete) {
      (async () => {
        await getUsers({
          onCompleted: (data) => {
            setOptions(data.users.items);
          },
        });
      })();
    }
  }, [openAutocomplete]);

  return (
    <Autocomplete
      sx={{ width: 300 }}
      open={openAutocomplete}
      onOpen={() => {
        setOpenAutocomplete(true);
      }}
      onClose={() => {
        setOpenAutocomplete(false);
      }}
      isOptionEqualToValue={(option, value) =>
        option.firstName === value.firstName
      }
      getOptionLabel={(option) => option.firstName}
      options={options}
      loading={usersLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Recipient"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {usersLoading ? (
                  <CircularProgress sx={{ color: "neutral.500" }} size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
