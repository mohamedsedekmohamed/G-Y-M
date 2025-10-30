import React,{ useEffect,useMemo } from "react";
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

interface Country {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const Country : React.FC = () => {
    const { searchQuery } = useSearchStore();
  const { theme } = useTheme();
  const { data, loading, error, get } = useGet<Country[]>();
  const { del } = useDelete();
const nav=useNavigate()
  useEffect(() => {
    get("https://bcknd.sportego.org/api/locations/countries");
  }, [get]);

  const handleDelete = async (row: Country) => {
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
        `https://bcknd.sportego.org/api/locations/countries/${row.id}`
      );

      if (res && (res).success !== false) {
        toast.success("Country deleted successfully!");
        get("https://bcknd.sportego.org/api/locations/countries"); 
      } else {
        toast.error("Failed to delete country!");
      }
    }
  };

  const columns = [
   
    { key: "name", label: " Country" },
    {
      key: "actions",
      label: "Actions",
      showLabel:false,
      render: (_: [], row: Country) => {
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
             onClick={() => nav("/admin/addcountry", { state: row.id })}

            >
              Edit
            </button>

            {/* Delete Button */}
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
 const filteredCountry = useMemo(() => {
    if (!searchQuery) return data;
    return data?.filter((country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
        <ButtonAdd title="Add Country" to="/admin/addcountry" />
      </div>

      {error && (
        <p className="font-medium text-red-500">
          Failed to load countries: {error}
        </p>
      )}

      {!loading && !error && Array.isArray(filteredCountry) && filteredCountry.length > 0 && (
        <Table<Country> columns={columns} data={filteredCountry} />
      )}

      {!loading && !error && (!Array.isArray(filteredCountry) || filteredCountry.length === 0) && (
        <p
          className={theme === "dark" ? "text-gray-400" : "text-gray-500"}
        >
          No countries found.
        </p>
      )}
    </div>
  );
};

export default Country;
