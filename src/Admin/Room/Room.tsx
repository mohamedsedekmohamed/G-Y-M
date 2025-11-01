import React, { useEffect, useMemo, useState } from "react";
import ButtonAdd from "../../Ui/ButtonAdd";
import Table from "../../Ui/Table";
import { useTheme } from "../../Hooks/ThemeContext";
import useGet from "../../Hooks/useGet";
import useDelete from "../../Hooks/useDelete";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Loading from "../../Component/Loading";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "../../store/useSearchStore";
import { useTranslation } from "react-i18next";

interface GalleryImage {
  id: number;
  image: string;
}

interface Room {
  id: number;
  name: string;
  capacity: number;
  description: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  gallery: GalleryImage[];
}

const Room: React.FC = () => {
  const { searchQuery } = useSearchStore();
  const { theme } = useTheme();
  const { data, loading, error, get } = useGet<Room[]>();
  const { del } = useDelete();
  const nav = useNavigate();
  const { t } = useTranslation();

  const [openImage, setOpenImage] = useState<string | null>(null);

  useEffect(() => {
    get("https://bcknd.sportego.org/api/rooms");
  }, [get]);

  const handleDelete = async (row: Room) => {
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
      const res = await del(`https://bcknd.sportego.org/api/rooms/${row.id}`);

      if (res && res.success !== false) {
        toast.success(t("Roomdeletedsuccessfully"));
        get("https://bcknd.sportego.org/api/rooms");
      } else {
        toast.error(t("Failedtodeleteroom"));
      }
    }
  };

  const columns = [
    { key: "name", label: t("RoomName") },
    { key: "capacity", label: t("Capacity") },
    { key: "description", label: t("Description") },
    {
      key: "thumbnail",
      label: t("Thumbnail"),
      render: (_: any, row: Room) => (
        <div
          className="flex justify-center cursor-pointer"
          onClick={() => setOpenImage(row.thumbnail)}
        >
          <img
            src={row.thumbnail}
            alt={row.name}
            className="object-cover w-10 h-10 transition-all rounded hover:scale-110"
          />
        </div>
      ),
    },
    {
      key: "gallery",
      label: t("Gallery"),
      render: (_: any, row: Room) => (
        <div className="flex flex-wrap justify-center gap-1">
          {row.gallery?.slice(0, 3).map((img) => (
            <img
              key={img.id}
              src={img.image}
              alt="gallery"
              className="object-cover w-8 h-8 rounded cursor-pointer hover:scale-110"
              onClick={() => setOpenImage(img.image)}
            />
          ))}
          {row.gallery?.length > 3 && (
            <span className="text-xs text-gray-500">+{row.gallery.length - 3}</span>
          )}
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      showLabel: false,
      render: (_: any, row: Room) => {
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
              onClick={() => nav("/admin/addroom", { state: row.id })}
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

  const filteredRooms = useMemo(() => {
    if (!searchQuery) return data;
    const search = searchQuery.toLowerCase();
    return data?.filter((r) => {
      const name = r.name?.toLowerCase() || "";
      const desc = r.description?.toLowerCase() || "";
      const cap = r.capacity?.toString() || "";
      return name.includes(search) || desc.includes(search) || cap.includes(search);
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
        <ButtonAdd title={t("Room")} to="/admin/addroom" />
      </div>

      {error && (
        <p className="font-medium text-red-500">
          {t("Failedtoloadrooms")}: {error}
        </p>
      )}

      {!loading && !error && Array.isArray(filteredRooms) && filteredRooms.length > 0 && (
        <Table<Room> columns={columns} data={filteredRooms} />
      )}

      {!loading && !error && (!Array.isArray(filteredRooms) || filteredRooms.length === 0) && (
        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
          {t("Noroomsfound")}
        </p>
      )}

      {openImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setOpenImage(null)}
        >
          <div className="relative">
            <img
              src={openImage}
              alt="Preview"
              className="max-w-[90vw] max-h-[90vh] rounded shadow-lg"
            />
            <button
              className="absolute flex items-center justify-center w-8 h-8 text-lg font-bold text-black transition bg-white rounded-full top-2 right-2 hover:bg-red-500 hover:text-white"
              onClick={() => setOpenImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
