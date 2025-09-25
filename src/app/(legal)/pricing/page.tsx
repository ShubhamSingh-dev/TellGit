import { Pricing } from "@/components/pricing";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PricingPage() {
  // Define pricing plans
  const pricingPlans = [
    {
      name: "STARTER",
      price: "44.99",
      yearlyPrice: "38.3", // $460/year ÷ 12 months
      period: "month",
      features: [
        "5,000 credits",
        "Up to 2 active repositories",
        "Save up to 20 questions",
        "2 team members",
        "4 hours of meeting analysis",
        "Basic email support",
      ],
      description: "Essential tools for individual developers",
      buttonText: "Get Started",
      href: {
        monthly: "/signin?plan=4132380b-4985-4add-8602-c7903d4c611b",
        annual: "/signin?plan=d29d4588-2bd7-4129-b6bc-41985c0c4c80",
      },
      isPopular: false,
      annualDetails: {
        totalPrice: "440",
        bonusFeatures: [
          "16 hours of meeting analysis (instead of 4)",
          "60,000 total credits for the year",
        ],
      },
    },
    {
      name: "PROFESSIONAL",
      price: "99.99",
      yearlyPrice: "84.99", // $1019.99/year ÷ 12 months
      period: "month",
      features: [
        "12,000 credits",
        "Up to 5 active repositories",
        "Save up to 50 questions",
        "5 team members",
        "12 hours of meeting analysis",
        "Priority support",
        "Repository insights",
      ],
      description: "Advanced features for growing teams",
      buttonText: "Subscribe Now",
      href: {
        monthly: "/signin?plan=fc24680d-7938-4aec-b42d-7c8e0db93ff5",
        annual: "/signin?plan=d7185297-0995-41eb-9836-46512d2d1d99",
      },
      isPopular: true,
      annualDetails: {
        totalPrice: "1019.99",
        bonusFeatures: [
          "144 hours of meeting analysis (instead of 12)",
          "144,000 total credits for the year",
        ],
      },
    },
    {
      name: "ENTERPRISE",
      price: "269.99",
      yearlyPrice: "230", // $2759.99/year ÷ 12 months
      period: "month",
      features: [
        "35,000 credits",
        "Up to 10 active repositories",
        "Save up to 120 questions",
        "15 team members",
        "50 hours of meeting analysis",
        "Priority support",
        "Advanced repository analytics",
      ],
      description: "Comprehensive solution for larger organizations",
      buttonText: "Get Instant Access",
      href: {
        monthly: "/signin?plan=7922126f-7bff-476e-82a3-526c2a608afd",
        annual: "/signin?plan=dd68a91e-bd9d-4a96-86c2-b5693c54bc4a",
      },
      isPopular: false,
      annualDetails: {
        totalPrice: "2755.99",
        bonusFeatures: [
          "600 hours of meeting analysis (instead of 50)",
          "420,000 total credits for the year",
        ],
      },
    },
  ];

  return (
    <div className="font-sans font-light text-black">
      <div id="app">
        <main id="main">
          <article>
            <section className="pb-24">
              <div
                className="relative -mt-20 overflow-hidden bg-[#FDF1EF] bg-bottom bg-no-repeat"
                style={{
                  backgroundImage:
                    "url('/img/branding/bg-gradient-sunset.webp')",
                  backgroundSize: "150% 600px",
                }}
              >
                <div className="relative h-[70vh] w-full bg-cover px-4 pt-12 md:px-0 md:pt-32">
                  <div className="relative z-10 w-full pt-24 pb-36 text-center">
                    <div className="mx-auto max-w-5xl">
                      <h1 className="mb-8 font-serif text-3xl leading-tight font-light md:text-4xl lg:text-5xl">
                        <em className="font-medium italic">Choose the plan</em>{" "}
                        that works for you
                      </h1>
                      <p className="font-sans text-xl leading-normal font-thin text-pretty antialiased md:text-2xl">
                        Whether you're working on personal projects or scaling
                        across teams,{" "}
                        <strong className="font-bold">
                          we have a plan that fits your needs.
                        </strong>{" "}
                        All plans include our core AI-powered code intelligence.
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-56 right-20 hidden animate-[float-sm_18s_ease-in-out_infinite] delay-1000 sm:block">
                    <Image
                      src="/img/branding/island.webp"
                      width={60}
                      height={93}
                      alt=""
                    />
                  </div>
                </div>
                <div className="absolute top-104 -left-20 hidden animate-[float-md_24s_ease-in-out_infinite] sm:-left-12 sm:block">
                  <Image
                    src="/img/branding/island.webp"
                    width={124}
                    height={192}
                    alt=""
                  />
                </div>
                {/* Paper tear mask */}
                <div
                  className="absolute bottom-0 left-0 z-20 h-[120px] w-full scale-y-[-1]"
                  style={{
                    backgroundImage: "url('/img/branding/paper-tear-sm.webp')",
                    backgroundSize: "100% 120px",
                    backgroundPosition: "bottom",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </div>

              {/* Pricing Component */}
              <div className="relative z-30 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <Pricing
                  plans={pricingPlans}
                  title="Find the perfect plan for your team"
                  description="All plans include our core AI features and reliable support. Billed monthly or annually, cancel anytime."
                />
              </div>
            </section>

            <section className="mx-auto max-w-5xl px-4 text-center sm:px-6 md:pb-24 lg:px-0">
              <h2 className="mb-8 font-serif text-3xl font-light">
                Frequently Asked Questions
              </h2>
              <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-xl font-medium">What is RepoGPT?</h3>
                  <p className="text-muted-foreground">
                    RepoGPT is a conversational AI tool for developers that
                    creates vector embeddings of your GitHub repositories,
                    providing context-based answers and insights about your
                    source code.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-medium">
                    What repositories are supported?
                  </h3>
                  <p className="text-muted-foreground">
                    Currently, we support both public and private GitHub
                    repositories. GitLab integration is planned for future
                    development.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-medium">
                    How do credits work?
                  </h3>
                  <p className="text-muted-foreground">
                    Credits are our usage measurement unit. Each AI interaction
                    or project creation consumes credits based on complexity and
                    length. Meetings are analyzed based on their duration.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-medium">
                    What happens if I run out of credits?
                  </h3>
                  <p className="text-muted-foreground">
                    When you exhaust monthly credits, you can upgrade or switch
                    your plan, purchase additional credits or wait for the next
                    billing cycle for credit reset.
                  </p>
                </div>
              </div>
            </section>

            <div className="relative">
              {/* Top paper tear */}
              <div className="absolute -top-8 z-20 h-[120px] w-full">
                <Image
                  src="/img/branding/paper-tear-sm.webp"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              <section className="relative bg-gradient-to-br from-[rgba(50,197,255,0.08)] via-[rgba(182,32,224,0.08)] to-[rgba(247,181,0,0.08)] py-24 md:py-52">
                <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-0">
                  <h2 className="mb-8 font-serif text-3xl font-light md:text-4xl">
                    Enterprise Solutions
                  </h2>
                  <p className="mx-auto mb-8 max-w-3xl text-lg">
                    Need a custom solution for your enterprise? We offer
                    tailored plans for large organizations with specific
                    security, compliance or integration requirements.
                  </p>
                  <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg">
                    <h3 className="mb-4 text-2xl font-medium">
                      Enterprise Features
                    </h3>
                    <ul className="mb-6 space-y-4 text-left">
                      <li className="flex items-start gap-2">
                        <Check />
                        <span>
                          Single Sign-On (SSO) and advanced authentication
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check />
                        <span>
                          Custom integration with your development workflow
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check />
                        <span>
                          Dedicated infrastructure and private deployments
                        </span>
                      </li>
                    </ul>
                    <Link
                      href="mailto:contact@sohamgupta.me"
                      className="inline-block rounded-lg bg-gradient-to-br from-slate-600 to-zinc-900 p-4 px-8 text-center text-lg font-normal text-lime-300 no-underline transition-all duration-150 hover:translate-y-[-2px] hover:bg-black hover:shadow-lg"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
                <div
                  className="absolute top-0 left-0 z-0 h-full w-full bg-cover bg-repeat"
                  style={{
                    backgroundImage: "url('/img/branding/grid.svg')",
                  }}
                />
              </section>

              {/* Bottom paper tear */}
              <div className="absolute -bottom-[1px] left-0 z-10 h-[120px] w-full">
                <Image
                  src="/img/branding/paper-tear-sm.webp"
                  alt=""
                  fill
                  className="scale-y-[-1] transform object-cover object-bottom"
                />
              </div>
            </div>

            <section className="relative mb-34 px-4 pt-24 sm:px-6 lg:px-0">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="mb-6 font-serif text-3xl font-light md:text-4xl">
                  Still have questions?
                </h2>
                <p className="mx-auto mb-8 max-w-3xl font-sans text-lg font-light md:text-xl">
                  Our support team is here to help. Reach out and we'll get back
                  to you as soon as possible.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <Link
                    href="/contact"
                    className="inline-flex w-full justify-center rounded-lg border border-zinc-300 bg-white p-4 text-center text-lg font-normal text-zinc-900 no-underline transition-all duration-150 hover:translate-y-[-2px] hover:shadow-md sm:w-auto md:px-10"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </section>
          </article>
        </main>
      </div>
    </div>
  );
}
