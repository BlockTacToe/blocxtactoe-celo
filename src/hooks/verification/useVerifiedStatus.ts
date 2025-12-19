"use client";

import { useAccount, useReadContract } from "wagmi";
import { Address } from "viem";
import { CONTRACT_ADDRESS } from "@/config/constants";
import blocxtactoeAbiArtifact from "@/abi/blocxtactoeabi.json";
import { useMemo } from "react";

const blocxtactoeAbi = (blocxtactoeAbiArtifact as { abi: unknown[] }).abi;

export function useVerifiedStatus(playerAddress?: Address) {
  const { address: connectedAddress } = useAccount();
  const targetAddress = playerAddress || connectedAddress;

  // In a real implementation, we would check the contract's verification mapping
  // For this demo, we'll mock it based on local storage or simply randomly for other players
  // ex: const { data: isVerified } = useReadContract({ ... });

  // Mock verification status
  // We'll treat the specific dummy admin addresses as "Verified" for demo purposes
  const isVerified = useMemo(() => {
    if (!targetAddress) return false;
    
    const addr = targetAddress.toLowerCase();
    // Verify our specific dummy addresses or the current user if they just verified (mocked via local state elsewhere)
    return (
      addr === "0xa421d9ae4945c63d4353f74a689a55813f993603" || 
      addr === "0x0ee1f2b663547daa487f57c517c7563adcf86da0"
    );
  }, [targetAddress]);

  return {
    isVerified,
    verificationLevel: isVerified ? "human" : "unverified",
    timestamp: isVerified ? 1715000000 : 0, // Mock timestamp
  };
}
