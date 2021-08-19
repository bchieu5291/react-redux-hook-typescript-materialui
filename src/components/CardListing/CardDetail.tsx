import Footer from "components/Shared/Footer";
import Header from "components/Shared/Header";
import { Box, Button, CardMedia, Typography } from "@material-ui/core";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import CardDetailContextProvider, {
  CardDetailContext,
} from "contexts/CardDetailContext";
import React, { useState, useEffect, useContext } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  })
);

function CardDetail() {
  //style
  const classes = useStyles();

  const router = useHistory();

  //context
  const { title, image, description } = useContext(CardDetailContext);

  return (
    <>
      <Header />
      <Box p={5} mt={6}>
        <Typography variant="h4">{title}</Typography>
      </Box>
      <Box px={5}>
        <CardMedia image={image} className={classes.media}></CardMedia>
      </Box>
      <Box px={5}>{description}</Box>

      <Box px={5} py={5}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/dashboard")}
        >
          Back
        </Button>
      </Box>

      <Footer />
    </>
  );
}

export default CardDetail;
