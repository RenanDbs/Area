import { Component, createSignal } from "solid-js";
import styles from "./EnterInfo.module.scss";
import Button from "@suid/material/Button";
import { createTheme, ThemeProvider } from "@suid/material/styles";
import TextField from "@suid/material/TextField";
import { useHistory } from "@gh0st-work/solid-js-router";
import { RequestApi } from "../../utils/RequestApi";
import { NavigateTo } from "../../utils/NaviagteTo";

const themeSignin = createTheme({
  typography: {
    button: {
      width: "29.095rem",
      height: "4.914rem",
      fontFamily: "Orbitron",
      textTransform: "none",
      fontSize: "1.75rem",
      fontWeight: "25rem",
    },
  },
  palette: {
    primary: {
      main: "#3DA9FC",
      contrastText: "#ffffff", //button text white instead of black
    },
  },
  shape: {
    borderRadius: 5,
  },
});

const themePassword = createTheme({
  typography: {
    button: {
      width: "17.5rem",
      height: "2.158rem",
      fontFamily: "Work sans",
      textTransform: "none",
      fontSize: "1.5rem",
      fontWeight: "300",
      lineHeight: "1.75rem",
      borderBottom: "0.063rem solid #5F6C7B",
    },
  },
  shape: {
    borderRadius: 0,
  },
  palette: {
    primary: {
      main: "#5F6C7B",
    },
  },
});

const EnterInfo = () => {
  const history = useHistory();
  const [valuePassword, setPassword] = createSignal<string>("");
  const [valueEmail, setEmail] = createSignal<string>("");
  const [BadRequest, setBadRequest] = createSignal<boolean>(false);
  async function LogInRoute() {
    const body = { email: valueEmail(), password: valuePassword() };
    try {
      const response = await RequestApi("auth/login", "post", body);
      if (response.status == 200) NavigateTo("/", history);
    } catch (err) {
      setBadRequest(true);
      setEmail("");
      setPassword("");
    }
  }
  return (
    <div class={styles.RectangleEnterInfo}>
      <div class={styles.ContainerWelcome}>
        <span class={styles.WelcomeTitle}>Welcome back</span>
      </div>
      <div>
        {BadRequest() ? (
          <span class={styles.TitleWrong}>Incorrect email or password</span>
        ) : null}
      </div>
      <div>
        <TextField
          id="emailLogin"
          value={valueEmail()}
          label="Enter your e-mail"
          variant="standard"
          class={styles.ToolsTextField}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="PasswordLogin"
          value={valuePassword()}
          label="Password"
          variant="standard"
          class={styles.ToolsTextField}
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div class={styles.ContainerLogin}>
        <ThemeProvider theme={themeSignin}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => LogInRoute()}
          >
            <span>Sign in</span>
          </Button>
        </ThemeProvider>
      </div>
      {/* <div>
        <ThemeProvider theme={themePassword}>
          <Button>I forgot my password</Button>
        </ThemeProvider>
      </div> */}
    </div>
  );
};

export default EnterInfo;
