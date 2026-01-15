import React from "react";
import MainComponent from "@/components/shared/main-component";
import LoginForm from "@/components/login-form";
import SignUpForm from "@/components/sign-up-form";

const Login: React.FC = () => {
  return (
    <MainComponent>
      <br />
      <LoginForm titlePhrase="Title" buttonPhrase="Login" />
      <br />
      <SignUpForm titlePhrase="Create New Account" buttonPhrase="Create" />
    </MainComponent>
  );
};

export default Login;
