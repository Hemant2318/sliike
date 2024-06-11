import React from "react";
import Login from "pages/Auth/Login";
import ChangePassword from "pages/Auth/ChangePassword";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { commonRoute } from "utils/constants";
import CardList from "pages/Dashboard/CardList";
import CardPieChart from "pages/Dashboard/CardPieChart/CardPieChart";

const authRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={commonRoute.login} element={<Login />} />
        <Route exact path={commonRoute.subLogin} element={<Login />} />
        <Route
          exact
          path={commonRoute.changePassword}
          element={<ChangePassword />}
        />
        <Route exact path={commonRoute.cardList} element={<CardList />} />
        <Route
          exact
          path={commonRoute.cardPieChart}
          element={<CardPieChart />}
        />
        <Route
          exact
          path="*"
          element={<Navigate to={commonRoute.login} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};
export default authRoute;
