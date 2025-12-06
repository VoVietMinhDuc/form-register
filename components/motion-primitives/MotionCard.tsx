"use client";

import { Card, type CardProps } from "@/components/ui/card";
import { forwardRef } from "react";
import { motion, type MotionProps } from "framer-motion";

type MotionCardProps = CardProps & MotionProps;

const BaseMotionCard = forwardRef<HTMLDivElement, MotionCardProps>((props, ref) => {
  return <Card ref={ref} {...props} />;
});

BaseMotionCard.displayName = "BaseMotionCard";

export const MotionCard = motion(BaseMotionCard);

