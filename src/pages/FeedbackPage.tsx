import { Input } from "@/components/ui/input";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FeedbackImg from "../../public/thumbs.svg";
const FeedbackPage = () => {
  return (
    <div className="md:h-[70vh] max-md:mt-16 max-md:min-h-screen  bg-gradient-to-t from-[#000000] via-[#000000ce]  to-transparent  flex items-center justify-center max-md:flex-col max-md:gap-16  w-full">
      <div className=" h-full lg:w-[40vw]   max-md:px-6 ">
        <div className="w-full h-full  flex items-center justify-center">
          <form className="flex gap-5 text-white lg::w-2/4 flex-col ">
            <Input
              placeholder="name"
              className="w-full border-0 focus-visible:ring-0 placeholder:text-[#ffffffc8] text-white  focus:ring-0 focus:outline-none  border-b border-white rounded-none"
            />
            <Textarea
              placeholder="feeback "
              className="placeholder:text-[#ffffffc8]"
            />
            <Button className="bg-blue-600 hover:bg-blue-500">Submit</Button>
            <h5 className="text-[#ffffffb2] font-medium">
              Feedback help us to improve our app so dont forget to give one .
            </h5>
          </form>
        </div>
      </div>

      <div className=" h-full   md:w-[50%]  max-md:order-first ">
        <img src={FeedbackImg.src} alt="image" className="w-full   h-full" />
      </div>
    </div>
  );
};

export default FeedbackPage;