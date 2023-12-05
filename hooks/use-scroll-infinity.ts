import { useEffect, useState } from "react";
type ScrollScrollInfinityProps = {
  productRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
};
export const useScrollInfinity = ({
  productRef,
  bottomRef,
  count,
  loadMore,
  shouldLoadMore,
}: ScrollScrollInfinityProps) => {};
