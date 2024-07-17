import { FC, useState, useMemo, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { PaletteMode, createTheme, useMediaQuery, CssBaseline } from "@mui/material";

import "./App.css";
import { ThemeContext } from "./shared/contexts";
import Home from "./Pages/Home/Home";
import ResultsPage from "./Pages/ResultsPage/ResultsPage";
import BrowsePage from "./Pages/BrowsePage/BrowsePage"; 
import { getDesignTokens } from "./shared/colorTheme";
import Navbar from './components/navbar';

const App: FC = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  useEffect(() => {
    if (mode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [mode]);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/browse" element={<BrowsePage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
