// src/app/pages/HomePage.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BGHomePage from "../../assets/background-home-page.jpeg.jpg";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import CompanyDescription from "../components/CompanyDescription";
import { ModalPage } from "../../modals/ModalPage";
import { ModalLoading } from "../../modals/ModalLoading";

export const HomePage: React.FC = () => {
  const { pathname } = useLocation();

  const [width, setWidth] = useState<number>(window.innerWidth);
  const handleResizeWidth = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResizeWidth);
  }, [window.innerWidth]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (pathname !== "/app/home") {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);

  return (
    <>
      <style>{`
        .HomePageBackground {
          background-image: url(${BGHomePage});
          background-size: cover;
          background-position: center;
        }
      `}</style>
      {loading && (
        <ModalPage>
          <ModalLoading />
        </ModalPage>
      )}
      <section className="min-h-[825px] h-full flex flex-col HomePageBackground">
        <Navbar width={width} />
        <div className="overflow-auto h-full m-3">
          {pathname === "/app/home" ? (
            <main className="p-4 h-[550px] flex flex-col overflow-y-auto">
              <CompanyDescription width={width} />
              <div
                className={`flex ${
                  width >= 467 ? "flex-row" : "flex-col"
                }  items-center flex-wrap mt-10`}
              ></div>
            </main>
          ) : (
            <Outlet />
          )}
        </div>
        <section className="w-full flex justify-center">
          <Footer />
        </section>
      </section>
    </>
  );
};
