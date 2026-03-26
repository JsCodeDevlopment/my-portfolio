"use client";

import { publicKey, serviseId, templateId } from "@/constants/emailJs.const";
import { useTheme } from "@/contexts/theme-context";
import { useTranslation } from "@/hooks/use-translation";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

const contactFormSchema = z.object({
  user_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  user_email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      user_name: "",
      user_email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSending(true);

    try {
      const form = document.createElement("form");
      Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      await emailjs.sendForm(serviseId, templateId, form, publicKey);

      reset();
      toast.success("Message sent successfully! ✌", {
        autoClose: 3000,
        theme: theme === "dark" ? "dark" : "light",
      });
    } catch (error) {
      toast.error("Something went wrong! 🤦‍♂️", {
        autoClose: 3000,
        theme: theme === "dark" ? "dark" : "light",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`relative w-full p-8 lg:p-12 rounded-[3.5rem] transition-all duration-700 overflow-hidden border ${
        theme === "dark"
          ? "bg-[#0c0c0d]/80 border-white/[0.05] hover:border-neon-green/30"
          : "bg-white border-black/[0.05] hover:border-black/10 shadow-2xl"
      } backdrop-blur-3xl`}
    >
      <div className="relative z-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Name Field */}
          <div className="space-y-4">
             <label className={`text-[10px] font-mono font-black uppercase tracking-[0.4em] ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
                Your Name
             </label>
             <div className="relative">
                <input
                  id="user_name"
                  {...register("user_name")}
                  placeholder={t("contact", "name_placeholder")}
                  className={`w-full bg-transparent border-b-2 py-4 px-1 text-lg lg:text-xl font-bold transition-all duration-500 placeholder:text-gray-600 focus:outline-none ${
                    theme === "dark" ? "border-white/10 text-white focus:border-neon-green" : "border-black/10 text-black focus:border-neon-green"
                  } ${errors.user_name ? "border-red-500 focus:border-red-500" : ""}`}
                  type="text"
                  disabled={isSending}
                />
                {errors.user_name && <p className="mt-2 text-[10px] text-red-500 uppercase tracking-widest font-black">{errors.user_name.message}</p>}
             </div>
          </div>

          {/* Email Field */}
          <div className="space-y-4">
             <label className={`text-[10px] font-mono font-black uppercase tracking-[0.4em] ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
                Email Address
             </label>
             <div className="relative">
                <input
                  id="user_email"
                  {...register("user_email")}
                  placeholder={t("contact", "email_placeholder")}
                  className={`w-full bg-transparent border-b-2 py-4 px-1 text-lg lg:text-xl font-bold transition-all duration-500 placeholder:text-gray-600 focus:outline-none ${
                    theme === "dark" ? "border-white/10 text-white focus:border-neon-green" : "border-black/10 text-black focus:border-neon-green"
                  } ${errors.user_email ? "border-red-500 focus:border-red-500" : ""}`}
                  type="email"
                  disabled={isSending}
                />
                {errors.user_email && <p className="mt-2 text-[10px] text-red-500 uppercase tracking-widest font-black">{errors.user_email.message}</p>}
             </div>
          </div>
        </div>

        {/* Message Field */}
        <div className="space-y-4 pt-4">
           <label className={`text-[10px] font-mono font-black uppercase tracking-[0.4em] ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
              The Project / Message
           </label>
           <div className="relative">
              <textarea
                id="message"
                {...register("message")}
                placeholder={t("contact", "message_placeholder")}
                rows={4}
                className={`w-full bg-transparent border-b-2 py-4 px-1 text-lg lg:text-xl font-bold transition-all duration-500 placeholder:text-gray-600 focus:outline-none resize-none ${
                  theme === "dark" ? "border-white/10 text-white focus:border-neon-green" : "border-black/10 text-black focus:border-neon-green"
                } ${errors.message ? "border-red-500 focus:border-red-500" : ""}`}
                disabled={isSending}
              />
              {errors.message && <p className="mt-2 text-[10px] text-red-500 uppercase tracking-widest font-black">{errors.message.message}</p>}
           </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSending}
          className={`group mt-12 relative w-full overflow-hidden rounded-full py-6 transition-all duration-500 flex items-center justify-center gap-4 ${
            isSending
              ? "opacity-70 cursor-not-allowed bg-neon-green/50 text-gray-300"
              : "bg-neon-green text-black hover:bg-neon-green-bright hover:scale-[1.02] hover:shadow-2xl hover:shadow-neon-green/30"
          }`}
        >
          {isSending ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-sm font-black uppercase tracking-[0.4em]">{t("contact", "sending")}</span>
            </>
          ) : (
            <>
              <span className="text-sm font-black uppercase tracking-[0.6em]">{t("contact", "send")}</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-3" />
            </>
          )}
          
          {/* Shimmer Effect */}
          {!isSending && (
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          )}
        </button>
      </div>

      {/* Decorative Glow inside the card */}
      <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 rounded-full transition-all duration-700 pointer-events-none ${
        theme === "dark" ? "bg-neon-green" : "bg-neon-green/50"
      }`} />
    </form>
  );
}
