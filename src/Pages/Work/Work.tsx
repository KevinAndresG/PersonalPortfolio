import WorkCard from "../../Components/WorkCard/WorkCard";
import "./Work.scss";
import CincuentaP from "../../assets/ProjectsAssets/CincuentaProjects.png";
import PetAppointments from "../../assets/ProjectsAssets/PetAppointmen.png";
import SpaceTravel from "../../assets/ProjectsAssets/SpaceTravel.png";
import TravelAgency from "../../assets/ProjectsAssets/TravelAgency.png";

const Work = () => {
  const worksToShow = [
    {
      title: "50 Projects In 50 Days",
      img: CincuentaP,
      url: "https://kevin-garcia-50projects.netlify.app/home/ExpandingCards",
    },
    {
      title: "Pet Appointments",
      img: PetAppointments,
      url: "https://kevin-garcia-pet-appointments.netlify.app",
    },
    {
      title: "Space Travel",
      img: SpaceTravel,
      url: "https://kevin-garcia-space-travel.netlify.app",
    },
    {
      title: "Travel Agency",
      img: TravelAgency,
      url: "https://kevin-garcia-travel-agency.netlify.app",
    },
  ];
  return (
    <div id="work-container">
      <h1 className="personal-projects">My Personal Projects</h1>
      {worksToShow.map((proyect) => (
        <div key={proyect.url} className="father-card-container">
          <WorkCard proyect={proyect} />
        </div>
      ))}
    </div>
  );
};

export default Work;
