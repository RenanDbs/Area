import type { Component } from "solid-js";
import Button from "@suid/material/Button";
import ArrowForwardIosIcon from "@suid/icons-material/ArrowForwardIos";
import { createTheme, ThemeProvider } from "@suid/material/styles";
import MyAreas from "../../components/MyAreas/MyAreas";
import "./HomePage.scss";
import { RequestApi } from "../../utils/RequestApi";
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

const HomePage = () => {
  document.body.style.backgroundColor = "#ffffff";
  const history = useHistory();
  async function LogOutRoute() {
    const response = await RequestApi("auth/logout", "post");
    if (response.status == 200) NavigateTo("/signin", history);
  }
  return (
    <div class="DivHomeHM">
      <div class="DivAddHM">
        <MyAreas />
      </div>
      <div class="SecondDivH">
        <div>
          <span class="AreaTitleH">AREA</span>
        </div>
        <div>
          <span class="AllTitleH">All AREAs</span>
        </div>
        <div class="ButtonLinkH">
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="primary"
              class="LinkButtonH"
              onClick={() => NavigateTo("/services", history)}
            >
              <span>Link your accounts</span>
              <ArrowForwardIosIcon />
            </Button>
          </ThemeProvider>
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="primary"
              class="CreateButtonH"
              onClick={() => LogOutRoute()}
            >
              <span>Sign out</span>
              <ArrowForwardIosIcon />
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
