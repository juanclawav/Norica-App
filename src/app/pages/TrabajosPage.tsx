import { FinishedProductCard } from "../components/FinishedProductCard";
import SimpleSlider from "../components/SimpleSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { useDispatch, useStore } from "../../store/StoreProvider";
import { types } from "../../store/storeReducer";
import { getPreviusWorks } from "../../firebase/previusWorks";
import { WorkInformation } from "../components/WorkInformation";
import { WorksPageMessages } from "../components/WorksPageMessages";
import { WorksPageButtonSection } from "../components/WorksPageButtonSection";

export const TrabajosPage = () => {
  const { workList } = useStore();
  const dispatch = useDispatch();

  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);

  const handleZoomToggle = (index: number) => {
    if (zoomedIndex === index) {
      setZoomedIndex(null);
    } else {
      setZoomedIndex(index);
    }
  };

  const [projectData, setProjectData] = useState<any>([]);
  const [errorLoading, setErrorLoading] = useState<boolean>(false);

  const getWorks = async () => {
    try {
      const listWorks: any = await getPreviusWorks();
      setProjectData(listWorks);
      dispatch({ type: types.setWorkList, value: listWorks });
    } catch (err) {
      setErrorLoading(true);
    }
  };

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (workList.length === 0) {
      getWorks();
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      setProjectData(workList);
    }
  }, []);

  const [listProjectData, setListProjectData] = useState<string[]>([]);

  useEffect(() => {
    if (zoomedIndex !== null) {
      setListProjectData([
        projectData[zoomedIndex].productName,
        projectData[zoomedIndex].productDescription,
        projectData[zoomedIndex].productDescriptionZone,
        projectData[zoomedIndex].productDescriptionDuration,
        projectData[zoomedIndex].productImage,
      ]);
    }
  }, [zoomedIndex]);

  return (
    <>
      <WorksPageMessages loading={loading} errorLoading={errorLoading} />
      <section className={`w-full ${loading && "h-[800px]"}`}>
        <div className=" p-4 h-full w-full bg-gray rounded-3xl">
          <h2 className="p-5 texto text-5xl font-bold -mb-20 text-black   ">
            Nuestros Trabajos
          </h2>

          <SimpleSlider>
            {projectData.map((item: any, index: number) => (
              <FinishedProductCard
                key={item.productName}
                productName={item.productName}
                productDescription={item.productDescription}
                productDescriptionZone={item.productDescriptionZone}
                productDescriptionDuration={item.productDescriptionDuration}
                productImage={item.productImage}
                isZoomed={zoomedIndex === index}
                onZoomToggle={() => handleZoomToggle(index)}
              />
            ))}
          </SimpleSlider>
          {zoomedIndex !== null && (
            <div className="z-10 fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 backdrop-blur ">
              <div className=" h-[95%] w-[90%] bg-white rounded-[40px]  flex flex-col ">
                <WorkInformation listProjectData={listProjectData} />
                <WorksPageButtonSection setZoomedIndex={setZoomedIndex} />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TrabajosPage;
