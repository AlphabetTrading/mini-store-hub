import { Stack } from "@mui/material";
import TopNavItem, { TopNavProps } from "./top-nav-item";
import { usePathname } from "next/navigation";
import { NavigationItem, useNavigationItems } from "../config";

type Props = {
  navigationItems: NavigationItem[];
};

const TopNavSection = ({navigationItems}: Props) => {
  const pathname = usePathname();
  return (
    <Stack
      component="ul"
      direction="row"
      spacing={1}
      sx={{ listStyle: "none", m: 0, p: 0 }}
    >
      {navigationItems.map((item: TopNavProps) => (
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
