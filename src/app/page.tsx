"use client"
import DetailsPage from "@/app/pages/DetailsPage";
import HomePage from "./pages/HomePage";
import FeedbackPage from "@/app/pages/FeedbackPage";
export default function Home() {
  return (
    <div className="bg-gradient-to-r   from-[#E0258C]  via-[#080D27]   to-[#080D27]">
      <HomePage />
      <DetailsPage />
      <FeedbackPage />
    </div>
  );
}
