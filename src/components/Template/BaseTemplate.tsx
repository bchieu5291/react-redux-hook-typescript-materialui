import {
  AppBar,
  Box,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import CardList from "components/CardListing/CardList";
import Footer from "components/Shared/Footer";
import Header from "components/Shared/Header";
import React from "react";

interface Props {
  children: React.ReactElement;
}

function RenderBaseTemplate({ children }: Props) {
  const trigger = useScrollTrigger();
  return <>{children}</>;
}

const BaseTemplate = () => {
  return (
    <>
      <Header />
      <CardList />
      <Footer />
    </>
  );
};

export default BaseTemplate;
