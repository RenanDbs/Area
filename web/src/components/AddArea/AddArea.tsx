import { Component } from "solid-js";
import styles from "./AddArea.module.scss";
import ControlPointIcon from "@suid/icons-material/ControlPoint";
import { useHistory } from "@gh0st-work/solid-js-router";
import { NavigateTo } from "../../utils/NaviagteTo";

const AddArea = () => {
  const history = useHistory();
  return (
    <div class={styles.SquareAdd} onClick={() => NavigateTo("/action", history)}>
      <div class={styles.DivIcon}>
        <ControlPointIcon class={styles.Icon} sx={{ fontSize: "8rem" }} />
      </div>
      <div class={styles.DivIcon}>
        <span class={styles.TitleNew}>Add a new AREA</span>
      </div>
    </div>
  );
};

export default AddArea;
