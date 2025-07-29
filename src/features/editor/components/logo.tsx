import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <div className="relative size-8 shrink-0">
        <Image
          src="/svgs/logo.svg"
          fill
          alt="Image ai"
          className="shrink-0 hover:opacity-75 transition"
        />
      </div>
    </Link>
  );
};

export default Logo;
