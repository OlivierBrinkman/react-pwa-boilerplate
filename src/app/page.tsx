"use client";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log(
              "Service Worker registered with scope:",
              registration.scope
            );
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error);
          });
      });
    }
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-40">
      <div className="flex flex-col text-center gap-2 mt-[45%] md:mt-[15%]">
        <h1 className="text-4xl md:text-6xl font-bold">
          React PWA Boilerplate
        </h1>
        <p className="text-l md:text-2xl">
          Install this web application when prompted to test PWA installability.
        </p>
      </div>
    </div>
  );
}
