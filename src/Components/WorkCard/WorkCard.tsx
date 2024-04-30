import "./WorkCard.scss";
import CincuentaP from "../../assets/CincuentaProjects.png";
import PetAppointments from "../../assets/PetAppointmen.png";
import SpaceTravel from "../../assets/SpaceTravel.png";
import TravelAgency from "../../assets/TravelAgency.png";
import CincuentaP2 from "../../assets/CincuentaProjects2.png";
import PetAppointments2 from "../../assets/PetAppointmen2.png";
import SpaceTravel2 from "../../assets/SpaceTravel2.png";
import TravelAgency2 from "../../assets/TravelAgency2.png";

const WorkCard = () => {
  const worksToShow: any = [
    {
      title: "50 Projects",
      img: CincuentaP,
      url: "https://kevin-garcia-50projects.netlify.app/home/ExpandingCards",
    },
    {
      title: "50 Projects",
      img: CincuentaP2,
      url: "https://kevin-garcia-50projects.netlify.app/home/DrinkWater",
    },
    {
      title: "Pet Appointments",
      img: PetAppointments,
      url: "https://kevin-garcia-pet-appointments.netlify.app",
    },
    {
      title: "Pet Appointments",
      img: PetAppointments2,
      url: "https://kevin-garcia-pet-appointments.netlify.app",
    },
    {
      title: "Space Travel",
      img: SpaceTravel,
      url: "https://kevin-garcia-space-travel.netlify.app",
    },
    {
      title: "Space Travel",
      img: SpaceTravel2,
      url: "https://kevin-garcia-space-travel.netlify.app",
    },
    {
      title: "Travel Agency",
      img: TravelAgency,
      url: "https://kevin-garcia-travel-agency.netlify.app",
    },
    {
      title: "Travel Agency",
      img: TravelAgency2,
      url: "https://kevin-garcia-travel-agency.netlify.app",
    },
  ];
  return (
    <div id="work-card-container">
      <div className="wrapper">
        <div className="items">
          {worksToShow.map((item: any) => (
            <div
              className="item"
              key={item.img}
              tabIndex={0}
              style={{ backgroundImage: `url(${item.img})` }}
            >
              <p className="project-title">{item.title}</p>
              <button
                className="project-enter"
                onClick={() => {
                  window.open(item.url, "_blank");
                }}
              >
                Click To Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
