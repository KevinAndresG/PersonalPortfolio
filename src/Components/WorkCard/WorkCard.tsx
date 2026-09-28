import "./WorkCard.scss";
import CincuentaP from "../../assets/CincuentaProjects.png";
import PetAppointments from "../../assets/PetAppointmen.png";
import IsiGestPOS from "../../assets/IsiGestPOS.png";
import Paac from "../../assets/Paac.png";
import Showly from "../../assets/Showly.png";
import GoldenNumbers from "../../assets/GoldenNumbers.png";
import TypeGenerator from "../../assets/TypeGenerator.png";
import ModerTask from "../../assets/ModernTask.png";
import { WorkInfo } from "../../models/LogicItems/Workinfo";
import { FormattedMessage } from "react-intl";
import { useRef, useState } from "react";

const worksToShowAll: WorkInfo[] = [
  {
    title: "Modern Task Manager",
    img: ModerTask,
    url: "https://modern-task-app-prueba.netlify.app/",
    techs: ["HTML", "CSS", "JavaScript", "TypeScript", "Angular"],
  },
  {
    title: "IsiGest POS",
    img: IsiGestPOS,
    url: "https://isigest.netlify.app/",
    techs: ["HTML", "Tailwind", "TypeScript", "NextJS"],
  },
  {
    title: "Showly",
    img: Showly,
    url: "https://showly-prop.netlify.app",
    techs: ["HTML", "Tailwind", "TypeScript", "NextJS"],
  },
  {
    title: "Cifras Doradas",
    img: GoldenNumbers,
    url: "https://cifrasdoradas.com/",
    techs: ["HTML", "Tailwind", "TypeScript", "NextJS"],
  },
  {
    title: "Interface/Model Generator",
    img: TypeGenerator,
    url: "https://kevin-garcia-typegenerator.netlify.app/",
    techs: ["HTML", "CSS", "JavaScript", "TypeScript", "React"],
  },
  {
    title: "50 Projects 50 Days",
    img: CincuentaP,
    url: "https://kevin-garcia-50projects.netlify.app/home/ExpandingCards",
    techs: ["HTML", "CSS", "JavaScript", "TypeScript", "Angular"],
  },
  {
    title: "Paac",
    img: Paac,
    url: "https://paacguardian.lovable.app/",
    techs: ["HTML", "Tailwind", "TypeScript", "React", "NextJS"],
  },
  {
    title: "Pet Appointments",
    img: PetAppointments,
    url: "https://kevin-garcia-pet-appointments.netlify.app",
    techs: ["HTML", "CSS", "JavaScript", "TypeScript", "React"],
  },
];

interface TiltState {
  rotX: number;
  rotY: number;
  shine: { x: number; y: number };
}

const WorkItem = ({ item }: { item: WorkInfo }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({
    rotX: 0,
    rotY: 0,
    shine: { x: 50, y: 50 },
  });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -10;
    const rotY = ((x - cx) / cx) * 10;
    setTilt({
      rotX,
      rotY,
      shine: { x: (x / rect.width) * 100, y: (y / rect.height) * 100 },
    });
  };

  const onMouseLeave = () => {
    setTilt({ rotX: 0, rotY: 0, shine: { x: 50, y: 50 } });
    setHovered(false);
  };

  return (
    <div
      onClick={() => window.open(item.url)}
      ref={cardRef}
      className={`work-item ${hovered ? "hovered" : ""}`}
      style={{
        transform: `perspective(800px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg)`,
        backgroundImage: `url(${item.img})`,
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="shine"
        style={{
          background: `radial-gradient(circle at ${tilt.shine.x}% ${tilt.shine.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
        }}
      />
      <div className="card-overlay" />

      <div className="card-body">
        <h3 className="card-title">{item.title}</h3>
        <div className="card-techs">
          {item.techs
            .sort((a, b) => b.length - a.length)
            .map((tech) => (
              <span key={tech} className="tech-badge">
                {tech}
              </span>
            ))}
        </div>
        <button className="card-cta" onClick={() => window.open(item.url)}>
          <FormattedMessage id="work.enter.button" />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            width="14"
            height="14"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const WorkCard = () => (
  <div id="work-card-container">
    {worksToShowAll.map((item) => (
      <WorkItem key={item.url} item={item} />
    ))}
  </div>
);

export default WorkCard;
