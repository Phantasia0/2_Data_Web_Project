import { createTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#15D89E",
    },
    secondary: {
      main: "#397261",
    },
    info: {
      main: "#3C504A",
    },
  },
  typography: {
    fontFamily: [
      'NanumSquare',
      'Nanum Gothic',
      'NanumSquareExtraBold',
      'Black Han Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
