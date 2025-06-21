"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent, DragEvent } from "react";
import {
  Upload,
  X,
  Plus,
  Tag,
  Package,
  DollarSign,
  FileText,
  Camera,
  ArrowLeft,
  ImageIcon,
} from "lucide-react";

interface FormData {
  name: string;
  description: string;
  price: string;
  currency: string;
  category: string;
  brand: string;
  sku: string;
  quantity: string;
  status: "active" | "inactive" | "draft";
  tags: string[];
  specifications: Array<{ key: string; value: string }>;
}

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    currency: "LAK",
    category: "",
    brand: "",
    sku: "",
    quantity: "",
    status: "active",
    tags: [],
    specifications: [{ key: "", value: "" }],
  });

  // รูปปก (รูปเดียว)
  const [coverImage, setCoverImage] = useState<ImageFile | null>(null);
  // รูปตัวอย่าง (หลายรูป - สูงสุด 6 รูป)
  const [galleryImages, setGalleryImages] = useState<ImageFile[]>([]);
  
  const [newTag, setNewTag] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([
    "อิเล็กทรอนิกส์",
    "เสื้อผ้า",
    "อาหารและเครื่องดื่ม",
    "เครื่องใช้ในบ้าน",
    "หนังสือ",
    "กีฬาและออกกำลังกาย",
    "ความงามและของใช้ส่วนตัว",
    "รถยนต์และอะไหล่",
    "เด็กและของเล่น",
    "สัตว์เลี้ยง",
  ]);

  const currencies = [
    { code: "LAK", symbol: "₭", name: "กีบ" },
    { code: "THB", symbol: "฿", name: "บาท" },
    { code: "USD", symbol: "$", name: "ดอลลาร์" },
  ];

  const MAX_GALLERY_IMAGES = 6;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    
    if (name === "category" && value === "other") {
      setShowCategoryModal(true);
      return;
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const router = useRouter();

  const goToPath = (path: string) => {
    router.push(path);
  };

  // จัดการรูปปก (รูปเดียว)
  const handleCoverImageUpload = (files: FileList | null): void => {
    if (!files || files.length === 0) return;

    // ลบ URL เก่าถ้ามี
    if (coverImage) {
      URL.revokeObjectURL(coverImage.preview);
    }

    const file = files[0];
    const newImage: ImageFile = {
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
    };
    
    setCoverImage(newImage);
  };

  // จัดการรูปตัวอย่าง (หลายรูป - สูงสุด 6 รูป)
  const handleGalleryImagesUpload = (files: FileList | null): void => {
    if (!files || files.length === 0) return;

    const remainingSlots = MAX_GALLERY_IMAGES - galleryImages.length;
    
    if (remainingSlots <= 0) {
      alert(`สามารถอัพโหลดรูปตัวอย่างได้สูงสุด ${MAX_GALLERY_IMAGES} รูปเท่านั้น`);
      return;
    }

    const filesToProcess = Math.min(files.length, remainingSlots);
    const newImages: ImageFile[] = [];
    
    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i];
      const newImage: ImageFile = {
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9),
      };
      newImages.push(newImage);
    }
    
    if (files.length > remainingSlots) {
      alert(`สามารถเพิ่มได้อีก ${remainingSlots} รูปเท่านั้น จากทั้งหมด ${files.length} รูปที่เลือก`);
    }
    
    setGalleryImages((prev) => [...prev, ...newImages]);
  };

  // ลบรูปปก
  const removeCoverImage = (): void => {
    if (coverImage) {
      URL.revokeObjectURL(coverImage.preview);
      setCoverImage(null);
    }
  };

  // ลบรูปตัวอย่าง
  const removeGalleryImage = (imageId: string): void => {
    const imageToRemove = galleryImages.find(img => img.id === imageId);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    setGalleryImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleCoverImageDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleCoverImageUpload(e.dataTransfer.files);
    }
  };

  const handleGalleryImageDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleGalleryImagesUpload(e.dataTransfer.files);
    }
  };

  const addTag = (): void => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string): void => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const addSpecification = (): void => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { key: "", value: "" }],
    }));
  };

  const updateSpecification = (
    index: number,
    field: "key" | "value",
    value: string
  ): void => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) =>
        i === index ? { ...spec, [field]: value } : spec
      ),
    }));
  };

  const removeSpecification = (index: number): void => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    console.log("Product Data:", formData);
    console.log("Cover Image:", coverImage);
    console.log("Gallery Images:", galleryImages);
    alert("สินค้าถูกเพิ่มเรียบร้อยแล้ว!");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const addNewCategory = (): void => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const updatedCategories = [...categories, newCategory.trim()];
      setCategories(updatedCategories);
      setFormData((prev) => ({
        ...prev,
        category: newCategory.trim(),
      }));
      setNewCategory("");
      setShowCategoryModal(false);
    }
  };

  const closeCategoryModal = (): void => {
    setShowCategoryModal(false);
    setNewCategory("");
  };

  const canAddMoreGalleryImages = galleryImages.length < MAX_GALLERY_IMAGES;

  return (
    <section>
      <div className="k h-[3rem] md:h-[3.82rem] bg-[#181818] text-[#fff] flex items-center justify-between sticky top-0 z-1000 px-4">
        <div className="k w-2.5">
          <ArrowLeft onClick={() => goToPath("/mystore")} />
        </div>
        <div className="k">
          <div className="k md:!text-[1.2rem] font-bold">Add Product</div>
        </div>
        <div className="k w-2.5"></div>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="mx-auto px-4 py-5">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              เพิ่มสินค้าใหม่
            </h1>
            <p className="text-gray-600">
              กรอกข้อมูลสินค้าของคุณเพื่อเพิ่มลงในระบบ
            </p>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <Package className="w-6 h-6 text-blue-600 mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-900">
                      ข้อมูลพื้นฐาน
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ชื่อสินค้า *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="กรุณากรอกชื่อสินค้า"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        หมวดหมู่ *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      >
                        <option value="">เลือกหมวดหมู่</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                        <option value="other">เพิ่มหมวดหมู่ใหม่</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        แบรนด์
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="กรุณากรอกแบรนด์"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        รหัสสินค้า (SKU)
                      </label>
                      <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="SKU-001"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ราคา *
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="0"
                            min="0"
                            required
                          />
                        </div>
                        <select
                          name="currency"
                          value={formData.currency}
                          onChange={handleInputChange}
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-w-[120px]"
                        >
                          {currencies.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                              {currency.symbol} {currency.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        คำอธิบาย
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="อธิบายรายละเอียดสินค้า..."
                      />
                    </div>
                  </div>
                </div>

                {/* Cover Image */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <ImageIcon className="w-6 h-6 text-green-600 mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-900">
                      รูปปกสินค้า
                    </h2>
                    <span className="ml-2 text-sm text-gray-500">(รูปหลัก 1 รูป)</span>
                  </div>

                  {!coverImage && (
                    <div
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                        dragActive
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleCoverImageDrop}
                    >
                      <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        เลือกรูปปกสินค้า
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        ลากและวางรูปภาพที่นี่ หรือคลิกเพื่อเลือกไฟล์
                      </p>
                      <label className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
                        <Upload className="w-5 h-5 mr-2" />
                        เลือกรูปปก
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleCoverImageUpload(e.target.files)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}

                  {coverImage && (
                    <div className="space-y-4">
                      <div className="relative group max-w-md mx-auto">
                        <img
                          src={coverImage.preview}
                          alt="Cover Preview"
                          className="w-full h-64 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={removeCoverImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-center">
                        <label className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          เปลี่ยนรูปปก
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleCoverImageUpload(e.target.files)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Gallery Images */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <Camera className="w-6 h-6 text-purple-600 mr-3" />
                      <h2 className="text-2xl font-semibold text-gray-900">
                        รูปตัวอย่างสินค้า
                      </h2>
                      <span className="ml-2 text-sm text-gray-500">(สูงสุด {MAX_GALLERY_IMAGES} รูป)</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {galleryImages.length}/{MAX_GALLERY_IMAGES} รูป
                    </div>
                  </div>

                  {canAddMoreGalleryImages && (
                    <div
                      className={`border-2 border-dashed rounded-xl p-6 text-center transition-all mb-6 ${
                        dragActive
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleGalleryImageDrop}
                    >
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        เพิ่มรูปตัวอย่างสินค้า
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        ลากและวางรูปภาพหลายๆ รูปที่นี่ หรือ
                      </p>
                      <label className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer text-sm">
                        <Upload className="w-4 h-4 mr-2" />
                        เลือกรูปตัวอย่าง ({MAX_GALLERY_IMAGES - galleryImages.length} รูปที่เหลือ)
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleGalleryImagesUpload(e.target.files)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}

                  {!canAddMoreGalleryImages && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                      <p className="text-amber-800 text-sm text-center">
                        🎉 คุณได้อัพโหลดรูปตัวอย่างครบ {MAX_GALLERY_IMAGES} รูปแล้ว! 
                        หากต้องการเพิ่มรูปใหม่ กรุณาลบรูปเก่าออกก่อน
                      </p>
                    </div>
                  )}

                  {galleryImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                      {galleryImages.map((image, index) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.preview}
                            alt={`Gallery Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(image.id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Inventory */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    คลังสินค้า
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        จำนวนในคลัง
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        สถานะ
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="active">เปิดใช้งาน</option>
                        <option value="inactive">ปิดใช้งาน</option>
                        <option value="draft">แบบร่าง</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Tag className="w-5 h-5 text-orange-600 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      แท็ก
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="เพิ่มแท็ก"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-2 text-orange-600 hover:text-orange-800"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  เพิ่มสินค้า
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-[90%]">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              เพิ่มหมวดหมู่ใหม่
            </h3>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addNewCategory();
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all mb-4"
              placeholder="กรอกชื่อหมวดหมู่ใหม่"
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={closeCategoryModal}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={addNewCategory}
                disabled={!newCategory.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                เพิ่ม
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}