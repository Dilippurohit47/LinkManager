import React from "react";

const DetailBox = ({ desc, img }: { desc: String; img: string }) => {
  return (
    <div className=" overflow-hidden 2xl:w-[25vw] w-[300px] sm:w-[350px]  max-md:h-full max-  h-[42vh]  px-4 py-2 bg-gradient-to-t  from-[#B26EF0] via-violet-800 flex flex-col   to-violet-700  rounded-3xl ">
      <div>
        <img
          width={220}
          height={220}
          src={img}
          className="w-full rounded-3xl min-h-[70%]"
          alt="room img"
        />
      </div>
      <div className="h-full py-3">
        <h2 className=" leading-tight text-[#ffffffbb]  font-medium text-[1.1rem]  whitespace-wrap">
          {desc}
        </h2>
      </div>
    </div>
  );
};

export default DetailBox;
