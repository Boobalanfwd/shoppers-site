import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
} from "./users.api";

// Fetch all users with search and pagination
export const useUsers = () => {
  return useQuery({
    queryKey: ["users", "list"],
    queryFn: () => fetchUsers(),
    keepPreviousData: true,
  });
};

// Fetch single user
export const useUser = (userId) => {
  return useQuery({
    queryKey: ["users", "detail", userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });
};

// Create user mutation
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["users", "list"]);
      toast.success("User created successfully!", {
        description: `${data.name} has been added to the system.`,
      });
    },
    onError: (error) => {
      console.error("Create user error:", error);
      toast.error("Failed to create user", {
        description: error.message || "Something went wrong. Please try again.",
      });
    },
  });
};

// Update user mutation
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["users", "list"]);
      queryClient.invalidateQueries(["users", "detail", variables.userId]);
      toast.success("User updated successfully!", {
        description: `${data.name}'s information has been updated.`,
      });
    },
    onError: (error) => {
      console.error("Update user error:", error);
      toast.error("Failed to update user", {
        description: error.message || "Something went wrong. Please try again.",
      });
    },
  });
};

// Delete user mutation
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["users", "list"]);
      toast.success("User deleted successfully!", {
        description: "The user has been removed from the system.",
      });
    },
    onError: (error) => {
      console.error("Delete user error:", error);
      toast.error("Failed to delete user", {
        description: error.message || "Something went wrong. Please try again.",
      });
    },
  });
};
