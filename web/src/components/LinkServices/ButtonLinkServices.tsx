import { createSignal, createMemo, createEffect } from "solid-js";
import styles from "./LinkServices.module.scss";
import { createTheme, ThemeProvider } from "@suid/material/styles";
import LinkOffIcon from "@suid/icons-material/LinkOff";
import LinkIcon from "@suid/icons-material/Link";
import { RequestApi } from "../../utils/RequestApi";
import ServiceButton from "../ServiceButton/ServiceButton";
import { useHistory } from "@gh0st-work/solid-js-router";
import Button from "@suid/material/Button";
import axios from "axios";

const theme = createTheme({
  typography: {
    button: {
      fontFamily: "Work sans",
      textTransform: "none",
      fontSize: "1.25rem",
      fontWeight: "25rem",
    },
  },
  palette: {
    primary: {
      main: "#3DA9FC",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#FFFFFF",
      contrastText: "#094067",
    },
  },
  shape: {
    borderRadius: 5,
  },
});
const ButtonLinkServices = (props) => {
  const [valueLink, setLink] = createSignal<string>("");
  const history = useHistory();
  const [StateValue, setStateValue] = createSignal<boolean>();
  const navigateYt = createMemo((): void => {
    history.push(valueLink());
  });
  async function LinkServices(servicesName: string): Promise<boolean> {
    const response = await RequestApi("services/authorized", "get");
    if (response.data.authorizedServices.includes(servicesName)) {
      setStateValue(true);
      return true;
    } else {
      setStateValue(false);
      return false;
    }
  }

  async function auth(name: string) {
    if ((await LinkServices(name)) == false) {
      const response = await RequestApi("authorize/" + name, "post");
      if (response.status == 200) {
        setLink(response.data.authorizationURL);
        navigateYt();
      }
    } else if ((await LinkServices(name)) == true) {
      const response = await RequestApi("authorize/" + name, "delete");
      if (response.status == 200) {
        console.log("UnlinkOk");
        setStateValue(false);
      }
    }
  }

  createEffect(() => {
    LinkServices(props.name);
  });

  return (
    <div class={styles.DivEachButton}>
      <ServiceButton
        ButtonName={props.name}
        ButtonStyle="createBigButton"
        LogoSize="3rem"
        TxtSize="1.5rem"
        Color="primary"
      />
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="secondary"
          class={styles.UnlinkIcon}
          onClick={() => auth(props.name)}
        >
          {StateValue() ? <LinkOffIcon /> : <LinkIcon />}
        </Button>
      </ThemeProvider>
      {StateValue() ? (
        <span class={styles.TitleUnlink}>Unlink</span>
      ) : (
        <span class={styles.TitleUnlink}>Link</span>
      )}
    </div>
  );
};

export default ButtonLinkServices;
