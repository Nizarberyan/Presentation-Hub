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

interface Student {
  _id: string;
  name: string;
  email: string;
}

const TeacherDashboard: React.FC = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titre: "",
    assignedTo: [] as string[],
    date: "",
    description: "",
  });

  useEffect(() => {
    if (!isLoggedIn || user?.role !== "teacher") {
      navigate("/login");
      return;
    }

    loadPresentations();
    loadStudents();
  }, [isLoggedIn, user, navigate]);

  const loadStudents = async () => {
    try {
      const response = await api.get("/users?role=student");
      setStudents(response.data);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/presentations", formData);
      setShowForm(false);
      setFormData({ titre: "", assignedTo: [], date: "", description: "" });
      loadPresentations();
    } catch (error) {
      console.error("Error creating presentation:", error);
    }
  };

  const toggleStudentSelection = (studentId: string) => {
    setFormData((prev) => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(studentId)
        ? prev.assignedTo.filter((id) => id !== studentId)
        : [...prev.assignedTo, studentId],
    }));
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
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Teacher Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "Create Presentation"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">New Presentation</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-600">
                Title
              </label>
              <input
                type="text"
                value={formData.titre}
                onChange={(e) =>
                  setFormData({ ...formData, titre: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-600">
                Assign Students (select one or more)
              </label>
              <div className="border border-gray-300 rounded p-3 max-h-48 overflow-y-auto">
                {students.length === 0 ? (
                  <p className="text-gray-500 text-sm">No students available</p>
                ) : (
                  students.map((student) => (
                    <div key={student._id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`student-${student._id}`}
                        checked={formData.assignedTo.includes(student._id)}
                        onChange={() => toggleStudentSelection(student._id)}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`student-${student._id}`}
                        className="text-sm cursor-pointer"
                      >
                        {student.name} ({student.email})
                      </label>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-600">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-600">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Create
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">All Presentations</h2>
        <div className="space-y-4">
          {presentations.map((presentation) => (
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
          ))}
        </div>
      </div>
    </main>
  );
};

export default TeacherDashboard;
