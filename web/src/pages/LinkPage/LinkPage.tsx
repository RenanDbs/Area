import { Component } from "solid-js";
import "./LinkPage.scss";
import LinkServices from "../../components/LinkServices/LinkServices";
import Button from "@suid/material/Button";
import ArrowForwardIosIcon from "@suid/icons-material/ArrowForwardIos";
import { createTheme, ThemeProvider } from "@suid/material/styles";
import { useHistory } from "@gh0st-work/solid-js-router";
import { NavigateTo } from "../../utils/NaviagteTo";

const theme = createTheme({
  typography: {
    button: {
      fontFamily: "Work sans",
      textTransform: "none",
      fontSize: "1.75rem",
      fontWeight: "25rem",
    },
  },
  palette: {
    primary: {
      main: "#EF4565",
    },
  },
  shape: {
    borderRadius: 5,
  },
});

const LinkPage = () => {
  const history = useHistory();
  return (
    <div class="MainDivAP">
      <div class="RectangleAP">
        <LinkServices />
      </div>
      <div class="RightSideAP">
        <div>
          <span class="AreaTitleAP">AREA</span>
        </div>
        <div>
          <span class="AllTitleAP">Link your account</span>
        </div>
        <div class="containerCreateLP">
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="primary"
              class="createButton"
              onClick={() => NavigateTo("/", history)}
            >
              <span>Manage my AREA</span>
              <ArrowForwardIosIcon />
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default LinkPage;
