import { forwardRef } from "react";
import styles from "./Canvas.module.css";

const Canvas = forwardRef((props, ref) => {
  return (
    <div>
      <canvas ref={ref} className={styles.canvas}></canvas>
    </div>
  );
});

export default Canvas;
