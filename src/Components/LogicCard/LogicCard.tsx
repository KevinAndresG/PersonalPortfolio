import "./LogicCard.scss";

const LogicCard = (prop: any) => {
  return (
    <>
      <h3 className="title">{prop.item.title}</h3>
      <p className="text">{prop.item.text}</p>
    </>
  );
};

export default LogicCard;
