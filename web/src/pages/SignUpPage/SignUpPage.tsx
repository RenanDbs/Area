import type { Component } from "solid-js";
import SignUpInfo from "../../components/SignUpInfo/SignUpInfo";
import RegisterInfo from "../../components/RegisterInfo/RegisterInfo";
import "./SignUpPage.scss";

const SignUpPage = () => {
  document.body.style.backgroundColor = "#D8EEFE";
  return (
    <div>
      <div class="ContainerEnterInfo">
        <SignUpInfo />
      </div>
      <div class="ContainerRightPanel">
        <RegisterInfo />
      </div>
    </div>
  );
};

export default SignUpPage;
