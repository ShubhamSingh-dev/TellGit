"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { sendEmail } from "./actions";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      const result = await sendEmail(formData);
      setFormStatus(result);
    } catch (error) {
      setFormStatus({
        success: false,
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-black font-sans font-light">
      <div id="app">
        <main id="main">
          <article>
            <section className="pb-24">
              <div
                className="relative -mt-20 overflow-hidden bg-bottom bg-no-repeat bg-[#FDF1EF] min-h-screen"
                style={{
                  backgroundImage:
                    "url('/img/branding/bg-gradient-sunset.webp')",
                  backgroundSize: "150% 600px",
                }}
              >
                <div className="relative w-full bg-cover pt-12 px-4 md:px-0 md:pt-32">
                  <div className="w-full relative z-10 text-center pt-24 pb-32">
                    <div className="max-w-5xl mx-auto">
                      <h1 className="mb-12 font-serif font-light text-3xl md:text-4xl lg:text-5xl leading-tight">
                        <em className="font-medium italic">Get in touch</em>{" "}
                        with our team.
                      </h1>
                      <p className="font-sans font-thin leading-normal text-xl md:text-2xl text-pretty antialiased">
                        Have questions about RepoGPT?{" "}
                        <strong className="font-bold">
                          We're here to help with all your questions, feedback,
                          and support needs.
                        </strong>{" "}
                        Reach out and we'll get back to you soon.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute right-20 top-56 delay-1000 animate-[float-sm_18s_ease-in-out_infinite] hidden sm:block">
                  <Image
                    src="/img/branding/island.webp"
                    width={60}
                    height={93}
                    alt=""
                  />
                </div>
                <div className="absolute -left-20 sm:-left-12 top-104 animate-[float-md_24s_ease-in-out_infinite] hidden sm:block">
                  <Image
                    src="/img/branding/island.webp"
                    width={124}
                    height={192}
                    alt=""
                  />
                </div>
                {/* Paper tear mask */}
                <div
                  className="absolute bottom-0 left-0 w-full h-[120px] z-20 scale-y-[-1]"
                  style={{
                    backgroundImage: "url('/img/branding/paper-tear-sm.webp')",
                    backgroundSize: "100% 120px",
                    backgroundPosition: "bottom",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </div>

              <div className="relative max-w-3xl mx-auto z-30 px-4 sm:px-6 lg:px-0">
                <div className="bg-white rounded-lg shadow-[0px_11px_37px_-18px_#4c305a] relative -mt-80 md:-mt-120 p-8 md:p-12">
                  <form action={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Tell us what you need..."
                      />
                    </div>

                    {formStatus.message && (
                      <div
                        className={`p-4 rounded-lg ${
                          formStatus.success
                            ? "bg-green-50 text-green-800"
                            : "bg-red-50 text-red-800"
                        }`}
                      >
                        {formStatus.message}
                      </div>
                    )}

                    <div className="flex justify-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto bg-gradient-to-br from-slate-600 to-zinc-900 text-lime-300 text-lg font-normal p-4 rounded-lg inline-flex justify-center text-center no-underline transition-all duration-150 hover:translate-y-[-2px] hover:bg-black hover:shadow-lg md:px-10 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>

            <section className="text-center max-w-5xl mx-auto md:pb-24 px-4 sm:px-6 lg:px-0">
              <p className="text-xl font-serif font-light tracking-tighter text-[#4E5154] items-center max-w-lg mx-auto relative">
                We typically respond within 48-72 hours during business days.
              </p>
            </section>

            <section className="pt-24 mb-34 relative px-4 sm:px-6 lg:px-0">
              <header className="text-center max-w-4xl mx-auto">
                <h2 className="font-serif font-light text-3xl md:text-4xl mb-6">
                  Ready to take RepoGPT for a spin?
                </h2>
                <p className="text-lg md:text-xl font-sans font-light max-w-3xl mx-auto">
                  Before you go, explore our feature-rich platform and see how
                  RepoGPT can transform your development workflow.
                </p>
              </header>
              <div className="flex items-center justify-center mt-12">
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto bg-gradient-to-br from-slate-600 to-zinc-900 text-lime-300 text-lg font-normal p-4 rounded-lg inline-flex justify-center text-center no-underline transition-all duration-150 hover:translate-y-[-2px] hover:bg-black hover:shadow-lg md:px-10 font-serif"
                >
                  Get me started
                </Link>
              </div>
            </section>
          </article>
        </main>
      </div>
    </div>
  );
}
