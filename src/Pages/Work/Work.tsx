import WorkCard from "../../Components/WorkCard/WorkCard";
import "./Work.scss";
import { motion } from "framer-motion";

const Work = () => {
  return (
    <motion.div
      id="work-container"
      animate={{
        opacity: ["0", "100%"],
        transition: { duration: 2 },
      }}
    >
      <h1 className="personal-projects">My Personal Projects</h1>
      <WorkCard />
    </motion.div>
  );
};

export default Work;
