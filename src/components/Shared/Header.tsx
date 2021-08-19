import {
  AppBar,
  Box,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import React from "react";
import Account from "./Account";
import Drawer from "./Drawer";
import Search from "./Search";

interface Props {
  children: React.ReactElement;
}

function HideOnScroll({ children }: Props) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction={"down"} in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  return (
    <HideOnScroll>
      <AppBar>
        <Toolbar>
          <Drawer />
          <Box flexGrow={1}>
            <Typography> Drawer</Typography>
          </Box>
          <Search />
          <Account />
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
