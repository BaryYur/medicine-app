import React, { useContext } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import PillsPage from "./pages/PillsPage";
import MixturePage from "./pages/MixturePage";
import TincturePage from "./pages/TincurePage";
import GelPage from "./pages/GelPage";
import SearchingPage from "./pages/SearchingPage/SearchingPage";
import MedicineItemPage from "./pages/MedicineItemPage";

import AuthContext from "./context/auth-context";

const App = () => {
    const authCtx = useContext(AuthContext);

    return (
        <Layout>
            <Routes>
                {authCtx.isLoggedIn && <Route path="/" exact element={<HomePage />} />}
                {authCtx.isLoggedIn && <Route path="/home" element={<HomePage />} />}
                {authCtx.isLoggedIn && <Route path="/profile" element={<UserPage />} />}
                {authCtx.isLoggedIn && <Route path="/pills" element={<PillsPage />} />}
                {authCtx.isLoggedIn && <Route path="/tincture" element={<TincturePage />} />}
                {authCtx.isLoggedIn && <Route path="/mixture" element={<MixturePage />} />}
                {authCtx.isLoggedIn && <Route path="/gel" element={<GelPage />} />}
                {authCtx.isLoggedIn && <Route path="/search" element={<SearchingPage />} />}
                {authCtx.isLoggedIn && <Route path="/:category/:id" element={<MedicineItemPage />} />}
                {!authCtx.isLoggedIn && <Route path="/auth" element={<LoginPage />} />}
                {!authCtx.isLoggedIn && <Route path="/" element={<Navigate to="/auth" replace />} />}
                {authCtx.isLoggedIn && <Route path="/" element={<Navigate to="/home" replace />} />}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Layout>
    );
}

export default App;
