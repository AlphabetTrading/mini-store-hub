import { Stack } from "@mui/material";
import TopNavItem, { TopNavProps } from "./top-nav-item";
import { NavItems } from "../nav-items";

type Props = {};

const TopNavSection = (props: Props) => {
  const items = NavItems;
  return (
    <Stack
      component="ul"
      direction="row"
      spacing={1}
      sx={{ listStyle: "none", m: 0, p: 0 }}
    >
      {items.map((item: TopNavProps) => (
        <TopNavItem
          active={false}
          disabled={item.disabled}
          icon={item.icon}
          // items={item.items}
          key={item.title}
          label={item.label}
          title={item.title}
        />
      ))}
    </Stack>
  );
};

export default TopNavSection;
