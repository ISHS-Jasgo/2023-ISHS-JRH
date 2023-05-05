import { forwardRef } from "react";
import styles from "./stylesheets/Canvas.module.css";

const Canvas = forwardRef((props, ref) => {
  return <canvas ref={ref} className={styles.canvas}></canvas>;
});

export default Canvas;
