import React from "react";
import DetailBox from "../../components/my-components/DetailBox";

const DetailsPage = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="min-h-[80vh]  max-md:px-2 py-3 md:w-[90%] lg:w-[880px]    gap-10  grid grid-cols-1 justify-items-center     md:grid-cols-2 lg:grid-cols-2  2xl:w-[90%] 2xl:grid-cols-3    xl:grid-cols-3   h-full ">
        <DetailBox
          img={"/room.png"}
          desc={
            "Create many rooms and share them Like product room , course room etc. And share just room link instead of all the course and product links. "
          }
        />
        <DetailBox
          img={"/Links.png"}
          desc={
            "Create many links in one room and manage them like add, edit, delete, etc "
          }
        />
        <DetailBox
          img={"/anal.png"}
          desc={
            "Watch full detail analytics of your link like how many clicks from which location  and from which device.  "
          }
        />
      </div>
    </div>
  );
};

export default DetailsPage;
