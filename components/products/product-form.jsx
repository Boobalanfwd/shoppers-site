"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Save, Package, Upload, Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Validation schema
const productSchema = yup
  .object({
    name: yup.string().required("Product name is required"),
    sku: yup.string().required("SKU is required"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
    type: yup.string().required("Product type is required"),
    price: yup.number().positive("Price must be positive").required("Price is required"),
    comparePrice: yup.number().positive("Compare price must be positive").nullable(),
    costPrice: yup.number().positive("Cost price must be positive").nullable(),
    stock: yup.number().integer("Stock must be a whole number").min(0, "Stock cannot be negative").nullable(),
    weight: yup.number().positive("Weight must be positive").nullable(),
    dimensions: yup.object({
      length: yup.number().positive("Length must be positive").nullable(),
      width: yup.number().positive("Width must be positive").nullable(),
      height: yup.number().positive("Height must be positive").nullable(),
    }),
    seoTitle: yup.string(),
    seoDescription: yup.string(),
    isPublished: yup.boolean(),
    isFeatured: yup.boolean(),
    hasVariants: yup.boolean(),
  })
  .required();

const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Education" },
  { id: 4, name: "Home & Garden" },
  { id: 5, name: "Sports" },
];

const productTypes = [
  { id: 1, name: "Physical Product" },
  { id: 2, name: "Digital Product" },
  { id: 3, name: "Service" },
];

const attributes = [
  { id: 1, name: "Color", type: "dropdown", values: ["Red", "Blue", "Green", "Black", "White"] },
  { id: 2, name: "Size", type: "dropdown", values: ["XS", "S", "M", "L", "XL", "XXL"] },
  { id: 3, name: "Material", type: "text" },
  { id: 4, name: "Weight", type: "numeric" },
];

export default function ProductForm({ product = null, onClose, onSuccess }) {
  const [activeTab, setActiveTab] = useState("general");
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [variants, setVariants] = useState([]);
  const [images, setImages] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      category: "",
      type: "",
      price: "",
      comparePrice: "",
      costPrice: "",
      stock: "",
      weight: "",
      dimensions: {
        length: "",
        width: "",
        height: "",
      },
      seoTitle: "",
      seoDescription: "",
      isPublished: false,
      isFeatured: false,
      hasVariants: false,
    },
  });

  const hasVariants = watch("hasVariants");

  useEffect(() => {
    if (product) {
      reset({
        name: product.name || "",
        sku: product.sku || "",
        description: product.description || "",
        category: product.category || "",
        type: product.type || "",
        price: product.price || "",
        comparePrice: product.comparePrice || "",
        costPrice: product.costPrice || "",
        stock: product.stock || "",
        weight: product.weight || "",
        dimensions: {
          length: product.dimensions?.length || "",
          width: product.dimensions?.width || "",
          height: product.dimensions?.height || "",
        },
        seoTitle: product.seoTitle || "",
        seoDescription: product.seoDescription || "",
        isPublished: product.isPublished || false,
        isFeatured: product.isFeatured || false,
        hasVariants: product.hasVariants || false,
      });
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    try {
      console.log("Product data:", data);
      // Here you would typically call your API
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      file,
      isPrimary: images.length === 0 && index === 0,
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (imageId) => {
    setImages(images.filter(img => img.id !== imageId));
  };

  const setPrimaryImage = (imageId) => {
    setImages(images.map(img => ({
      ...img,
      isPrimary: img.id === imageId,
    })));
  };

  const addAttribute = (attribute) => {
    if (!selectedAttributes.find(attr => attr.id === attribute.id)) {
      setSelectedAttributes([...selectedAttributes, attribute]);
    }
  };

  const removeAttribute = (attributeId) => {
    setSelectedAttributes(selectedAttributes.filter(attr => attr.id !== attributeId));
  };

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
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border"
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">
                  {product ? "Edit Product" : "Add New Product"}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  {product ? "Update product information" : "Create a new product"}
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>

                {/* General Tab */}
                <TabsContent value="general" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Product Name *
                      </Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Enter product name"
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sku" className="text-sm font-medium">
                        SKU *
                      </Label>
                      <Input
                        id="sku"
                        {...register("sku")}
                        placeholder="Enter SKU"
                        className={errors.sku ? "border-red-500" : ""}
                      />
                      {errors.sku && (
                        <p className="text-sm text-red-500">{errors.sku.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-sm font-medium">
                        Category *
                      </Label>
                      <Select
                        value={watch("category")}
                        onValueChange={(value) => setValue("category", value)}
                      >
                        <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-red-500">{errors.category.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-sm font-medium">
                        Product Type *
                      </Label>
                      <Select
                        value={watch("type")}
                        onValueChange={(value) => setValue("type", value)}
                      >
                        <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select product type" />
                        </SelectTrigger>
                        <SelectContent>
                          {productTypes.map((type) => (
                            <SelectItem key={type.id} value={type.name}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.type && (
                        <p className="text-sm text-red-500">{errors.type.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      {...register("description")}
                      placeholder="Enter product description"
                      rows={4}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">{errors.description.message}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasVariants"
                        {...register("hasVariants")}
                      />
                      <Label htmlFor="hasVariants" className="text-sm font-medium">
                        This product has variants
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isPublished"
                        {...register("isPublished")}
                      />
                      <Label htmlFor="isPublished" className="text-sm font-medium">
                        Published
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isFeatured"
                        {...register("isFeatured")}
                      />
                      <Label htmlFor="isFeatured" className="text-sm font-medium">
                        Featured product
                      </Label>
                    </div>
                  </div>
                </TabsContent>

                {/* Pricing Tab */}
                <TabsContent value="pricing" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-sm font-medium">
                        Price *
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        {...register("price")}
                        placeholder="0.00"
                        className={errors.price ? "border-red-500" : ""}
                      />
                      {errors.price && (
                        <p className="text-sm text-red-500">{errors.price.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comparePrice" className="text-sm font-medium">
                        Compare Price
                      </Label>
                      <Input
                        id="comparePrice"
                        type="number"
                        step="0.01"
                        {...register("comparePrice")}
                        placeholder="0.00"
                        className={errors.comparePrice ? "border-red-500" : ""}
                      />
                      {errors.comparePrice && (
                        <p className="text-sm text-red-500">{errors.comparePrice.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="costPrice" className="text-sm font-medium">
                        Cost Price
                      </Label>
                      <Input
                        id="costPrice"
                        type="number"
                        step="0.01"
                        {...register("costPrice")}
                        placeholder="0.00"
                        className={errors.costPrice ? "border-red-500" : ""}
                      />
                      {errors.costPrice && (
                        <p className="text-sm text-red-500">{errors.costPrice.message}</p>
                      )}
                    </div>
                  </div>
                </TabsContent>

                {/* Inventory Tab */}
                <TabsContent value="inventory" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="stock" className="text-sm font-medium">
                        Stock Quantity
                      </Label>
                      <Input
                        id="stock"
                        type="number"
                        {...register("stock")}
                        placeholder="0"
                        className={errors.stock ? "border-red-500" : ""}
                      />
                      {errors.stock && (
                        <p className="text-sm text-red-500">{errors.stock.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight" className="text-sm font-medium">
                        Weight (kg)
                      </Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.01"
                        {...register("weight")}
                        placeholder="0.00"
                        className={errors.weight ? "border-red-500" : ""}
                      />
                      {errors.weight && (
                        <p className="text-sm text-red-500">{errors.weight.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Dimensions (cm)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="length" className="text-sm text-gray-600">
                          Length
                        </Label>
                        <Input
                          id="length"
                          type="number"
                          step="0.01"
                          {...register("dimensions.length")}
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="width" className="text-sm text-gray-600">
                          Width
                        </Label>
                        <Input
                          id="width"
                          type="number"
                          step="0.01"
                          {...register("dimensions.width")}
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height" className="text-sm text-gray-600">
                          Height
                        </Label>
                        <Input
                          id="height"
                          type="number"
                          step="0.01"
                          {...register("dimensions.height")}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Attributes Section */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Attributes</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-600">Available Attributes</Label>
                        <div className="space-y-2">
                          {attributes.map((attribute) => (
                            <div
                              key={attribute.id}
                              className="flex items-center justify-between p-2 border rounded-md"
                            >
                              <div>
                                <p className="font-medium">{attribute.name}</p>
                                <p className="text-sm text-gray-500">{attribute.type}</p>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addAttribute(attribute)}
                                disabled={selectedAttributes.find(attr => attr.id === attribute.id)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm text-gray-600">Selected Attributes</Label>
                        <div className="space-y-2">
                          {selectedAttributes.map((attribute) => (
                            <div
                              key={attribute.id}
                              className="flex items-center justify-between p-2 border rounded-md bg-gray-50"
                            >
                              <div>
                                <p className="font-medium">{attribute.name}</p>
                                <p className="text-sm text-gray-500">{attribute.type}</p>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeAttribute(attribute.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          {selectedAttributes.length === 0 && (
                            <p className="text-sm text-gray-400 text-center py-4">
                              No attributes selected
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Media Tab */}
                <TabsContent value="media" className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Product Images</Label>
                    
                    {/* Image Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Drag and drop images here, or click to select
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button type="button" variant="outline" className="cursor-pointer">
                          Choose Images
                        </Button>
                      </label>
                    </div>

                    {/* Image Gallery */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((image) => (
                          <div key={image.id} className="relative group">
                            <img
                              src={image.url}
                              alt="Product"
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            {image.isPrimary && (
                              <Badge className="absolute top-1 left-1 text-xs">
                                Primary
                              </Badge>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <div className="flex space-x-2">
                                <Button
                                  type="button"
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => setPrimaryImage(image.id)}
                                  disabled={image.isPrimary}
                                >
                                  Set Primary
                                </Button>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeImage(image.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* SEO Tab */}
                <TabsContent value="seo" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="seoTitle" className="text-sm font-medium">
                        SEO Title
                      </Label>
                      <Input
                        id="seoTitle"
                        {...register("seoTitle")}
                        placeholder="Enter SEO title"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seoDescription" className="text-sm font-medium">
                        SEO Description
                      </Label>
                      <Textarea
                        id="seoDescription"
                        {...register("seoDescription")}
                        placeholder="Enter SEO description"
                        rows={3}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-6 border-t mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting
                    ? "Saving..."
                    : product
                    ? "Update Product"
                    : "Create Product"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
