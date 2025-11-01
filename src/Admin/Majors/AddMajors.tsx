  import  { useEffect, useState } from "react";
import Titles from "../../Ui/Titles";
import InputField from "../../Ui/InputField";
import ButtonDone from "../../Ui/ButtonDone";
import usePost from "../../Hooks/usePost";
import usePut from "../../Hooks/usePut";
import useGet from "../../Hooks/useGet";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../Component/Loading";

interface Majors {
  id?: string;
  name: string;
}
const AddMajors: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const countryId = location.state || null;
  const { data: MajorsDate, get } = useGet<Majors>();
  const { post, loading: postLoading } = usePost();
  const { put, loading: putLoading } = usePut();

  const [formData, setFormData] = useState<Majors>({ name: "" });
  const isEdit = !!countryId 

  useEffect(() => {
    if (isEdit && countryId) {
      get(`https://bcknd.sportego.org/api/majors/${countryId}`);
    }
  }, [countryId]);

  useEffect(() => {
    if (MajorsDate) {
      setFormData({
        name: MajorsDate.name || "",
      });
    }
  }, [MajorsDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name?.trim()) {
      toast.error("Please enter a Major name.");
      return;
    }

    if (isEdit) {
      const res = await put(
        `https://bcknd.sportego.org/api/majors/${countryId}`,
        formData
      );
      if ((res).success !== false) {
        toast.success("Major updated successfully!");
        nav("/admin/majors");
      } else {
        toast.error("Failed to update Major!");
      }
    } else {
      const res = await post(
        "https://bcknd.sportego.org/api/majors",
        formData
      );
      if ((res).success !== false) {
        toast.success("Major added successfully!");
        nav("/admin/majors");
      } else {
        toast.error("Failed to add Major!");
      }
    }
  };

  if (isEdit &&  !MajorsDate && !postLoading && !putLoading)
    return (
      <div className="flex items-center justify-center max-h-screen max-w-screen">
        <Loading />
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <Titles title={isEdit ? "Edit major" : "Add major"} />

      <div className="flex flex-col max-w-lg gap-4">
        <InputField
          placeholder="Mojor Name"
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

export default AddMajors