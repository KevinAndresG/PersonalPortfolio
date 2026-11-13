import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="page">
    <h1 className="page-title">
      <span data-water>404</span>
    </h1>
    <p className="lead" style={{ margin: "32px 0" }}>
      This page sank. Nothing lives at this address.
    </p>
    <Link to="/home" className="btn btn-solid">
      Back to home
    </Link>
  </main>
);

export default NotFound;
