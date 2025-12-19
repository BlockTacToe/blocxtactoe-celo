"use client";

import { useVerifiedStatus } from "@/hooks/verification/useVerifiedStatus";
import { BadgeCheck } from "lucide-react";
import { Address } from "viem";

interface VerificationBadgeProps {
  address: Address;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function VerificationBadge({ 
  address, 
  size = "md", 
  showLabel = false 
}: VerificationBadgeProps) {
  const { isVerified } = useVerifiedStatus(address);

  if (!isVerified) return null;

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-center gap-1.5" title="Verified Unique Human via Self Protocol">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500 blur-[4px] opacity-50 rounded-full"></div>
        <BadgeCheck className={`${sizeClasses[size]} text-blue-400 relative z-10 fill-blue-500/10`} />
      </div>
      {showLabel && (
        <span className={`font-medium text-blue-400 ${size === "sm" ? "text-xs" : "text-sm"}`}>
          Verified
        </span>
      )}
    </div>
  );
}
