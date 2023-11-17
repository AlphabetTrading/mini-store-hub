import PropTypes from "prop-types";
import { List } from "@mui/material";
type Props = {
  children: React.ReactNode;
}
export const PropertyList = (props: any) => {
  const { children } = props;

  return <List disablePadding>{children}</List>;
};

