import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Footer from "../Components/Shared/Footer/Footer";
import Header from "../Components/Shared/Header/Header";
import {
  ComponentType,
  Suspense,
  lazy,
  useContext,
  useEffect,
} from "react";
import { LanguageContext } from "../Contexts/LanguageSelector/Context";
import { IntlProvider } from "react-intl";
import LanguageProvider from "../Contexts/LanguageSelector/Index";
import CustomCursor from "../Components/Shared/CustomCursor/CustomCursor";
import WaterCanvas from "../Components/WaterCanvas/WaterCanvas";

/**
 * Lazy page that stops being lazy once its chunk is in: React.lazy suspends on first
 * render even for an already-downloaded module, and React 19 holds suspended content
 * back ~300ms, which reads as a frozen gap between pages.
 */
const page = (load: () => Promise<{ default: ComponentType }>) => {
  let Loaded: ComponentType | undefined;
  const prefetch = () =>
    load().then((m) => {
      Loaded = m.default;
      return m;
    });
  const Lazy = lazy(prefetch);
  const Page = () => (Loaded ? <Loaded /> : <Lazy />);
  Page.prefetch = prefetch;
  return Page;
};

const Home = page(() => import("../Pages/Home/Home"));
const About = page(() => import("../Pages/About/About"));
const Work = page(() => import("../Pages/Work/Work"));
const Knowledge = page(() => import("../Pages/Knowledge/Knowledge"));
const NotFound = page(() => import("../Components/NotFound/NotFound"));

const Router = () => {
  const location = useLocation();
  const { state } = useContext(LanguageContext);

  // Fetch the other pages shortly after first paint so navigation never waits on a chunk.
  useEffect(() => {
    const id = setTimeout(
      () => [Home, About, Work, Knowledge, NotFound].forEach((p) => p.prefetch()),
      500,
    );
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      {state && (
        <IntlProvider locale="En" messages={state.messages}>
          <WaterCanvas />
          <CustomCursor />
          <LanguageProvider>
            <Header />
            {/* Suspense inside, keyed per page: only the incoming (still invisible) page
                suspends, the outgoing one finishes its exit untouched. Scroll resets once
                the old page is gone, not while it is fading out. */}
            <AnimatePresence
              mode="wait"
              onExitComplete={() => window.scrollTo(0, 0)}
            >
              <Suspense key={location.pathname} fallback={null}>
                <Routes location={location}>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/knowledge" element={<Knowledge />} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </AnimatePresence>
            <Footer />
          </LanguageProvider>
        </IntlProvider>
      )}
    </>
  );
};

export default Router;
