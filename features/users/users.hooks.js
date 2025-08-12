import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
    onSuccess: () => {
      queryClient.invalidateQueries(["users", "list"]);
    },
    onError: (error) => {
      console.error("Create user error:", error);
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
    },
    onError: (error) => {
      console.error("Update user error:", error);
    },
  });
};

// Delete user mutation
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users", "list"]);
    },
    onError: (error) => {
      console.error("Delete user error:", error);
    },
  });
};
