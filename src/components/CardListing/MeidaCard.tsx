import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { CardDetailContext } from "contexts/CardDetailContext";

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

interface Props {
  image: string;
  title: string;
  description: string;
}

const MediaCard = ({ image, title, description }: Props) => {
  //style
  const classes = useStyles();

  const router = useHistory();

  //context
  const { updateCardDetail } = useContext(CardDetailContext);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
        ></CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            updateCardDetail(title, image, description);
            router.push("/card-detail");
          }}
        >
          Detail
        </Button>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
