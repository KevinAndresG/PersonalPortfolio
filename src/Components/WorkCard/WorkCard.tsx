import "./WorkCard.scss";
import CincuentaP from "../../assets/CincuentaProjects.png";
import PetAppointments from "../../assets/PetAppointmen.png";
import IsiGestPOS from "../../assets/IsiGestPOS.png";
import DigiCard from "../../assets/DigiCard.png";
import Paac from "../../assets/Paac.png";
import Showly from "../../assets/Showly.png";
import GoldenNumbers from "../../assets/GoldenNumbers.png";
import TypeGenerator from "../../assets/TypeGenerator.png";
import ModerTask from "../../assets/ModernTask.png";
import { WorkInfo } from "../../models/LogicItems/Workinfo";
import { useRef, useState } from "react";

const works: WorkInfo[] = [
  {
    title: "IsiGest POS",
    img: IsiGestPOS,
    url: "https://isigest.netlify.app/",
    techs: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    title: "Digi Card",
    img: DigiCard,
    url: "https://digi-isi-card.netlify.app/",
    techs: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    title: "Modern Task Manager",
    img: ModerTask,
    url: "https://modern-task-app-prueba.netlify.app/",
    techs: ["Angular", "TypeScript", "CSS"],
  },
  {
    title: "Showly",
    img: Showly,
    url: "https://showly-prop.netlify.app",
    techs: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    title: "Cifras Doradas",
    img: GoldenNumbers,
    url: "https://cifrasdoradas.com/",
    techs: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    title: "Interface/Model Generator",
    img: TypeGenerator,
    url: "https://kevin-garcia-typegenerator.netlify.app/",
    techs: ["React", "TypeScript", "CSS"],
  },
  {
    title: "50 Projects 50 Days",
    img: CincuentaP,
    url: "https://kevin-garcia-50projects.netlify.app/home/ExpandingCards",
    techs: ["Angular", "TypeScript", "CSS"],
  },
  {
    title: "Paac",
    img: Paac,
    url: "https://paacguardian.lovable.app/",
    techs: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    title: "Pet Appointments",
    img: PetAppointments,
    url: "https://kevin-garcia-pet-appointments.netlify.app",
    techs: ["React", "TypeScript", "CSS"],
  },
];

const LENS_W = 400;

/** A typographic index; the screenshot surfaces inside a drop beside the pointer. */
const WorkCard = () => {
  const lensRef = useRef<HTMLDivElement>(null);
  const [img, setImg] = useState(works[0].img);
  const [on, setOn] = useState(false);

  const place = (x: number, y: number) => {
    const left = x + 32 + LENS_W > window.innerWidth ? x - 32 - LENS_W : x + 32;
    lensRef.current?.style.setProperty("--x", `${left}px`);
    lensRef.current?.style.setProperty("--y", `${y}px`);
  };
  const show = (w: WorkInfo) => {
    setImg(w.img);
    setOn(true);
  };

  return (
    <div
      className="projects"
      onPointerMove={(e) => place(e.clientX, e.clientY)}
      onPointerLeave={() => setOn(false)}
    >
      <ul>
        {works.map((w) => (
          <li key={w.url} className="rise">
            <a
              href={w.url}
              target="_blank"
              rel="noreferrer"
              onPointerEnter={() => show(w)}
              onFocus={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                place(r.left + r.width * 0.55, r.top + r.height / 2);
                show(w);
              }}
              onBlur={() => setOn(false)}
            >
              <img className="project-thumb" src={w.img} alt="" loading="lazy" />
              <span className="project-title">{w.title}</span>
              <span className="project-techs">{w.techs.join(", ")}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          </li>
        ))}
      </ul>

      <div ref={lensRef} className={`project-lens ${on ? "on" : ""}`} aria-hidden="true">
        <img src={img} alt="" />
      </div>
    </div>
  );
};

export default WorkCard;
