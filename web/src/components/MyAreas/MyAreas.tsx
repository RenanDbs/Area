import { Component, createEffect, createSignal } from "solid-js";
import styles from "./MyAreas.module.scss";
import { RequestApi } from "../../utils/RequestApi";
import { NavigateTo } from "../../utils/NaviagteTo";
import { useHistory } from "@gh0st-work/solid-js-router";
import { createTheme, ThemeProvider } from "@suid/material/styles";
import Button from "@suid/material/Button";
import AddArea from "../../components/AddArea/AddArea";
import Popover from "@suid/material/Popover";
import Grid from "@suid/material/Grid";
import DeleteIcon from "@suid/icons-material/Delete";
import ArrowBackIosIcon from "@suid/icons-material/ArrowBackIos";
import ServiceButton from "../ServiceButton/ServiceButton";
import Scrollbars from "solid-custom-scrollbars";

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
      main: "#3DA9FC",
      contrastText: "#ffffff",
    },
  },
  shape: {
    borderRadius: 5,
  },
});

interface Area {
  action: {
    service: string;
    name: string;
  };
  reaction: {
    service: string;
    name: string;
  };
  _id: string;
}

const MyAreas = () => {
  /////////////////Popover Parameters ////////////////////
  const [anchorEl, setAnchorEl] = createSignal<HTMLButtonElement | null>(null);
  const openPopover = (
    event: MouseEvent & { currentTarget: HTMLButtonElement }
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const closePopover = () => {
    setAnchorEl(null);
  };
  const open = () => Boolean(anchorEl());
  //////////////////////////////////////////////////////////////
  ///////////////////////////Setup /////////////////////////////
  const history = useHistory();
  const [AreaValue, setAreaValue] = createSignal<[Area]>();
  async function getArea() {
    try {
      const response = await RequestApi("area", "get");
      setAreaValue(response.data.listArea);
    } catch (err) {
      if (err.response.status == 401) NavigateTo("/signin", history);
    }
  }
  async function deleteArea(id: string) {
    try {
      const response = await RequestApi("area/" + id, "delete");
      if (response.status == 200) {
        closePopover();
        getArea();
      }
    } catch (err) {
      console.log(err);
    }
  }
  createEffect(() => {
    getArea();
  });
  /////////////////////////////////////////////////////////////
  return (
    <div>
      <Grid container rowSpacing={6}>
        <Grid item xs={5}>
          <div>
            <AddArea />
          </div>
        </Grid>
        {AreaValue()?.map((area) => (
          <Grid item xs={5}>
            <div class={styles.SquareArea}>
              <div>
                <div class={styles.DivStatus}>
                  <span class={styles.Title}>Status</span>
                  <div>
                    <span class={styles.GreenDot}></span>
                    <span class={styles.TitleServices}>running</span>
                  </div>
                </div>
                <div class={styles.DivActReact}>
                  <div class={styles.DivAction}>
                    <span class={styles.Title}>Action</span>
                    <div class={styles.ButtonService}>
                      <ServiceButton
                        ButtonName={area.action.service}
                        ButtonStyle="createSmallButton"
                        LogoSize="1.2rem"
                        TxtSize="1rem"
                        Color="primary"
                      />
                    </div>
                    <div>
                      <span class={styles.TitleServices}>
                        {area.action.name.replaceAll("_", " ")}
                      </span>
                    </div>
                  </div>
                  <div class={styles.LineArea} />
                  <div class={styles.DivReaction}>
                    <span class={styles.Title}>Reaction</span>
                    <div class={styles.ButtonService}>
                      <ServiceButton
                        ButtonName={area.reaction.service}
                        ButtonStyle="createSmallButton"
                        LogoSize="1.5rem"
                        TxtSize="1rem"
                        Color="primary"
                      />
                    </div>
                    <div>
                      <span class={styles.TitleServices}>
                        {area.reaction.name.replaceAll("_", " ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class={styles.DivDelete}>
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    color="primary"
                    class="CreateButtonAM"
                    onClick={openPopover}
                  >
                    <DeleteIcon />
                  </Button>
                </ThemeProvider>
                <Popover
                  open={open()}
                  anchorEl={anchorEl()}
                  onClose={closePopover}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                >
                  <div class={styles.SquareDeleteArea}>
                    <div class={styles.DivReally}>
                      <span class={styles.TitleConf}>Really?</span>
                    </div>
                    <div class={styles.Icon}>
                      <ThemeProvider theme={theme}>
                        <Button
                          variant="contained"
                          color="secondary"
                          class="CreateButtonAM"
                          onClick={() => closePopover()}
                        >
                          <ArrowBackIosIcon />
                        </Button>
                      </ThemeProvider>
                      <ThemeProvider theme={theme}>
                        <Button
                          variant="contained"
                          color="primary"
                          class="CreateButtonAM"
                          onClick={() => deleteArea(area._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </ThemeProvider>
                    </div>
                  </div>
                </Popover>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyAreas;
