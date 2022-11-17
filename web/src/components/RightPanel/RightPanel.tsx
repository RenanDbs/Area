import { Component, createSignal, createMemo, createEffect } from "solid-js";
import styles from "./RightPanel.module.scss";
import Button from "@suid/material/Button";
import ArrowForwardIosIcon from "@suid/icons-material/ArrowForwardIos";
import { createTheme, ThemeProvider } from "@suid/material/styles";
import { useHistory } from "@gh0st-work/solid-js-router";
import AndroidIcon from "@suid/icons-material/Android";
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
    secondary: {
      main: "#FFFFFF",
    },
  },
  shape: {
    borderRadius: 5,
  },
});

const account = createTheme({
  typography: {
    button: {
      width: "20.125rem",
      height: "2.25rem",
      fontFamily: "Work sans",
      textTransform: "none",
      fontSize: "1.25rem",
      fontWeight: "300",
      lineHeight: "1.438rem",
    },
  },
  palette: {
    primary: {
      main: "#5F6C7B",
    },
  },
});
const RightPanel = () => {
  const history = useHistory();
  const navigateAPK = () => {
    window.location.replace("http://localhost:8081/client.apk");
  };
  return (
    <div class={styles.FirstDiv}>
      <div>
        <span class={styles.areaTitle}>Area</span>
      </div>
      <div class={styles.containerLogin}>
        <span class={styles.loginTitle}>Log in</span>
      </div>
      <div class={styles.secondDiv}>
        <div class={styles.accountButton}>
          <ThemeProvider theme={account}>
            <Button>Don't have an account yet?</Button>
          </ThemeProvider>
        </div>
        <div class={styles.containerCreate}>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="primary"
              class="createButton"
              onClick={() => NavigateTo("/signup", history)}
            >
              <span>Create an account</span>
              <ArrowForwardIosIcon />
            </Button>
          </ThemeProvider>
        </div>
        <div class={styles.googleTitle}>
          <script
            src="https://accounts.google.com/gsi/client"
            async
            defer
          ></script>
          <div
            id="g_id_onload"
            data-client_id="722073137151-joadcq1m38ej627pbu7sc4ki8camd6n9.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-login_uri="http://localhost:8080/v2/auth/google"
            data-auto_select="true"
            data-itp_support="true"
          />
          <div
            class="g_id_signin"
            data-type="standard"
            data-shape="rectangular"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
            data-width="350"
            data-locale="en-US"
            data-logo_alignment="left"
          />
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="secondary"
              class={styles.APKButton}
              onClick={navigateAPK}
            >
              <span class={styles.TitleAPK}>Download our App </span>
              <AndroidIcon />
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
