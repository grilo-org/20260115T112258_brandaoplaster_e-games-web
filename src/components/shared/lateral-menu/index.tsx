import React from "react";
import styles from "./styles.module.css";
import Logo from "@/components/shared/logo";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faDollarSign,
  faGamepad,
  faLaptop,
  faSignOutAlt,
  faSignal,
  faTicketAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import SignOutService from "@/libs/signOutService";
import { useRouter } from "next/router";

const LateralMenu: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.background}>
      <Logo />

      <div className={styles.list}>
        <Link href="/admin">
          <FontAwesomeIcon
            icon={faSignal}
            color="var(--color-gray-light)"
            className={`mr-3 ${
              router.pathname === "/admin" ? styles.active : ""
            }`}
          />
          Home
          <hr />
        </Link>

        <Link href="/admin/users/list">
          <FontAwesomeIcon
            icon={faUser}
            color="var(--color-gray-light)"
            className={`mr-3 ${
              router.pathname === "/admin/users/list" ? styles.active : ""
            }`}
          />
          Users
          <hr />
        </Link>

        <Link href="/admin/products/list">
          <FontAwesomeIcon
            icon={faGamepad}
            color="var(--color-gray-light)"
            className={`mr-3 ${
              router.pathname === "/admin/products/list" ? styles.active : ""
            }`}
          />
          Products
          <hr />
        </Link>

        <Link href="/admin/categories/list">
          <FontAwesomeIcon
            icon={faCheckSquare}
            color="var(--color-gray-light)"
            className={`mr-3 ${
              router.pathname === "/admin/categories/list" ? styles.active : ""
            }`}
          />
          Categories
          <hr />
        </Link>

        <Link href="/admin/systemrequirements/list">
          <FontAwesomeIcon
            icon={faLaptop}
            color="var(--color-gray-light)"
            className={`mr-3 ${
              router.pathname === "/admin/systemrequirements/list"
                ? styles.active
                : ""
            }`}
          />
          System Requirements
          <hr />
        </Link>

        <Link href="/admin/coupons/list">
          <FontAwesomeIcon
            icon={faTicketAlt}
            color="var(--color-gray-light)"
            className={`mr-3 ${
              router.pathname === "/admin/coupons/list" ? styles.active : ""
            }`}
          />
          Coupons
          <hr />
        </Link>

        <Link href="/admin/#">
          <FontAwesomeIcon
            icon={faDollarSign}
            color="var(--color-gray-light)"
            className={`mr-3 ${
              router.pathname === "/admin/#" ? styles.active : ""
            }`}
          />
          Financial
          <hr />
        </Link>

        <Link href="/auth/login" onClick={SignOutService.execute}>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            color="var(--color-gray-light)"
            className={`mr-3 ${
              router.pathname === "/auth/login" ? styles.active : ""
            }`}
          />
          Exit
          <hr />
        </Link>
      </div>
    </div>
  );
};

export default LateralMenu;
