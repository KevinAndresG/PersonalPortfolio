import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../Components/Shared/Header/Header";
import Home from "../Components/Home/Home";
import About from "../Components/About/About";
import Work from "../Components/Work/Work";
import Contact from "../Components/Contact/Contact";
import Knowledge from "../Components/Knowledge/Knowledge";
import Language from "../Components/Language/Language";
// import Footer from "../Components/Shared/Footer/Footer";

const Router = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/language" element={<Language />} />
        <Route path="/*" element={<Navigate to="/Home" />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default Router;
