import { toEther } from "thirdweb";

interface ClaimCondition {
  pricePerToken?: string | number | bigint;
}

export const getPrice = (quantity: number, claimCondition: ClaimCondition) => {
    if (!claimCondition || !claimCondition.pricePerToken) return "0";
    const total = quantity * parseInt(claimCondition?.pricePerToken?.toString() || "0");
    return toEther(BigInt(total));
  };