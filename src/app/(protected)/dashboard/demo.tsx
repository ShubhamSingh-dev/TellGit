<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Charcoal SaaS Dashboard | Dionysus</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        charcoal: {
                            950: "#121212",
                            900: "#1E1E1E",
                            800: "#2A2A2A",
                            700: "#3F3F3F",
                        },
                        brand: {
                            primary: "#4F46E5",
                            border: "#2A2A2A",
                        },
                    },
                    fontFamily: {
                        sans: ["Inter", "sans-serif"],
                        mono: ["JetBrains Mono", "monospace"],
                    },
                },
            },
        };
    </script>
<style type="text/tailwindcss">
        @layer base {
            body { 
                @apply bg-charcoal-950 text-white font-sans antialiased; 
            }
        }
        .sidebar-item-active {
            @apply bg-charcoal-800 text-white border-l-4 border-brand-primary;
        }
        .sidebar-item-hover {
            @apply hover:bg-charcoal-800 text-slate-400 hover:text-white transition-all;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .mono { font-family: 'JetBrains Mono', monospace; }.sharp-card {
            @apply bg-charcoal-950 border border-charcoal-800 rounded-sm;
        }
        .sharp-btn {
            @apply rounded-sm transition-all active:scale-[0.98];
        }
    </style>
</head>
<body class="h-screen flex overflow-hidden">
<aside class="w-64 bg-charcoal-900 flex flex-col shrink-0 border-r border-charcoal-800">
<div class="p-6 flex items-center space-x-3">
<div class="w-8 h-8 bg-brand-primary flex items-center justify-center rounded-sm">
<span class="material-symbols-outlined text-white text-xl">auto_awesome</span>
</div>
<span class="text-xl font-bold tracking-tight text-white uppercase italic">Dionysus</span>
</div>
<nav class="flex-1 px-4 space-y-8 mt-4">
<div>
<h3 class="px-3 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Menu</h3>
<ul class="space-y-1">
<li>
<a class="flex items-center space-x-3 px-3 py-2.5 sidebar-item-active" href="#">
<span class="material-symbols-outlined text-[20px]">dashboard</span>
<span class="font-medium text-sm">Dashboard</span>
</a>
</li>
<li>
<a class="flex items-center space-x-3 px-3 py-2.5 sidebar-item-hover rounded-sm" href="#">
<span class="material-symbols-outlined text-[20px]">psychology</span>
<span class="font-medium text-sm">Q&amp;A</span>
</a>
</li>
<li>
<a class="flex items-center space-x-3 px-3 py-2.5 sidebar-item-hover rounded-sm" href="#">
<span class="material-symbols-outlined text-[20px]">video_call</span>
<span class="font-medium text-sm">Meetings</span>
</a>
</li>
<li>
<a class="flex items-center space-x-3 px-3 py-2.5 sidebar-item-hover rounded-sm" href="#">
<span class="material-symbols-outlined text-[20px]">account_balance_wallet</span>
<span class="font-medium text-sm">Billing</span>
</a>
</li>
</ul>
</div>
<div>
<h3 class="px-3 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Repositories</h3>
<ul class="space-y-1">
<li>
<a class="flex items-center space-x-3 px-3 py-2 sidebar-item-hover rounded-sm" href="#">
<span class="w-1.5 h-1.5 bg-emerald-500"></span>
<span class="font-medium text-sm mono">normal-human</span>
</a>
</li>
<li>
<a class="flex items-center space-x-3 px-3 py-2 sidebar-item-hover rounded-sm" href="#">
<span class="w-1.5 h-1.5 bg-indigo-500"></span>
<span class="font-medium text-sm mono">api-service-v2</span>
</a>
</li>
<li>
<a class="flex items-center space-x-3 px-3 py-2 sidebar-item-hover rounded-sm" href="#">
<span class="w-1.5 h-1.5 bg-amber-500"></span>
<span class="font-medium text-sm mono">docker-py-sdk</span>
</a>
</li>
</ul>
</div>
<div class="px-3">
<button class="w-full flex items-center justify-center space-x-2 py-2.5 bg-brand-primary text-white sharp-btn text-xs font-bold uppercase tracking-wider">
<span class="material-symbols-outlined text-sm">add</span>
<span>Connect Repository</span>
</button>
</div>
</nav>
<div class="p-4 border-t border-charcoal-800 bg-charcoal-950/50">
<div class="flex items-center space-x-3 px-3 py-2">
<div class="w-8 h-8 rounded-sm overflow-hidden border border-charcoal-700">
<img alt="User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-bkVChUSNAO3t5LEgdvUhzmmVLiB3wuEV2mRFJig2sentzdMkSZfGc0kC8YM6vkhNUZqUoWhiB8oRmfPDvf4BHWQIMUe0gxJheTsa_iuzP1xbG9ZlWMRffLswsLcGL8rIwel4BTu366Gyd40tXSyMP34IL9uVmRx5QCmtt_1gF1aI7h4p8S1FZdIrp5OKOL4E8MSoU9-hjlP5siPwnbwbZERWO5kOUIHrIjtqvr2chrkcvA1j8Zcm5ZGMG76T-7Gd2HNNBPGRPPbt"/>
</div>
<div class="flex-1 overflow-hidden">
<p class="text-sm font-bold text-white truncate">Elliott Chong</p>
<p class="text-[10px] font-bold text-slate-500 uppercase">Enterprise</p>
</div>
<button class="text-slate-500 hover:text-white">
<span class="material-symbols-outlined text-lg">settings</span>
</button>
</div>
</div>
</aside>
<main class="flex-1 flex flex-col overflow-hidden">
<header class="h-16 border-b border-charcoal-800 bg-charcoal-950 flex items-center justify-between px-8 shrink-0">
<div class="relative w-96">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">search</span>
<input class="w-full pl-10 pr-4 py-2 bg-charcoal-900 border border-charcoal-800 rounded-sm text-sm text-white focus:border-brand-primary transition-all outline-none mono" placeholder="Search codebase..." type="text"/>
</div>
<div class="flex items-center space-x-6">
<div class="flex items-center space-x-2 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 border border-emerald-500/20 rounded-sm uppercase tracking-widest">
<span class="w-1.5 h-1.5 bg-emerald-500"></span>
<span>System Online</span>
</div>
<button class="relative p-2 text-slate-400 hover:text-white">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-2 right-2 w-1.5 h-1.5 bg-brand-primary"></span>
</button>
<div class="h-8 w-[1px] bg-charcoal-800"></div>
<button class="flex items-center space-x-2 px-4 py-2 border border-white text-white rounded-sm text-xs font-bold uppercase hover:bg-white hover:text-charcoal-950 transition-colors">
<span class="material-symbols-outlined text-sm font-bold">cloud_upload</span>
<span>Deploy</span>
</button>
</div>
</header>
<div class="flex-1 overflow-y-auto bg-charcoal-950 p-8">
<div class="max-w-6xl mx-auto space-y-8">
<div class="bg-brand-primary/10 border border-brand-primary/30 p-4 rounded-sm flex items-center justify-between">
<div class="flex items-center space-x-4">
<div class="w-10 h-10 bg-brand-primary text-white rounded-sm flex items-center justify-center">
<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
</div>
<div>
<h2 class="font-bold text-white text-sm mono">REPO: elliott-chong/normal-human</h2>
<p class="text-brand-primary text-xs font-bold uppercase tracking-wide">Ready for analysis • All files indexed</p>
</div>
</div>
<div class="flex items-center space-x-2">
<button class="bg-charcoal-900 border border-charcoal-700 text-white px-3 py-1.5 rounded-sm font-bold text-[10px] uppercase hover:bg-charcoal-800 transition-colors">Manage</button>
<button class="bg-charcoal-900 border border-charcoal-700 text-white px-3 py-1.5 rounded-sm font-bold text-[10px] uppercase hover:bg-charcoal-800 transition-colors">Settings</button>
</div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
<section class="lg:col-span-2 sharp-card p-6 shadow-2xl">
<div class="flex items-center justify-between mb-6">
<div>
<h2 class="text-lg font-bold text-white uppercase tracking-tight italic">Ask Code Assistant</h2>
<p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Natural language codebase querying</p>
</div>
<span class="material-symbols-outlined text-brand-primary bg-brand-primary/10 p-2 rounded-sm">terminal</span>
</div>
<div class="relative group">
<textarea class="w-full h-40 p-5 bg-charcoal-900 border border-charcoal-800 rounded-sm focus:border-brand-primary transition-all resize-none text-white placeholder:text-slate-600 outline-none mono text-sm" placeholder="&gt; Query: How does the authentication flow work in the account module?"></textarea>
<div class="absolute bottom-4 right-4 flex space-x-2">
<button class="p-2 text-slate-500 hover:text-brand-primary transition-colors">
<span class="material-symbols-outlined text-[20px]">attach_file</span>
</button>
</div>
</div>
<div class="mt-6 flex items-center justify-between">
<div class="flex items-center space-x-2">
<div class="flex -space-x-1">
<img alt="User 1" class="w-7 h-7 rounded-sm border border-charcoal-950" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWWFM9egTUAtEUnfI47Dx9OlHb4TEqjg2_ersIY1OmcRnwy1R1Gcux2bWF6OvyfcsECGcOqAtFwaxBa21m4EIRC4mFcwEpmrjpknaNCiHHCdxdY13lpqwG6msbAkHidCba5nlWNNrH4aSqd0EFcqwn-SeR0cPcLG-cbb_sSfDFjbDOfqBhMfUTZRJZPcGNuyUniHRzoWyR4KBRgw--Pnkc9UoAJ1b-AuV5aHzce5VYmLvmNBSwhdSZlNgcNjNQ4ujRKAi0xIEILyBf"/>
<img alt="User 2" class="w-7 h-7 rounded-sm border border-charcoal-950" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYH_zpEVX-neU5hQPx_yjUBgnhvr08CLXbU25yU7HtqwxgCPdE0WHqGJYesAGG5pk77rb2_AlQPC2z2RqbaPSiiMPjJqbAphz_WrLCBcOtneO4w2bmAE8oBI7til-ckkajCZ3P1tfimZL-Uqjou9SFPtsdwhixeolPrK93v8xXRPn4EODaZbGmt-a47ppQ1nvr6LFU46-AeOWKWJkicnIaop32KA2IklIKG9cd2Eps7L12pGVe9T4cqKW6BsHRhDnlymIHSP1jK39e"/>
</div>
<span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">12 Active Nodes</span>
</div>
<button class="bg-brand-primary text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all">
                            Execute Query
                        </button>
</div>
</section>
<section class="sharp-card p-6 flex flex-col items-center justify-between text-center">
<div class="space-y-4">
<div class="w-14 h-14 bg-charcoal-900 border border-charcoal-800 rounded-sm flex items-center justify-center text-slate-500 mx-auto">
<span class="material-symbols-outlined text-3xl">video_settings</span>
</div>
<div>
<h2 class="text-md font-bold text-white uppercase italic tracking-tighter">Meeting Context</h2>
<p class="text-[11px] text-slate-500 mt-2 font-medium">Link conversational outcomes to source files.</p>
</div>
</div>
<div class="w-full space-y-3 mt-6">
<button class="w-full border border-white text-white py-3 rounded-sm font-bold text-[10px] uppercase hover:bg-white hover:text-charcoal-950 transition-all">
                            Upload Recording
                        </button>
<p class="text-[9px] text-brand-primary font-bold tracking-[0.2em] uppercase">Enterprise Layer</p>
</div>
</section>
</div>
<section class="space-y-4">
<div class="flex items-center justify-between">
<h2 class="text-md font-bold text-white uppercase tracking-widest flex items-center italic">
<span class="material-symbols-outlined text-brand-primary mr-2 text-xl">analytics</span>
                        System Insights
                    </h2>
<button class="text-[10px] font-bold text-brand-primary uppercase tracking-widest hover:underline">View All Log</button>
</div>
<div class="space-y-3">
<div class="sharp-card p-5 hover:border-brand-primary transition-all flex gap-4">
<div class="shrink-0">
<div class="w-10 h-10 rounded-sm bg-charcoal-900 border border-charcoal-800 flex items-center justify-center text-slate-500">
<span class="material-symbols-outlined text-xl">commit</span>
</div>
</div>
<div class="flex-1">
<div class="flex items-center justify-between mb-1">
<div class="flex items-center space-x-2">
<span class="font-bold text-white text-sm">Elliott Chong</span>
<span class="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Pushed to</span>
<span class="text-brand-primary text-[10px] font-mono font-bold bg-brand-primary/10 px-2 py-0.5 border border-brand-primary/20">main</span>
</div>
<span class="text-[10px] text-slate-500 font-bold mono uppercase">14m AGO</span>
</div>
<p class="text-slate-300 font-bold text-sm mb-2">Update core-engine and structural components</p>
<div class="text-[11px] font-mono text-slate-400 bg-charcoal-900/50 p-2.5 border border-charcoal-800 leading-relaxed">
<span class="text-emerald-500">+</span> Added documentation for GraphQL endpoints.<br/>
<span class="text-emerald-500">+</span> Updated tailwind configuration for design tokens.
                            </div>
</div>
</div>
<div class="sharp-card p-5 hover:border-brand-primary transition-all flex gap-4">
<div class="shrink-0">
<div class="w-10 h-10 rounded-sm bg-brand-primary/20 text-brand-primary flex items-center justify-center border border-brand-primary/30">
<span class="material-symbols-outlined text-xl">psychology</span>
</div>
</div>
<div class="flex-1">
<div class="flex items-center justify-between mb-1">
<div class="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-tighter">
<span class="text-brand-primary">AI ASSISTANT</span>
<span class="text-slate-500">processed for</span>
<span class="text-white">Sarah Jenkins</span>
</div>
<span class="text-[10px] text-slate-500 font-bold mono uppercase">2h AGO</span>
</div>
<p class="text-slate-400 italic text-sm mb-2 font-medium">"Where is the email syncing logic?"</p>
<div class="p-3 bg-charcoal-900 border-l-2 border-brand-primary">
<p class="text-xs text-slate-300 leading-relaxed">Located in <code class="text-brand-primary font-mono text-xs font-bold">src/lib/account.ts</code>. The sync loop is handled by the worker service.</p>
</div>
</div>
</div>
<div class="sharp-card p-5 hover:border-brand-primary transition-all flex gap-4">
<div class="shrink-0">
<div class="w-10 h-10 rounded-sm bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
<span class="material-symbols-outlined text-xl">bolt</span>
</div>
</div>
<div class="flex-1">
<div class="flex items-center justify-between mb-1">
<span class="font-bold text-emerald-500 text-xs uppercase tracking-widest">+1,319 INDEXING CREDITS ADDED</span>
<span class="text-[10px] text-slate-500 font-bold mono uppercase">YESTERDAY</span>
</div>
<p class="text-xs text-slate-500 font-medium">Monthly enterprise quota refreshed.</p>
<div class="mt-3 w-full bg-charcoal-800 h-1">
<div class="bg-emerald-500 h-1 w-[85%] shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
</div>
</div>
</div>
</div>
</section>
</div>
</div>
</main>
<div class="fixed bottom-6 right-6 z-50">
<button class="w-12 h-12 bg-white text-charcoal-950 rounded-sm shadow-2xl flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
<span class="material-symbols-outlined font-bold">chat_bubble</span>
</button>
</div>

</body></html>