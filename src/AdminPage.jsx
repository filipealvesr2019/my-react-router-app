// AdminPage.js
import React, { useState } from "react";
import AdminMenu from "./components/AdminMenu";
import ButtonClose from "./components/ButtonClose";

const AdminPage = () => {
  const [showAdmin, setShowAdmin] = useState(true);

  const closeAdmin = () => {
    setShowAdmin(false);
  };

  return (
    <>
      {showAdmin && <AdminMenu />}
      {showAdmin && <ButtonClose onClick={closeAdmin} />}
    </>
  );
};

export default AdminPage;
