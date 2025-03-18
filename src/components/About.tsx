import React from "react";
import { Binary } from "lucide-react";
import { cn } from "@/lib/utils";

function About({ isVisible, delay }) {
  return (
    <div className=" text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col gap-8">
          <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-gravity-gold/10 border border-green-400/30 group-hover:bg-green-400/20 transition-colors">
            <div className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-green-400 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="absolute left-3 top-10 h-full w-px bg-green-400/20 group-last:hidden"></div>
          <div className="flex items-center gap-4">
            <h1 className="text-4xl md:text-6xl font-bold text-green-400 retro-text glow-text jolly-lodger-regular">
              01. ABOUT HEXAFALLS
            </h1>
          </div>

          <h2 className="text-2xl text-green-400 retro-text jolly-lodger-regular">
            HI EVERYONE
          </h2>

          <div className="max-w-3xl text-gray-300 space-y-6 text-xl jolly-lodger-regular">
            <p className="text-lg leading-relaxed TrajanPro">
              Binary is the annual hackathon of Kalyani Government Engineering
              College. It aims to be a stage for college students to showcase
              their creativity and resolve societal issues using technology. We
              hope to employ the current generation of innovators to think out
              of the box and bring transformative solutions to the forefront.
            </p>

            <p className="text-lg text-green-400 TrajanPro">
              We intend to host about 300 students with expertise in diverse
              domains of computer science. The BINARY will take place in March
              at Kalyani Government Engineering College.
            </p>
          </div>

          {/* Binary Pattern */}
          <div className="absolute top-0 right-0 opacity-20 text-8xl font-mono text-green-400 select-none">
            {/* 01
            <br />
            10
            <br />
            01 */}
            {/* <BillCipher3D /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
