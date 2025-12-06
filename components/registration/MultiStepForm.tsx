"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";

interface FormData {
  fullName: string;
  studentId: string;
  phone: string;
  email: string;
  facebookLink: string;
  house: string;
  major: string;
  experience: string;
  goal: string;
  expectation: string;
  confirmation: string;
}

interface FormField {
  name: keyof FormData;
  label: string;
  type: "text" | "email" | "tel" | "url" | "select" | "radio" | "textarea";
  required: boolean;
  placeholder?: string;
  maxLength?: number;
  options?: string[];
}

interface MultiStepFormProps {
  onSubmit: (data: FormData) => void;
}

const MultiStepForm = ({ onSubmit }: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Bước 2: Thông tin cá nhân
    fullName: "",
    studentId: "",
    phone: "",
    email: "",
    facebookLink: "",
    house: "",
    // Bước 3: Chuyên ngành
    major: "",
    // Bước 4: Kinh nghiệm
    experience: "",
    // Bước 5: Mục tiêu và kỳ vọng
    goal: "",
    expectation: "",
    // Bước 6: Xác nhận
    confirmation: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation schemas for each step
  const validationSchemas = [
    // Step 0: Info only - no validation
    z.object({}),
    // Step 1: Personal Information
    z.object({
      fullName: z
        .string()
        .min(1, "Vui lòng nhập họ và tên")
        .max(100, "Họ và tên không được vượt quá 100 ký tự"),
      studentId: z
        .string()
        .min(1, "Vui lòng nhập MSSV")
<<<<<<<< HEAD:components/registration/MultiStepForm.tsx
        .regex(/^[A-Z]{2}\d{6}$/, "MSSV không đúng định dạng"),
========
        .regex(/^[A-Za-z]{2}\d{6}$/, "MSSV không đúng định dạng"),
>>>>>>>> 42bcc281e0bd2347cd4a968b025020fbb50fc214:components/client/MultiStepForm.tsx
      phone: z
        .string()
        .min(1, "Vui lòng nhập số điện thoại")
        .regex(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số"),
      email: z
        .string()
        .min(1, "Vui lòng nhập email")
        .max(100, "Email không được vượt quá 100 ký tự")
        .email("Email không hợp lệ"),
      facebookLink: z
        .string()
        .min(1, "Vui lòng nhập link Facebook")
        .max(200, "Link Facebook không được vượt quá 200 ký tự")
        .url("Link không hợp lệ"),
      house: z.string().min(1, "Vui lòng chọn nhà"),
    }),
    // Step 2: Major
    z.object({
      major: z
        .string()
        .min(1, "Vui lòng chọn chuyên ngành bạn muốn tham gia trải nghiệm"),
    }),
    // Step 3: Experience
    z.object({
      experience: z.string().min(1, "Vui lòng không để trống"),
    }),
    // Step 4: Goals and Expectations
    z.object({
      goal: z
        .string()
        .min(1, "Vui lòng nhập mục tiêu")
        .max(250, "Mục tiêu không được vượt quá 250 ký tự"),
      expectation: z
        .string()
        .min(1, "Vui lòng nhập kỳ vọng")
        .max(250, "Kỳ vọng không được vượt quá 250 ký tự"),
    }),
    // Step 5: Confirmation
    z.object({
      confirmation: z.string().min(1, "Vui lòng xác nhận thông tin"),
    }),
  ];

  interface Step {
    title: string;
    isInfoOnly?: boolean;
    content?: string;
    fields: FormField[];
  }

  const steps: Step[] = [
    {
      title: "Thông Tin Sự Kiện",
      isInfoOnly: true,
      content: `Dự án RISE SPACE hỗ trợ tân sinh viên tiếp cận kiến thức nền tảng của các khối ngành, giúp bạn xây dựng định hướng phát triển cá nhân ngay từ những ngày đầu đại học.\n\nNội dung chương trình tập trung vào các kiến thức CƠ BẢN NHẤT của từng ngành, phù hợp cho người mới bắt đầu.\n\nKết quả mong đợi:\n• Nắm vững các khái niệm nền tảng để tiếp tục phát triển kỹ năng chuyên ngành.\n• Được hỗ trợ và nâng cao khả năng tự học, chủ động khám phá tri thức.`,
      fields: [],
    },
    {
      title: "Thông Tin Cá Nhân",
      fields: [
        {
          name: "fullName",
          label: "Họ và Tên của bạn là?",
          type: "text",
          required: true,
          placeholder: "Nguyễn Văn A",
        },
        {
          name: "studentId",
          label: "MSSV của bạn là? (VD: SE210210)",
          type: "text",
          required: true,
          placeholder: "SE210210",
        },
        {
          name: "phone",
          label: "SĐT của bạn là?",
          type: "tel",
          required: true,
          placeholder: "0123456789",
        },
        {
          name: "email",
          label: "Email của bạn là gì?",
          type: "email",
          required: true,
          placeholder: "example@example.com",
        },
        {
          name: "facebookLink",
          label: "Link Facebook của bạn là?",
          type: "url",
          required: true,
          placeholder: "https://www.facebook.com/phoenixhousefptuhcmc",
        },
        {
          name: "house",
          label: "Bạn là tân sinh viên thuộc nhà nào?",
          type: "select",
          required: true,
          options: ["Faerie", "Phoenix", "Thunderbird", "Unicorn"],
        },
      ],
    },
    {
      title: "Chọn Chuyên Ngành",
      fields: [
        {
          name: "major",
          label: "Chọn lớp bạn muốn đăng ký",
          type: "radio",
          required: true,
          options: [
            "C Programming Basics",
            "Python Programming Basics",
            "The Art of Visual Narrative",
            "Art & Design Tools",
            "Soft Skills",
            "Japanese",
            "Chinese",
          ],
        },
      ],
    },
    {
      title: "Kinh Nghiệm",
      fields: [
        {
          name: "experience",
          label:
            "Bạn đã từng tiếp xúc qua kiến thức của lớp bạn đã chọn chưa? (Nội dung kiến thức chỉ xoay quanh những kiến thức ở mức CƠ BẢN NHẤT)",
          type: "radio",
          required: true,
          options: ["Đã tiếp xúc và học", "Chưa tiếp xúc"],
        },
      ],
    },
    {
      title: "Mục Tiêu và Kỳ Vọng",
      fields: [
        {
          name: "goal",
          label: "Mục tiêu của bạn khi tham gia dự án RISE SPACE lần này?",
          type: "textarea",
          required: true,
          placeholder: "Vui lòng nhập mục tiêu của bạn",
          maxLength: 250,
        },
        {
          name: "expectation",
          label: "Bạn kỳ vọng sẽ đạt được những gì sau khi tham gia dự án?",
          type: "textarea",
          required: true,
          placeholder: "Vui lòng nhập kỳ vọng của bạn",
          maxLength: 250,
        },
      ],
    },
    {
      title: "Xác Nhận Thông Tin",
      fields: [
        {
          name: "confirmation",
          label: "Bạn chắc chắn với thông tin đã điền?",
          type: "radio",
          required: true,
          options: ["Chắc chắn"],
        },
      ],
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const formattedValue = name === "studentId" ? value.toUpperCase() : value;
    setFormData({
      ...formData,
      [name]: formattedValue,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Check email existence via API
  const checkEmailExists = async (email: string) => {
    if (!email) return false;
    try {
      const res = await fetch(
        `/api/check-email?email=${encodeURIComponent(email)}`
      );
      if (!res.ok) {
        // treat non-OK as failure to check
        return Promise.reject(new Error("Không thể kiểm tra email"));
      }
      const json = await res.json();
      return !!json?.exists;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const handleEmailBlur = async (value: string) => {
    // clear previous email error first
    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));

    const email = value?.trim();
    if (!email) return;

    try {
      const exists = await checkEmailExists(email);
      if (exists) {
        setErrors((prev) => ({ ...prev, email: "Email đã được sử dụng" }));
      }
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, email: "Không thể kiểm tra email" }));
    }
  };

  const handleNext = () => {
    // Validate current step before moving forward
    const currentSchema = validationSchemas[currentStep];
    const result = currentSchema.safeParse(formData);

    if (!result.success) {
      // Extract errors from zod
      const newErrors: Record<string, string> = {};
      if (result.error?.issues) {
        result.error.issues.forEach((issue: z.ZodIssue) => {
          if (issue.path[0]) {
            newErrors[issue.path[0] as string] = issue.message;
          }
        });
      }
      setErrors(newErrors);
      return;
    }

    // Clear errors and proceed
    setErrors({});
    // If this is the Personal Information step, ensure email isn't taken
    const proceed = async () => {
      if (currentStep === 1) {
        try {
          const exists = await checkEmailExists(formData.email);
          if (exists) {
            setErrors({ email: "Email đã được sử dụng" });
            return;
          }
        } catch (err) {
          setErrors({ email: "Không thể kiểm tra email" });
          return;
        }
      }

      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    };

    void proceed();
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmit = () => {
    const submit = async () => {
      // Final check for email before submit
      try {
        const exists = await checkEmailExists(formData.email);
        if (exists) {
          setErrors({ email: "Email đã được sử dụng" });
          return;
        }
      } catch (err) {
        setErrors({ email: "Không thể kiểm tra email" });
        return;
      }

      onSubmit(formData);
    };

    void submit();
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Form Content with Header Inside */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFinalSubmit();
        }}
        className="relative rounded-[32px] border border-[#ff6b00]/40 bg-gradient-to-br from-[#111111]/95 via-[#090909]/95 to-[#111111]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(255,0,0,0.25)] overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff0000]/10 via-transparent to-[#ff6b00]/10 pointer-events-none" />

        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-[#ff0000] via-[#ff6b00] to-[#ffd86b] px-8 md:px-12 py-8 text-black">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff0000]/90 via-[#ff6b00]/90 to-[#ffd86b]/90" />
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
              ĐĂNG KÝ THAM GIA RISE SPACE
            </h1>
            <p className="text-black/90 text-sm md:text-base font-medium">
              Dự án hỗ trợ sinh viên trải nghiệm sớm các môn học chuyên ngành và
              định hướng phát triển bản thân.
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative px-8 md:px-12 pt-8">
          <div className="flex gap-2 mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex-1">
                <div
                  className={`h-2 rounded-full transition-all ${
                    index <= currentStep
                      ? "bg-gradient-to-r from-[#ff0000] via-[#ff6b00] to-[#ffd86b] shadow-[0_0_10px_rgba(255,107,0,0.5)]"
                      : "bg-white/10"
                  }`}
                />
                <p
                  className={`text-xs mt-2 font-medium text-center transition-colors ${
                    index <= currentStep ? "text-[#ff6b00]" : "text-white/40"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            className="px-8 md:px-12 py-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-black text-white mb-6 tracking-tight">
              {currentStepData.title}
            </h2>

            {/* Info Only Section */}
            {currentStepData.isInfoOnly ? (
              <div className="bg-gradient-to-r from-[#ff0000]/10 via-[#ff6b00]/10 to-[#ffd86b]/10 border-l-4 border-[#ff6b00] p-6 rounded-lg backdrop-blur-sm">
                <p className="text-white/90 leading-relaxed whitespace-pre-line font-medium">
                  {currentStepData.content}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {currentStepData.fields.map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="block text-base font-semibold text-white/90 mb-2"
                    >
                      {field.label}
                      {field.required && (
                        <span className="text-[#ff6b00] ml-1">*</span>
                      )}
                    </label>

                    {field.type === "radio" ? (
                      <>
                        <div className="space-y-3">
                          {field.options?.map((option: string) => {
                            const descriptions: Record<string, string> = {
                              "C Programming Basics":
                                "Phù hợp với nhóm ngành KTPM (SE), Vi mạch bán dẫn (IC), Hệ thống thông tin (IS), Công nghệ ô tô số (AS)",
                              "Python Programming Basics":
                                "Phù hợp với nhóm ngành Trí tuệ nhân tạo (AI), Chuyển đối số (DX), An toàn thông tin (IA)",
                              "The Art of Visual Narrative":
                                "Phù hợp với nhóm ngành Thiết kế mỹ thuật số (GD) và người có đam mê mỹ thuật",
                              "Art & Design Tools":
                                "Phù hợp với nhóm ngành Truyền Thông đa phương tiện (MC) và người đã biết vẽ tay",
                              "Soft Skills":
                                "Là kiến thức bắt buộc có với mọi ngành thuộc trường ĐH FPT. Soft skills giúp sinh viên phát triển các kỹ năng nền tảng như giao tiếp, làm việc nhóm, tư duy phản biện, quản lý thời gian và thuyết trình — những kỹ năng quan trọng trong học tập và môi trường làm việc thực tế.",
                              Japanese:
                                "Là ngôn ngữ chắc chắn được tiếp xúc khi theo chuyên ngành KTPM (SE), Hệ thống thông tin (IS), Công nghệ ô tô số (AS), Thiết kế mỹ thuật số (GD), Trí tuệ nhân tạo (AI), Chuyển đối số (DX), An toàn thông tin (IA)",
                              Chinese:
                                "Là ngôn ngữ chắc chắn được tiếp xúc khi theo chuyên ngành Vi mạch bán dẫn (IC), Khối ngành Kinh tế (IB), Khối ngành Truyền thông (MC)",
                            };

                            const isSelected =
                              formData[field.name as keyof typeof formData] ===
                              option;

                            return (
                              <label
                                key={option}
                                className={`flex flex-col gap-2 p-4 border rounded-lg cursor-pointer transition-all backdrop-blur-sm ${
                                  errors[field.name]
                                    ? "border-[#ff0000] ring-2 ring-[#ff0000]/30 bg-[#ff0000]/10"
                                    : isSelected
                                    ? "border-[#ff6b00] bg-[#ff6b00]/10 ring-2 ring-[#ff6b00]/30"
                                    : "border-white/20 bg-white/5 hover:bg-white/10 hover:border-[#ff6b00]/50"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <input
                                    type="radio"
                                    name={field.name}
                                    value={option}
                                    checked={isSelected}
                                    onChange={handleChange}
                                    required={field.required}
                                    className="w-5 h-5 text-[#ff6b00] focus:ring-[#ff6b00] accent-[#ff6b00]"
                                  />
                                  <span className="text-base text-white/90 font-semibold">
                                    {option}
                                  </span>
                                </div>
                                {isSelected && descriptions[option] && (
                                  <p className="pl-8 text-sm text-white/80 leading-relaxed">
                                    {descriptions[option]}
                                  </p>
                                )}
                              </label>
                            );
                          })}
                        </div>
                        {errors[field.name] && (
                          <p className="mt-2 text-sm text-[#ff6b00] font-medium">
                            {errors[field.name]}
                          </p>
                        )}
                      </>
                    ) : field.type === "select" ? (
                      <>
                        <select
                          id={field.name}
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          required={field.required}
                          className={`w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:outline-none transition-all bg-white/5 backdrop-blur-sm text-white placeholder:text-white/40 ${
                            errors[field.name]
                              ? "border-[#ff0000] ring-2 ring-[#ff0000]/30 focus:ring-[#ff0000] focus:border-[#ff0000]"
                              : "border-white/20 focus:ring-[#ff6b00] focus:border-[#ff6b00]"
                          }`}
                        >
                          <option value="" className="bg-[#111111] text-white">
                            -- Vui lòng chọn --
                          </option>
                          {field.options?.map((option: string) => (
                            <option
                              key={option}
                              value={option}
                              className="bg-[#111111] text-white"
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                        {errors[field.name] && (
                          <p className="mt-2 text-sm text-[#ff6b00] font-medium">
                            {errors[field.name]}
                          </p>
                        )}
                      </>
                    ) : field.type === "textarea" ? (
                      <>
                        <div className="relative">
                          <textarea
                            id={field.name}
                            name={field.name}
                            value={
                              formData[field.name as keyof typeof formData]
                            }
                            onChange={handleChange}
                            required={field.required}
                            rows={4}
                            maxLength={field.maxLength}
                            className={`w-full ${
                              field.name === "goal" ||
                              field.name === "expectation"
                                ? "px-5 py-4 pb-10"
                                : "px-4 py-3 pb-8"
                            } text-base border rounded-lg focus:ring-2 focus:outline-none transition-all resize-none bg-white/5 backdrop-blur-sm text-white placeholder:text-white/40 ${
                              errors[field.name]
                                ? "border-[#ff0000] ring-2 ring-[#ff0000]/30 focus:ring-[#ff0000] focus:border-[#ff0000]"
                                : "border-white/20 focus:ring-[#ff6b00] focus:border-[#ff6b00]"
                            }`}
                            placeholder={
                              field.placeholder ||
                              `Nhập ${field.label.toLowerCase()}`
                            }
                          />
                          {field.maxLength && (
                            <div className="absolute bottom-2 right-3 text-xs text-white/50 pointer-events-none">
                              {
                                (
                                  formData[
                                    field.name as keyof typeof formData
                                  ] as string
                                ).length
                              }
                              /{field.maxLength}
                            </div>
                          )}
                        </div>
                        {errors[field.name] && (
                          <p className="mt-2 text-sm text-[#ff6b00] font-medium">
                            {errors[field.name]}
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <input
                          id={field.name}
                          type={field.type}
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          onBlur={(e) =>
                            field.name === "email" &&
                            handleEmailBlur(e.currentTarget.value)
                          }
                          required={field.required}
                          className={`w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:outline-none transition-all bg-white/5 backdrop-blur-sm text-white placeholder:text-white/40 ${
                            errors[field.name]
                              ? "border-[#ff0000] ring-2 ring-[#ff0000]/30 focus:ring-[#ff0000] focus:border-[#ff0000]"
                              : "border-white/20 focus:ring-[#ff6b00] focus:border-[#ff6b00]"
                          }`}
                          placeholder={
                            field.placeholder ||
                            `Nhập ${field.label.toLowerCase()}`
                          }
                        />
                        {errors[field.name] && (
                          <p className="mt-2 text-sm text-[#ff6b00] font-medium">
                            {errors[field.name]}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 backdrop-blur-sm text-white/80 font-semibold rounded-lg border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed w-full sm:w-auto justify-center shadow-sm"

              >
                <span>←</span>{" "}
                <span className="hidden sm:inline">Quay Lại</span>
                <span className="sm:hidden">Quay lại</span>
              </button>

              <div className="text-xs sm:text-sm text-white/60 font-medium order-first sm:order-0">
                Bước {currentStep + 1} / {steps.length}
              </div>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#ff0000] via-[#ff6b00] to-[#ffd86b] text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(255,107,0,0.6)] transition-all shadow-md w-full sm:w-auto justify-center tracking-tight"
                >
                  <span className="hidden sm:inline">Tiếp Theo</span>
                  <span className="sm:hidden">Tiếp theo</span> <span>→</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#ff0000] via-[#ff6b00] to-[#ffd86b] text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(255,107,0,0.6)] transition-all shadow-md w-full sm:w-auto justify-center tracking-tight"
                >
                  <span className="hidden sm:inline">Đăng ký</span>
                  <span className="sm:hidden">Đăng ký</span> <span>✓</span>
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </form>
    </div>
  );
};

export default MultiStepForm;
