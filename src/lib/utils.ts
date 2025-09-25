import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type PlanDetails = {
  plan: "STARTER" | "PRO" | "ENTERPRISE";
  billingCycle: "MONTHLY" | "ANNUAL";
  maxProjects: number;
  maxTeamMembers: number;
  maxQuestions: number;
  maxMeetingSeconds: number;
  includedCredits: number;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getLanguageFromFileName = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    // JavaScript and TypeScript
    case "js":
    case "jsx":
    case "mjs":
    case "cjs":
      return "javascript";
    case "ts":
    case "tsx":
    case "mts":
    case "cts":
      return "typescript";

    // Web Technologies
    case "html":
    case "htm":
    case "xhtml":
      return "html";
    case "css":
    case "scss":
    case "sass":
    case "less":
      return "css";
    case "svg":
      return "svg";

    // Documentation
    case "md":
    case "mdx":
    case "markdown":
      return "markdown";

    // Configuration Files
    case "json":
    case "jsonc":
      return "json";
    case "yaml":
    case "yml":
      return "yaml";
    case "toml":
      return "toml";
    case "ini":
      return "ini";
    case "env":
      return "shell";

    // Shell Scripts
    case "sh":
    case "bash":
    case "zsh":
    case "fish":
      return "shell";
    case "bat":
    case "cmd":
      return "batch";
    case "ps1":
      return "powershell";

    // Other Programming Languages
    case "py":
    case "pyw":
    case "ipynb":
      return "python";
    case "rb":
    case "rbw":
      return "ruby";
    case "php":
    case "php4":
    case "php5":
    case "phtml":
      return "php";
    case "java":
      return "java";
    case "c":
      return "c";
    case "cpp":
    case "cc":
    case "cxx":
      return "cpp";
    case "cs":
      return "csharp";
    case "go":
      return "go";
    case "rs":
    case "rust":
      return "rust";
    case "swift":
      return "swift";
    case "kt":
    case "kts":
      return "kotlin";

    // Database
    case "sql":
    case "mysql":
    case "pgsql":
      return "sql";

    // Markup/Template
    case "xml":
    case "xsd":
    case "dtd":
      return "xml";
    case "handlebars":
    case "hbs":
      return "handlebars";
    case "ejs":
      return "ejs";
    case "pug":
      return "pug";

    // Docker/Container
    case "dockerfile":
      return "dockerfile";
    case "dockerignore":
      return "dockerfile";

    // Git
    case "gitignore":
    case "gitattributes":
    case "gitmodules":
      return "git";

    default:
      return "text";  // Changed default to 'text' for better fallback
  }
};

export function findPlan(productId: string): PlanDetails | null {
  // Product mapping with their details
  const productMap: Record<string, PlanDetails> = {
    // Enterprise plans
    "7922126f-7bff-476e-82a3-526c2a608afd": {
      plan: "ENTERPRISE",
      billingCycle: "MONTHLY",
      maxProjects: 10,              // Up to 10 active repositories
      maxTeamMembers: 15,           // 15 team members
      maxQuestions: 120,            // Save up to 120 questions
      maxMeetingSeconds: 180000,    // 50 hours (50 * 60 * 60 = 180,000 seconds)
      includedCredits: 35000,       // 35,000 credits
    },
    "dd68a91e-bd9d-4a96-86c2-b5693c54bc4a": {
      plan: "ENTERPRISE",
      billingCycle: "ANNUAL",
      maxProjects: 10,              // Up to 10 active repositories
      maxTeamMembers: 15,           // 15 team members
      maxQuestions: 120,            // Save up to 120 questions
      maxMeetingSeconds: 2160000,   // 600 hours (600 * 60 * 60 = 2,160,000 seconds)
      includedCredits: 420000,      // 420,000 credits
    },

    // Professional plans
    "fc24680d-7938-4aec-b42d-7c8e0db93ff5": {
      plan: "PRO",
      billingCycle: "MONTHLY",
      maxProjects: 5,               // Up to 5 active repositories
      maxTeamMembers: 5,            // 5 team members
      maxQuestions: 50,             // Save up to 50 questions
      maxMeetingSeconds: 43200,     // 12 hours (12 * 60 * 60 = 43,200 seconds)
      includedCredits: 12000,       // 12,000 credits
    },
    "d7185297-0995-41eb-9836-46512d2d1d99": {
      plan: "PRO",
      billingCycle: "ANNUAL",
      maxProjects: 5,               // Up to 5 active repositories
      maxTeamMembers: 5,            // 5 team members
      maxQuestions: 50,             // Save up to 50 questions
      maxMeetingSeconds: 518400,    // 144 hours (144 * 60 * 60 = 518,400 seconds)
      includedCredits: 144000,      // 144,000 credits 
    },

    // Starter plans
    "4132380b-4985-4add-8602-c7903d4c611b": {
      plan: "STARTER",
      billingCycle: "MONTHLY",
      maxProjects: 2,               // Up to 2 active repositories
      maxTeamMembers: 2,            // 2 team members
      maxQuestions: 20,             // Save up to 20 questions
      maxMeetingSeconds: 14400,     // 4 hours (4 * 60 * 60 = 14,400 seconds)
      includedCredits: 5000,        // 5,000 credits
    },
    "d29d4588-2bd7-4129-b6bc-41985c0c4c80": {
      plan: "STARTER",
      billingCycle: "ANNUAL",
      maxProjects: 2,               // Up to 2 active repositories
      maxTeamMembers: 2,            // 2 team members
      maxQuestions: 20,             // Save up to 20 questions
      maxMeetingSeconds: 57600,     // 16 hours (16 * 60 * 60 = 57,600 seconds)
      includedCredits: 60000,       // 60,000 credits 
    }
  };

  return productId in productMap ? productMap[productId] as PlanDetails : null;
}
