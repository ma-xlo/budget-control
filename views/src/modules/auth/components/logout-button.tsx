import { LogOut } from "lucide-react";
import SidebarAction from "../../core/components/sidebar/sidebar-action";
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutSidebarButton = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return <SidebarAction title="Sair" Icon={LogOut} onClick={logout} />;
};

export default LogoutSidebarButton;
