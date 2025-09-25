import { Github } from "lucide-react";
import Link from "next/link";

export default function Works() {
  return (
    <section className="mx-auto py-16 flex flex-wrap px-4 sm:px-6 lg:px-0">
      <header className="text-center max-w-5xl mx-auto relative z-2 w-full">
        <h2 className="text-pretty font-sans font-light text-3xl md:text-4xl mb-12">
          How <strong>RepoGPT</strong> Works?
        </h2>

        <p className="text-lg md:text-xl font-sans font-light tracking-tighter text-[#4E5154] max-w-2xl mx-auto mb-16">
          A simple process that brings AI-powered insights to your codebase
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left column - Process steps */}
        <div className="order-1">
          <div className="space-y-8">
            {[
              {
                number: "01",
                title: "Upload your repo",
                description:
                  "Connect your public or private GitHub, GitLab, or Bitbucket repository with just a few clicks",
              },
              {
                number: "02",
                title: "AI scans and indexes",
                description:
                  "Our AI scans all relevant files and creates vector embeddings for semantic understanding",
              },
              {
                number: "03",
                title: "Ask natural questions",
                description:
                  "Query your codebase in plain English and get contextual answers with code references",
              },
              {
                number: "04",
                title: "Get commit insights",
                description:
                  "Automatically summarize recent commits and understand code changes with AI-powered analysis",
              },
            ].map((step, index) => (
              <div key={index} className="flex">
                <div className="w-12 h-12 flex-shrink-0 rounded-full bg-white/80 text-zinc-900 flex items-center justify-center font-serif font-normal shadow-sm">
                  {step.number}
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-serif font-normal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-zinc-700 font-sans font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column - Demo UI */}
        <div className="relative order-2 z-10">
          <div className="bg-white rounded-lg shadow-[0px_16px_40px_-8px_rgba(0,0,0,0.1)] p-6 border border-gray-200/50 h-auto md:h-96 flex items-center justify-center">
            <div className="w-full max-w-md mx-auto">
              {/* Repository header */}
              <div className="flex items-center space-x-3 mb-4">
                <Github className="h-5 w-5 text-gray-600" />
                <div className="text-lg font-medium truncate">
                  github.com/user/project
                </div>
              </div>

              {/* Repository scanning status */}
              <div className="bg-gray-100 p-4 rounded-md mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="h-4 w-4 text-gray-600">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="6" y1="3" x2="6" y2="15"></line>
                      <circle cx="18" cy="6" r="3"></circle>
                      <circle cx="6" cy="18" r="3"></circle>
                      <path d="M18 9a9 9 0 0 1-9 9"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">main</span>
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  Scanning repository...
                </div>
                <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-3/4 transition-all duration-1000"></div>
                </div>
              </div>

              {/* Chat interface */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <div className="h-4 w-4 text-blue-700">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 bg-blue-50 p-3 rounded-lg text-sm">
                    What's the purpose of the AuthContext.tsx file?
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-gray-100 p-2 rounded-full flex-shrink-0">
                    <div className="h-4 w-4 text-gray-700">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-50 p-3 rounded-lg text-sm">
                    AuthContext.tsx manages authentication state across your
                    application. It:
                    <ul className="list-disc pl-4 mt-2 space-y-1">
                      <li>Provides user login/logout functionality</li>
                      <li>Stores user session information</li>
                      <li>Exports a useAuth() hook for components</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-12"></div>
      <Link
        href="/pricing"
        className="inline-block mt-4 text-center mx-auto px-4 py-2 border font-sans border-gray-300 rounded-md hover:bg-gray-50"
      >
        Try it for yourself
      </Link>
    </section>
  );
}
