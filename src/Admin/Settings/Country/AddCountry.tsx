import  { useEffect, useState } from "react";
import Titles from "../../../Ui/Titles";
import InputField from "../../../Ui/InputField";
import ButtonDone from "../../../Ui/ButtonDone";
import usePost from "../../../Hooks/usePost";
import usePut from "../../../Hooks/usePut";
import useGet from "../../../Hooks/useGet";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../../Component/Loading";

interface Country {
  id?: string;
  name: string;
}

const AddCountry: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const countryId = location.state || null;
  const { data: countryData, get } = useGet<Country>();
  const { post, loading: postLoading } = usePost();
  const { put, loading: putLoading } = usePut();

  const [formData, setFormData] = useState<Country>({ name: "" });
  const isEdit = countryId ? true:false

  useEffect(() => {
    console.log(isEdit)
    console.log(countryId)
    if (isEdit && countryId) {
      get(`https://bcknd.sportego.org/api/locations/countries/${countryId}`);
    }
  }, [countryId]);

  useEffect(() => {
    if (countryData) {
      setFormData({
        name: countryData.name || "",
      });
    }
  }, [countryData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name?.trim()) {
      toast.error("Please enter a country name.");
      return;
    }

    if (isEdit) {
      const res = await put(
        `https://bcknd.sportego.org/api/locations/countries/${countryId}`,
        formData
      );
      if ((res).success !== false) {
        toast.success("Country updated successfully!");
        nav("/admin/settings");
      } else {
        toast.error("Failed to update country!");
      }
    } else {
      const res = await post(
        "https://bcknd.sportego.org/api/locations/countries",
        formData
      );
      if ((res).success !== false) {
        toast.success("Country added successfully!");
        nav("/admin/settings");
      } else {
        toast.error("Failed to add country!");
      }
    }
  };

  if (isEdit && !countryData && !postLoading && !putLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <Titles title={isEdit ? "Edit Country" : "Add Country"} />

      <div className="flex flex-col max-w-lg gap-4">
        <InputField
          placeholder="Country Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <ButtonDone
          checkLoading={postLoading || putLoading}
          handleSave={handleSave}
          edit={isEdit}
        />
      </div>
    </div>
  );
};

export default AddCountry;
