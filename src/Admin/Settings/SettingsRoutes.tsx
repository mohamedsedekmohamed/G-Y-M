import { Routes, Route, Navigate } from "react-router-dom";
import Settings from "./Settings";
import Country from "./Country/Country";
import City from "./City/City";
import State from "./State/State";
import AddCountry from "./Country/AddCountry";
import AddCity from "./City/AddCity";
import AddState from "./State/AddState";

const SettingsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Settings />}>
        <Route index element={<Navigate to="country" />} />
        <Route path="country" element={<Country />} />
        <Route path="city" element={<City />} />
        <Route path="state" element={<State />} />
        <Route path="addcountry" element={<AddCountry />} />
        <Route path="addcity" element={<AddCity />} />
        <Route path="addstate" element={<AddState />} />
      </Route>
    </Routes>
  );
};

export default SettingsRoutes;
