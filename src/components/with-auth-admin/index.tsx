import ApiData from "@/dtos/apiData";
import AuthState from "@/dtos/authState";
import User from "@/dtos/user";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import { GetServerSideProps, NextPage } from "next";

// @ts-ignore
const withAuthAdmin = (Component) => {
  // @ts-ignore
  const Auth = (props) => {
    const router = useRouter();
    const loggedUser: User = useSelector(
      (state: AuthState) => state.auth.loggedUser
    );
    // @ts-ignore
    const apiData: ApiData = JSON.parse(Cookie.get("@api-data"));

    if (
      !loggedUser ||
      loggedUser.profile !== "admin" ||
      !apiData ||
      !apiData["access-token"] ||
      apiData["access-token"] === ""
    ) {
      router.push("/Auth/Login");
    }

    return <Component {...props} />;
  };

  if (Component.getServerSideProps) {
    Auth.getServerSideProps = Component.getServerSideProps;
  }

  return Auth;
};

export default withAuthAdmin;
