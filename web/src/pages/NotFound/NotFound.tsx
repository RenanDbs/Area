import { Component } from "solid-js";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  document.body.style.backgroundColor = "#D8EEFE";
  return (
    <div class={styles.MainNF}>
      <div class={styles.MidTitleNF}>
        <span class={styles.AreaTitleNF}>AREA</span>
      </div>
      <div class={styles.MidTitleNF}>
        <span class={styles.NotFoundTitleNF}>404</span>
        <div class={styles.LineSeparationNF} />
        <span class={styles.NotFoundTitleNF}>Not Found</span>
      </div>
    </div>
  );
};

export default NotFound;
