import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  className?: string;
  showText?: boolean;
};

export default function SiteLogo({
  className = "",
  showText = true,
}: SiteLogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`.trim()}>
      <Image
        src="/icon.svg"
        alt="PiLuck logo"
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 rounded-xl object-contain transition-transform group-hover:scale-105"
        priority
      />
      {showText && (
        <span className="text-xl font-bold tracking-tight">
          Pi<span className="text-gradient">Luck</span>
        </span>
      )}
    </Link>
  );
}