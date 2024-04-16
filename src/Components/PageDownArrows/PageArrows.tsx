import "./PageArrows.scss";
import arrow from "../../assets/icons/Triangle.svg";

const PageArrows = () => {
  return (
    <div className="arrows">
      <img className="arrow" src={arrow} alt="down arrow" />
      <img className="arrow" src={arrow} alt="down arrow" />
      <img className="arrow" src={arrow} alt="down arrow" />
    </div>
  );
};

export default PageArrows;
