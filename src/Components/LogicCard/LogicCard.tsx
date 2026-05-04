import { LogicItem } from "../../models/LogicItems/LogicItems";
import "./LogicCard.scss";

const STEP_COLORS = ["#00d4ff", "#8b5cf6", "#10b981", "#f59e0b"];
const STEP_NUMS   = ["01", "02", "03", "04"];

const LogicCard = ({ item, index = 0 }: { item: LogicItem; index?: number }) => {
  const color = STEP_COLORS[index % STEP_COLORS.length];

  return (
    <div className="logic-card" style={{ "--card-color": color } as React.CSSProperties}>
      <div className="logic-card-header">
        <span className="logic-step-num">{STEP_NUMS[index]}</span>
      </div>
      <h3 className="logic-card-title">{item.title}</h3>
      <p className="logic-card-text">{item.text}</p>
    </div>
  );
};

export default LogicCard;
