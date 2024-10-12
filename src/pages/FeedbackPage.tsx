import { Input } from "@/components/ui/input";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import FeedbackImg from "../../public/feedback.jpg";
const FeedbackPage = () => {
  return (
    <div className="h-[70vh]  bg-gradient-to-t from-[#000000] via-[#000000ce]  to-transparent  flex items-center justify-center  w-full">
      <div className=" h-full w-[40vw]">
        <div className="w-full h-full  flex items-center justify-center">
          <form className="flex gap-5 text-white w-2/4 flex-col ">
            <Input
              placeholder="name"
              className="w-full border-0 focus-visible:ring-0   focus:ring-0 focus:outline-none  border-b border-white rounded-none"
            />
            <Textarea placeholder="feeback" />
            <Button className="bg-blue-600 hover:bg-blue-500">Submit</Button>
          </form>
        </div>
      </div>

      <div className=" h-full w-[50%]">
        <img src={FeedbackImg.src}  alt="image"  className="w-full h-full" />
      </div>
    </div>
  );
};

export default FeedbackPage;
