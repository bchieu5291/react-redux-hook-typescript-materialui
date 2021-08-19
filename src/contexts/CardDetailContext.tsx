import { PropTypes } from "@material-ui/core";
import React, { createContext, ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

interface ThemeContextDefault {
  title: string;
  image: string;
  description: string;
  updateCardDetail: (title: string, image: string, description: string) => void;
}

const defaultData = {
  title: "",
  image: "",
  description: "",
  updateCardDetail: () => {},
};

export const CardDetailContext =
  createContext<ThemeContextDefault>(defaultData);

const CardDetailContextProvider = ({ children }: Props) => {
  const [title, setTitle] = useState<string>(defaultData.title);
  const [image, setImage] = useState<string>(defaultData.image);
  const [description, setDescription] = useState<string>(
    defaultData.description
  );

  const updateCardDetail = (
    title: string,
    media: string,
    description: string
  ) => {
    setTitle(title);
    setImage(media);
    setDescription(description);
  };

  const dynamicData = { title, image, description, updateCardDetail };

  return (
    <CardDetailContext.Provider value={dynamicData}>
      {children}
    </CardDetailContext.Provider>
  );
};

export default CardDetailContextProvider;
