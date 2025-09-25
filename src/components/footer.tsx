import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" py-16 md:py-24 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {/* Logo and tagline */}
          <div className="flex flex-col space-y-6">
            <Link
              href="/"
              className="flex gap-3 font-extrabold items-center flex-row"
            >
              <Image
                src="/RepoGPT.svg"
                alt="RepoGPT"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
              RepoGPT
            </Link>
            <p className="text-neutral-600 text-sm font-light max-w-xs">
              The AI-powered code navigation tool that helps you understand your
              codebase faster.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="font-serif text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              {[
                // { name: "Demo", href: "#demo" },
                { name: "Pricing", href: "/pricing" },
                { name: "Login", href: "/signin" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="font-serif text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              {[
                { name: "Terms of Service", href: "/tos" },
                { name: "Privacy Policy", href: "/privacy-policy" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="font-serif text-lg mb-4">Connect</h3>
            <div className="flex space-x-4">
              {[
                {
                  name: "GitHub",
                  href: "https://github.com/gupta-soham",
                  icon: <Github />,
                },
                {
                  name: "X / Twitter",
                  href: "https://twitter.com/sohamgpt",
                  icon: <Twitter />,
                },
                {
                  name: "YouTube",
                  href: "https://youtube.com/@sohamgupta",
                  icon: <Youtube />,
                },
              ].map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="rounded-lg p-2 transition-colors shadow-sm hover:shadow-md hover:scale-105"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm font-light mb-4 md:mb-0">
            © {new Date().getFullYear()} RepoGPT. All rights reserved.
          </p>
          <p className="text-neutral-400 text-xs font-light">
            Made with ♥ for developers everywhere by <Link className="italic text-neutral-600 hover:underline" href="https://sohamgupta.me">Soham Gupta</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
