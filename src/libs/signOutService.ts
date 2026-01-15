import Cookies from "js-cookie";

const SignOutService = {
  execute(): void {
    Cookies.remove("@api-data");
  },
};

export default SignOutService;
