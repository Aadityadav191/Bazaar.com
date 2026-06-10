import React, { useState, useEffect } from 'react';
import {
  User, Camera, Mail, Shield, ShoppingBag, MapPin,
  CheckCircle, Save, LogOut, Phone, CreditCard, Lock, Clock, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { uploadProfileImage } from "../../services/userService";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate('/auth/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    setUser(parsedUser);
    setFormData({
      name: parsedUser.name || '',
      email: parsedUser.email || '',
      phone: parsedUser.phone || '',
      address: parsedUser.address || ''
    });
  }, [navigate]);

  // =========================
  // PROFILE IMAGE UPLOAD
  // =========================
  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem("token");

    setIsUploading(true);
    setErrorMessage("");

    try {
      const imageUrl = await uploadProfileImage(file, token);

      if (!imageUrl) throw new Error("Upload failed");

      const updatedUser = {
        ...user,
        avatar: imageUrl,
        profilePicture: imageUrl
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("storage"));

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);

    } catch (err) {
      console.error(err);
      setErrorMessage("Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  // =========================
  // SAVE PROFILE CHANGES (LOCAL ONLY)
  // =========================
  const handleSaveChanges = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      ...formData
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    window.dispatchEvent(new Event("storage"));

    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="bg-zinc-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-zinc-900">

      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-end border-b pb-6 border-zinc-200">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-400">
              Account
            </p>
            <h1 className="text-3xl font-black">Profile Dashboard</h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 text-xs font-bold"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>

        {/* ALERTS */}
        {saveSuccess && (
          <div className="p-3 bg-green-50 text-green-700 text-xs rounded flex items-center gap-2">
            <CheckCircle size={14} />
            Updated successfully
          </div>
        )}

        {errorMessage && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded flex items-center gap-2">
            <AlertCircle size={14} />
            {errorMessage}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="space-y-6">

            {/* AVATAR */}
            <div className="bg-white p-6 rounded-2xl border text-center space-y-4">

              <div className="relative w-28 h-28 mx-auto">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-zinc-100 flex items-center justify-center">
                  {user.avatar || user.profilePicture ? (
                    <img
                      src={user.avatar || user.profilePicture}
                      className="w-full h-full object-cover"
                      alt="avatar"
                    />
                  ) : (
                    <User className="text-zinc-400" />
                  )}
                </div>

                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">
                    Uploading...
                  </div>
                )}

                <label className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer">
                  <Camera size={12} />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />
                </label>
              </div>

              <h2 className="font-bold">{user.name}</h2>

              <span className="text-[10px] bg-zinc-100 px-2 py-1 rounded">
                Verified User
              </span>
            </div>

            {/* PAYMENT CARD */}
            <div className="bg-white p-5 border rounded-2xl space-y-3">
              <h3 className="text-xs font-bold text-zinc-400 flex items-center gap-2">
                <CreditCard size={14} /> Wallet
              </h3>

              <div className="bg-zinc-900 text-white p-4 rounded-xl">
                <p className="text-[10px] opacity-60">Premium Card</p>
                <p className="font-mono">•••• •••• •••• 4821</p>
                <p className="text-xs mt-2">{user.name}</p>
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2 space-y-6">

            {/* FORM */}
            <div className="bg-white border rounded-2xl p-6">

              <form onSubmit={handleSaveChanges} className="space-y-5">

                <div className="flex justify-between">
                  <h3 className="text-xs font-bold text-zinc-400">
                    Profile Info
                  </h3>

                  <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-xs text-indigo-600 font-bold"
                  >
                    {isEditing ? "Cancel" : "Edit"}
                  </button>
                </div>

                <input
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border p-3 rounded-xl text-xs"
                  placeholder="Name"
                />

                <input
                  disabled={!isEditing}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border p-3 rounded-xl text-xs"
                  placeholder="Email"
                />

                <input
                  disabled={!isEditing}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border p-3 rounded-xl text-xs"
                  placeholder="Phone"
                />

                <textarea
                  disabled={!isEditing}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border p-3 rounded-xl text-xs"
                  placeholder="Address"
                />

                {isEditing && (
                  <button
                    type="submit"
                    className="bg-black text-white text-xs px-4 py-2 rounded-xl flex items-center gap-2"
                  >
                    <Save size={14} /> Save
                  </button>
                )}

              </form>
            </div>

            {/* ORDERS */}
            <div className="bg-white border rounded-2xl p-6">
              <h3 className="text-xs font-bold text-zinc-400 mb-4">
                Orders
              </h3>

              <div className="space-y-3">

                <div className="text-xs flex justify-between border-b pb-2">
                  <span>BZR-98214</span>
                  <span>Delivered</span>
                </div>

                <div className="text-xs flex justify-between">
                  <span>BZR-91045</span>
                  <span>In Transit</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}