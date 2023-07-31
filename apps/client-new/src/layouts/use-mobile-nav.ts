"use client";

import { useCallback, useState } from "react";

export const useMobileNav = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  return {
    handleOpen,
    handleClose,
    open,
  };
};
