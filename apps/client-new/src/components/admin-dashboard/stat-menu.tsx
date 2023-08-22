import { ExpandMore } from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";

type Props = {
  options: string[];
  timeFrame: string;
  setTimeFrame: React.Dispatch<React.SetStateAction<string>>;
};

const StatMenu = ({ options, timeFrame, setTimeFrame }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<ExpandMore />}
        sx={{ color: "text.primary", fontWeight:"600", fontSize:"1rem"}}
      >
        {timeFrame} stats
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {options.map((option,idx) => (
          <MenuItem
          key={idx}
            onClick={() => {
              setTimeFrame(option);
              handleClose();
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default StatMenu;
