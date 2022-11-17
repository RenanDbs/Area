import { Component } from "solid-js";
import "./ActionPage.scss";
import ChooseService from "../../components/ChooseService/ChooseService";
import { createTheme, ThemeProvider } from "@suid/material/styles";
import Button from "@suid/material/Button";
import ArrowForwardIosIcon from "@suid/icons-material/ArrowForwardIos";
import { NavigateTo } from "../../utils/NaviagteTo";
import { useHistory } from "@gh0st-work/solid-js-router";

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

const ActionPage = () => {
  const history = useHistory();
  return (
    <div class="MainDivAP">
      <div class="RectangleAP">
        <ChooseService />
      </div>
      <div class="RightSideAP">
        <div>
          <span class="AreaTitleAP">AREA</span>
        </div>
        <div>
          <span class="AllTitleAP">Action service</span>
        </div>
        <div class="ButtonLinkAP">
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="primary"
              class="createButton"
              onClick={() => NavigateTo("/", history)}
            >
              <span>Manage my Areas</span>
              <ArrowForwardIosIcon />
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default ActionPage;
