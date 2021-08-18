import { Fab } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ThemeContext } from "../contexts/ThemeContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    floatBtn: {
      position: "fixed",
      right: "3rem",
      bottom: "3rem",
    },
  })
);

const ToggleThemeBtn = () => {
  //style
  const classes = useStyles();

  //context
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Fab
      color="primary"
      variant="extended"
      className={classes.floatBtn}
      onClick={toggleTheme.bind(
        this,
        theme === "primary" ? "secondary" : "primary"
      )}
    >
      Toogle Theme Btn
    </Fab>
  );
};

export default ToggleThemeBtn;
