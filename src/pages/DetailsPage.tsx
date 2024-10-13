import React from "react";
import DetailBox from "../components/my-components/DetailBox";

const DetailsPage = () => {
  return (
    <div className="min-h-[80vh] max-md:px-2 py-3   grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-5  justify-items-center justify-self-center   h-full w-full">
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
  );
};

export default DetailsPage;
