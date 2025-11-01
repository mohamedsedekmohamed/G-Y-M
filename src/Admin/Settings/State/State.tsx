  
  
import React,{ useEffect ,useMemo} from "react";
import ButtonAdd from "../../../Ui/ButtonAdd";
import Table from "../../../Ui/Table";
import { useTheme } from "../../../Hooks/ThemeContext";
import useGet from "../../../Hooks/useGet";
import useDelete from "../../../Hooks/useDelete";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Loading from "../../../Component/Loading";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "../../../store/useSearchStore";
import { useTranslation } from "react-i18next";

const State = () => {
  interface State {
    id:string;
    name:string;
    CityModel:{
      name:string;
      CountryModel:{
        name:string
      }
    }
  }
      const { t } = useTranslation();
     const { searchQuery } = useSearchStore();
    const { theme } = useTheme();
    const { data, loading, error, get } = useGet<State[]>();
    const { del } = useDelete();
    const nav=useNavigate()
      useEffect(() => {
        get("https://bcknd.sportego.org/api/locations/states");
      }, [get]);
        const handleDelete = async (row: State) => {
    const result = await Swal.fire({
  title: t("DeleteConfirmationTitle", { name: row.name }),
  text: t("DeleteConfirmationText"),
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#d33",
  cancelButtonColor: "#3085d6",
  confirmButtonText: t("YesDelete"),
  cancelButtonText: t("Cancel"),
  background: theme === "dark" ? "#1a1a1a" : "#fff",
  color: theme === "dark" ? "#fff" : "#000",
});


    if (result.isConfirmed) {
      const res = await del(
        `https://bcknd.sportego.org/api/locations/states/${row.id}`
      );

      if (res && (res).success !== false) {
        toast.success(t("Statedeletedsuccessfully"));
        get("https://bcknd.sportego.org/api/locations/states"); 
      } else {
        toast.error(t("FailedtodeleteState"));
      }
    }
  };
 const columns = [
   
    { key: "name", label: t("State") },
{
  key: "CityModel",
  label: t("City"),
  render: (_:[], row:State) => row.CityModel?.name || "-",
},
{
  key: "CountryModel",
  label: t("Country"),
  render: (_:[], row:State) => row.CityModel?.CountryModel?.name || "-",
},
    {
      key: "actions",
      label: t("Actions"),
      showLabel:false,
      render: (_: [], row: State) => {
        const baseBtn =
          "px-3 py-1 rounded text-sm font-medium transition-all duration-300";

        return (
          <div className="flex gap-2">
            <button
              className={`${baseBtn} ${
                theme === "dark"
                  ? "bg-maincolor/80 hover:bg-maincolor text-white"
                  : "bg-maincolor hover:bg-maincolor/70 text-white"
              }`}
             onClick={() => nav("/admin/settings/addstate", { state: row.id })}

            >
              {t("Edit")}
            </button>
            <button
              className={`${baseBtn} ${
                theme === "dark"
                  ? "bg-red-600 hover:bg-red-500 text-white"
                  : "bg-red-400 hover:bg-red-500 text-white"
              }`}
              onClick={() => handleDelete(row)}
            >
              {t("Delete")}
            </button>
          </div>
        );  
      },
    },
  ];
const filteredCity = useMemo(() => {
  if (!searchQuery) return data;

  return data?.filter((state) => {
    const stateName = state.name?.toLowerCase() || "";
    const cityName = state.CityModel?.name?.toLowerCase() || "";
    const countryName = state.CityModel?.CountryModel?.name?.toLowerCase() || "";
    const search = searchQuery.toLowerCase();

    return stateName.includes(search) || cityName.includes(search)|| countryName.includes(search);
  });
}, [data, searchQuery]);

  if (loading)
    return (
       <div className="flex items-center justify-center max-h-screen max-w-screen">
        <Loading />
      </div>
    );

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
            <ButtonAdd title={t("State")} to="/admin/settings/addstate" />

      </div>

      {error && (
        <p className="font-medium text-red-500">
          {t("Failedtoloadstates")}: {error}
        </p>
      )}

      {!loading && !error && Array.isArray(filteredCity) && filteredCity.length > 0 && (
        <Table<State> columns={columns} data={filteredCity} />
      )}

      {!loading && !error && (!Array.isArray(filteredCity) || filteredCity.length === 0) && (
        <p
          className={theme === "dark" ? "text-gray-400" : "text-gray-500"}
        >
      {t("NoStatefound")}
        </p>
      )}
    </div>
  );
};

export default State