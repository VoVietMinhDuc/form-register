"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import BackgroundSlider from "@/components/shared/BackgroundSlider";
import LoadingScreen from "@/components/registration/LoadingScreen";
import MultiStepForm from "@/components/registration/MultiStepForm";

const images = ["/phoenix.jpg", "/phoenix1.jpg", "/phoenix2.jpg"];

const RegistrationPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  interface RegistrationData {
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
    confirmation?: string;
  }

  const handleSubmit = async (data: RegistrationData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // Show success modal in loading screen
        setShowSuccess(true);
        // Wait 5 seconds then redirect
        setTimeout(() => {
          setIsLoading(false);
          setShowSuccess(false);
          router.push("/");
        }, 5000);
      } else {
        setIsLoading(false);
        alert("Có lỗi xảy ra! Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      alert("Không thể kết nối đến server!");
    }
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen showSuccess={showSuccess} />}

      <motion.div
        className="relative min-h-screen overflow-hidden bg-[#050505]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background with Slider */}
        <BackgroundSlider images={images} interval={5000} />

        {/* Phoenix-themed overlay effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/95 via-[#090909]/90 to-[#050505]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,0,0,0.15),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(255,107,0,0.2),transparent_45%)]" />
        </div>

        {/* Content Overlay */}
        <motion.div
          className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-6 py-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-full max-w-4xl">
            {/* Form */}
            <MultiStepForm onSubmit={handleSubmit} />

            {/* Back Link */}
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={() => router.push("/")}
                className="text-white/80 hover:text-[#ff6b00] font-semibold transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tracking-wide"
              >
                ← Quay về trang chủ
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default RegistrationPage;
