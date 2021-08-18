import {
  AppBar,
  Box,
  FormControl,
  MenuItem,
  Toolbar,
  Typography,
  Select,
  Button,
  Chip,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import WelcomMessage from "./WelcomMessage";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ProgressContext } from "../contexts/ProgressContext";
import { ThemeContext } from "../contexts/ThemeContext";
import Login from "./Login";
import { AuthContext } from "../contexts/AuthContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    positionSelect: {
      color: "white",
      borderBottom: "1px solid white",
    },
  })
);

export const Navbar = () => {
  //style
  const classes = useStyles();

  //context
  const { lastTime, status } = useContext(ProgressContext);
  const { theme } = useContext(ThemeContext);
  const {
    authInfo: { isAuthenticated },
    toggleAuth,
  } = useContext(AuthContext);

  //state
  const [position, setPosition] = useState("George Full-stack Developer");

  const [time, setTime] = useState<Date>(() => new Date(Date.now()));

  const [loginOpen, setLoginOpen] = useState(false);

  //useEffect
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date(Date.now())), 1000);
    return () => clearInterval(timer);
  }, []);

  const onPositionChange = (
    event: React.ChangeEvent<{
      value: unknown;
    }>
  ) => {
    setPosition(event.target.value as string);
  };

  return (
    <AppBar position="static" color={theme}>
      <Toolbar>
        <Box
          display="flex"
          justifyContent="space-between"
          alignContent="center"
          width={1}
          py={2}
        >
          <Typography variant="h6">My Movie</Typography>

          <Box textAlign="center">
            <WelcomMessage position={position}></WelcomMessage>
            <Chip
              label={`Last time working this project: ${lastTime} - Status: ${status}`}
            ></Chip>
            <Box mt={1}>
              <FormControl>
                <Select
                  value={position}
                  onChange={onPositionChange}
                  className={classes.positionSelect}
                >
                  <MenuItem value="George Full-stack Developer">
                    George Full-stack Developer
                  </MenuItem>
                  <MenuItem value="BE">BE</MenuItem>
                  <MenuItem value="BE">FE</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box textAlign="center">
            <Box my={1}>
              <Typography variant="h6">{time.toUTCString()}</Typography>
            </Box>
            <Button
              variant="contained"
              onClick={
                isAuthenticated
                  ? toggleAuth.bind(this, "")
                  : setLoginOpen.bind(this, true)
              }
            >
              {isAuthenticated ? "Logout" : "Login"}
            </Button>
          </Box>

          <Login isOpen={loginOpen} handleClose={setLoginOpen} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
