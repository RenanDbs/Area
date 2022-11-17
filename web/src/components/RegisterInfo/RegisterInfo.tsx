import * as Solid from "solid-js";
import styles from "./RegisterInfo.module.scss";
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

function RegisterInfo() {
  const history = useHistory();
  return (
    <div class={styles.firstDiv}>
      <div>
        <span class={styles.areaTitle}>Area</span>
      </div>
      <div class={styles.containerLogin}>
        <span class={styles.loginTitle}>Register</span>
      </div>
      <div class={styles.secondDiv}>
        <div class={styles.accountButton}>
          <ThemeProvider theme={account}>
            <Button>Already have an account?</Button>
          </ThemeProvider>
        </div>
        <div class={styles.containerCreate}>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="primary"
              class={styles.createButton}
              onClick={() => NavigateTo("/signin", history)}
            >
              <span>Log in</span>
              <ArrowForwardIosIcon />
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default RegisterInfo;
