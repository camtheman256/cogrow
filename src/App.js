/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import "antd/dist/antd.css";
import { Redirect, Route, Switch } from "react-router-dom";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Main from "./components/layout/Main";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDXJ0RymG8MZCgzjDAgskdoLOAKvkWTTEU",
  authDomain: "cogrow-5b957.firebaseapp.com",
  projectId: "cogrow-5b957",
  storageBucket: "cogrow-5b957.appspot.com",
  messagingSenderId: "952173385772",
  appId: "1:952173385772:web:24e56dfbca0d3f32cad989",
  measurementId: "G-PPJMWQJ45W"
};
initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Redirect from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
