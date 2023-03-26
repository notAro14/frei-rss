"use client";

import { IconButton } from "@radix-ui/themes";
import { MoveUp } from "lucide-react";
import { useState, useEffect } from "react";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setIsVisible(scrollTop > 700);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <IconButton
          className="fixed bottom-7 right-8 z-50"
          onClick={scrollToTop}
        >
          <MoveUp size={"1em"} />
        </IconButton>
      )}
    </>
  );
};
