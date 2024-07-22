import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HomeIcon from "@mui/icons-material/Home";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupIcon from "@mui/icons-material/Group";
import LayersIcon from "@mui/icons-material/Layers";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from "@/context/AuthContext";
import { ProfileAvatar } from "../ProfileAvatar";
import { Button } from "@/components/ui/button";

export default function Sidebar() {

const { user, logout } = useAuth();
  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none">
      <CardHeader className="mb-2 border-b">
        <CardTitle className="flex gap-4 text-base font-medium">
          <div><ProfileAvatar /></div>
          <div className="flex flex-col">
            <div className="flex gap-2">
            <p>{user?.firstname}</p>
            <p>{user?.lastname}</p>
            </div>
            <p className="text-sm font-light">
              {user?.isAdmin? "Admin" : null}
            </p>
          </div>
          </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <NavigationMenu>
          <NavigationItem route={"/dashboard"}>
            <HomeIcon /> Dashboard
          </NavigationItem>
          <NavigationItem route={"/product"}>
            <GridViewIcon /> Product
          </NavigationItem>
          <NavigationItem route={"/category"}>
            <FormatListBulletedIcon /> Category
          </NavigationItem>
          <NavigationItem route={"/order"}>
            <LayersIcon /> Order
          </NavigationItem>
          <NavigationItem route={"/customer"}>
            <GroupIcon /> Customer
          </NavigationItem>
          <NavigationItem route={"/coupon"}>
            <LoyaltyIcon /> Coupon
          </NavigationItem>
          <NavigationItem route={"/settings"}>
            <SettingsIcon /> Settings
          </NavigationItem>
        </NavigationMenu>
      </CardContent>

      <CardFooter className="absolute bottom-0 left-0">
        <Button className="flex gap-2 hover:opacity-50" variant={'secondary'} onClick={() => logout()}><LogoutIcon /> Logout</Button>
      </CardFooter>
    </Card>
  );
}

const NavigationMenu = ({ children }) => (
  <ul className="flex flex-col w-full py-4">{children}</ul>
);

const NavigationItem = ({ children, route }) => (
  <li className="flex h-10 w-full font-medium hover:bg-accent rounded-md">
    <Link className="flex items-center  h-full w-full gap-2" to={route}>
      {children}
    </Link>
  </li>
);
