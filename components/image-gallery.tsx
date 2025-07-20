"use client";

import { useTheme } from "@/contexts/theme-context";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    setZoom(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setZoom(1);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isModalOpen) return;

    switch (e.key) {
      case "Escape":
        closeModal();
        break;
      case "ArrowRight":
        nextImage();
        break;
      case "ArrowLeft":
        prevImage();
        break;
    }
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 3));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 0.5));

  useState(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative aspect-video rounded-xl overflow-hidden group transition-colors duration-300 cursor-pointer ${
              theme === "dark" ? "bg-gray-900" : "bg-gray-200"
            }`}
            onClick={() => openModal(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="absolute top-4 left-4 z-20 flex gap-2">
              <button
                onClick={zoomOut}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                disabled={zoom <= 0.5}
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={zoomIn}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                disabled={zoom >= 3}
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>

            {images.length > 1 && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-black/50 text-white text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}

            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{
                  transform: `scale(${zoom})`,
                  transition: "transform 0.3s ease",
                }}
              >
                <Image
                  src={images[currentImageIndex].src}
                  alt={images[currentImageIndex].alt}
                  fill
                  className="object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
