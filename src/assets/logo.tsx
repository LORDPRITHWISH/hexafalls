import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  glowing?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  className,
  size = "md",
  glowing = false,
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className={cn("relative flex items-center", className)}>
      <div
        className={cn(
          "ml-2 font-mystery tracking-wider",
          glowing ? "gold-glow" : "",
          {
            "text-lg": size === "sm",
            "text-xl": size === "md",
            "text-2xl": size === "lg",
          }
        )}
      >
        {/* Hexa<span className="text-[#0B5D68]">Falls</span> */}
        <img src="/logo.png" alt="" className="w-3/12 h-3/12 self-center" />
      </div>
    </div>
  );
};

export default Logo;
