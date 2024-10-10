import {  SignIn } from "@clerk/nextjs";

export default function Page() {
  return <div className="h-screen w-full flex justify-center items-center bg-gradient-to-r from-[#E0258C]  via-[#080D27]   to-[#080D27]">
    <SignIn />;
  </div>
}
