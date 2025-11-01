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

interface Payment {
  id: number;
  name: string;
  image: string;
  description: string;
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const Payment: React.FC = () => {
  const { searchQuery } = useSearchStore();
  const { theme } = useTheme();
  const { data, loading, error, get } = useGet<Payment[]>();
  const { del } = useDelete();
  const nav = useNavigate();
  const { t } = useTranslation();

  const [openImage, setOpenImage] = useState<string | null>(null);

  useEffect(() => {
    get("https://bcknd.sportego.org/api/payment-methods");
  }, [get]);

  const handleDelete = async (row: Payment) => {
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
        `https://bcknd.sportego.org/api/payment-methods/${row.id}`
      );

      if (res && res.success !== false) {
        toast.success("Payment deleted successfully!");
        get("https://bcknd.sportego.org/api/payment-methods");
      } else {
        toast.error("Failed to delete payment!");
      }
    }
  };

  const columns = [
    { key: "name", label: t("payment") },
    { key: "type", label: t("Type") },
    { key: "description", label: t("Description") },
    {
      key: "image",
      label: t("Image"),
      render: (_: any, row: Payment) => (
        <div
          className="flex justify-center cursor-pointer"
          onClick={() => setOpenImage(row.image)}
        >
          <img
            src={row.image}
            alt={row.name}
            className="object-cover w-10 h-10 transition-all rounded hover:scale-110"
          />
        </div>
      ),
    },
    {
      key: "isActive",
      label: t("Status"),
      render: (_: any, row: Payment) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            row.isActive
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      showLabel: false,
      render: (_: any, row: Payment) => {
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
              onClick={() => nav("/admin/addpayment", { state: row.id })}
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
 
  const filteredPayments = useMemo(() => {
    if (!searchQuery) return data;

 return data?.filter((p) =>{
        const name = p.name?.toLowerCase() || "";
    const description = p.description.toLowerCase() || "";
    const type = p.type.toLowerCase() || "";
    const search = searchQuery.toLowerCase();

    return name.includes(search) || type.includes(search) || description.includes(search);
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
        <ButtonAdd title={t("payment")} to="/admin/addpayment" />
      </div>

      {error && (
        <p className="font-medium text-red-500">
          {t("Failedtoload")}: {error}
        </p>
      )}

      {!loading && !error && Array.isArray(filteredPayments) && filteredPayments.length > 0 && (
        <Table<Payment> columns={columns} data={filteredPayments} />
      )}

      {!loading && !error && (!Array.isArray(filteredPayments) || filteredPayments.length === 0) && (
        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
t{"Nopaymentsfound"}
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

export default Payment;
