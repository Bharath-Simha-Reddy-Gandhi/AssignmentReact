import { HomePage } from "../pages/HomePage";
import { Route, Routes } from "react-router-dom";
import { ProfilePage } from "../pages/ProfilePage";
import { PhotoDetailsPage } from "../pages/PhotoDetailsPage";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {sessionStorage.getItem("accessToken") && (
        <Route path="/profile-page" element={<ProfilePage />} />
      )}
      <Route path="/photos/:id" element={<PhotoDetailsPage/>}/>
    </Routes>
  );
};
