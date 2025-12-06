"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GiFireBowl } from "react-icons/gi";
import { FaFire } from "react-icons/fa";

interface LoadingScreenProps {
  showSuccess?: boolean;
}

const LoadingScreen = ({ showSuccess = false }: LoadingScreenProps) => {
  // Generate 8 fire particles (every 45 degrees)
  const fireParticles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: i * 45, // 0, 45, 90, 135, 180, 225, 270, 315
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-orange-50 via-white to-red-50">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Fire particles */}
          {fireParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transformOrigin: "center",
              }}
              animate={{
                rotate: [particle.angle, particle.angle + 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <motion.div
                className="relative"
                style={{
                  x: -24, // Center the icon
                  y: -24,
                }}
                animate={{
                  x: [-24, 100], // Move outward from center
                  y: [-24, -24],
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1.2, 1.2, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut",
                  times: [0, 0.2, 0.8, 1],
                }}
              >
                <FaFire className="w-12 h-12 text-orange-500" />
              </motion.div>
            </motion.div>
          ))}

          {/* Loading text */}
          {!showSuccess && (
            <motion.div className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-center">
              <motion.p
                className="text-orange-600 font-bold text-2xl whitespace-nowrap mb-2"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Đang gửi đăng ký
              </motion.p>
              <p className="text-orange-500 text-sm">
                Vui lòng chờ trong giây lát...
              </p>
            </motion.div>
          )}
        </div>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-50 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop blur */}
              <motion.div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Modal Card */}
              <motion.div
                className="relative bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center border border-gray-100"
                initial={{ scale: 0.5, y: 100, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: 50, opacity: 0 }}
                transition={{
                  type: "spring",
                  duration: 0.6,
                  bounce: 0.4,
                }}
              >
                {/* Decorative circles */}
                <div className="absolute -top-2 -right-2 w-24 h-24 bg-orange-100 rounded-full opacity-50 blur-2xl" />
                <div className="absolute -bottom-2 -left-2 w-32 h-32 bg-green-100 rounded-full opacity-50 blur-2xl" />

                {/* Success Icon */}
                <motion.div
                  className="relative w-24 h-24 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.2,
                    type: "spring",
                    duration: 0.8,
                    bounce: 0.5,
                  }}
                >
                  <motion.svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="text-3xl font-bold bg-linear-to-r from-green-600 to-green-500 bg-clip-text text-transparent mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Đăng ký thành công!
                </motion.h2>

                {/* Message */}
                <motion.p
                  className="text-gray-600 text-lg mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Vui lòng check mail thường xuyên để nhận thông tin chi tiết
                </motion.p>

                {/* Loading bar */}
                <motion.div className="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-linear-to-r from-green-400 to-green-600 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.6, duration: 4.4, ease: "linear" }}
                  />
                </motion.div>

                {/* Footer text */}
                <motion.p
                  className="text-sm text-gray-500 flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    ⟳
                  </motion.span>
                  Đang chuyển về trang chủ...
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoadingScreen;
