"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MultiStepForm from "@/components/client/MultiStepForm";
import BackgroundSlider from "@/components/client/BackgroundSlider";
import LoadingScreen from "@/components/LoadingScreen";
import { motion } from "framer-motion";

const images = ["/phoenix.jpg", "/phoenix1.jpg", "/phoenix2.jpg"];

const RegistrationPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (data: any) => {
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
        className="relative min-h-screen overflow-hidden bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background with Slider */}
        <BackgroundSlider images={images} interval={5000} />

        {/* Content Overlay */}
        <motion.div
          className="relative z-10 min-h-screen py-12 px-4 md:px-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="container mx-auto">
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
                className="text-white hover:text-orange-300 font-semibold transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
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
