interface Props {
  listProjectData: string[];
}

export const WorkInformation = ({ listProjectData }: Props) => {
  return (
    <div className="flex">
      <img
        className="  w-[550px] h-[550px] rounded-[40px]  m-10"
        src={listProjectData[4]}
      />
      <div>
        <h5 className=" text-6xl mt-7 ml-12 mb-8 texto tracking-tight text-black dark:text-gray-900 flex flex-col">
          {listProjectData[0]}
        </h5>
        <hr style={{ borderColor: "#999", marginRight: 35 }} />
        {listProjectData.map(
          (item, index) =>
            index >= 1 &&
            index <= 3 && (
              <p
                key={item + index}
                className={`${
                  index === 3 && "-mb-10"
                } p-10 font-normal texto text-3xl ml-10 text-end text-gray-900 dark:text-gray-200`}
              >
                {item}
              </p>
            )
        )}
      </div>
    </div>
  );
};
