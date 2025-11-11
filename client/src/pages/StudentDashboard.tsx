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

const StudentDashboard: React.FC = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || user?.role !== "student") {
      navigate("/login");
      return;
    }

    loadPresentations();
  }, [isLoggedIn, user, navigate]);

  const loadPresentations = async () => {
    try {
      const response = await api.get("/presentations");
      setPresentations(response.data);
    } catch (error) {
      console.error("Error loading presentations:", error);
    } finally {
      setLoading(false);
    }
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
          Student Dashboard
        </h1>
        <p className="text-gray-600">Welcome back, {user?.name}!</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Presentations</h2>
        <div className="space-y-4">
          {presentations.length === 0 ? (
            <p className="text-gray-600">No presentations available.</p>
          ) : (
            presentations.map((presentation) => (
              <div
                key={presentation._id}
                className="border border-gray-200 rounded-lg p-4"
              >
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
                <p className="text-gray-700 mt-2">{presentation.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default StudentDashboard;
