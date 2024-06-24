import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Work from "../Pages/Work/Work";
import Knowledge from "../Pages/Knowledge/Knowledge";
import NotFound from "../Components/NotFound/NotFound";
import { AnimatePresence } from "framer-motion";
import Footer from "../Components/Shared/Footer/Footer";
import Header from "../Components/Shared/Header/Header";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../Contexts/LanguageSelector/Context";
import { IntlProvider } from "react-intl";
import LanguageProvider from "../Contexts/LanguageSelector/Index";
import CustomCursor from "../Components/Shared/CustomCursor/CustomCursor";

const Router = () => {
  const location = useLocation();
  const { state } = useContext(LanguageContext);
  const [screenWidth, setScreenWidth] = useState(window.screen.width);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.screen.width);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {state && (
        <IntlProvider locale="En" messages={state.messages}>
          {screenWidth > 768 && <CustomCursor />}
          {/* <CustomCursor /> */}
          <LanguageProvider>
            <Header />
            <AnimatePresence>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/work" element={<Work />} />
                <Route path="/knowledge" element={<Knowledge />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
            <Footer />
          </LanguageProvider>
        </IntlProvider>
      )}
    </>
  );
};

export default Router;
