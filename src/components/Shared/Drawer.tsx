import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
  })
);

interface Props {
  image: string;
  title: string;
  description: string;
}

const Drawer = () => {
  //style
  const classes = useStyles();
  //state
  const [open, setOpen] = useState<boolean>(false);
  //router
  var router = useHistory();
  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={() => {
          setOpen(true);
        }}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => {}}
      >
        <div className={classes.list}>
          <Box textAlign="center" p={2}>
            Components
          </Box>
          <Divider />
          <List>
            <ListItem button onClick={() => router.push("/")}>
              <ListItemText primary={"Container"}></ListItemText>
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default Drawer;
