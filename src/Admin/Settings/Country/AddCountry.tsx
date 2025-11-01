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
import { useTranslation } from "react-i18next";

interface Country {
  name: string;
}

const AddCountry: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const countryId = location.state || null;
  const { data: countryData, get } = useGet<Country>();
  const { post, loading: postLoading } = usePost();
  const { put, loading: putLoading } = usePut();
  const { t } = useTranslation();

  const [formData, setFormData] = useState<Country>({ name: "" });
  const isEdit = !!countryId 

  useEffect(() => {
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
      toast.error(t("Pleaseenteracountryname"));
      return;
    }

    if (isEdit) {
      const res = await put(
        `https://bcknd.sportego.org/api/locations/countries/${countryId}`,
        formData
      );
      if ((res).success !== false) {
        toast.success(t("Countryupdatedsuccessfully"));
        nav("/admin/settings");
      } else {
        toast.error(t("Failedtoupdatecountry"));
      }
    } else {
      const res = await post(
        "https://bcknd.sportego.org/api/locations/countries",
        formData
      );
      if ((res).success !== false) {
        toast.success(t("Countryaddedsuccessfully"));
        nav("/admin/settings/country");
      } else {
        toast.error(t("Failedtoaddcountry"));
      }
    }
  };

  if (isEdit && !countryData && !postLoading && !putLoading)
    return (
      <div className="flex items-center justify-center max-h-screen max-w-screen">
        <Loading />
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <Titles title={isEdit ? t("EditCountry") : t("AddCountry")} />

      <div className="flex flex-col max-w-lg gap-4">
        <InputField
          placeholder={t("CountryName")}
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
