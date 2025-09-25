import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="print:hidden w-full relative px-4 pr-2 md:pr-4 z-50 at-top">
      <div className="max-w-6xl 2xl:max-w-7xl flex h-14 md:h-20 items-center mx-auto justify-between print:hidden relative">
        <Link
          href="/"
          aria-label="Go to Homepage"
          className="relative z-50 flex items-center drop-shadow hover:scale-[1.03] transition hover:drop-shadow-md gap-3 font-serif text-lg font-bold"
        >
          <Image src="/RepoGPT.svg" alt="RepoGPT Logo" width={50} height={50} />
          RepoGPT
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-sans font-medium">
          <Link className="hover:text-gray-600" href="/pricing">
            Pricing
          </Link>
          <Link className="hover:text-gray-600" href="/#demo">
            Demo
          </Link>
          <Link className="hover:text-gray-600" href="/contact">
            Contact
          </Link>
          <Link className="hover:text-gray-600" href="/signin">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="-0.7 -0.7 14 14"
            >
              <path
                fill="currentColor"
                d="M6.004.599a.675.675 0 0 1-.594.747 5.4 5.4 0 0 0-1.67.444.675.675 0 0 1-.565-1.225 6.8 6.8 0 0 1 2.082-.56.675.675 0 0 1 .747.594m.939.015a.675.675 0 0 1 .774-.558c1.527.247 2.77.92 3.624 2.013.848 1.087 1.26 2.522 1.26 4.205 0 1.931-.544 3.536-1.66 4.658-1.117 1.122-2.716 1.668-4.64 1.668-2.195 0-3.962-.711-5.07-2.158a.675.675 0 0 1 1.072-.82c.783 1.022 2.094 1.628 3.997 1.628 1.675 0 2.888-.471 3.684-1.27.796-.8 1.266-2.021 1.266-3.706 0-1.47-.358-2.586-.973-3.375-.61-.781-1.525-1.308-2.776-1.51a.675.675 0 0 1-.558-.775M.675 5.6c.373 0 .675.302.675.675 0 .618.064 1.176.184 1.672a.675.675 0 0 1-1.313.317A8.5 8.5 0 0 1 0 6.273C0 5.902.302 5.6.675 5.6m1.524-2.53a.675.675 0 0 0-1.067-.826 4.7 4.7 0 0 0-.816 1.688.675.675 0 1 0 1.304.348c.128-.481.326-.882.58-1.21m4.1 2.831c1.038 0 1.622-.584 1.622-1.622S7.338 2.657 6.3 2.657s-1.622.584-1.622 1.622.584 1.622 1.622 1.622m0 .62a3.125 3.125 0 0 0-2.894 1.946.578.578 0 0 0 .508.803c.77.086 1.569.16 2.386.16s1.615-.074 2.385-.16l.055-.006a.578.578 0 0 0 .454-.797A3.125 3.125 0 0 0 6.3 6.52"
              />
            </svg>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <details className="relative">
            <summary className="list-none cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </summary>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              <Link
                className="block px-4 py-2 hover:bg-gray-100"
                href="/pricing"
              >
                Pricing
              </Link>
              <Link
                className="block px-4 py-2 hover:bg-gray-100"
                href="/#demo"
              >
                Demo
              </Link>
              <Link
                className="block px-4 py-2 hover:bg-gray-100"
                href="/contact"
              >
                Contact
              </Link>
              <Link
                className="block px-4 py-2 hover:bg-gray-100"
                href="/signin"
              >
                Sign In
              </Link>
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}
