import React, { useState, useEffect } from 'react';
import {
  User, Camera, Mail, Shield, ShoppingBag, MapPin,
  CheckCircle, Save, LogOut, Phone, CreditCard, Lock, Clock, AlertCircle,
  Award, Key, Smartphone, Trash2, ArrowUpRight, HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// IMPORT CLEAN UPLOAD LOGIC ABSTRACTION FROM UPLOAD SERVICE
import { uploadProfilePicture } from "../../services/uploadService";

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
    setSaveSuccess(false);

    try {
      const imageUrl = await uploadProfilePicture(file, token);

      // Make sure the service actually handed back a clean web string link
      if (!imageUrl || typeof imageUrl !== 'string') {
        throw new Error("Backend did not return a valid image URL string path.");
      }

      const updatedUser = {
        ...user,
        avatar: imageUrl,          // Match component schema
        profilePicture: imageUrl   // Fallback safety matching
      };

      // Set state and sync storage
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Forces layout refresh updates across open component windows
      window.dispatchEvent(new Event("storage"));

      setSaveSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "Image upload failed.");
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
    <div className="bg-zinc-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-zinc-900 selection:bg-zinc-200">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* PREMIUM BRANDED HEADER */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b pb-6 border-zinc-200">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
              Account Environment
            </p>
            <h1 className="text-3xl font-black tracking-tight mt-0.5">Control Terminal</h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition duration-200"
          >
            <LogOut size={13} /> Close Session
          </button>
        </div>

        {/* ALERTS NOTIFICATION FRAME */}
        {saveSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-xl flex items-center gap-3 animate-fadeIn">
            <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />
             Profile operations completed successfully
          </div>
        )}

        {errorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold rounded-xl flex items-center gap-3 animate-fadeIn">
            <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
            {errorMessage}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDEBAR CONTROLS */}
          <div className="space-y-6">

            {/* AVATAR INTERFACE */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-xs flex flex-col items-center text-center space-y-4">
              <div className="relative w-28 h-28">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-zinc-900 ring-4 ring-zinc-100 flex items-center justify-center shadow-inner relative">
                  {user.avatar || user.profilePicture ? (
                    <img
                      src={user.avatar || user.profilePicture}
                      className="w-full h-full object-cover animate-fadeIn"
                      alt="avatar"
                    />
                  ) : (
                    <User size={36} className="text-zinc-400" />
                  )}
                  
                  {isUploading && (
                    <div className="absolute inset-0 bg-zinc-950/70 flex flex-col items-center justify-center text-[10px] text-white font-bold tracking-wider backdrop-blur-xs">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mb-1.5" />
                      STREAMING...
                    </div>
                  )}
                </div>

                <label className="absolute bottom-0 right-0 bg-zinc-900 text-white p-2.5 rounded-xl shadow-md cursor-pointer hover:bg-zinc-800 transition transform hover:scale-110 duration-150">
                  <Camera size={13} />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>

              <div>
                <h2 className="font-bold text-base tracking-tight text-zinc-900">{user.name}</h2>
                <span className="inline-flex items-center gap-1 mt-1.5 text-[9px] bg-zinc-100 text-zinc-600 font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-zinc-200/40">
                  <Shield size={10} className="text-zinc-500" /> Verified Identity
                </span>
              </div>
              
              <p className="text-[11px] text-zinc-400 leading-relaxed max-w-xs">
                Upload image assets directly into secure asset cloud systems. Changes cascade across active layout items instantly.
              </p>
            </div>

            {/* FINANCIAL CARD MODULE */}
            <div className="bg-white p-5 border border-zinc-200/60 rounded-2xl shadow-xs space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <CreditCard size={13} /> Ledger Wallet
              </h3>

              <div className="bg-zinc-950 text-white p-4 rounded-xl space-y-4 relative overflow-hidden shadow-md">
                <div className="absolute right-[-24px] bottom-[-24px] w-24 h-24 bg-white/5 rounded-full" />
                <div className="flex justify-between items-start">
                  <p className="text-[9px] tracking-widest uppercase opacity-50 font-bold">Premium Pass</p>
                  <span className="text-[10px] font-bold tracking-wider text-zinc-400">BAZAAR.</span>
                </div>
                <p className="font-mono text-sm tracking-xl my-1">••••  ••••  ••••  4821</p>
                <div className="flex justify-between items-end text-[10px] pt-1">
                  <span className="font-medium opacity-80">{user.name || "Default Holder"}</span>
                  <span className="opacity-40 font-mono">12/29</span>
                </div>
              </div>
            </div>

            {/* USER ENGAGEMENT Tier Matrix */}
            <div className="bg-white p-5 border border-zinc-200/60 rounded-2xl shadow-xs space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Award size={13} /> Club Rank
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-zinc-600">Gold Status Tier</span>
                  <span className="text-zinc-900">75%</span>
                </div>
                <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-zinc-900 h-full rounded-full" style={{ width: '75%' }} />
                </div>
                <p className="text-[10px] text-zinc-400 leading-snug">
                  Earn 250 extra reward units to clear the milestone requirement for institutional free distribution paths.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT PANELS LAYOUT CONTAINER */}
          <div className="lg:col-span-2 space-y-6">

            {/* REGISTRATION FORM */}
            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-xs">
              <form onSubmit={handleSaveChanges} className="space-y-5">
                <div className="flex justify-between items-center pb-3 border-b border-zinc-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Identity Directory
                  </h3>

                  <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-xs font-bold px-3 py-1 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 rounded-lg border transition duration-150"
                  >
                    {isEditing ? "Cancel Matrix" : "Edit Values"}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wide block">Client Full Name</label>
                    <div className="relative">
                      <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        disabled={!isEditing}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-zinc-50/50 focus:bg-white border border-zinc-200 rounded-xl text-xs font-medium outline-none transition focus:border-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-400"
                        placeholder="Not Provided"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wide block">Communication Line</label>
                    <div className="relative">
                      <Phone size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        disabled={!isEditing}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-zinc-50/50 focus:bg-white border border-zinc-200 rounded-xl text-xs font-medium outline-none transition focus:border-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-400"
                        placeholder="Not Provided"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wide block">Email Coordinates</label>
                    <div className="relative">
                      <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        disabled={!isEditing}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-zinc-50/50 focus:bg-white border border-zinc-200 rounded-xl text-xs font-medium outline-none transition focus:border-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-400"
                        placeholder="Not Provided"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wide block">Physical Distribution Address</label>
                    <div className="relative">
                      <MapPin size={13} className="absolute left-3.5 top-3.5 text-zinc-400" />
                      <textarea
                        rows="2"
                        disabled={!isEditing}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-zinc-50/50 focus:bg-white border border-zinc-200 rounded-xl text-xs font-medium outline-none transition focus:border-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-400 resize-none"
                        placeholder="Not Provided"
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="bg-zinc-900 hover:bg-zinc-800 transition text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl flex items-center gap-2 shadow-xs"
                    >
                      <Save size={13} /> Save Directory Changes
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* HISTORICAL PURCHASE MANIFESTS */}
            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <ShoppingBag size={14} /> Purchase Log Manifest
              </h3>

              <div className="divide-y divide-zinc-100">
                {[
                  { id: "BZR-98214", date: "June 04, 2026", cost: "$124.50", items: "Premium Tech Kit Module x1", status: "Delivered" },
                  { id: "BZR-91045", date: "May 28, 2026", cost: "$68.00", items: "Ergonomic Desk Apparatus x2", status: "In Transit" }
                ].map((order) => (
                  <div key={order.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-zinc-900 tracking-wide">{order.id}</span>
                        <span className="text-[10px] text-zinc-400 flex items-center gap-1 font-medium">
                          <Clock size={11} /> {order.date}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 font-medium">{order.items}</p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-5">
                      <span className="text-xs font-black text-zinc-900">{order.cost}</span>
                      <span className={`px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border ${
                        order.status === "Delivered" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/60" 
                          : "bg-amber-50 text-amber-700 border-amber-200/60"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* UTILITY SECURITY PROTOCOLS */}
            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Lock size={14} /> Security Framework Controls
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-zinc-100 hover:border-zinc-200 rounded-xl flex items-start gap-3.5 transition duration-150 group">
                  <div className="p-2 bg-zinc-50 rounded-xl text-zinc-700 group-hover:bg-zinc-100 transition">
                    <Key size={15} className="text-zinc-600" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-zinc-800">Password Encryption Key</h4>
                    <p className="text-zinc-400 text-[11px] leading-snug">Rotate validation credentials periodically to fortify your database record link.</p>
                    <button type="button" className="text-zinc-900 font-bold text-[10px] uppercase tracking-wider flex items-center gap-0.5 pt-1.5 hover:opacity-70">
                      Update Key <ArrowUpRight size={11} />
                    </button>
                  </div>
                </div>

                <div className="p-4 border border-zinc-100 hover:border-zinc-200 rounded-xl flex items-start gap-3.5 transition duration-150 group">
                  <div className="p-2 bg-zinc-50 rounded-xl text-zinc-700 group-hover:bg-zinc-100 transition">
                    <Smartphone size={15} className="text-zinc-600" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-zinc-800">Two-Factor Authentication</h4>
                    <p className="text-zinc-400 text-[11px] leading-snug">Introduce secondary validation protocols using direct multi-channel tokens.</p>
                    <button type="button" className="text-zinc-900 font-bold text-[10px] uppercase tracking-wider flex items-center gap-0.5 pt-1.5 hover:opacity-70">
                      Activate 2FA <ArrowUpRight size={11} />
                    </button>
                  </div>
                </div>
              </div>

              {/* RECORD DESTRUCTION */}
              <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-zinc-800 flex items-center gap-1">Decommission System Profile</h4>
                  <p className="text-zinc-400 text-[11px]">This step fully flushes and removes tracking files permanently from directory clusters.</p>
                </div>
                <button type="button" className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-xl transition">
                  <Trash2 size={12} /> Purge Records
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}