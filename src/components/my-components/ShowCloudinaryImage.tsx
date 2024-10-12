import { RxCross2 } from "react-icons/rx";
import { CldImage } from "next-cloudinary";
import React from "react";
// pkdjxop46wwdxv2kauvw
const ShowCloudinaryImage = ({
  publicId,
  removePublicId,
}: {
  publicId: string;
  removePublicId: (publicId: string) => void;
}) => {
  return (
    <div className="relative">
      {publicId && (
        <>
          <CldImage
            src={publicId}
            alt="image"
            width={300}
            height={300}
            className="rounded-lg "
          />
          <div
            className="absolute top-0 text-2xl p-2 rounded-full text-white  cursor-pointer   left-0 "
            onClick={() => removePublicId(publicId)}
          >
            <RxCross2 />
          </div>
        </>
      )}
    </div>
  );
};

export default ShowCloudinaryImage;
