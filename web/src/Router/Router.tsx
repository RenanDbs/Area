import { Component, createSignal } from "solid-js";
import SignInPage from "../pages/SignInPage/SignInPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFound from "../pages/NotFound/NotFound";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ActionPage from "../pages/ActionPage/ActionPage";
import LinkPage from "../pages/LinkPage/LinkPage";
import {
  Routes,
  Route,
  Link,
  Router,
  DefaultRoute,
  Navigate,
} from "@gh0st-work/solid-js-router";

const [color, setColor] = createSignal<string>("");
document.body.style.backgroundColor = color();

const RouterAREA = () => (
  <Router>
    <Routes>
      <Link to="/client.apk" target="_blank" download>
        Download
      </Link>
      <Route path={"/signin"}>
        <SignInPage />
      </Route>
      <Route path={"/signup"}>
        <SignUpPage />
      </Route>
      <Route path={"/action"}>
        <ActionPage />
      </Route>
      <Route path={"/services"}>
        <LinkPage />
      </Route>
      <Route path="/404">
        <NotFound />
      </Route>
      <Route path={"/"}>
        <HomePage />
      </Route>
    </Routes>
  </Router>
);

export default RouterAREA;
