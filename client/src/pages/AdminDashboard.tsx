import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api";

interface Presentation {
  _id: string;
  titre: string;
  assignedTo: Array<{ _id: string; name: string; email: string }>;
  date: string;
  status: string;
  description: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const AdminDashboard: React.FC = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"presentations" | "users">(
    "presentations",
  );

  useEffect(() => {
    if (!isLoggedIn || user?.role !== "admin") {
      navigate("/login");
      return;
    }

    loadData();
  }, [isLoggedIn, user, navigate]);

  const loadData = async () => {
    try {
      const [presentationsRes, usersRes] = await Promise.all([
        api.get("/presentations"),
        api.get("/users"),
      ]);

      setPresentations(presentationsRes.data);
      setUsers(usersRes.data || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePresentation = async (id: string) => {
    if (!confirm("Are you sure you want to delete this presentation?")) return;

    try {
      await api.delete(`/presentations/${id}`);
      loadData();
    } catch (error) {
      console.error("Error deleting presentation:", error);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/users/${id}`);
      loadData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const stats = {
    totalPresentations: presentations.length,
    totalUsers: users.length,
    pendingPresentations: presentations.filter((p) => p.status === "pending")
      .length,
    approvedPresentations: presentations.filter((p) => p.status === "approved")
      .length,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">Welcome back, {user?.name}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500">
            Total Presentations
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {stats.totalPresentations}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {stats.pendingPresentations}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500">Approved</h3>
          <p className="text-2xl font-bold text-green-600">
            {stats.approvedPresentations}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("presentations")}
              className={`px-6 py-3 font-medium ${
                activeTab === "presentations"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Presentations
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-3 font-medium ${
                activeTab === "users"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Users
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "presentations" ? (
            <div className="space-y-4">
              {presentations.map((presentation) => (
                <div
                  key={presentation._id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {presentation.titre}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Assigned To:</strong>{" "}
                        {presentation.assignedTo
                          .map((student) => student.name)
                          .join(", ")}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Date:</strong>{" "}
                        {new Date(presentation.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Status:</strong>
                        <span
                          className={`ml-2 px-2 py-1 rounded text-xs ${
                            presentation.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : presentation.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {presentation.status}
                        </span>
                      </p>
                      <p className="text-gray-700 mt-2">
                        {presentation.description}
                      </p>
                    </div>
                    <button
                      onClick={() => deletePresentation(presentation._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((u) => (
                <div
                  key={u._id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{u.name}</h3>
                      <p className="text-gray-600">{u.email}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Role: <span className="font-medium">{u.role}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
