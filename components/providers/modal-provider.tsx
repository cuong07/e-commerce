"use client";

import { useEffect, useState } from "react";
import { ErrorModal } from "@/components/modals/error-modal";

export const ModalProvider = () => {
  const [isMounted, setItMounted] = useState(false);

  useEffect(() => {
    setItMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <ErrorModal />
    </>
  );
};
