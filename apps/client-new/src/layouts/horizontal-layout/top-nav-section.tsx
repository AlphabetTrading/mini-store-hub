import { Stack } from "@mui/material";
import TopNavItem, { TopNavProps } from "./top-nav-item";
import { NAV_DATA } from "../nav-items";
import { usePathname } from "next/navigation";

type Props = {};

const TopNavSection = (props: Props) => {
  const pathname = usePathname();
  const items = NAV_DATA;
  return (
    <Stack
      component="ul"
      direction="row"
      spacing={1}
      sx={{ listStyle: "none", m: 0, p: 0 }}
    >
      {items.map((item: TopNavProps) => (
        <TopNavItem
          active={pathname.includes(item.path)}
          disabled={item.disabled}
          icon={item.icon}
          path={item.path}
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
