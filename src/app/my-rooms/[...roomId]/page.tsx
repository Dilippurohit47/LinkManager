import SingelLinkComponent from "@/components/my-components/SingelLinkComponent";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="h-screen  bg-[#080D27] py-20 px-12">
      <div className=" mt-4 text-end flex gap-5 justify-end items-center  ">
        <Button className="bg-blue-500 hover:bg-blue-700 px-5 py-5">
          Add New Link
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-700 px-5 py-5">
          share this room
        </Button>
      </div>
      <div>
        <SingelLinkComponent />
      </div>
    </div>
  );
};

export default Page;
