import { useEffect, useState } from "react";
import Titles from "../../../Ui/Titles";
import InputField from "../../../Ui/InputField";
import ButtonDone from "../../../Ui/ButtonDone";
import InputArrow from "../../../Ui/InputArrow";
import usePost from "../../../Hooks/usePost";
import usePut from "../../../Hooks/usePut";
import useGet from "../../../Hooks/useGet";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../../Component/Loading";
import { useTranslation } from "react-i18next";

interface State {
  id?: string;
  name: string;
  cityId?: string | number;
  CityModel?: { id: number; name: string };
}

interface City {
  id: number;
  name: string;
}

interface CityResponse {
  cities: City[];
}

const AddState: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const stateId = location.state || null;
  const isEdit = !!stateId;
        const { t } = useTranslation();
  const { get: getCities } = useGet<CityResponse>();
  const { get: getState } = useGet<State>();
  const { post, loading: postLoading } = usePost();
  const { put, loading: putLoading } = usePut();

  const [formData, setFormData] = useState<State>({ name: "", cityId: "" });
  const [cities, setCities] = useState<City[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      setLoadingData(true);
      try {
        const res = await getCities("https://bcknd.sportego.org/api/locations/selections");
        if (res?.cities) {
          setCities(
            res.cities.map((city) => ({
              id: city.id,
              name: city.name,
            }))
          );
        }
      } catch {
        toast.error(t("Failedtoloadstates"));
      } finally {
        setLoadingData(false);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    console.log(stateId)
    const fetchState = async () => {
      if (isEdit && stateId) {
        setLoadingData(true);
        try {
          const res = await getState(`https://bcknd.sportego.org/api/locations/states/${stateId}`);
          if (res) {
            setFormData({
              name: res.name || "",
              cityId: res.CityModel?.id || "",
            });
          }
        } catch {
          toast.error(t("Failedtoloadstatedata"));
        } finally {
          setLoadingData(false);
        }
      }
    };
    fetchState();
  }, [stateId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCityChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      cityId: value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name?.trim()) {
      toast.error(t("Pleaseenterastatename"));
      return;
    }
    if (!formData.cityId) {
      toast.error("Pleaseselectacity");
      return;
    }

    const payload = {
      name: formData.name,
      cityId: formData.cityId,
    };

    if (isEdit) {
      const res = await put(
        `https://bcknd.sportego.org/api/locations/states/${stateId}`,
        payload
      );
      if (res?.success !== false) {
        toast.success(t("Stateupdatedsuccessfully"));
        nav("/admin/settings/state");
      } else {
        toast.error(t("Failedtoupdatestate"));
      }
    } else {
      const res = await post("https://bcknd.sportego.org/api/locations/states", payload);
      if (res?.success !== false) {
        toast.success(t('Stateaddedsuccessfully'));
        nav("/admin/settings/state");
      } else {
        toast.error(t("Failedtoaddstate"));
      }
    }
  };

  if ((isEdit && loadingData) || postLoading || putLoading) {
    return (
      <div className="flex items-center justify-center max-h-screen max-w-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Titles title={isEdit ? t("EditState") : t("AddState")} />

      <div className="flex flex-col max-w-lg gap-4">
        <InputField
          placeholder={t("StateName")}
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <InputArrow
          placeholder={t("City")}
          name="cityId"
          value={formData.cityId}
          onChange={handleCityChange}
          options={cities.map((c) => ({ id: c.id, name: c.name }))}
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

export default AddState;
