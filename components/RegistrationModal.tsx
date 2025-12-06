"use client";

import { useState } from "react";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Bước 1: Thông tin cá nhân
    fullName: "",
    email: "",
    phone: "",
    // Bước 2: Thông tin sự kiện
    eventType: "",
    participantCount: "",
    eventDate: "",
    // Bước 3: Thông tin bổ sung
    organization: "",
    message: "",
  });

  const steps = [
    {
      title: "Thông Tin Cá Nhân",
      fields: [
        { name: "fullName", label: "Họ và Tên", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Số Điện Thoại", type: "tel", required: true },
      ],
    },
    {
      title: "Thông Tin Sự Kiện",
      fields: [
        {
          name: "eventType",
          label: "Loại Sự Kiện",
          type: "select",
          required: true,
          options: ["Workshop", "Hội Thảo", "Networking", "Khác"],
        },
        {
          name: "participantCount",
          label: "Số Lượng Người Tham Gia",
          type: "number",
          required: true,
        },
        {
          name: "eventDate",
          label: "Ngày Dự Kiến",
          type: "date",
          required: true,
        },
      ],
    },
    {
      title: "Thông Tin Bổ Sung",
      fields: [
        {
          name: "organization",
          label: "Tổ Chức/Công Ty",
          type: "text",
          required: false,
        },
        {
          name: "message",
          label: "Ghi Chú",
          type: "textarea",
          required: false,
        },
      ],
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Xử lý submit form ở đây
    alert("Đăng ký thành công!");
    onClose();
    setCurrentStep(0);
  };

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-orange-500 to-red-500 px-8 py-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Đăng Ký Sự Kiện</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors text-2xl font-bold"
            >
              ×
            </button>
          </div>
          {/* Progress Bar */}
          <div className="mt-4 flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-all ${
                  index <= currentStep ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form
          onSubmit={handleSubmit}
          className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {currentStepData.title}
          </h3>

          <div className="space-y-6">
            {currentStepData.fields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                {field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="">Chọn loại sự kiện</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    required={field.required}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                    placeholder={`Nhập ${field.label.toLowerCase()}`}
                  />
                ) : (
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder={`Nhập ${field.label.toLowerCase()}`}
                  />
                )}
              </div>
            ))}
          </div>
        </form>

        {/* Footer Navigation */}
        <div className="border-t border-gray-200 px-8 py-6 bg-gray-50 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 font-semibold rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>←</span> Quay Lại
          </button>

          <div className="text-sm text-gray-500 font-medium">
            Bước {currentStep + 1} / {steps.length}
          </div>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all"
            >
              Tiếp Theo <span>→</span>
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all"
            >
              Hoàn Thành <span>✓</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
