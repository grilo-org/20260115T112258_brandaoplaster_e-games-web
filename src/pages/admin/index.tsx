import React from "react";
import AdminComponent from "@/components/shared/admin-component";
import withAuthAdmin from "@/components/with-auth-admin";

const Home: React.FC = () => {
  return (
    <AdminComponent>
      <h1>Admin</h1>
    </AdminComponent>
  );
};

export default withAuthAdmin(Home);
