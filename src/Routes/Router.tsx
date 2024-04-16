import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Work from "../Pages/Work/Work";
import Contact from "../Pages/Contact/Contact";
import Knowledge from "../Pages/Knowledge/Knowledge";
import NotFound from "../Components/NotFound/NotFound";
import { AnimatePresence } from "framer-motion";
import Footer from "../Components/Shared/Footer/Footer";
import Header from "../Components/Shared/Header/Header";

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
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default Router;
