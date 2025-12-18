"use client";

import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/accounts/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong");
      } else {
        setMessage(`User ${data.username} registered successfully!`);
        setForm({
          username: "",
          email: "",
          first_name: "",
          last_name: "",
          password: "",
        });
      }
    } catch {
      setMessage("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center mb-4">Register</h2>

        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700 font-medium">First Name</span>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Last Name</span>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Username</span>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
              required
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Register
        </button>

        {message && (
          <p className="text-center text-red-600 mt-2 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
}
