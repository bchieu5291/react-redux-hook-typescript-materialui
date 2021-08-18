import { Box } from "@material-ui/core";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

interface WelcomMessageProps {
  position: string;
  country?: string;
}

const WelcomMessage = ({
  position,
  country = "Vietnam",
}: WelcomMessageProps) => {
  const {
    authInfo: { username },
  } = useContext(AuthContext);

  return (
    <Box mb={1}>
      Welcome {username} - {position} to {country}
    </Box>
  );
};

export default WelcomMessage;
