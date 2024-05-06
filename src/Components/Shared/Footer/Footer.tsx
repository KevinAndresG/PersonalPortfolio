import "./Footer.scss";

const Footer = () => {
  return (
    !window.location.href.toLowerCase().includes("home") && (
      <footer>
        <p className="name">
          <code>Kevin Andres Garcia velez</code>
        </p>
        <p className="front">
          <code>Front End DEVELOPER</code>
        </p>
      </footer>
    )
  );
};

export default Footer;
