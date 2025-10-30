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

interface City {
  id?: string;
  name: string;
  countryId?: string | number;
  CountryModel?: { id: number; name: string };
}

interface Country {
  id: number;
  name: string;
}

const AddCity: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const cityId = location.state || null;
  const isEdit = !!cityId;

  const { get: getCountries } = useGet<{ data: Country[] }>();
  const { get: getCity } = useGet<{ data: City }>();

  const { post, loading: postLoading } = usePost();
  const { put, loading: putLoading } = usePut();

  const [formData, setFormData] = useState<City>({ name: "", countryId: "" });
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingData(true);
      try {
        const res = await getCountries("https://bcknd.sportego.org/api/locations/countries");
        if (res) {
          setCountries(res);
        }
      } catch {
        toast.error("Failed to load countries");
      } finally {
        setLoadingData(false);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCity = async () => {
      if (isEdit && cityId) {
        setLoadingData(true);
        try {
          const res = await getCity(`https://bcknd.sportego.org/api/locations/cities/${cityId}`);
          if (res) {
            setFormData({
              name: res.name || "",
              countryId: res.CountryModel?.id || "",
            });
          }
        } catch {
          toast.error("Failed to load city data");
        } finally {
          setLoadingData(false);
        }
      }
    };
    fetchCity();
  }, [cityId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCountryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      countryId: value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name?.trim()) {
      toast.error("Please enter a city name.");
      return;
    }
    if (!formData.countryId) {
      toast.error("Please select a country.");
      return;
    }

    const payload = {
      name: formData.name,
      countryId: formData.countryId,
    };

    if (isEdit) {
      const res = await put(
        `https://bcknd.sportego.org/api/locations/cities/${cityId}`,
        payload
      );
      if (res?.success !== false) {
        toast.success("City updated successfully!");
        nav("/admin/settings");
      } else {
        toast.error("Failed to update city!");
      }
    } else {
      const res = await post(
        "https://bcknd.sportego.org/api/locations/cities",
        payload
      );
      if (res?.success !== false) {
        toast.success("City added successfully!");
        nav("/admin/settings");
      } else {
        toast.error("Failed to add city!");
      }
    }
  };

  if ((isEdit && loadingData) || postLoading || putLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Titles title={isEdit ? "Edit City" : "Add City"} />

      <div className="flex flex-col max-w-lg gap-4">
        <InputField
          placeholder="City Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <InputArrow
          placeholder="Country"
          name="countryId"
          value={formData.countryId}
          onChange={handleCountryChange}
          options={countries.map((c) => ({ id: c.id, name: c.name }))}
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

export default AddCity;
