import WorkCard from "../../Components/WorkCard/WorkCard";
import "./Work.scss";

const Work = () => {
  const worksToShow = [
    "50 Projects",
    "Formulario Mascotas",
    "Space Travel",
    "Travel Agency",
  ];
  return (
    <div id="work-container">
      <h1>My Portfolio Projects</h1>
      {worksToShow.map((proyect) => (
        <h5 className="project-item">
          <WorkCard proyect={proyect} />
        </h5>
      ))}
    </div>
  );
};

export default Work;
