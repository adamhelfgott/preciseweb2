import Image from "next/image";

interface IconProps {
  className?: string;
  size?: number;
}

export default function Icon({ className = "", size = 40 }: IconProps) {
  return (
    <Image
      src="/icons/Precise-Icon.svg"
      alt="Precise"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}