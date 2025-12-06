"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { forwardRef } from "react";
import { motion, MotionProps } from "framer-motion";

type MotionButtonProps = ButtonProps & MotionProps;

const BaseMotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>((props, ref) => {
  return <Button ref={ref} {...props} />;
});

BaseMotionButton.displayName = "BaseMotionButton";

export const MotionButton = motion(BaseMotionButton);

