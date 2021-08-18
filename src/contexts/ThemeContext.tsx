import { PropTypes } from "@material-ui/core";
import React, { createContext, ReactNode, useState } from "react";

interface ThemedComponentProps {
  children: ReactNode;
}

interface ThemeContextDefault {
  theme: PropTypes.Color;
  toggleTheme: (theme: PropTypes.Color) => void;
}

const themeContextDefaultData = {
  theme: "primary" as PropTypes.Color,
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextDefault>(
  themeContextDefaultData
);

const ThemeContextProvider = ({ children }: ThemedComponentProps) => {
  const [theme, setTheme] = useState<PropTypes.Color>(
    themeContextDefaultData.theme
  );

  const toggleTheme = (theme: PropTypes.Color) => setTheme(theme);

  const themeDynamicData = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={themeDynamicData}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
