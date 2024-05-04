import "./Footer.scss";

const Footer = () => {
  console.log(
    "This Is  window.location.href:",
    window.location.href.toLowerCase().includes("home")
  );
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
