// import AuthRoute from "./routes/authRoute";
import AppRoute from "./routes/appRoute";
import AuthRoute from "./routes/authRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getDataFromLocalStorage } from "utils/helpers";
import ErrorPopup from "components/layouts/ErrorPopup";
import "assets/main.scss";
import "assets/animation.scss";
import { BrowserRouter } from "react-router-dom";

function App() {
  // eslint-disable-next-line no-unused-vars
  const { userState } = useSelector((state) => ({
    userState: state.global.userState,
  }));

  useEffect(() => {
    // Nothing
  }, [userState]);
  // console.log(userState);

  const isAuth = getDataFromLocalStorage("token");
  return (
    <div className="App">
      <ErrorPopup />
      {isAuth ? (
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
      ) : (
        <AuthRoute />
      )}
    </div>
  );
}

export default App;
