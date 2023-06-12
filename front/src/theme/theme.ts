import { createTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";

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
      "NanumSquare",
      "Nanum Gothic",
      "NanumSquareExtraBold",
      "Black Han Sans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

Object.assign(theme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        backgroundColor: "#ebebeb",
        height: "100%",
        maxHeight: "100%",
      },
      container: {
        display: "flex",
        flexDirection: "column",
      },
      editor: {
        backgroundColor: "#ebebeb",
        padding: "20px",
        height: "100%",
        maxHeight: "100%",
        overflow: "auto",
      },
      toolbar: {
        borderBottom: "1px solid lightgray",
        backgroundColor: "#ebebeb",
      },
      placeHolder: {
        backgroundColor: "#ebebeb",
        marginBottom: 20,
        paddingLeft: 20,
        width: "inherit",
        top: "50px",
      },
      anchorLink: {
        color: "#333333",
        textDecoration: "underline",
      },
    },
  },
});
