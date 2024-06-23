import "./WorkCard.scss";
import CincuentaP from "../../assets/CincuentaProjects.png";
import PetAppointments from "../../assets/PetAppointmen.png";
import SpaceTravel from "../../assets/SpaceTravel.png";
import TravelAgency from "../../assets/TravelAgency.png";
import TypeGenerator from "../../assets/TypeGenerator.png";
import ImageMatch from "../../assets/ImageMatch.png";
import { WorkInfo } from "../../models/LogicItems/Workinfo";
import { FormattedMessage } from "react-intl";

const worksToShowAll: WorkInfo[] = [
  {
    title: "50 Projects 50 Days",
    img: CincuentaP,
    url: "https://kevin-garcia-50projects.netlify.app/home/ExpandingCards",
    techs: ["HTML", "CSS", "JavaScript", "TypeScript", "Angular"],
  },

  {
    title: "Pet Appointments",
    img: PetAppointments,
    url: "https://kevin-garcia-pet-appointments.netlify.app",
    techs: ["HTML", "CSS", "JavaScript", "TypeScript", "React"],
  },

  {
    title: "Space Travel",
    img: SpaceTravel,
    url: "https://kevin-garcia-space-travel.netlify.app",
    techs: ["HTML", "CSS", "JavaScript", "TypeScript", "React"],
  },

  {
    title: "Travel Agency",
    img: TravelAgency,
    url: "https://kevin-garcia-travel-agency.netlify.app",
    techs: ["HTML", "CSS", "JavaScript", "TypeScript", "React"],
  },
  {
    title: "Interface/Model Generator",
    img: TypeGenerator,
    url: "https://kevin-garcia-typegenerator.netlify.app/",
    techs: ["HTML", "CSS", "JavaScript", "TypeScript", "React"],
  },
  {
    title: "Image Matching",
    img: ImageMatch,
    url: "https://playgreen-sports-kevin.netlify.app/home",
    techs: ["HTML", "Syled Components", "JavaScript", "TypeScript", "React"],
  },
];

const WorkCard = () => {
  return (
    <div id="work-card-container">
      {worksToShowAll.map((item) => (
        <div
          className="item"
          tabIndex={0}
          style={{ backgroundImage: `url(${item.img})` }}
        >
          <p className="project-title">{item.title}</p>
          <button
            className="project-button"
            onClick={() => window.open(item.url)}
          >
            <FormattedMessage id="work.enter.button" />
          </button>
          <section className="project-detail">
            {item.techs
              .sort((a: any, b: any) => b.length - a.length)
              .map((tech: any) => (
                <p className="tech">{tech}</p>
              ))}
          </section>
        </div>
      ))}
    </div>
  );
};

export default WorkCard;
