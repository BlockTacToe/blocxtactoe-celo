"use client";

import { useSelfVerification } from "@/hooks/verification/useSelfVerification";
import { useVerifiedStatus } from "@/hooks/verification/useVerifiedStatus";
import { ShieldCheck, Loader2, Fingerprint } from "lucide-react";

export default function VerifyWithSelf() {
  const { isVerifying, startVerification } = useSelfVerification();
  const { isVerified } = useVerifiedStatus();

  if (isVerified) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <ShieldCheck className="w-5 h-5 text-blue-400" />
        <span className="text-blue-400 font-medium text-sm">Identity Verified</span>
      </div>
    );
  }

  return (
    <button
      onClick={startVerification}
      disabled={isVerifying}
      className={`
        relative group overflow-hidden px-6 py-2.5 rounded-xl border transition-all duration-300
        ${isVerifying 
          ? "bg-blue-900/40 border-blue-500/30 cursor-wait" 
          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border-transparent shadow-lg hover:shadow-blue-500/20"}
      `}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        {isVerifying ? (
          <>
            <Loader2 className="w-5 h-5 text-white animate-spin" />
            <span className="text-white font-medium">Verifying...</span>
          </>
        ) : (
          <>
            <Fingerprint className="w-5 h-5 text-white" />
            <span className="text-white font-bold">Verify with Self</span>
          </>
        )}
      </div>
      
      {/* Glow effect */}
      {!isVerifying && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      )}
    </button>
  );
}
