"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Save, User, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCreateUser, useUpdateUser } from "@/features/users/users.hooks";

// Validation schema
const userSchema = yup
  .object({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email address"),
    password: yup
      .string()
      .when("$isEditing", {
        is: false,
        then: (schema) => schema.required("Password is required"),
        otherwise: (schema) => schema.optional(),
      })
      .when("$isEditing", {
        is: false,
        then: (schema) => 
          schema
            .min(6, "Password must be at least 6 characters")
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
              "Password must contain at least one uppercase letter, one lowercase letter, and one number"
            ),
        otherwise: (schema) => schema,
      }),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .when("$isEditing", {
        is: false,
        then: (schema) => schema.required("Please confirm your password"),
        otherwise: (schema) => schema.optional(),
      }),
    role: yup
      .string()
      .required("Role is required")
      .oneOf(["admin", "customer"], "Please select a valid role"),
    gender: yup
      .string()
      .nullable()
      .oneOf(["male", "female", "other", null], "Please select a valid gender"),
    dob: yup
      .date()
      .nullable()
      .max(new Date(), "Date of birth cannot be in the future"),
  })
  .required();

export default function UserForm({ user = null, onClose, onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(userSchema),
    context: { isEditing: !!user },
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "customer",
      gender: "",
      dob: "",
    },
  });



  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
        role: user.role || "customer",
        gender: user.gender || "",
        dob: user.dob ? new Date(user.dob).toISOString().split("T")[0] : "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const submitData = {
        name: data.name,
        email: data.email,
        role: data.role,
        gender: data.gender === "" ? null : data.gender,
        dob: data.dob ? new Date(data.dob) : null,
      };

      // Only include password if provided (for updates) or required (for new users)
      if (data.password) {
        submitData.passwordHash = data.password;
      }

      if (user) {
        await updateUserMutation.mutateAsync({
          userId: user.id,
          userData: submitData,
        });
      } else {
        await createUserMutation.mutateAsync(submitData);
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Error saving user:", error);
      // You can add toast notification here
    }
  };

  const isLoading =
    isSubmitting ||
    createUserMutation.isLoading ||
    updateUserMutation.isLoading;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border"
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">
                  {user ? "Edit User" : "Add New User"}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  {user
                    ? "Update user information"
                    : "Create a new user account"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter full name"
                  className={`${
                    errors.name ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter email address"
                  className={`${
                    errors.email ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field - Only show for new users */}
              {!user && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password *
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        placeholder="Enter password"
                        className={`pr-10 ${
                          errors.password
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password Field - Only for new users */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium"
                    >
                      Confirm Password *
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                        placeholder="Confirm password"
                        className={`pr-10 ${
                          errors.confirmPassword
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Role Field */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">
                  Role *
                </Label>
                <Select
                  value={watch("role")}
                  onValueChange={(value) => setValue("role", value)}
                >
                  <SelectTrigger
                    className={errors.role ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          Customer
                        </Badge>
                        <span>Regular user account</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive" className="text-xs">
                          Admin
                        </Badge>
                        <span>Administrator account</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.role.message}
                  </p>
                )}
              </div>

                                            {/* Gender Field */}
               <div className="space-y-2">
                 <Label htmlFor="gender" className="text-sm font-medium">
                   Gender
                 </Label>
                 <Select
                   value={watch("gender")}
                   onValueChange={(value) => setValue("gender", value)}
                 >
                   <SelectTrigger>
                     <SelectValue placeholder="Select gender (optional)" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="male">Male</SelectItem>
                     <SelectItem value="female">Female</SelectItem>
                     <SelectItem value="other">Other</SelectItem>
                   </SelectContent>
                 </Select>
                 {errors.gender && (
                   <p className="text-sm text-red-500 flex items-center gap-1">
                     <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                     {errors.gender.message}
                   </p>
                 )}
               </div>

              {/* Date of Birth Field */}
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-sm font-medium">
                  Date of Birth
                </Label>
                <Input
                  id="dob"
                  type="date"
                  {...register("dob")}
                  className={
                    errors.dob ? "border-red-500 focus:border-red-500" : ""
                  }
                />
                {errors.dob && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.dob.message}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading
                    ? "Saving..."
                    : user
                    ? "Update User"
                    : "Create User"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
