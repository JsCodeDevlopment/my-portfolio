"use client";

import { useTheme } from "@/contexts/theme-context";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

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

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 5));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 0.5));
  const resetZoom = () => setZoom(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown as any);
      return () => window.removeEventListener("keydown", handleKeyDown as any);
    }
  }, [isModalOpen]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative rounded-3xl overflow-hidden group transition-all duration-300 cursor-pointer ${
              theme === "dark"
                ? "bg-gradient-to-br from-gray-900/40 via-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-800/30"
                : "bg-gradient-to-br from-white/40 via-gray-50/40 to-white/40 backdrop-blur-xl border border-gray-300/30"
            } shadow-2xl hover:shadow-neon-green/10 hover:scale-[1.02]`}
            style={{
              clipPath:
                "polygon(0% 0%, 100% 0%, 100% 98%, 98% 100%, 2% 100%, 0% 98%)",
              minHeight: "400px",
              maxHeight: "600px",
            }}
            onClick={() => openModal(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white">
                <ZoomIn className="w-5 h-5" />
                <span className="text-sm font-mono">Clique para ampliar</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={closeModal}
          />
          <div className="relative z-10 w-full h-full">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-30 p-3 rounded-xl bg-black/70 text-white hover:bg-black/90 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-xl bg-black/70 text-white hover:bg-black/90 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-xl bg-black/70 text-white hover:bg-black/90 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="absolute top-6 left-6 z-30 flex flex-col gap-2">
              <button
                onClick={zoomIn}
                className="p-3 rounded-xl bg-black/70 text-white hover:bg-black/90 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={zoom >= 5}
                title="Zoom In (+)"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={zoomOut}
                className="p-3 rounded-xl bg-black/70 text-white hover:bg-black/90 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={zoom <= 0.5}
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={resetZoom}
                className="p-3 rounded-xl bg-black/70 text-white hover:bg-black/90 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10"
                title="Reset Zoom"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            {images.length > 1 && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 px-6 py-3 rounded-full bg-black/70 text-white text-sm font-mono backdrop-blur-sm border border-white/10">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}

            {zoom !== 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-black/70 text-white text-xs font-mono backdrop-blur-sm border border-white/10">
                {Math.round(zoom * 100)}%
              </div>
            )}

            <div
              className="relative w-full h-full overflow-auto"
              onClick={(e) => e.stopPropagation()}
              style={{
                padding: "4rem",
              }}
            >
              <div
                className="relative flex items-center justify-center"
                style={{
                  transform: `scale(${zoom})`,
                  transition: "transform 0.3s ease",
                  transformOrigin: "center center",
                  minWidth: `${100 / zoom}%`,
                  minHeight: `${100 / zoom}%`,
                  width: "fit-content",
                  height: "fit-content",
                }}
              >
                <div
                  className="relative"
                  style={{
                    maxWidth: "calc(100vw - 8rem)",
                    maxHeight: "calc(100vh - 8rem)",
                    width: "auto",
                    height: "auto",
                  }}
                >
                  <Image
                    src={images[currentImageIndex].src}
                    alt={images[currentImageIndex].alt}
                    width={1920}
                    height={1080}
                    className="object-contain"
                    style={{
                      width: "auto",
                      height: "auto",
                      maxWidth: "100%",
                      maxHeight: "calc(100vh - 8rem)",
                    }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
