import axios from "axios";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import api from "../../../services/api";
export default function GameForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    genre: "",
    scenekey: ""
  });
  const [loading, setLoading] = useState(false)

  const [file, setFile] = useState(null);

  const token = localStorage.getItem("accessToken");

  const notifySuccess = () =>
  toast.success("Game Added Successfully", {
    position: "top-right",
    autoClose: 3000,
    theme: "colored",
    transition: Bounce,
  });

  const notifyError = (msg) =>
  toast.error(msg || "Failed to add game", {
    position: "top-right",
    autoClose: 3000,
    theme: "colored",
    transition: Bounce,
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("genre", form.genre);
    formData.append("scenekey", form.scenekey);
    formData.append("thumbnail", file);
    
    const res = await api.post("/api/admin/create/games",formData,{
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    })
      
      notifySuccess()
      setForm({name: "", description: "",genre: "", scenekey: ""})
      
      setFile(null)
      onSuccess();
    
    
    } catch (err) {
      notifyError(err.response?.data?.message || "Server error")
    }
    finally{
      setLoading(false)
    }
    
  };

  return (
<form
  onSubmit={handleSubmit}
  className="w-full max-w-xl md:max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-5"
>
  <h2 className="text-xl font-semibold text-gray-800">Add New Game</h2>

  {/* Game Name */}
  <div>
    <label className="block text-sm text-gray-600 mb-1">Game Name</label>
    <input
      type="text"
      value={form.name}
      placeholder="Enter game name"
      onChange={(e) => setForm({ ...form, name: e.target.value })}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Genre */}
  <div>
    <label className="block text-sm text-gray-600 mb-1">Genre</label>
    <input
      type="text"
      value={form.genre}
      placeholder="e.g. Action, Puzzle"
      onChange={(e) => setForm({ ...form, genre: e.target.value })}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Scene Key */}
  <div>
    <label className="block text-sm text-gray-600 mb-1">Scene Key</label>
    <input
      type="text"
      value={form.scenekey}
      placeholder="Phaser scene key"
      onChange={(e) => setForm({ ...form, scenekey: e.target.value })}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Description */}
  <div>
    <label className="block text-sm text-gray-600 mb-1">Description</label>
    <textarea
      rows="3"
      value={form.description}
      placeholder="Short game description..."
      onChange={(e) => setForm({ ...form, description: e.target.value })}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* File Upload */}
  <div>
    <label className="block text-sm text-gray-600 mb-1">Thumbnail</label>
    <input
      type="file"
      
      onChange={(e) => setFile(e.target.files[0])}
      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
      file:rounded-lg file:border-0 file:text-sm file:font-semibold 
      file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
    />
  </div>

  {/* Button */}
  <button
    type="submit"
    disabled={loading}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
  >
    {loading ? "Adding..." : "Add Game"}
  </button>
</form>
  );
}
