import React from "react";
import Table from "../../Ui/Table";
import ButtonAdd from "../../Ui/ButtonAdd";
import { useTheme } from "../../Hooks/ThemeContext";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Column<T> {
  key: keyof T | string;
  label: string;
  showLabel?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

const users: User[] = [
  { _id: "1", name: "Ahmed Aliddddddddddddddddddddddddd", email: "ahmed@example.com", role: "Admin" },
  { _id: "2", name: "Sara Mohamed", email: "sara@example.com", role: "User" },
  { _id: "3", name: "Omar Hassan", email: "omar@example.com", role: "Moderator" },
  { _id: "4", name: "Laila Ahmed", email: "laila@example.com", role: "User" },
  { _id: "5", name: "Khaled Mostafa", email: "khaled@example.com", role: "Admin" },
  { _id: "6", name: "Mona Youssef", email: "mona@example.com", role: "User" },
  { _id: "7", name: "Tamer Salah", email: "tamer@example.com", role: "Moderator" },
  { _id: "8", name: "Nour Farid", email: "nour@example.com", role: "User" },
  { _id: "9", name: "Hany Adel", email: "hany@example.com", role: "Admin" },
  { _id: "10", name: "Dina Samir", email: "dina@example.com", role: "User" },
  { _id: "11", name: "Youssef Tamer", email: "youssef@example.com", role: "User" },
  { _id: "12", name: "Rania Khaled", email: "rania@example.com", role: "Moderator" },
  { _id: "13", name: "Ali Mahmoud", email: "ali@example.com", role: "Admin" },
  { _id: "14", name: "Sara Nabil", email: "sara.nabil@example.com", role: "User" },
  { _id: "15", name: "Heba Fathi", email: "heba@example.com", role: "User" },
];

const Users: React.FC = () => {
  const { theme } = useTheme();

  const columns: Column<User>[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => {
        const baseBtn =
          "px-3 py-1 rounded text-sm font-medium transition-all duration-300";

        return (
          <div className="flex gap-2">
=            <button
              className={`${baseBtn} ${
                theme === "dark"
                  ? "bg-blue-600 hover:bg-blue-500 text-white"
                  : "bg-maincolor hover:bg-maincolor/70 text-white"
              }`}
              onClick={() => console.log("Edit:", row._id)}
            >
              Edit
            </button>
            <button
              className={`${baseBtn} ${
                theme === "dark"
                  ? "bg-red-600 hover:bg-red-500 text-white"
                  : "bg-red-400 hover:bg-red-500 text-white"
              }`}
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
                  console.log("Deleted:", row._id);
                }
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <ButtonAdd title="Users" to="/admin/addusers" />
      <Table<User> columns={columns} data={users} />
    </div>
  );
};

export default Users;
