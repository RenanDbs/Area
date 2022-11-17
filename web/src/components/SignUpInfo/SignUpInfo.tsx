import { Component, createSignal } from "solid-js";
import styles from "./SignUpInfo.module.scss";
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

const SignUpInfo = () => {
  const [valuePassword, setPassword] = createSignal<string>("");
  const [valueEmail, setEmail] = createSignal<string>("");
  const [invalidValue, setInvalidValue] = createSignal<boolean>(false);
  const history = useHistory();
  async function registerRoute() {
    const body = { email: valueEmail(), password: valuePassword() };
    try {
      const response = await RequestApi("auth/register", "post", body);
      if (response.status == 201) NavigateTo("/signin", history);
    } catch (err) {
      setInvalidValue(true);
      setEmail("");
      setPassword("");
    }
  }
  return (
    <div class={styles.RectangleEnterInfo}>
      <div class={styles.ContainerWelcome}>
        <span class={styles.WelcomeTitle}>Sign Up</span>
      </div>
      <div>
        {invalidValue() ? (
          <span class={styles.TitleWrong}>Incorrect email / Already Register</span>
        ) : null}
      </div>
      <span class={styles.TitleGood}>Password format: +8 char / digit / special char.</span>
      <div>
        <TextField
          id="email"
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
          id="password"
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
            onClick={() => registerRoute()}
          >
            <span>Sign up</span>
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default SignUpInfo;
