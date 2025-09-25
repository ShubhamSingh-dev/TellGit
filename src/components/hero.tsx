import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pb-24">
      <div
        className="relative -mt-20 min-h-screen overflow-hidden bg-[#FDF1EF] bg-bottom bg-no-repeat"
        style={{
          backgroundImage: "url('/img/branding/bg-gradient-sunset.webp')",
          backgroundSize: "150% 600px",
        }}
      >
        <div className="relative w-full bg-cover px-4 pt-12 md:px-0 md:pt-32">
          <div className="relative z-10 w-full pt-16 pb-48 text-center md:pt-24 md:pb-72">
            <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-0">
              <h1 className="mb-8 font-serif text-2xl leading-tight font-light sm:text-3xl md:mb-12 md:text-4xl lg:text-5xl">
                <em className="font-medium italic">
                  Your codebase brought to life
                </em>{" "}
                through conversation.
              </h1>
              <p className="font-sans text-lg leading-normal font-thin text-pretty antialiased sm:text-xl md:text-2xl">
                Upload your private or public repository and{" "}
                <strong className="font-bold">
                  let RepoGPT handle the heavy lifting of context-based
                  questions and insights.
                </strong>{" "}
                Stop searching, start asking.
              </p>
              <div className="flex flex-col items-center justify-center space-y-4 pt-8 sm:flex-row sm:space-y-0 sm:space-x-4 md:space-x-8">
                <Link
                  href="/pricing"
                  className="inline-flex w-full justify-center rounded-lg bg-gradient-to-br from-slate-600 to-zinc-900 p-4 text-center text-lg font-normal text-lime-300 no-underline transition-all duration-150 hover:translate-y-[-2px] hover:bg-black hover:shadow-lg sm:w-auto md:px-10"
                >
                  Get Pro Now
                </Link>
                <Link
                  href="#demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-lg bg-gradient-to-b from-transparent to-white/20 p-4 text-lg font-normal text-zinc-900 shadow-[0_0_0_1px_rgba(113,113,122,1)] transition-all duration-150 hover:translate-y-[-2px] hover:bg-white/20 hover:shadow-[0_0_0_1px_rgba(24,24,27,1),0_2px_8px_0_rgba(0,0,0,0.07),0_3px_5px_-4px_rgba(0,0,0,0.05)] sm:w-auto md:px-10"
                >
                  Watch the Demo
                </Link>
              </div>
              <p className="mt-8 text-center text-sm">
                Purchased a plan? Go to the{" "}
                <Link href="/dashboard" className="font-semibold underline">
                  dashboard
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Decorative elements with viewport-based positioning */}
        <div className="xs:block absolute top-[25vh] right-[5%] hidden animate-[float-sm_18s_ease-in-out_infinite] delay-1000 sm:block">
          <Image
            src="/img/branding/island.webp"
            width={60}
            height={93}
            alt=""
          />
        </div>
        <div className="absolute top-[45vh] left-[-5%] hidden animate-[float-md_24s_ease-in-out_infinite] sm:block">
          <Image
            src="/img/branding/island.webp"
            width={124}
            height={192}
            alt=""
          />
        </div>
        <div className="absolute right-[-15%] bottom-[10%] hidden animate-[float-lg_28s_ease-in-out_infinite] sm:block md:right-[-10%] lg:right-[-5%]">
          <Image
            src="/img/branding/big-island.webp"
            width={273}
            height={422}
            alt=""
          />
        </div>
        <div className="absolute top-[15vh] right-[-5%] hidden sm:block md:right-[0]">
          <Image
            src="/img/branding/clouds-1.webp"
            width={305}
            height={170}
            alt=""
            className="max-w-[80%] sm:max-w-full"
          />
        </div>
        <div className="absolute bottom-[20%] left-[-10%] hidden sm:block md:left-[-5%] lg:left-[0]">
          <Image
            src="/img/branding/clouds-2.webp"
            width={528}
            height={328}
            alt=""
            className="max-w-[80%] sm:max-w-full"
          />
        </div>

        {/* Paper tear mask */}
        <div
          className="absolute bottom-0 left-0 z-20 h-[80px] w-full scale-y-[-1] sm:h-[120px]"
          style={{
            backgroundImage: "url('/img/branding/paper-tear-sm.webp')",
            backgroundSize: "100% 100%",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      <div className="relative z-30 mx-auto max-w-6xl px-2 sm:px-3 lg:px-0">
        <div className="relative">
          <Image
            src="/img/branding/dashboard.png"
            alt="The RepoGPT Control Panel"
            width={1200}
            height={800}
            className="relative -mt-[15vh] rounded-lg shadow-[0px_11px_37px_-18px_#4c305a] sm:-mt-[20vh] md:-mt-[25vh] lg:-mt-[30vh]"
          />
          <div className="absolute -top-[8%] -right-[8%] hidden w-[180px] origin-top-right scale-80 rotate-3 lg:block xl:w-[290px]">
            <div className="group">
              <Image
                src="/brain.svg"
                alt="Brain"
                width={290}
                height={290}
                className="drop-shadow-[8px_8px_30px_#cbb3b3] filter"
              />
              <Image
                src="/img/branding/callout.svg"
                alt="RepoGPT = Your Codebase + AI"
                width={249}
                height={150}
                className="drop-shadow-md/90 absolute -top-16 -right-16 translate-20 rotate-7 opacity-0 transition-all group-hover:translate-y-10 group-hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
