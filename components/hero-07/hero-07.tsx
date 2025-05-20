import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";

const Hero07 = () => {
  return (
    <div className="relative min-h-screen flex items-start md:items-center justify-center px-6 overflow-hidden">
      <div className="relative z-10 text-center max-w-2xl">
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
          Find the Perfect Tutor for Your Learning Journey
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          Connect with expert tutors across a wide range of subjects. Schedule
          sessions, track progress, and reach your goals — all in one place.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base">
            Get Started <ArrowUpRight className="!h-5 !w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
          >
            <CirclePlay className="!h-5 !w-5" /> Watch Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero07;
