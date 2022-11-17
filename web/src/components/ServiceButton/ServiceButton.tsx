import { $DEVCOMP, Component, createSignal } from "solid-js";
import styles from "./ServiceButton.module.scss";
import { createTheme, ThemeProvider } from "@suid/material/styles";
import Button from "@suid/material/Button";
import LogoCalendar from "../../svg/CalendarIcon";
import LogoGitHub from "../../svg/GitHubIcon";
import LogoSheet from "../../svg/SheetIcon";
import LogoGmail from "../../svg/Gmailcon";
import LogoDrive from "../../svg/DriveIcon";

const actionBTN = (TxtSize: string) => {
  return createTheme({
    typography: {
      button: {
        fontFamily: "Work sans, bold",
        textTransform: "none",
        fontSize: TxtSize,
        fontWeight: "regular",
      },
    },
    palette: {
      primary: {
        main: "#ffffff",
        contrastText: "#000000",
      },
      secondary: {
        main: "#094067",
        contrastText: "#ffffff",
      },
    },
    shape: {
      borderRadius: 5,
    },
  });
};

const CalendarBtn = (props) => {
  return (
    <div class={styles.ServiceButton}>
      <ThemeProvider theme={actionBTN(props.TxtSize)}>
        <Button
          variant="contained"
          color={props.Color}
          class={styles[props.ButtonStyle]}
        >
          <LogoCalendar height={props.LogoSize} />
          <span>Calendar</span>
        </Button>
      </ThemeProvider>
    </div>
  );
};

const DriveBtn = (props) => {
  return (
    <div class={styles.ServiceButton}>
      <ThemeProvider theme={actionBTN(props.TxtSize)}>
        <Button
          variant="contained"
          color={props.Color}
          class={styles[props.ButtonStyle]}
        >
          <LogoDrive height={props.LogoSize} />
          <span>Drive</span>
        </Button>
      </ThemeProvider>
    </div>
  );
};

const SheetBtn = (props) => {
  return (
    <div class={styles.ServiceButton}>
      <ThemeProvider theme={actionBTN(props.TxtSize)}>
        <Button
          variant="contained"
          color={props.Color}
          class={styles[props.ButtonStyle]}
        >
          <LogoSheet height={props.LogoSize} />
          <span>Sheet</span>
        </Button>
      </ThemeProvider>
    </div>
  );
};

const GmailBtn = (props) => {
  return (
    <div class={styles.ServiceButton}>
      <ThemeProvider theme={actionBTN(props.TxtSize)}>
        <Button
          variant="contained"
          color={props.Color}
          class={styles[props.ButtonStyle]}
        >
          <LogoGmail height={props.LogoSize} />
          <span>Gmail</span>
        </Button>
      </ThemeProvider>
    </div>
  );
};

const GitHubBtn = (props) => {
  return (
    <div class={styles.ServiceButton}>
      <ThemeProvider theme={actionBTN(props.TxtSize)}>
        <Button
          variant="contained"
          color={props.Color}
          class={styles[props.ButtonStyle]}
        >
          <LogoGitHub height={props.LogoSize} />
          <span>GitHub</span>
        </Button>
      </ThemeProvider>
    </div>
  );
};

const ServiceButton = (props) => {
  if (props.ButtonName == "google_calendar") {
    return (
      <CalendarBtn
        ButtonStyle={props.ButtonStyle}
        LogoSize={props.LogoSize}
        TxtSize={props.TxtSize}
        Color={props.Color}
      />
    );
  }
  if (props.ButtonName == "gmail") {
    return (
      <GmailBtn
        ButtonStyle={props.ButtonStyle}
        LogoSize={props.LogoSize}
        TxtSize={props.TxtSize}
        Color={props.Color}
      />
    );
  }
  if (props.ButtonName == "google_sheets") {
    return (
      <SheetBtn
        ButtonStyle={props.ButtonStyle}
        LogoSize={props.LogoSize}
        TxtSize={props.TxtSize}
        Color={props.Color}
      />
    );
  }
  if (props.ButtonName == "google_drive") {
    return (
      <DriveBtn
        ButtonStyle={props.ButtonStyle}
        LogoSize={props.LogoSize}
        TxtSize={props.TxtSize}
        Color={props.Color}
      />
    );
  }
  if (props.ButtonName == "github") {
    return (
      <GitHubBtn
        ButtonStyle={props.ButtonStyle}
        LogoSize={props.LogoSize}
        TxtSize={props.TxtSize}
        Color={props.Color}
      />
    );
  }
};

export default ServiceButton;
