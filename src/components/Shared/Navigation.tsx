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
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ProgressContext } from "contexts/ProgressContext";
import { ThemeContext } from "contexts/ThemeContext";
import { AuthContext } from "contexts/AuthContext";
import WelcomMessage from "components/WelcomMessage";
import Login from "components/Login";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        positionSelect: {
            color: "white",
            borderBottom: "1px solid white",
        },
    })
);

export const Navigation = () => {
    //style
    const classes = useStyles();

    //context
    const { lastTime, status } = useContext(ProgressContext);
    const { theme } = useContext(ThemeContext);
    const {
        // authInfo: { isAuthenticated, username },
        // toggleAuth,
    } = useContext(AuthContext);

    //state
    const [loginOpen, setLoginOpen] = useState(false);

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
                    <Typography variant="h6">G Shop</Typography>

                    <Box textAlign="center">
                        <Box my={1}>
                            <Typography variant="h6"></Typography>
                        </Box>
                        <Button
                            variant="contained"
                            // onClick={
                            //   isAuthenticated
                            //     ? toggleAuth.bind(this, "")
                            //     : setLoginOpen.bind(this, true)
                            // }
                        >
                            {/* {isAuthenticated ? "Logout" : "Login"} */}
                        </Button>
                    </Box>

                    <Login isOpen={loginOpen} handleClose={setLoginOpen} />
                </Box>
            </Toolbar>
        </AppBar>
    );
};
