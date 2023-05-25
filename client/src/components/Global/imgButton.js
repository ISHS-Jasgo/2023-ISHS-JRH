import setting from "../../images/Setting.png";
import close from "../../images/Close.png";

function ImgButton({ onClick, classname, imgclassname, imgSource }) {
  let imgSourceObject = imgSource;
  switch (imgSource) {
    case "setting":
      imgSourceObject = setting;
      break;
    case "close":
      imgSourceObject = close;
      break;
  }
  return (
    <button onClick={onClick} className={classname}>
      <img src={imgSourceObject} className={imgclassname} />
    </button>
  );
}

export default ImgButton;
