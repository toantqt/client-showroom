import { Route, Redirect, BrowserRouter, HashRouter } from "react-router-dom";
import { isLoggedIn, checkRole } from "./auth/auth";
import Dashboard from "./screens/Admin/Dashboard/screens/Dashboard";
import LoginPage from "./screens/Login/screens/LoginPage";
import { onMessageListener, getTokenFb } from "./firebase";
import NotificationComponent from "./components/Notification/Notification.component";
import React, { useState } from "react";

function App() {
  const [show, setShow] = useState(false);
  const [arr, setArr] = useState([]);
  const handleShow = (status) => {
    setShow(status);
  };
  onMessageListener()
    .then((payload) => {
      setShow(true);

      setArr((arr) => [...arr, 1]);
    })
    .catch((err) => console.log("failed: ", err));
  const showListsNoti = arr.map((e, index) => {
    if (index + 1 == arr.length) {
      return <NotificationComponent handleShow={handleShow} />;
    }
  });
  console.log(arr);
  return (
    <>
      {showListsNoti}
      <HashRouter>
        <Route
          path="/admin"
          render={() =>
            checkRole("admin") ? <Dashboard /> : <Redirect to="/auth/login" />
          }
        ></Route>
        <Route path="/auth/login" component={LoginPage}></Route>
      </HashRouter>
    </>
  );
}

export default App;
