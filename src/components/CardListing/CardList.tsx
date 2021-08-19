import { Box, Grid } from "@material-ui/core";
import MediaCard from "./MeidaCard";

var mediaCards = [
  {
    title: "Watch",
    image: "/images/pic01.jpg",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not    only five centuries, but also the leap into electronic typesetting",
  },
  {
    title: "Laptop",
    image: "/images/pic02.jpg",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not    only five centuries, but also the leap into electronic typesetting",
  },
  {
    title: "Umbrella",
    image: "/images/pic03.jpg",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not    only five centuries, but also the leap into electronic typesetting",
  },
  {
    title: "Umbrella 2",
    image: "/images/pic04.jpg",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not    only five centuries, but also the leap into electronic typesetting",
  },
  {
    title: "Umbrella 3",
    image: "/images/pic05.jpg",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not    only five centuries, but also the leap into electronic typesetting",
  },
  {
    title: "Umbrella 4",
    image: "/images/pic06.jpg",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not    only five centuries, but also the leap into electronic typesetting",
  },
];

const CardList = () => {
  return (
    <Box p={5} mt={5}>
      <Grid container spacing={2}>
        {mediaCards.map((item, i) => {
          return (
            <Grid key={i} item>
              <MediaCard {...item}></MediaCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CardList;
