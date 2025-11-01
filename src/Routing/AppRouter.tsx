 
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import Users from "../Admin/Users/Users";
import Store from "../Admin/Store/Store";
import NotFound from "../NotFound";
import Dashboard from "../Admin/Dashboard/Dashboard";
import Attendance from "../Admin/Attendance/Attendance";
import Classes from "../Admin/Classes/Classes";
import Packages from "../Admin/Packages/Packages";
import Rent from "../Admin/Rent/Rent";
import SetingRoutes from "../Admin/Settings/SettingsRoutes";
import Private from "../Admin/Private/Private";
import Reports from "../Admin/Reports/Reports";
import Accountings from "../Admin/Accountings/Accountings";
import AddAccountings from "../Admin/Accountings/AddAccountings";
import AddClasses from "../Admin/Classes/AddClasses";
import AddPackages from "../Admin/Packages/AddPackages";
import AddRent from "../Admin/Rent/AddRent";
import AddStore from "../Admin/Store/AddStore";
import AddUsers from "../Admin/Users/AddUsers";
import AddPrivate from "../Admin/Private/AddPrivate";
import AddAttendance from "../Admin/Attendance/AddAttendance";
import Subscriptions from "../Admin/Subscriptions/Subscriptions";
import AddSubscriptions from "../Admin/Subscriptions/AddSubscriptions";
import Majors from "../Admin/Majors/Majors";
import AddMajors from "../Admin/Majors/AddMajors";
import Login from "../Auth/Login";
import Payment from '../Admin/Payment/Payment'
import AddPayment from "../Admin/Payment/AddPayment";
import AddRoom from "../Admin/Room/AddRoom";
import Room from "../Admin/Room/Room";
import ProtectedRoute from "../Auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "store", element: <Store /> },
      { path: "attendance", element: <Attendance /> },
      { path: "classes", element: <Classes /> },
      { path: "packages", element: <Packages /> },
      { path: "rent", element: <Rent /> },
      { path: "private", element: <Private /> },
      { path: "settings/*", element: <SetingRoutes /> },
      { path: "reports", element: <Reports /> },
      { path: "accountings", element: <Accountings /> },
      { path: "addaccountings", element: <AddAccountings /> },
      { path: "addclasses", element: <AddClasses /> },
      { path: "addpackages", element: <AddPackages /> },
      { path: "addrent", element: <AddRent /> },
      { path: "addstore", element: <AddStore /> },
      { path: "addusers", element: <AddUsers /> },
      { path: "addattendance", element: <AddAttendance /> },
      { path: "addprivate", element: <AddPrivate /> },
      { path: "addsubscriptions", element: <AddSubscriptions /> },
      { path: "subscriptions", element: <Subscriptions /> },
      { path: "majors", element: <Majors /> },
      { path: "addmajors", element: <AddMajors /> },
      { path: "payment", element: <Payment /> },
      { path: "addpayment", element: <AddPayment /> },
      { path: "addroom", element: <AddRoom /> },
      { path: "room", element: <Room /> },

    ],
  },
  { path: "*", element: <NotFound /> },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
