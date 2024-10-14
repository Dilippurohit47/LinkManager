"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import FeedbackImg from "../../../public/thumbs.svg";
import { useUser } from "@clerk/nextjs";
const FeedbackPage = () => {
  const [name, setName] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();
  const submit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          feedback,
        }),
      });

      const data = await res.json();
      if (data && data.success) {
        toast.success(data.message);
        setFeedback("");
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Internal server error");
    }
    setLoading(false);
  };

  return (
    <div className="md:h-[70vh] md:px-4 max-md:mt-16 max-md:min-h-screen  bg-gradient-to-t from-[#000000] via-[#000000ce]  to-transparent  flex items-center justify-center max-md:flex-col max-md:gap-16  w-full">
      <div className=" h-full lg:w-[40vw]   max-md:px-6 ">
        <div className="w-full h-full  flex items-center justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="flex gap-5 text-white lg::w-2/4 flex-col "
          >
            <Input
              type="text"
              value={name}
              placeholder="name"
              className="w-full border-0 focus-visible:ring-0 placeholder:text-[#ffffffc8] text-white  focus:ring-0 focus:outline-none  border-b border-white rounded-none"
              onChange={(e) => setName(e.target.value)}
            />
            <Textarea
              value={feedback}
              placeholder="feeback "
              className="placeholder:text-[#ffffffc8]"
              onChange={(e) => setFeedback(e.target.value)}
            />
            {user ? (
              <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
                {loading ? "Submitting..." : "Submit"}
              </Button>
            ) : (
              <Button disabled={!user} className="bg-blue-600 hover:bg-blue-500">
                Login First
              </Button>
            )}
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
