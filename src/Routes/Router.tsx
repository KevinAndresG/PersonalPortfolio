import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Footer from "../Components/Shared/Footer/Footer";
import Header from "../Components/Shared/Header/Header";
import { Suspense, lazy, useContext, useEffect } from "react";
import { LanguageContext } from "../Contexts/LanguageSelector/Context";
import { IntlProvider } from "react-intl";
import LanguageProvider from "../Contexts/LanguageSelector/Index";
import CustomCursor from "../Components/Shared/CustomCursor/CustomCursor";
import WaterCanvas from "../Components/WaterCanvas/WaterCanvas";

const pages = {
  home: () => import("../Pages/Home/Home"),
  about: () => import("../Pages/About/About"),
  work: () => import("../Pages/Work/Work"),
  knowledge: () => import("../Pages/Knowledge/Knowledge"),
  notFound: () => import("../Components/NotFound/NotFound"),
};
const Home = lazy(pages.home);
const About = lazy(pages.about);
const Work = lazy(pages.work);
const Knowledge = lazy(pages.knowledge);
const NotFound = lazy(pages.notFound);

const Router = () => {
  const location = useLocation();
  const { state } = useContext(LanguageContext);

  // ponytail: prefetch every page once idle so route changes never suspend mid-transition
  useEffect(() => {
    const id = setTimeout(
      () => Object.values(pages).forEach((load) => load()),
      1500,
    );
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {state && (
        <IntlProvider locale="En" messages={state.messages}>
          <WaterCanvas />
          <CustomCursor />
          <LanguageProvider>
            <Header />
            <Suspense fallback={null}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/knowledge" element={<Knowledge />} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
            <Footer />
          </LanguageProvider>
        </IntlProvider>
      )}
    </>
  );
};

export default Router;
