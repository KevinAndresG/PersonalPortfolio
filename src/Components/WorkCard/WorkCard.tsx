import "./WorkCard.scss";
const WorkCard = ({ proyect }: any) => {
  return (
    <div id="work-card-container">
      <h3 className="work-title">{proyect.title}</h3>
      <div
        className="img-container"
        onClick={() => {
          window.open(proyect.url, "_blank");
        }}
      >
        <img className="work-img" src={proyect.img} alt="" />
      </div>
    </div>
  );
};

export default WorkCard;
