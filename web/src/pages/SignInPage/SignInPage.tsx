import type { Component } from "solid-js";
import EnterInfo from "../../components/EnterInfo/EnterInfo";
import RightPanel from "../../components/RightPanel/RightPanel";
import "./SignInPage.scss";

const SignInPage = () => {
  document.body.style.backgroundColor = "#D8EEFE";
  return (
    <div>
      <div class="ContainerEnterInfo">
        <EnterInfo />
      </div>
      <div class="ContainerRightPanel">
        <RightPanel />
      </div>
    </div>
  );
};

export default SignInPage;
