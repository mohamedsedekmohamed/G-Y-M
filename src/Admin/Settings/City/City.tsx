  
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

interface City   {
  id: string;
  name: string;
  CountryModel: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;

}
const City  : React.FC = () => {
      const { searchQuery } = useSearchStore();
  
  const { theme } = useTheme();
  const { data, loading, error, get } = useGet<City[]>();
  const { del } = useDelete();
const nav=useNavigate()
  useEffect(() => {
    get("https://bcknd.sportego.org/api/locations/cities");
  }, [get]);
  
  const handleDelete = async (row: City) => {
    const result = await Swal.fire({
      title: `Delete ${row.name}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
      background: theme === "dark" ? "#1a1a1a" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    });

    if (result.isConfirmed) {
      const res = await del(
        `https://bcknd.sportego.org/api/locations/cities/${row.id}`
      );

      if (res && (res).success !== false) {
        toast.success("city deleted successfully!");
        get("https://bcknd.sportego.org/api/locations/cities"); 
      } else {
        toast.error("Failed to delete city!");
      }
    }
  };
 const columns = [
   
    { key: "name", label: " city" },
{
  key: "CountryModel",
  label: "Country",
  render: (_:[], row:City) => row.CountryModel?.name || "-",
},
    {
      key: "actions",
      label: "Actions",
      showLabel:false,
      render: (_: [], row: City) => {
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
             onClick={() => nav("/admin/addcity", { state: row.id })}

            >
              Edit
            </button>
            <button
              className={`${baseBtn} ${
                theme === "dark"
                  ? "bg-red-600 hover:bg-red-500 text-white"
                  : "bg-red-400 hover:bg-red-500 text-white"
              }`}
              onClick={() => handleDelete(row)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
const filteredCity = useMemo(() => {
  if (!searchQuery) return data;

  return data?.filter((city) => {
    const cityName = city.name?.toLowerCase() || "";
    const countryName = city.CountryModel?.name?.toLowerCase() || "";
    const search = searchQuery.toLowerCase();

    return cityName.includes(search) || countryName.includes(search);
  });
}, [data, searchQuery]);

  if (loading)
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Loading />
      </div>
    );

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <ButtonAdd title="Add City" to="/admin/addcity" />
      </div>

      {error && (
        <p className="font-medium text-red-500">
          Failed to load countries: {error}
        </p>
      )}

      {!loading && !error && Array.isArray(filteredCity) && filteredCity.length > 0 && (
        <Table<City> columns={columns} data={filteredCity} />
      )}

      {!loading && !error && (!Array.isArray(filteredCity) || filteredCity.length === 0) && (
        <p
          className={theme === "dark" ? "text-gray-400" : "text-gray-500"}
        >
          No Cities found.
        </p>
      )}
    </div>
  );
};

export default City