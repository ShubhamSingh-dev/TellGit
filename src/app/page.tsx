import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Works from "@/components/works";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans font-light text-black">
      <div id="app">
        <main id="main">
          <Navbar />
          <article>
            <Hero />

            <section className="mx-auto max-w-5xl px-4 text-center sm:px-6 md:pb-24 lg:px-0">
              <p className="relative mx-auto max-w-fit items-center font-serif text-xl font-light tracking-tighter text-[#4E5154]">
                Empowering repositories from next-gen startups and global
                enterprises to personal projects and open source communities.
              </p>
            </section>

            {/* Benefits Section */}
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
                <header className="relative z-2 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-0">
                  <h2 className="mb-12 font-sans text-3xl font-light text-pretty md:text-4xl">
                    Key Benefits that{" "}
                    <em className="font-bold">save you time</em>
                  </h2>
                </header>
                <div className="2xl:max-w-8xl relative z-2 mx-auto mt-12 grid max-w-lg grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:max-w-7xl lg:grid-cols-4">
                  {[
                    {
                      title: "Eliminate code archaeology",
                      description:
                        "No more digging through files and commits to understand how things work. Ask questions in plain language.",
                    },
                    {
                      title: "Onboard engineers faster",
                      description:
                        "Help new team members get up to speed in days, not months, with contextual AI assistance.",
                    },
                    {
                      title: "Turn code into conversations",
                      description:
                        "Bring natural language understanding to your codebase and democratize technical knowledge.",
                    },
                    {
                      title: "Built by developers for developers",
                      description:
                        "Created by a dev tired of asking how does this work? without getting clear answers.",
                    },
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="relative rounded-2xl bg-white px-8 py-12 text-center shadow-[0px_16px_40px_-8px_rgba(0,0,0,0.1)]"
                    >
                      <h3 className="mb-2 font-serif text-3xl font-normal">
                        {benefit.title}
                      </h3>
                      <p className="m-0 text-lg leading-tight text-neutral-600">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  className="absolute top-0 left-0 h-full w-full bg-cover bg-repeat"
                  style={{
                    backgroundImage: "url('/img/branding/grid.svg')",
                  }}
                />
              </section>
              {/* Bottom paper tear */}
              <div className="absolute -bottom-[1px] left-0 z-20 h-[120px] w-full">
                <Image
                  src="/img/branding/paper-tear-sm.webp"
                  alt=""
                  fill
                  className="scale-y-[-1] transform object-cover object-bottom"
                />
              </div>
            </div>

            <Works />

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

                <section id="demo" className="relative flex min-h-[800px] items-center justify-center bg-gradient-to-br from-[rgba(50,197,255,0.08)] via-[rgba(224,32,32,0.07)] to-[rgba(247,181,0,0.07)] py-12 lg:py-24">
                  <div className="relative z-[2] flex max-w-5xl flex-col items-center px-4">
                    <header className="w-full text-center">
                      <h2 className="m-6 font-serif text-3xl font-light text-pretty md:text-4xl">
                        The future of code is here
                      </h2>
                      <p className="mx-auto max-w-3xl font-sans text-lg font-light md:text-xl">
                        RepoGPT is the AI-powered code navigation tool that helps
                        you understand, navigate and collaborate on your codebase
                        faster than ever before.
                      </p>
                      <div className="mt-8 w-full overflow-hidden rounded-lg shadow-lg">
                        <video
                          className="h-auto w-full"
                          autoPlay
                          muted
                          loop
                          playsInline
                          disablePictureInPicture
                          preload="metadata"
                          aria-hidden="true"
                          controlsList="nodownload"
                        >
                          <source src="/demo.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </header>
                  </div>
                </section>

              {/* Bottom paper tear */}
              <div className="absolute -bottom-[1px] left-0 z-20 h-[120px] w-full">
                <Image
                  src="/img/branding/paper-tear-sm.webp"
                  alt=""
                  fill
                  className="scale-y-[-1] transform object-cover object-bottom"
                />
              </div>
            </div>

            <section className="relative mb-34 px-4 pt-24 sm:px-6 lg:px-0">
              <header className="mx-auto max-w-4xl text-center">
                <h2 className="mb-6 font-serif text-3xl font-light md:text-4xl">
                  Ready to take RepoGPT for a spin?
                </h2>
                <p className="mx-auto max-w-3xl font-sans text-lg font-light md:text-xl">
                  Join hundreds of developers who have transformed how they{" "}
                  <em className="font-bold">
                    understand and navigate their codebase.
                  </em>
                </p>
              </header>
              <div className="mt-12 flex items-center justify-center">
                <Link
                  href="/pricing"
                  className="inline-flex w-full justify-center rounded-lg bg-gradient-to-br from-slate-600 to-zinc-900 p-4 text-center font-serif text-lg font-normal text-lime-300 no-underline transition-all duration-150 hover:translate-y-[-2px] hover:bg-black hover:shadow-lg sm:w-auto md:px-10"
                >
                  Get me started
                </Link>
              </div>
            </section>
          </article>
          <Footer />
        </main>
      </div>
    </div>
  );
}
