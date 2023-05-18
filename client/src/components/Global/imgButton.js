import setting from "../../images/Setting.png";

function ImgButton({ onClick, classname, imgSource }) {
  let imgSourceObject = imgSource;
  switch (imgSource) {
    case "setting":
      imgSourceObject = setting;
      break;
  }
  return (
    <button onClick={onClick} className={classname}>
      <img src={imgSourceObject} width="50px" height="50px" />
    </button>
  );
}

export default ImgButton;
