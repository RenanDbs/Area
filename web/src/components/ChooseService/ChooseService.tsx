import { createEffect, createSignal } from "solid-js";
import styles from "./ChooseService.module.scss";
import { createTheme, ThemeProvider } from "@suid/material/styles";
import Button from "@suid/material/Button";
import ArrowForwardIosIcon from "@suid/icons-material/ArrowForwardIos";
import ServiceButton from "../ServiceButton/ServiceButton";
import { useHistory } from "@gh0st-work/solid-js-router";
import { RequestApi } from "../../utils/RequestApi";
import { NavigateTo } from "../../utils/NaviagteTo";
import TextField from "@suid/material/TextField";

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

const actionBTN = createTheme({
  typography: {
    button: {
      fontFamily: "Work sans",
      textTransform: "none",
      fontSize: "1.2rem",
      fontWeight: "25rem",
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

interface Parameters {
  name: string;
  type: string;
}

interface Actions {
  _id: string;
  description: string;
  name: string;
  parameters: [Parameters];
}

interface Reactions {
  _id: string;
  description: string;
  name: string;
  parameters: [Parameters];
}

interface Services {
  _id: string;
  name: string;
  actions: [Actions];
  reactions: [Reactions];
}

const ChooseService = () => {
  const history = useHistory();
  const [authValue, setAuthValue] = createSignal<[]>();
  const [servicesValue, setServicesValue] = createSignal<[]>();
  const [actions, setActions] = createSignal<[Actions]>();
  const [reactions, setReactions] = createSignal<[Reactions]>();
  const [idAction, setIdAction] = createSignal<string>();
  const [idReaction, setIdReaction] = createSignal<string>();
  const [selectAction, setselectAction] = createSignal<string>();
  const [selectReaction, setselectReaction] = createSignal<string>();
  const [resSelectAction, setResSelectAction] = createSignal<string>();
  const [resSelectReaction, setResSelectReaction] = createSignal<string>();
  const [error, setError] = createSignal<boolean>(false);
  const valueParamAction: any = [];
  const valueParamReaction: any = [];

  async function AddArea() {
    const body = {
      action: {
        _id: idAction(),
        parameters: valueParamAction,
      },
      reaction: {
        _id: idReaction(),
        parameters: valueParamReaction,
      },
    };
    console.log(body);
    try {
      const response = await RequestApi("area", "post", body);
      if (response.status == 200) NavigateTo("/", history);
    } catch (err) {
      setError(true);
    }
  }

  createEffect(async () => {
    setAuthValue(
      (await RequestApi("services/authorized", "get")).data.authorizedServices
    );
    setServicesValue((await RequestApi("services", "get")).data.services);
  }, []);

  return (
    <div>
      <div class={styles.Rectangle}>
        <div class={styles.Title}>
          <div>
            <span class={styles.TitleChooseService}>Choose action service</span>
          </div>
          <div>
            <span class={styles.TitleTrigger}>
              This service will trigger the area
            </span>
          </div>
        </div>
        <div class={styles.DivAction}>
          <div>
            {authValue()?.map((serviceAuth) => {
              const nameServiceAuth: Services = servicesValue()?.find(
                ({ name }) => name === serviceAuth
              );
              function setActionMap() {
                setActions(nameServiceAuth?.actions);
                setselectAction(nameServiceAuth?.name);
              }
              return (
                <div class={styles.WipService}>
                  <div onClick={() => setActionMap()}>
                    <ServiceButton
                      ButtonName={nameServiceAuth?.name}
                      ButtonStyle="createBigButton"
                      LogoSize="3rem"
                      TxtSize="1.5rem"
                      Color={
                        selectAction() == nameServiceAuth?.name
                          ? "secondary"
                          : "primary"
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div class={styles.DivLine}>
            <div class={styles.Line} />
          </div>
          <div class={styles.LeftPanel}>
            <div>
              <span class={styles.TitleAction}>Actions</span>
            </div>
            <div>
              <span class={styles.TitlePossibleAction}>
                Choose a service to display possible actions
              </span>
            </div>
            {actions()?.map((action) => (
              <div class={styles.WipService}>
                <ThemeProvider theme={actionBTN}>
                  <Button
                    variant="contained"
                    color={
                      resSelectAction() == action?.description
                        ? "secondary"
                        : "primary"
                    }
                    class={styles.ButtonActionCS}
                    onClick={() => {
                      setResSelectAction(action?.description);
                      setIdAction(action?._id);
                    }}
                  >
                    <div>
                      <span>{action?.description}</span>
                      <div>
                        {resSelectAction() == action?.description
                          ? action?.parameters?.map((res, index) => {
                              return (
                                <TextField
                                  class={styles.Test}
                                  id="outlined-basic"
                                  label={res.name}
                                  onChange={(e) => {
                                    const buffer = [];
                                    buffer[res.name] = e.target.value;
                                    valueParamAction[index] = buffer;
                                  }}
                                  variant="outlined"
                                />
                              );
                            })
                          : null}
                      </div>
                    </div>
                  </Button>
                </ThemeProvider>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div class={styles.Rectangle}>
        <div class={styles.Title}>
          <div>
            <span class={styles.TitleChooseService}>
              Choose reaction service
            </span>
          </div>
          <div>
            <span class={styles.TitleTrigger}>
              This service will trigger the area
            </span>
          </div>
        </div>
        <div class={styles.DivAction}>
          <div>
            {authValue()?.map((serviceAuth) => {
              const nameServiceAuth: Services = servicesValue()?.find(
                ({ name }) => name === serviceAuth
              );
              function setReactionMap() {
                setReactions(nameServiceAuth?.reactions);
                setselectReaction(nameServiceAuth?.name);
              }
              return (
                <div class={styles.WipService}>
                  <div onClick={() => setReactionMap()}>
                    <ServiceButton
                      ButtonName={nameServiceAuth?.name}
                      ButtonStyle="createBigButton"
                      LogoSize="3rem"
                      TxtSize="1.5rem"
                      Color={
                        selectReaction() == nameServiceAuth?.name
                          ? "secondary"
                          : "primary"
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div class={styles.DivLine}>
            <div class={styles.Line} />
          </div>
          <div class={styles.LeftPanel}>
            <div>
              <span class={styles.TitleAction}>Reactions</span>
            </div>
            <div>
              <span class={styles.TitlePossibleAction}>
                Choose a service to display possible reaction
              </span>
            </div>
            {reactions()?.map((reaction) => (
              <div class={styles.WipService}>
                <ThemeProvider theme={actionBTN}>
                  <Button
                    variant="contained"
                    color={
                      resSelectReaction() == reaction?.description
                        ? "secondary"
                        : "primary"
                    }
                    class={styles.ButtonActionCS}
                    onClick={() => {
                      setResSelectReaction(reaction?.description);
                      setIdReaction(reaction?._id);
                    }}
                  >
                    <span>{reaction?.description}</span>
                    <div>
                      {resSelectReaction() == reaction?.description
                        ? reaction?.parameters?.map((res, index) => {
                            return (
                              <TextField
                                class={styles.Test}
                                id="outlined-basic"
                                label={res.name}
                                onChange={(e) => {
                                  const buffer = [];
                                  buffer[res.name] = e.target.value;
                                  valueParamReaction[index] = buffer;
                                }}
                                variant="outlined"
                              />
                            );
                          })
                        : null}
                    </div>
                  </Button>
                </ThemeProvider>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div class={styles.WipService}>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="primary"
            class={styles.CreateButton}
            onClick={() => AddArea()}
          >
            <span>Add AREA</span>
            <ArrowForwardIosIcon />
          </Button>
        </ThemeProvider>
        {error() && (
          <span class={styles.ErrorTitle}>
            Select one action and one reaction
          </span>
        )}
      </div>
    </div>
  );
};

export default ChooseService;
