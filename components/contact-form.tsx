"use client";

import { publicKey, serviseId, templateId } from "@/constants/emailJs.const";
import { useTheme } from "@/contexts/theme-context";
import { useTranslation } from "@/hooks/use-translation";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

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

interface EmailJSResponse {
  text: string;
  status: number;
}

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

      const result = await emailjs.sendForm(
        serviseId,
        templateId,
        form,
        publicKey
      );

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
      className={`group relative rounded-3xl p-8 transition-all duration-700 overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900/40 via-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-800/30 hover:border-neon-green/20"
          : "bg-gradient-to-br from-white/40 via-gray-50/40 to-white/40 backdrop-blur-xl border border-gray-300/30 hover:border-neon-green/40"
      } shadow-2xl hover:shadow-neon-green/10`}
      style={{
        clipPath:
          "polygon(0% 0%, 100% 0%, 100% 98%, 98% 100%, 2% 100%, 0% 98%)",
      }}
    >
      <div
        className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100 opacity-30 ${
          theme === "dark" ? "bg-neon-green/20" : "bg-neon-green/15"
        }`}
      />
      <div
        className={`absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100 opacity-20 ${
          theme === "dark" ? "bg-neon-green/15" : "bg-neon-green/10"
        }`}
      />

      <div className="relative z-10 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="user_name"
              className={`block text-sm font-semibold transition-colors duration-300 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {t("contact", "name")}
            </label>
            <div className="relative">
              <input
                id="user_name"
                {...register("user_name")}
                placeholder={t("contact", "name_placeholder")}
                className={`w-full border rounded-xl px-4 py-3.5 placeholder-gray-500 focus:border-neon-green focus:outline-none transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800/40 border-gray-700/50 text-white hover:border-gray-600 focus:bg-gray-800/60"
                    : "bg-gray-100/60 border-gray-300/50 text-black hover:border-gray-400 focus:bg-white/80"
                } ${
                  errors.user_name ? "border-red-500 focus:border-red-500" : ""
                }`}
                type="text"
                disabled={isSending}
              />
              {errors.user_name && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span>•</span>
                  {errors.user_name.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="user_email"
              className={`block text-sm font-semibold transition-colors duration-300 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {t("contact", "email")}
            </label>
            <div className="relative">
              <input
                id="user_email"
                {...register("user_email")}
                placeholder={t("contact", "email_placeholder")}
                className={`w-full border rounded-xl px-4 py-3.5 placeholder-gray-500 focus:border-neon-green focus:outline-none transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800/40 border-gray-700/50 text-white hover:border-gray-600 focus:bg-gray-800/60"
                    : "bg-gray-100/60 border-gray-300/50 text-black hover:border-gray-400 focus:bg-white/80"
                } ${
                  errors.user_email ? "border-red-500 focus:border-red-500" : ""
                }`}
                type="email"
                disabled={isSending}
              />
              {errors.user_email && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span>•</span>
                  {errors.user_email.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className={`block text-sm font-semibold transition-colors duration-300 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {t("contact", "message")}
          </label>
          <div className="relative">
            <textarea
              id="message"
              {...register("message")}
              placeholder={t("contact", "message_placeholder")}
              rows={6}
              className={`w-full border rounded-xl px-4 py-3.5 placeholder-gray-500 focus:border-neon-green focus:outline-none transition-all duration-300 resize-none ${
                theme === "dark"
                  ? "bg-gray-800/40 border-gray-700/50 text-white hover:border-gray-600 focus:bg-gray-800/60"
                  : "bg-gray-100/60 border-gray-300/50 text-black hover:border-gray-400 focus:bg-white/80"
              } ${errors.message ? "border-red-500 focus:border-red-500" : ""}`}
              disabled={isSending}
            />
            {errors.message && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <span>•</span>
                {errors.message.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSending}
          className={`group/btn relative w-full overflow-hidden rounded-xl font-bold py-4 transition-all duration-300 flex items-center justify-center gap-2 ${
            isSending
              ? "opacity-70 cursor-not-allowed bg-neon-green/50 text-gray-300"
              : theme === "dark"
              ? "bg-neon-green text-black hover:bg-neon-green-bright hover:scale-[1.02] hover:shadow-lg hover:shadow-neon-green/50"
              : "bg-neon-green text-black hover:bg-neon-green-bright hover:scale-[1.02] hover:shadow-lg hover:shadow-neon-green/50"
          }`}
        >
          {isSending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t("contact", "sending")}</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              <span>{t("contact", "send")}</span>
            </>
          )}
          {!isSending && (
            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          )}
        </button>
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl overflow-hidden">
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            border: "2px solid rgba(20, 184, 166, 0.2)",
            filter: "blur(8px)",
            clipPath:
              "polygon(0% 0%, 100% 0%, 100% 98%, 98% 100%, 2% 100%, 0% 98%)",
          }}
        />
      </div>
    </form>
  );
}
