"use client";

import { publicKey, serviseId, templateId } from "@/constants/emailJs.const";
import { useTheme } from "@/contexts/theme-context";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label 
            htmlFor="user_name"
            className={`block mb-2 text-sm font-medium ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Name
          </label>
          <input
            id="user_name"
            {...register("user_name")}
            placeholder="John Doe"
            className={`w-full border rounded-lg px-4 py-3 placeholder-gray-500 focus:border-neon-green focus:outline-none transition-colors duration-300 ${
              theme === "dark"
                ? "bg-gray-900 border-gray-700 text-white hover:border-gray-600"
                : "bg-white border-gray-300 text-black hover:border-gray-400"
            } ${errors.user_name ? "border-red-500" : ""}`}
            type="text"
            disabled={isSending}
          />
          {errors.user_name && (
            <p className="mt-1 text-sm text-red-500">{errors.user_name.message}</p>
          )}
        </div>
        <div>
          <label 
            htmlFor="user_email"
            className={`block mb-2 text-sm font-medium ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Email
          </label>
          <input
            id="user_email"
            {...register("user_email")}
            placeholder="john@example.com"
            className={`w-full border rounded-lg px-4 py-3 placeholder-gray-500 focus:border-neon-green focus:outline-none transition-colors duration-300 ${
              theme === "dark"
                ? "bg-gray-900 border-gray-700 text-white hover:border-gray-600"
                : "bg-white border-gray-300 text-black hover:border-gray-400"
            } ${errors.user_email ? "border-red-500" : ""}`}
            type="email"
            disabled={isSending}
          />
          {errors.user_email && (
            <p className="mt-1 text-sm text-red-500">{errors.user_email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label 
          htmlFor="message"
          className={`block mb-2 text-sm font-medium ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Message
        </label>
        <textarea
          id="message"
          {...register("message")}
          placeholder="Let's exchange ideas?"
          rows={5}
          className={`w-full border rounded-lg px-4 py-3 placeholder-gray-500 focus:border-neon-green focus:outline-none transition-colors duration-300 resize-none ${
            theme === "dark"
              ? "bg-gray-900 border-gray-700 text-white hover:border-gray-600"
              : "bg-white border-gray-300 text-black hover:border-gray-400"
          } ${errors.message ? "border-red-500" : ""}`}
          disabled={isSending}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSending}
        className={`w-full bg-neon-green text-black font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
          isSending 
            ? "opacity-70 cursor-not-allowed" 
            : "hover:bg-neon-green-bright hover:scale-105 hover:shadow-lg hover:shadow-neon-green/50"
        }`}
      >
        {isSending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
} 