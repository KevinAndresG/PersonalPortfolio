import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "../Components/Shared/Header/Header";
import Home from "../Components/Home/Home";
import About from "../Components/About/About";
import Work from "../Components/Work/Work";
import Contact from "../Components/Contact/Contact";
import Knowledge from "../Components/Knowledge/Knowledge";
import Language from "../Components/Language/Language";
import NotFound from "../Components/Shared/NotFound/NotFound";
import { AnimatePresence } from "framer-motion";
// import Footer from "../Components/Shared/Footer/Footer";

const Router = () => {
  const location = useLocation();
  return (
    <>
      <Header />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/language" element={<Language />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      {/* <Footer /> */}
    </>
  );
};

export default Router;
