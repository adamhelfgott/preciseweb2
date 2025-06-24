import Image from "next/image";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo({ className = "", width = 120, height = 50 }: LogoProps) {
  return (
    <Image
      src="/icons/Precise-Logo.svg"
      alt="Precise"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}