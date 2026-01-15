import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";

const Logo: React.FC = () => {
  return (
    <Link href="/" className={styles.logo}>
      <Image src="/assets/logo.png" alt="Logo e-games" width={220} height={40} />
    </Link>
  )
};

export default Logo;
