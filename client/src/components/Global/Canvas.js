import { forwardRef } from "react";
import styles from "./stylesheets/Canvas.module.css";

const Canvas = forwardRef((props, ref) => {
  return (
    <canvas
      ref={ref}
      className={styles.canvas}
      width="720"
      height="960"
    ></canvas>
  );
});

export default Canvas;
