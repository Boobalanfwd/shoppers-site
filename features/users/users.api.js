import api from "../../lib/api";

// API Functions for Users

// Fetch all users with search and pagination
export const fetchUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};

// Fetch single user
export const fetchUser = async (userId) => {
  const { data } = await api.get(`/users/${userId}`);
  return data;
};

// Create user
export const createUser = async (userData) => {
  const { data } = await api.post("/users", userData);
  return data;
};

// Update user
export const updateUser = async ({ userId, userData }) => {
  const { data } = await api.put(`/users/${userId}`, userData);
  return data;
};

// Delete user
export const deleteUser = async (userId) => {
  const { data } = await api.delete(`/users/${userId}`);
  return data;
};
