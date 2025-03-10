import { toEther } from "thirdweb";

export const getPrice = (quantity: number, claimCondition: any) => {
    if (!claimCondition || !claimCondition.pricePerToken) return "0";
    const total = quantity * parseInt(claimCondition?.pricePerToken?.toString() || "0");
    return toEther(BigInt(total));
  };