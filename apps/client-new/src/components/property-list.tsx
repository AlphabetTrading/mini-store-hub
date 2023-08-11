import PropTypes from "prop-types";
import { List } from "@mui/material";

export const PropertyList = (props: any) => {
  const { children } = props;

  return <List disablePadding>{children}</List>;
};

PropertyList.propTypes = {
  children: PropTypes.node,
};
