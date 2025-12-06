"use client";

import { useState } from "react";
<<<<<<<< HEAD:components/registration/RegistrationButton.tsx

import Button from "@/components/ui/button";

========
import { Button } from "@/components/ui/button"; // Dùng button của shadcn/ui
>>>>>>>> 42bcc281e0bd2347cd4a968b025020fbb50fc214:components/RegistrationButton.tsx
import RegistrationModal from "./RegistrationModal";

const RegistrationButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        size="lg"
        onClick={() => setIsModalOpen(true)}
        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-6 text-lg shadow-2xl transition-all hover:scale-105"
      >
        Đăng Ký Ngay
      </Button>
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default RegistrationButton;
