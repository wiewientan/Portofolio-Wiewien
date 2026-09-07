import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { 
  Sparkles, Code2, Award, Briefcase, Layers, ExternalLink, Send, 
  CheckCircle2, ChevronRight, Eye, Terminal, Compass, Heart, ArrowUpRight, 
  GraduationCap, MapPin, Calendar, Download, Sparkle, Mail, Phone, Flame, 
  Star, Coffee, Check, Copy, Globe 
} from "lucide-react";
import confetti from "canvas-confetti";

function GithubIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

// ─── Color & Theme Tokens ──────────────────────────────────────────────────
const C = {
  // Rich midnight slate with crimson-wine undertones (not pure black void)
  bg:         "#0c0a17",
  bgAlt:      "#110e20",
  bgCard:     "rgba(255, 255, 255, 0.04)",
  bgCardHov:  "rgba(255, 255, 255, 0.08)",
  
  // Vibrant accents
  red:        "#f43f5e",
  crimson:    "#fb7185",
  rose:       "#fda4af",
  wine:       "#be123c",
  rubyGlow:   "rgba(244, 63, 94, 0.35)",
  purpleGlow: "rgba(168, 85, 247, 0.25)",
  
  // Typography
  text:       "#ffffff",
  textMuted:  "#e2e8f0",
  textDim:    "#94a3b8",
  
  // Borders & Glows
  border:     "rgba(244, 63, 94, 0.22)",
  borderHov:  "rgba(244, 63, 94, 0.65)",
  glow:       "rgba(244, 63, 94, 0.28)",
  
  // Gradients
  gradMain:   "linear-gradient(135deg, #f43f5e 0%, #e11d48 50%, #be123c 100%)",
  gradText:   "linear-gradient(135deg, #ffffff 0%, #ffe4e6 25%, #fda4af 60%, #fb7185 100%)",
  gradAccent: "linear-gradient(135deg, #ffffff 0%, #fda4af 40%, #f43f5e 100%)",
  gradButton: "linear-gradient(135deg, #f43f5e 0%, #e11d48 50%, #9f1239 100%)",
};

// ─── Data ────────────────────────────────────────────────────────────────────
const PROJECTS = [
  { id:1, name:"Business Intelligence Dashboard", desc:"Interactive BI dashboard for real-time data visualization, KPI analytics, and executive business insights.", tech:["HTML","CSS","JavaScript","Chart.js"], lang:"HTML", category:"Web Dev", url:"https://github.com/wiewientan/business-inteligient-dashboard", demo:"https://business-inteligient-dashboard.netlify.app/" },
  { id:2, name:"Android Movie App", desc:"Full-featured mobile movie streaming UI with SQL database and dynamic PHP backend integration.", tech:["Java","SQL","PHP","Android Studio"], lang:"Java", category:"Mobile & Apps", url:"https://github.com/wiewientan/android-movie-app", demo:null },
  { id:3, name:"PressuAttendance App", desc:"Real-time student and staff attendance tracking Android application powered by Firebase cloud sync.", tech:["Java","Firebase","Android"], lang:"Java", category:"Mobile & Apps", url:"https://github.com/wiewientan/android-PressuAttadance-app", demo:null },
  { id:4, name:"Komodo Island Tourism Portal", desc:"High-conversion tourism showcase website with immersive visuals, travel schedules, and booking info.", tech:["HTML5","CSS3","JavaScript"], lang:"HTML", category:"Web Dev", url:"https://github.com/wiewientan/Komodo-Island-Website", demo:"https://komodoisland.netlify.app/" },
  { id:5, name:"Online Flight Booking System", desc:"Enterprise-grade web flight booking system complete with ticket reservations and admin fleet management.", tech:["PHP","MySQL","Bootstrap"], lang:"PHP", category:"Enterprise", url:"https://github.com/wiewientan/Online-Flight-System", demo:null },
  { id:6, name:"Online Voting & Ballot System", desc:"Cryptographically secure voting web application built on JSP/Servlet architecture with live tally dashboard.", tech:["Java","JSP","MySQL","Tomcat"], lang:"Java", category:"Enterprise", url:"https://github.com/wiewientan/Online-Voting-System", demo:null }
];

const WORK_EXP = [
  {
    org:"Telkom Indonesia", logo:"/icons/telkom.png", period:"Aug 2026 - Present",
    roles:[{
      role:"Business Service Development", type:"Internship",
      period:"Aug 2026 - Present · 2 mos", location:"Batam, Riau Islands, Indonesia · On-site",
      points:[
        "Developed and maintained internal software systems to streamline company operations and employee workflow efficiency.",
        "Assisted in network infrastructure management, hardware configuration, and connectivity troubleshooting.",
        "Conducted on-site customer visits to assess technical requirements, provide service support, and strengthen client relations."
      ], cert:null, certLabel:""
    }]
  },
  {
    org:"Pemuda Melangkah", logo:"/icons/pemuda-melangkah.png", period:"6 mos",
    roles:[{
      role:"Graphic Designer", type:"Internship",
      period:"Nov 2025 - Apr 2026", location:"Yogyakarta, Indonesia · Remote",
      points:[
        "Created and managed high-impact poster designs for nation-wide youth campaigns.",
        "Collaborated with cross-community media partners for strategic collaborative programs.",
        "Led creative ideation to execution with the design team across digital touchpoints."
      ], cert:null, certLabel:""
    }]
  },
  {
    org:"Setsail BizAccel", logo:"/icons/setsail.png", period:"9 mos",
    roles:[
      {
        role:"PIC Design: Daily Life Holiday Hustle", type:"Internship",
        period:"Oct 2024 - May 2025", location:"North Cikarang, West Java · On-site",
        points:[
          "Spearheaded all creative branding and collateral for the Daily Life Holiday Hustle event.",
          "Produced multi-channel assets: promotional posters, presentation decks, and social media feeds.",
          "Aligned with founder teams and event leads to deliver cohesive brand identity."
        ], cert:"/certificates/Daily Life Holiday Hustle.jpg", certLabel:"View Certificate"
      },
      {
        role:"PIC Design: Fireside Chat (Insight Exchange)", type:"Internship",
        period:"Oct 2024 - May 2025", location:"North Cikarang, West Java",
        points:[
          "Designed compelling visual materials for executive startup networking sessions.",
          "Developed high-retention social content and stage visuals for founders and mentors.",
          "Facilitated design communications between multi-sector entrepreneurs."
        ], cert:"/certificates/Fireside Chat - Insight Exchange.jpg", certLabel:"View Certificate"
      },
      {
        role:"VPM II: Workshop Founders Weekend", type:"Internship",
        period:"Oct 2024 - May 2025", location:"North Cikarang, West Java · On-site",
        points:[
          "Co-facilitated a 3-day intensive entrepreneurship workshop for 30 high-potential founders.",
          "Directed visual branding, stage documentation, and stakeholder reporting decks.",
          "Collaborated closely with startup incubator specialists at Setsail BizAccel."
        ], cert:"/certificates/Workshop Founders Weekend.jpg", certLabel:"View Certificate"
      },
      {
        role:"Creative Committee: Startup Bootcamp", type:"Internship",
        period:"Oct 2024 - May 2025", location:"North Cikarang, West Java · On-site",
        points:[
          "Organized logistics and creative workflow for an intensive 4-day startup incubator program.",
          "Delivered print-ready event assets, stage banners, and digital marketing graphics.",
          "Supervised live multimedia capture and recap documentation."
        ], cert:"/certificates/Startup Bootcamp.jpg", certLabel:"View Certificate"
      },
      {
        role:"Web Developer", type:"Internship",
        period:"Sep 2024 - 2025", location:"North Cikarang, West Java",
        points:[
          "Engineered responsive web modules and promotional landing interfaces for accelerator events."
        ], cert:"/certificates/developer.jpg", certLabel:"View Certificate"
      }
    ]
  }
];

const ORG_EXP = [
  { org:"BEM PUFA", logo:"/icons/pufa.jpg", full:"President University Faculty Association", period:"2024 - 2025",
    roles:[
      { title:"PIC Design: COMPSPHERE 2025", event:"COMPSPHERE 2025", period:"Oct - Nov 2025", points:["Produced over 150+ social feed design concepts and brand assets independently.","Conceptualized merchandise, committee apparel, and sponsorship pitch decks.","Mentored and reviewed the creative output of the junior design squad."], cert:"/certificates/COMPSPHERE.jpg", certLabel:"View Certificate" },
      { title:"PIC Design: COMPSTUDY 2025", event:"COMPSTUDY 2025", period:"Oct 2024 - Jul 2025", points:["Appointed PIC of Design for the comparative academic delegation to Universitas Gadjah Mada.","Created all event visual identities, physical banners, and digital collateral."] },
      { title:"PIC Documentation: Social Project 2025", event:"Social Project 2025", period:"Oct 2024 - Jul 2025", points:["Led multimedia capture and storytelling for the community service initiative at Pondok Pesantren Arrohman."] },
      { title:"Member Design Communication", event:"COMPBRAINS 2024", period:"2024", desc:"Crafted high-engagement digital content for academic competitions." },
      { title:"MTDD Member", event:"COMPSHADOW 2024", period:"2024", desc:"Designed and documented internal team empowerment initiatives." }
    ]
  },
  { org:"PUDC", full:"President University Developer Club", period:"2024 - 2025",
    roles:[
      { title:"Design Team Member", event:"", desc:"Developed creative UI assets while exploring hands-on AI and database architecture." }
    ]
  }
];

const SKILLS_DATA = [
  {
    cat: "Programming Languages",
    icon: "💻",
    items: [
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
    ]
  },
  {
    cat: "Databases & Spreadsheets",
    icon: "📊",
    items: [
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "Google Sheets", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg", fallback: "Sheets" },
      { name: "MS Excel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg", fallback: "Excel" }
    ]
  },
  {
    cat: "DevOps & APIs",
    icon: "🚀",
    items: [
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "RESTful APIs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", fallback: "API" },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" }
    ]
  },
  {
    cat: "Automation & Frameworks",
    icon: "⚡",
    items: [
      { name: "n8n Automation", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", fallback: "n8n" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
      { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Apache", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg" }
    ]
  },
  {
    cat: "Data Science & ML",
    icon: "🧠",
    items: [
      { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
      { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
      { name: "Scikit-learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
      { name: "Matplotlib", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg" },
      { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" }
    ]
  },
  {
    cat: "UI / UX & Creative Design",
    icon: "🎨",
    items: [
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
      { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
      { name: "Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
      { name: "After Effects", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg" },
      { name: "Adobe XD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg" }
    ]
  }
];

const CERTIFICATIONS = [
  {
    id: 1,
    title: "Google AI Professional Certificate",
    issuer: "Google via Coursera",
    badge: "AI & Data Science",
    desc: "Mastering Generative AI, Prompt Engineering, Predictive Data Analytics, AI Product Development, and Executive AI Strategy.",
    skills: ["Generative AI", "Prompt Engineering", "Data Analytics", "AI Product Building", "Strategic AI"],
    cert: "/certificates/GOOGLE AI.png",
    certLabel: "Google AI Certificate"
  },
  {
    id: 2,
    title: "Microsoft Excel Intensive Bootcamp",
    issuer: "KarirNex Intensive Bootcamp · 20 Hours",
    badge: "Data Analytics",
    desc: "20-hour intensive data mastery on advanced dynamic formulas, Pivot Tables, XLOOKUP, Data Validation, and automated macro dashboards.",
    skills: ["Formulas & Functions", "Pivot Tables", "VLOOKUP & XLOOKUP", "Dashboards", "VBA Macros"],
    cert: "/certificates/KARIRNEX.png",
    certLabel: "KarirNex Certificate"
  },
  {
    id: 3,
    title: "Web Developer Certification",
    issuer: "Setsail BizAccel Accelerator",
    badge: "Full-Stack Dev",
    desc: "Engineered responsive web modules, interactive registration portals, and promotional landing interfaces for accelerator events.",
    skills: ["Web Development", "Responsive UI", "Frontend Systems", "Event Tech"],
    cert: "/certificates/developer.jpg",
    certLabel: "Web Dev Certificate"
  },
  {
    id: 4,
    title: "PIC Design - COMPSPHERE 2025",
    issuer: "President University Faculty Association (PUFA)",
    badge: "Creative Leadership",
    desc: "Directed end-to-end visual branding identity and produced 150+ multi-channel creative assets for the flagship IT competition.",
    skills: ["Brand Identity", "Design Direction", "Campaign Systems", "Visual Strategy"],
    cert: "/certificates/COMPSPHERE.jpg",
    certLabel: "COMPSPHERE Certificate"
  },
  {
    id: 5,
    title: "Startup Bootcamp Committee",
    issuer: "Setsail BizAccel Accelerator",
    badge: "Operations & Branding",
    desc: "Supervised creative production, live multimedia capture, and stage graphics for an intensive 4-day startup incubator program.",
    skills: ["Event Operations", "Multimedia", "Stage Design", "Creative Production"],
    cert: "/certificates/Startup Bootcamp.jpg",
    certLabel: "Startup Bootcamp Cert"
  },
  {
    id: 6,
    title: "VPM II - Workshop Founders Weekend",
    issuer: "Setsail BizAccel Accelerator",
    badge: "Entrepreneurship",
    desc: "Co-facilitated a 3-day intensive entrepreneurship workshop for 30 high-potential founders and directed stakeholder reporting decks.",
    skills: ["Facilitation", "Founder Mentorship", "Presentation Decks", "Incubator Ops"],
    cert: "/certificates/Workshop Founders Weekend.jpg",
    certLabel: "Founders Weekend Cert"
  },
  {
    id: 7,
    title: "PIC Design - Fireside Chat: Insight Exchange",
    issuer: "Setsail BizAccel Accelerator",
    badge: "Executive Branding",
    desc: "Designed compelling visual materials, stage collateral, and high-retention social content for executive startup networking sessions.",
    skills: ["Executive Decks", "Networking Media", "Social Branding", "Event Identity"],
    cert: "/certificates/Fireside Chat - Insight Exchange.jpg",
    certLabel: "Fireside Chat Cert"
  },
  {
    id: 8,
    title: "PIC Design - Daily Life Holiday Hustle",
    issuer: "Setsail BizAccel Accelerator",
    badge: "Visual Identity",
    desc: "Spearheaded all creative branding, keynote decks, and promotional campaign materials for the entrepreneurship showcase.",
    skills: ["Brand Collateral", "Social Feeds", "Keynote Decks", "Digital Assets"],
    cert: "/certificates/Daily Life Holiday Hustle.jpg",
    certLabel: "Holiday Hustle Cert"
  }
];

// ─── High Performance Scroll & Animation Hooks ──────────────────────────────
function useScrollInfo() {
  const [info, setInfo] = useState({
    scrollY: 0,
    progress: 0,
    velocity: 0,
    direction: "down"
  });

  const lastScrollY = useRef(0);
  const lastTime = useRef(performance.now());
  const rafId = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) return;

      rafId.current = requestAnimationFrame(() => {
        const now = performance.now();
        const currentY = window.pageYOffset || document.documentElement.scrollTop;
        const dt = Math.max(now - lastTime.current, 16);
        const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        const currentProgress = Math.min(Math.max(currentY / maxScroll, 0), 1);
        
        const delta = currentY - lastScrollY.current;
        const currentVelocity = delta / dt; // pixels per ms

        setInfo({
          scrollY: currentY,
          progress: currentProgress,
          velocity: currentVelocity,
          direction: delta >= 0 ? "down" : "up"
        });

        lastScrollY.current = currentY;
        lastTime.current = now;
        rafId.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return info;
}

function useInView(threshold = 0.15, rootMargin = "0px 0px -60px 0px") {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
    }, { threshold, rootMargin });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);
  return [ref, inView];
}

// ─── Apple-Grade Multi-Stage Scroll Reveal with Dynamic Blur & 3D Lift ───────
function ScrollReveal({
  children,
  delay = 0,
  y = 40,
  blur = 16,
  scale = 0.94,
  rotateX = 8,
  style = {},
  className = ""
}) {
  const [ref, inView] = useInView(0.12, "0px 0px -40px 0px");
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        filter: inView ? "blur(0px)" : `blur(${blur}px)`,
        transform: inView
          ? "perspective(1100px) rotateX(0deg) translateY(0px) scale(1)"
          : `perspective(1100px) rotateX(${rotateX}deg) translateY(${y}px) scale(${scale})`,
        transition: `
          opacity 0.95s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
          filter 0.95s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
          transform 0.95s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms
        `,
        willChange: "opacity, filter, transform",
        ...style
      }}
    >
      {children}
    </div>
  );
}

// Keep backward compatibility for Fade alias
const Fade = ScrollReveal;

// ─── Custom Interactive Cursor ───────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.15;
      ring.current.y += (pos.current.y - ring.current.y) * 0.15;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf.current); };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer:coarse)").matches) return null;

  return (
    <>
      <div ref={dotRef} style={{
        position:"fixed", top:0, left:0, width:8, height:8, borderRadius:"50%",
        background:"#ff8070", zIndex:99999, pointerEvents:"none",
        boxShadow:"0 0 10px #f43f5e, 0 0 20px rgba(244,63,94,0.6)",
        willChange:"transform"
      }} />
      <div ref={ringRef} style={{
        position:"fixed", top:0, left:0, width:32, height:32, borderRadius:"50%",
        border:"1.5px solid rgba(244,63,94,0.6)", zIndex:99998, pointerEvents:"none",
        boxShadow:"0 0 15px rgba(244,63,94,0.25)",
        willChange:"transform"
      }} />
    </>
  );
}

// ─── Glowing Neon Laser Scroll Progress Bar ──────────────────────────────────
function ScrollProgress() {
  const { progress } = useScrollInfo();
  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, height:3.5, zIndex:99997, background:"rgba(255,255,255,0.03)" }}>
      <div style={{
        height:"100%", width:`${progress * 100}%`,
        background:"linear-gradient(90deg, #be123c 0%, #f43f5e 50%, #fda4af 90%, #ffffff 100%)",
        boxShadow:"0 0 14px #f43f5e, 0 0 28px rgba(244, 63, 94, 0.7)",
        transition:"width 0.08s ease-out"
      }} />
    </div>
  );
}

// ─── Masterpiece Japanese Sakura Petals Engine with Wind & Intensity Modes ───
function SakuraPetalsCanvas({ mode = "breeze", mouseX = 0, mouseY = 0 }) {
  const canvasRef = useRef(null);
  const { velocity } = useScrollInfo();
  const velocityRef = useRef(velocity);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    velocityRef.current = velocity;
  }, [velocity]);

  useEffect(() => {
    mouseRef.current = { x: mouseX + (typeof window !== "undefined" ? window.innerWidth / 2 : 0), y: mouseY + (typeof window !== "undefined" ? window.innerHeight / 2 : 0) };
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (mode === "off") {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const isMobile = window.innerWidth < 768;
    
    // Density & Speed multiplier based on selected mode
    const configByMode = {
      calm: { count: isMobile ? 6 : 10, speedMult: 0.35, swayMult: 0.5 },
      gentle: { count: isMobile ? 12 : 20, speedMult: 0.7, swayMult: 0.8 },
      breeze: { count: isMobile ? 20 : 36, speedMult: 1.0, swayMult: 1.0 },
      shower: { count: isMobile ? 32 : 56, speedMult: 1.45, swayMult: 1.35 }
    };

    const cfg = configByMode[mode] || configByMode.breeze;

    const petalPalettes = [
      { start: "#ffffff", mid: "#ffe4e6", end: "#fda4af", glow: "rgba(253, 164, 175, 0.45)" },
      { start: "#fff1f2", mid: "#fecdd3", end: "#fb7185", glow: "rgba(251, 113, 133, 0.45)" },
      { start: "#ffe4e6", mid: "#fda4af", end: "#f43f5e", glow: "rgba(244, 63, 94, 0.45)" },
      { start: "#ffffff", mid: "#fecdd3", end: "#fda4af", glow: "rgba(253, 164, 175, 0.35)" }
    ];

    const petals = Array.from({ length: cfg.count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 7 + Math.random() * 8,
      depth: 0.5 + Math.random() * 0.7,
      speedX: (0.25 + Math.random() * 0.5) * cfg.speedMult,
      speedY: (0.35 + Math.random() * 0.55) * cfg.speedMult,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015 * cfg.speedMult,
      tilt: Math.random() * Math.PI,
      tiltSpeed: (0.008 + Math.random() * 0.012) * cfg.speedMult,
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: (0.008 + Math.random() * 0.014) * cfg.swayMult,
      palette: petalPalettes[Math.floor(Math.random() * petalPalettes.length)],
      opacity: 0.55 + Math.random() * 0.3
    }));

    let lastTime = performance.now();
    let smoothVelocity = 0;

    const render = (time) => {
      const dt = Math.min((time - lastTime) / 16.666, 1.6);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      smoothVelocity += (velocityRef.current - smoothVelocity) * 0.08;
      const vBoost = Math.max(Math.min(smoothVelocity * 0.25, 1.8), -1.0);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        p.swayOffset += p.swaySpeed * dt;
        p.tilt += p.tiltSpeed * dt;
        p.rotation += p.rotSpeed * dt;

        // Interactive subtle wind push from mouse cursor
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let windX = 0;
        let windY = 0;
        if (dist < 140 && dist > 0) {
          const force = (1 - dist / 140) * 1.5;
          windX = (dx / dist) * force;
          windY = (dy / dist) * force;
        }

        const sway = Math.sin(p.swayOffset) * (0.65 * p.depth * cfg.swayMult);
        p.x += (p.speedX * p.depth + sway + windX) * dt;
        p.y += (p.speedY * p.depth + vBoost * p.depth + windY) * dt;

        // Wrap boundaries
        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * (width + 100) - 50;
        } else if (p.y < -30) {
          p.y = height + 20;
        }
        if (p.x > width + 30) {
          p.x = -30;
        } else if (p.x < -30) {
          p.x = width + 25;
        }

        // Draw notched authentic Japanese Sakura Petal
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(Math.cos(p.tilt) * p.depth, p.depth);
        ctx.globalAlpha = p.opacity;

        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.75, -p.size * 0.85, p.size * 0.85, p.size * 0.45, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.85, p.size * 0.45, -p.size * 0.75, -p.size * 0.85, 0, -p.size);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
        grad.addColorStop(0, p.palette.start);
        grad.addColorStop(0.5, p.palette.mid);
        grad.addColorStop(1, p.palette.end);

        ctx.fillStyle = grad;
        ctx.shadowColor = p.palette.glow;
        ctx.shadowBlur = 8 * p.depth;
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [mode]);

  if (mode === "off") return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        width: "100%",
        height: "100%"
      }}
    />
  );
}



// ─── Pure Vector Masterpiece Japanese Scenic Stage with 3D Cinematic Dispersal ───
function HeroJapaneseDispersalStage() {
  const { scrollY, velocity } = useScrollInfo();
  // Normalized 0 to 1 scroll transition across Hero height (~650px)
  const scrollRange = 650;
  const progress = Math.min(Math.max(scrollY / scrollRange, 0), 1);
  const vBoost = Math.max(Math.min(velocity * 10, 30), -30);

  if (scrollY > scrollRange + 120) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
        opacity: Math.max(0, 1 - Math.pow(progress, 1.6)),
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 98%)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 98%)"
      }}
    >
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }}
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
      >
        <defs>
          {/* 1. Deep Midnight Twilight Japanese Sky Gradient */}
          <linearGradient id="vSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#070510" />
            <stop offset="22%" stopColor="#140724" />
            <stop offset="45%" stopColor="#280b38" />
            <stop offset="70%" stopColor="#4e0e3e" />
            <stop offset="100%" stopColor="#75123a" />
          </linearGradient>

          {/* 2. Mount Fuji Left Sunlit Amethyst Body Gradient */}
          <linearGradient id="vFujiLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#43165b" />
            <stop offset="55%" stopColor="#290b3c" />
            <stop offset="100%" stopColor="#14051f" />
          </linearGradient>

          {/* 3. Mount Fuji Right Deep Shadow Indigo Body Gradient */}
          <linearGradient id="vFujiDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e082f" />
            <stop offset="50%" stopColor="#11031b" />
            <stop offset="100%" stopColor="#07010e" />
          </linearGradient>

          {/* 4. Mount Fuji Snow Cap Crisp Twilight Gradient */}
          <linearGradient id="vSnowMain" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
            <stop offset="35%" stopColor="#fde2e8" stopOpacity="0.92" />
            <stop offset="70%" stopColor="#fda4af" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.65" />
          </linearGradient>

          {/* 5. Mount Fuji Snow Shaded Ravine Gradient */}
          <linearGradient id="vSnowShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#c084fc" stopOpacity="0.75" />
            <stop offset="85%" stopColor="#7e22ce" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b0764" stopOpacity="0.4" />
          </linearGradient>

          {/* 6. Distant Misty Mountain Ridge */}
          <linearGradient id="vRidgeFar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2b0944" />
            <stop offset="100%" stopColor="#10021c" />
          </linearGradient>

          {/* 7. Mid Mountain Ridge */}
          <linearGradient id="vRidgeMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#460c37" />
            <stop offset="100%" stopColor="#160218" />
          </linearGradient>

          {/* 8. Foreground Hill Slopes */}
          <linearGradient id="vHillClose" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#160624" />
            <stop offset="100%" stopColor="#08040f" />
          </linearGradient>

          {/* 9. Prominent Japanese Ocean (Laut Jepang) Deep Gradient */}
          <linearGradient id="vSeaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#be185d" stopOpacity="0.7" />
            <stop offset="22%" stopColor="#9d174d" stopOpacity="0.82" />
            <stop offset="50%" stopColor="#580824" stopOpacity="0.92" />
            <stop offset="78%" stopColor="#24071f" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#0c0a17" stopOpacity="1" />
          </linearGradient>

          {/* 10. Shimmering Sun Light Path on Ocean */}
          <linearGradient id="vSunLightBeam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fecdd3" stopOpacity="0.75" />
            <stop offset="35%" stopColor="#f43f5e" stopOpacity="0.5" />
            <stop offset="75%" stopColor="#9f1239" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#881337" stopOpacity="0" />
          </linearGradient>

          {/* 11. Torii Gate & Bridge Vermilion Red Gradient */}
          <linearGradient id="vToriiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="45%" stopColor="#be123c" />
            <stop offset="100%" stopColor="#7f0d2b" />
          </linearGradient>

          {/* 12. Soft Night Mountain Mist Gradient */}
          <linearGradient id="vMistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" stopOpacity="0.32" />
            <stop offset="50%" stopColor="#9f1239" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0c0a17" stopOpacity="0" />
          </linearGradient>

          {/* Radial Sun Aura */}
          <radialGradient id="sunAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fecdd3" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#fb7185" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#e11d48" stopOpacity="0.25" />
            <stop offset="85%" stopColor="#881337" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#120c24" stopOpacity="0" />
          </radialGradient>

          {/* Stone Lantern Warm Amber Glow */}
          <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.65" />
            <stop offset="70%" stopColor="#b45309" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
          </radialGradient>

          {/* Vector Glow Filter */}
          <filter id="vectorGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ─── Layer 1: Japanese Sunset Sky Canvas ─── */}
        <rect width="1440" height="900" fill="url(#vSkyGrad)" />

        {/* ─── Layer 2: Majestic Mount Fuji & Pulsing Solar Corona (Glides Left-Up with 3D Depth) ─── */}
        <g
          style={{
            transform: `translate(-${progress * 460}px, -${progress * 240 + vBoost * 0.4}px) scale(${1 + progress * 0.22}) rotate(-${progress * 4}deg)`,
            transformOrigin: "360px 240px",
            filter: `blur(${progress * 4}px)`,
            opacity: Math.max(0, 1 - progress * 1.15),
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
            willChange: "transform, opacity, filter"
          }}
        >
          {/* ☀️ Expanding Solar Corona Wave on Scroll */}
          <circle cx="360" cy="180" r={230 + progress * 110} fill="url(#sunAura)" opacity={Math.max(0, 0.42 - progress * 0.35)} />
          <circle cx="360" cy="180" r={140 + progress * 50} fill="url(#sunAura)" opacity={Math.max(0, 0.68 - progress * 0.35)} />
          <circle cx="360" cy="180" r="88" fill="#fda4af" opacity="0.6" filter="url(#vectorGlow)" />

          {/* ══════════════ MOUNT FUJI ON THE LEFT SIDE ══════════════ */}
          {/* Left Sunlit Amethyst Half */}
          <path
            d="M -160 580 C 40 540, 200 340, 315 120 L 360 120 L 360 580 L -160 580 Z"
            fill="url(#vFujiLight)"
          />
          {/* Right Shadow Deep Indigo Half */}
          <path
            d="M 360 120 L 405 120 C 520 340, 680 540, 880 580 L 360 580 Z"
            fill="url(#vFujiDark)"
          />

          {/* Mount Fuji Crater Rim Lip */}
          <path
            d="M 315 120 Q 360 132, 405 120 L 398 116 Q 360 126, 322 116 Z"
            fill="#100319"
          />

          {/* Volcanic Slope Striations & Crags */}
          <g opacity="0.22" stroke="#ffffff" strokeWidth="1.2" fill="none">
            <path d="M 330 140 C 305 250, 235 390, 80 570" />
            <path d="M 345 150 C 330 270, 285 420, 180 580" />
            <path d="M 375 150 C 390 270, 435 420, 540 580" stroke="#a855f7" />
            <path d="M 390 140 C 415 250, 485 390, 640 570" stroke="#a855f7" />
          </g>

          {/* Mount Fuji Shadow Gully Background Facets */}
          <path
            d="
              M 315 120 
              L 405 120 
              L 430 200 
              L 415 180 
              L 400 240 
              L 382 205 
              L 370 275 
              L 360 225 
              L 345 265 
              L 335 205 
              L 318 235 
              L 302 210 
              L 290 185 
              Z
            "
            fill="url(#vSnowShadow)"
          />

          {/* Mount Fuji Crisp Glowing Snow Cap */}
          <path
            d="
              M 315 120 
              L 405 120 
              L 395 230 
              L 380 195 
              L 370 275 
              L 366 260 
              L 360 210 
              L 348 250 
              L 336 195 
              L 320 225 
              L 308 200 
              L 295 170 
              Z
            "
            fill="url(#vSnowMain)"
          />

          {/* Pure White Crisp Snow Highlights */}
          <path
            d="
              M 315 120 
              L 360 120 
              L 360 210 
              L 348 250 
              L 336 195 
              L 320 225 
              L 308 200 
              L 295 170 
              Z
            "
            fill="#ffffff"
            opacity="0.88"
          />

          {/* Sharp Snow Ridge Crease Lines */}
          <path d="M 360 120 L 360 210 L 366 260" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />
          <path d="M 345 120 L 336 195 L 348 250" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.85" />
          <path d="M 325 120 L 308 200 L 320 225" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.75" />
          <path d="M 375 120 L 380 195 L 395 230" stroke="#fecdd3" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.85" />
          <path d="M 390 120 L 410 170 L 425 185" stroke="#fda4af" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.75" />
        </g>

        {/* ─── Layer 3: Flock of Flying Japanese Cranes (Animated Wings & Soaring Flight Dispersal) ─── */}
        <g
          style={{
            transform: `translate(${progress * 760}px, -${progress * 420}px) scale(${1 - progress * 0.35})`,
            opacity: Math.max(0, 1 - progress * 1.1),
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
            willChange: "transform, opacity"
          }}
          className="flying-crane-group"
        >
          {/* Crane 1 (Leader) */}
          <g transform="translate(680, 130) scale(1.15)" className="crane-flapper-1">
            <path d="M 0 0 Q 15 -10, 30 -5 Q 20 5, 5 8 Z M 10 -3 Q 22 -26, 36 -32 Q 26 -12, 14 -3 Z M 10 0 Q 22 20, 32 32 Q 22 12, 13 2 Z" fill="#fda4af" />
            <circle cx="30" cy="-5" r="2" fill="#e11d48" />
          </g>
          {/* Crane 2 */}
          <g transform="translate(630, 175) scale(0.95)" className="crane-flapper-2" opacity="0.9">
            <path d="M 0 0 Q 15 -10, 30 -5 Q 20 5, 5 8 Z M 10 -3 Q 22 -26, 36 -32 Q 26 -12, 14 -3 Z M 10 0 Q 22 20, 32 32 Q 22 12, 13 2 Z" fill="#fda4af" />
          </g>
          {/* Crane 3 */}
          <g transform="translate(735, 170) scale(0.9)" className="crane-flapper-3" opacity="0.85">
            <path d="M 0 0 Q 15 -10, 30 -5 Q 20 5, 5 8 Z M 10 -3 Q 22 -26, 36 -32 Q 26 -12, 14 -3 Z M 10 0 Q 22 20, 32 32 Q 22 12, 13 2 Z" fill="#fda4af" />
          </g>
          {/* Crane 4 */}
          <g transform="translate(590, 215) scale(0.75)" className="crane-flapper-1" opacity="0.75">
            <path d="M 0 0 Q 15 -10, 30 -5 Q 20 5, 5 8 Z M 10 -3 Q 22 -26, 36 -32 Q 26 -12, 14 -3 Z M 10 0 Q 22 20, 32 32 Q 22 12, 13 2 Z" fill="#fda4af" />
          </g>
          {/* Crane 5 */}
          <g transform="translate(780, 210) scale(0.7)" className="crane-flapper-2" opacity="0.7">
            <path d="M 0 0 Q 15 -10, 30 -5 Q 20 5, 5 8 Z M 10 -3 Q 22 -26, 36 -32 Q 26 -12, 14 -3 Z M 10 0 Q 22 20, 32 32 Q 22 12, 13 2 Z" fill="#fda4af" />
          </g>
        </g>

        {/* ─── Layer 4: Distant Mountain Ranges & Pagoda (Deep Sinking Parallax & Fog Blur) ─── */}
        <g
          style={{
            transform: `translate(-${progress * 140}px, ${progress * 180}px) scale(${1 - progress * 0.12})`,
            transformOrigin: "left bottom",
            filter: `blur(${progress * 5}px)`,
            opacity: Math.max(0, 1 - progress * 1.1),
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
            willChange: "transform, opacity, filter"
          }}
        >
          {/* Back Mountain Ridge with Rolling Peaks */}
          <path
            d="M 0 420 Q 220 330, 460 390 T 920 350 T 1440 400 L 1440 900 L 0 900 Z"
            fill="url(#vRidgeFar)"
            opacity="0.95"
          />

          {/* 🏯 5-Tier Japanese Pagoda (Tō) on Mountain Ridge */}
          <g transform="translate(860, 260) scale(0.8)" opacity="0.95">
            {/* Pagoda Spire (Sorin) */}
            <line x1="40" y1="0" x2="40" y2="40" stroke="#fda4af" strokeWidth="2.5" />
            <circle cx="40" cy="6" r="3" fill="#fda4af" />
            <circle cx="40" cy="14" r="4" fill="#fda4af" />
            <circle cx="40" cy="22" r="5" fill="#fda4af" />
            <circle cx="40" cy="30" r="6" fill="#fda4af" />
            {/* Tier 5 */}
            <path d="M 22 45 Q 40 38, 58 45 L 54 53 Q 40 48, 26 53 Z" fill="#f43f5e" />
            <rect x="32" y="52" width="16" height="12" fill="#0c0414" />
            {/* Tier 4 */}
            <path d="M 16 64 Q 40 56, 64 64 L 60 73 Q 40 67, 20 73 Z" fill="#f43f5e" />
            <rect x="30" y="72" width="20" height="13" fill="#0c0414" />
            {/* Tier 3 */}
            <path d="M 10 85 Q 40 76, 70 85 L 66 95 Q 40 88, 14 95 Z" fill="#be123c" />
            <rect x="28" y="94" width="24" height="14" fill="#0c0414" />
            {/* Tier 2 */}
            <path d="M 4 108 Q 40 98, 76 108 L 72 119 Q 40 111, 8 119 Z" fill="#be123c" />
            <rect x="26" y="118" width="28" height="15" fill="#0c0414" />
            {/* Tier 1 */}
            <path d="M -2 133 Q 40 122, 82 133 L 78 145 Q 40 136, 2 145 Z" fill="#881337" />
            <rect x="24" y="144" width="32" height="22" fill="#0c0414" />
            {/* Pagoda Base */}
            <rect x="18" y="166" width="44" height="10" rx="2" fill="#08020e" />
          </g>

          {/* 🌲 Japanese Black Pine (Matsu) Tree Silhouettes */}
          <g fill="#0c0317">
            <g transform="translate(80, 370) scale(0.75)">
              <path d="M 20 80 L 20 20" stroke="#08020e" strokeWidth="4" />
              <path d="M 0 25 Q 20 10, 40 25 Q 20 20, 0 25" />
              <path d="M -8 40 Q 20 22, 48 40 Q 20 34, -8 40" />
              <path d="M -15 58 Q 20 38, 55 58 Q 20 50, -15 58" />
            </g>
            <g transform="translate(980, 390) scale(0.7)">
              <path d="M 20 80 L 20 20" stroke="#08020e" strokeWidth="4" />
              <path d="M 0 25 Q 20 10, 40 25" />
              <path d="M -8 40 Q 20 22, 48 40" />
            </g>
          </g>

          {/* Mid Ridge with Luminous Crimson Rim Highlight */}
          <path
            d="M 0 490 Q 320 390, 680 450 T 1440 420 L 1440 900 L 0 900 Z"
            fill="url(#vRidgeMid)"
            opacity="0.96"
          />
        </g>

        {/* ─── Layer 5: 🌊 VIBRANT JAPANESE OCEAN & TIERED WAVES (Differential Cascading Wave Sink) ─── */}
        <g
          style={{
            transform: `translateY(${progress * 260}px) scaleX(${1 + progress * 0.25})`,
            transformOrigin: "center bottom",
            opacity: Math.max(0, 1 - progress * 1.1),
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
            willChange: "transform, opacity"
          }}
        >
          {/* Vast Ocean Surface Basin */}
          <path
            d="M 0 430 Q 720 390, 1440 430 L 1440 900 L 0 900 Z"
            fill="url(#vSeaGrad)"
          />

          {/* ✨ Shimmering Sun Light Path on Ocean */}
          <polygon
            points="360,410 520,900 200,900"
            fill="url(#vSunLightBeam)"
          />

          {/* 🌊 Authentic Layered Japanese Ocean Waves with Parallax Depth */}
          <g className="ocean-wave-group">
            {/* Horizon Delicate Sea Ripples */}
            <g
              style={{ transform: `translateY(${progress * 60}px)` }}
              opacity="0.55"
              stroke="#ffffff"
              strokeWidth="1.5"
              fill="none"
            >
              <path d="M 60 450 Q 160 442, 260 450 T 460 450 T 660 450 T 860 450 T 1060 450 T 1260 450 T 1440 450" strokeDasharray="14 8 28 6" />
              <path d="M 0 480 Q 120 470, 240 480 T 480 480 T 720 480 T 960 480 T 1200 480 T 1440 480" strokeDasharray="20 10 40 8" />
            </g>

            {/* Mid Ocean Waves Layer 1 */}
            <g style={{ transform: `translateY(${progress * 120}px)` }}>
              <path
                d="
                  M 0 520 
                  Q 90 498, 180 520 T 360 520 T 540 520 T 720 520 T 900 520 T 1080 520 T 1260 520 T 1440 520 
                  L 1440 560 
                  Q 1350 540, 1260 560 T 1080 560 T 900 560 T 720 560 T 540 560 T 360 560 T 180 560 T 0 560 
                  Z
                "
                fill="#be123c"
                opacity="0.45"
              />
              <path
                d="M 0 520 Q 90 498, 180 520 T 360 520 T 540 520 T 720 520 T 900 520 T 1080 520 T 1260 520 T 1440 520"
                stroke="#fecdd3"
                strokeWidth="2.4"
                fill="none"
                opacity="0.85"
              />
            </g>

            {/* Mid Ocean Waves Layer 2 */}
            <g style={{ transform: `translateY(${progress * 180}px)` }}>
              <path
                d="
                  M 0 590 
                  Q 120 562, 240 590 T 480 590 T 720 590 T 960 590 T 1200 590 T 1440 590 
                  L 1440 640 
                  Q 1320 618, 1200 640 T 960 640 T 720 640 T 480 640 T 240 640 T 0 640 
                  Z
                "
                fill="#881337"
                opacity="0.6"
              />
              <path
                d="M 0 590 Q 120 562, 240 590 T 480 590 T 720 590 T 960 590 T 1200 590 T 1440 590"
                stroke="#ffffff"
                strokeWidth="2.8"
                fill="none"
                opacity="0.9"
              />
            </g>

            {/* Foreground Swells Layer 3 */}
            <g style={{ transform: `translateY(${progress * 240}px)` }}>
              <path
                d="
                  M 0 670 
                  Q 150 638, 300 670 T 600 670 T 900 670 T 1200 670 T 1440 670 
                  L 1440 740 
                  Q 1290 710, 1200 740 T 900 740 T 600 740 T 300 740 T 0 740 
                  Z
                "
                fill="#4c0519"
                opacity="0.8"
              />
              <path
                d="M 0 670 Q 150 638, 300 670 T 600 670 T 900 670 T 1200 670 T 1440 670"
                stroke="#fda4af"
                strokeWidth="3.2"
                fill="none"
                opacity="0.95"
              />
            </g>

            {/* Deep Foreground Ocean Swell Layer 4 */}
            <path
              d="M 0 770 Q 180 730, 360 770 T 720 770 T 1080 770 T 1440 770 L 1440 900 L 0 900 Z"
              fill="#12051e"
            />
            <path
              d="M 0 770 Q 180 730, 360 770 T 720 770 T 1080 770 T 1440 770"
              stroke="#f43f5e"
              strokeWidth="3"
              fill="none"
              opacity="0.85"
            />
          </g>

          {/* 🌉 Traditional Arched Wooden Moon Bridge (Taiko-bashi) */}
          <g
            style={{
              transform: `translate(${380 - progress * 100}px, ${520 + progress * 190}px) scale(${1 + progress * 0.15})`,
              transition: "transform 0.1s ease-out"
            }}
            opacity="0.95"
          >
            <rect x="35" y="44" width="7" height="42" fill="#08040f" />
            <rect x="155" y="44" width="7" height="42" fill="#08040f" />
            <rect x="95" y="28" width="8" height="58" fill="#08040f" />
            <path d="M 0 65 Q 98 12, 196 65 L 196 74 Q 98 23, 0 74 Z" fill="url(#vToriiGrad)" />
            <path d="M -6 52 Q 98 0, 202 52 L 202 56 Q 98 5, -6 56 Z" fill="#06020a" />
            <rect x="0" y="52" width="5" height="18" fill="#06020a" />
            <rect x="38" y="32" width="5" height="22" fill="#06020a" />
            <rect x="76" y="20" width="5" height="24" fill="#06020a" />
            <rect x="114" y="20" width="5" height="24" fill="#06020a" />
            <rect x="152" y="32" width="5" height="22" fill="#06020a" />
            <rect x="190" y="52" width="5" height="18" fill="#06020a" />
            <circle cx="2.5" cy="50" r="3.5" fill="#fbbf24" />
            <circle cx="40.5" cy="30" r="3.5" fill="#fbbf24" />
            <circle cx="78.5" cy="18" r="3.5" fill="#fbbf24" />
            <circle cx="116.5" cy="18" r="3.5" fill="#fbbf24" />
            <circle cx="154.5" cy="30" r="3.5" fill="#fbbf24" />
            <circle cx="192.5" cy="50" r="3.5" fill="#fbbf24" />
            <ellipse cx="98" cy="90" rx="85" ry="12" fill="#f43f5e" opacity="0.4" filter="url(#vectorGlow)" />
          </g>

          {/* 🪷 Floating Lotus Pads on Sea */}
          <g
            className="floating-lotus-pads"
            style={{
              transform: `translateY(${progress * 130}px)`,
              transition: "transform 0.1s ease-out"
            }}
          >
            <g transform="translate(260, 640)">
              <ellipse cx="0" cy="0" rx="28" ry="8" fill="#064e3b" opacity="0.8" />
              <ellipse cx="0" cy="-5" rx="7" ry="11" fill="#f43f5e" opacity="0.9" />
              <circle cx="0" cy="-4" r="3" fill="#ffffff" />
            </g>
            <g transform="translate(380, 700)">
              <ellipse cx="0" cy="0" rx="34" ry="10" fill="#064e3b" opacity="0.75" />
              <ellipse cx="2" cy="-6" rx="8" ry="13" fill="#fb7185" opacity="0.9" />
              <circle cx="2" cy="-5" r="3.5" fill="#ffffff" />
            </g>
          </g>

          {/* Coastline Framing Headlands */}
          <path d="M 0 620 Q 220 560, 380 660 Q 280 800, 160 900 L 0 900 Z" fill="url(#vHillClose)" />
          <path d="M 1440 600 Q 1220 540, 1060 650 Q 1160 780, 1260 900 L 1440 900 Z" fill="url(#vHillClose)" />
        </g>

        {/* ─── Layer 6: Floating Shinto Torii Gate with Expanding Water Ripples ─── */}
        <g
          style={{
            transformOrigin: "780px 560px",
            transform: `translateY(${progress * 300}px) scale(${1 + progress * 0.42})`,
            opacity: Math.max(0, 1 - progress * 1.1),
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
            willChange: "transform, opacity"
          }}
        >
          {/* Concentric Water Ripple Waves Expanding around Torii Pillars */}
          <ellipse cx="728" cy="576" rx={24 + progress * 65} ry={6 + progress * 16} stroke="#fda4af" strokeWidth="1.5" fill="none" opacity={Math.max(0, 0.7 - progress * 0.8)} />
          <ellipse cx="868" cy="576" rx={24 + progress * 65} ry={6 + progress * 16} stroke="#fda4af" strokeWidth="1.5" fill="none" opacity={Math.max(0, 0.7 - progress * 0.8)} />

          {/* ⛩️ Grand Vermilion Torii Gate */}
          <rect x="712" y="568" width="32" height="12" rx="3" fill="#08030e" />
          <rect x="852" y="568" width="32" height="12" rx="3" fill="#08030e" />

          {/* Left Pillar */}
          <rect x="718" y="425" width="18" height="150" rx="2" fill="url(#vToriiGrad)" />
          <rect x="716" y="420" width="22" height="8" rx="1" fill="#050209" />
          <rect x="716" y="560" width="22" height="12" rx="1" fill="#050209" />

          {/* Right Pillar */}
          <rect x="858" y="425" width="18" height="150" rx="2" fill="url(#vToriiGrad)" />
          <rect x="856" y="420" width="22" height="8" rx="1" fill="#050209" />
          <rect x="856" y="560" width="22" height="12" rx="1" fill="#050209" />

          {/* Lower Crossbeam (Nuki) */}
          <rect x="685" y="462" width="226" height="12" rx="2" fill="url(#vToriiGrad)" />
          <rect x="715" y="459" width="5" height="18" fill="#050209" />
          <rect x="874" y="459" width="5" height="18" fill="#050209" />

          {/* Center Name Tablet (Gakuzuka) */}
          <rect x="788" y="425" width="18" height="38" rx="2" fill="#050209" />
          <rect x="792" y="430" width="10" height="28" rx="1" fill="#fda4af" opacity="0.8" />

          {/* Upper Sub-beam (Shimaki) */}
          <path d="M 675 424 L 920 424 L 930 435 L 665 435 Z" fill="url(#vToriiGrad)" />

          {/* Main Curved Top Beam (Kasagi) */}
          <path d="M 652 408 Q 797 394, 942 408 L 956 424 Q 797 412, 638 424 Z" fill="url(#vToriiGrad)" />
          <path d="M 650 403 Q 797 389, 944 403 L 950 410 Q 797 397, 644 410 Z" fill="#050209" />

          {/* Water Reflection */}
          <ellipse cx="797" cy="585" rx="75" ry="10" fill="#f43f5e" opacity="0.35" filter="url(#vectorGlow)" />
        </g>

        {/* ─── Layer 7: Left Bamboo Grove ("Mencar ke KIRI-BAWAH dengan Scroll Gust Wind") ─── */}
        <g
          style={{
            transformOrigin: "bottom left",
            transform: `translate(-${progress * 720}px, ${progress * 200}px) rotate(-${progress * 22 + vBoost * 0.5}deg)`,
            opacity: Math.max(0, 1 - progress * 1.15),
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
            willChange: "transform, opacity"
          }}
        >
          {/* Swaying Bamboo Grove */}
          <g className="bamboo-sway-group">
            <path d="M 45 900 L 50 80" stroke="#05030a" strokeWidth="18" strokeLinecap="round" />
            <path d="M 35 180 L 65 180" stroke="#160e22" strokeWidth="3.5" />
            <path d="M 37 320 L 63 320" stroke="#160e22" strokeWidth="3.5" />
            <path d="M 38 460 L 62 460" stroke="#160e22" strokeWidth="3.5" />
            <path d="M 40 600 L 60 600" stroke="#160e22" strokeWidth="3.5" />

            <path d="M 110 900 L 125 40" stroke="#090512" strokeWidth="14" strokeLinecap="round" />
            <path d="M 102 140 L 133 140" stroke="#1e1030" strokeWidth="3" />
            <path d="M 104 280 L 131 280" stroke="#1e1030" strokeWidth="3" />
            <path d="M 106 420 L 129 420" stroke="#1e1030" strokeWidth="3" />
            <path d="M 108 560 L 127 560" stroke="#1e1030" strokeWidth="3" />

            <path d="M 175 900 L 190 160" stroke="#040208" strokeWidth="11" strokeLinecap="round" />

            <g fill="#05030a">
              <path d="M 50 110 Q 145 75, 210 115 Q 135 135, 50 110" />
              <path d="M 50 200 Q 140 165, 195 205 Q 130 220, 50 200" />
              <path d="M 50 290 Q 155 250, 220 295 Q 145 315, 50 290" />
              <path d="M 50 410 Q 165 370, 230 420 Q 150 435, 50 410" />
              <path d="M 125 70 Q 220 35, 290 80 Q 210 100, 125 70" />
              <path d="M 125 170 Q 230 130, 305 180 Q 220 200, 125 170" />
              <path d="M 125 310 Q 240 265, 325 320 Q 230 340, 125 310" />
              <path d="M 125 450 Q 250 405, 330 465 Q 235 485, 125 450" />
              <path d="M 190 220 Q 275 185, 345 230 Q 265 250, 190 220" fill="#090512" />
              <path d="M 190 360 Q 285 325, 365 370 Q 280 390, 190 360" fill="#090512" />
            </g>
          </g>

          {/* 🌾 Shoreline Reeds */}
          <g className="reeds-sway-group" transform="translate(160, 650)">
            <path d="M 0 200 Q 25 90, 12 0 Q 35 100, 0 200" fill="#08030e" />
            <path d="M 30 200 Q 65 70, 48 -25 Q 75 80, 30 200" fill="#08030e" />
            <path d="M 55 200 Q 95 100, 80 20 Q 105 110, 55 200" fill="#08030e" />
            <ellipse cx="48" cy="-12" rx="4" ry="16" fill="#3b1509" />
          </g>
        </g>

        {/* ─── Layer 8: Right Sakura Canopy & Blossom Petal Burst ("Mencar ke KANAN-ATAS") ─── */}
        <g
          style={{
            transformOrigin: "top right",
            transform: `translate(${progress * 740}px, -${progress * 140}px) rotate(${progress * 18}deg)`,
            opacity: Math.max(0, 1 - progress * 1.15),
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
            willChange: "transform, opacity"
          }}
        >
          {/* Main Sakura Bough */}
          <path d="M 1440 30 Q 1280 70, 1200 150 T 1100 230 T 1030 310" stroke="#0e0417" strokeWidth="22" strokeLinecap="round" fill="none" />
          <path d="M 1200 150 Q 1150 80, 1090 50" stroke="#0e0417" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M 1100 230 Q 1030 250, 970 240" stroke="#0e0417" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M 1030 310 Q 960 350, 920 410" stroke="#0e0417" strokeWidth="8" strokeLinecap="round" fill="none" />

          {/* 🌸 Glowing Sakura Blossoms & Scatter Burst */}
          <g className="sakura-gentle-pulse" filter="url(#vectorGlow)">
            {/* Cluster 1 */}
            <g transform={`translate(${1030 - progress * 60}, ${310 + progress * 40})`}>
              <circle cx="0" cy="-15" r="12" fill="#fda4af" opacity="0.95" />
              <circle cx="14" cy="-5" r="12" fill="#fb7185" opacity="0.95" />
              <circle cx="9" cy="13" r="12" fill="#f43f5e" opacity="0.95" />
              <circle cx="-9" cy="13" r="12" fill="#f43f5e" opacity="0.95" />
              <circle cx="-14" cy="-5" r="12" fill="#fda4af" opacity="0.95" />
              <circle cx="0" cy="0" r="6" fill="#ffffff" />
            </g>
            {/* Cluster 2 */}
            <g transform={`translate(${1090 + progress * 45}, ${50 - progress * 30})`}>
              <circle cx="0" cy="-17" r="13" fill="#fbcfe8" opacity="0.95" />
              <circle cx="16" cy="-5" r="13" fill="#fda4af" opacity="0.95" />
              <circle cx="10" cy="15" r="13" fill="#fb7185" opacity="0.95" />
              <circle cx="-10" cy="15" r="13" fill="#fb7185" opacity="0.95" />
              <circle cx="-16" cy="-5" r="13" fill="#fda4af" opacity="0.95" />
              <circle cx="0" cy="0" r="6.5" fill="#ffffff" />
            </g>
            {/* Cluster 3 */}
            <g transform={`translate(${1200 + progress * 60}, ${150 - progress * 20})`}>
              <circle cx="0" cy="-20" r="15" fill="#fda4af" opacity="0.95" />
              <circle cx="19" cy="-6" r="15" fill="#fb7185" opacity="0.95" />
              <circle cx="12" cy="18" r="15" fill="#f43f5e" opacity="0.95" />
              <circle cx="-12" cy="18" r="15" fill="#f43f5e" opacity="0.95" />
              <circle cx="-19" cy="-6" r="15" fill="#fb7185" opacity="0.95" />
              <circle cx="0" cy="0" r="8" fill="#ffffff" />
            </g>
            {/* Cluster 4 */}
            <g transform={`translate(${970 - progress * 80}, ${240 + progress * 30})`}>
              <circle cx="0" cy="-14" r="11" fill="#fbcfe8" opacity="0.9" />
              <circle cx="13" cy="-4" r="11" fill="#fda4af" opacity="0.9" />
              <circle cx="8" cy="12" r="11" fill="#fb7185" opacity="0.9" />
              <circle cx="-8" cy="12" r="11" fill="#fb7185" opacity="0.9" />
              <circle cx="-13" cy="-4" r="11" fill="#fda4af" opacity="0.9" />
              <circle cx="0" cy="0" r="5" fill="#ffffff" />
            </g>
            <circle cx="1270" cy="120" r="15" fill="#fda4af" opacity="0.85" />
            <circle cx="1270" cy="120" r="6" fill="#ffffff" />
            <circle cx="1360" cy="170" r="18" fill="#fb7185" opacity="0.85" />
            <circle cx="1360" cy="170" r="8" fill="#ffffff" />
            <circle cx="1060" cy="170" r="12" fill="#f43f5e" opacity="0.85" />
            <circle cx="1130" cy="260" r="14" fill="#fda4af" opacity="0.85" />
          </g>

          {/* 🏮 Seaside Stone Lantern */}
          <g transform="translate(1180, 540)">
            <circle cx="14" cy="20" r="45" fill="url(#lanternGlow)" />
            <path d="M -6 12 Q 14 0, 34 12 L 32 17 Q 14 7, -4 17 Z" fill="#090412" />
            <circle cx="14" cy="2" r="3" fill="#090412" />
            <rect x="6" y="17" width="16" height="15" rx="2" fill="#fef08a" />
            <rect x="11" y="17" width="6" height="15" fill="#f59e0b" />
            <rect x="9" y="32" width="10" height="28" fill="#090412" />
            <rect x="2" y="60" width="24" height="10" rx="2" fill="#090412" />
          </g>
        </g>

        {/* ─── Layer 9: Japanese Clouds & Emakimono Rolling Mist (Parts Horizontally on Scroll) ─── */}
        <g
          style={{
            transform: `translate(-${progress * 620}px, -${progress * 180}px) scale(${1 - progress * 0.4})`,
            opacity: Math.max(0, 1 - progress * 1.2),
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
            willChange: "transform, opacity"
          }}
        >
          <g className="cloud-bob-1" style={{ transform: "translate(120px, 60px)" }}>
            <ellipse cx="70" cy="32" rx="80" ry="20" fill="rgba(255, 255, 255, 0.16)" />
            <ellipse cx="45" cy="22" rx="48" ry="24" fill="rgba(255, 255, 255, 0.22)" />
            <ellipse cx="110" cy="24" rx="42" ry="18" fill="rgba(255, 255, 255, 0.18)" />
            <ellipse cx="160" cy="32" rx="34" ry="15" fill="rgba(255, 255, 255, 0.14)" />
          </g>
        </g>

        <g
          style={{
            transform: `translate(${progress * 620}px, -${progress * 180}px) scale(${1 - progress * 0.4})`,
            opacity: Math.max(0, 1 - progress * 1.2),
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
            willChange: "transform, opacity"
          }}
        >
          <g className="cloud-bob-2" style={{ transform: "translate(1120px, 70px)" }}>
            <ellipse cx="70" cy="32" rx="75" ry="18" fill="rgba(255, 255, 255, 0.15)" />
            <ellipse cx="45" cy="22" rx="44" ry="22" fill="rgba(255, 255, 255, 0.2)" />
            <ellipse cx="100" cy="24" rx="36" ry="16" fill="rgba(255, 255, 255, 0.16)" />
          </g>
        </g>

        {/* Rolling Sea Mist (Kasumi) Band */}
        <g
          style={{
            transformOrigin: "center center",
            transform: `scaleX(${1 + progress * 1.8}) translateY(${progress * 80}px)`,
            opacity: Math.max(0, 0.85 - progress * 1.3),
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
            willChange: "transform, opacity"
          }}
          className="floating-mountain-mist"
        >
          <circle cx="360" cy="440" r="85" fill="url(#vMistGrad)" />
          <circle cx="480" cy="410" r="105" fill="url(#vMistGrad)" />
          <circle cx="600" cy="430" r="100" fill="url(#vMistGrad)" />
          <circle cx="720" cy="450" r="90" fill="url(#vMistGrad)" />
          <circle cx="840" cy="420" r="105" fill="url(#vMistGrad)" />
          <circle cx="960" cy="440" r="95" fill="url(#vMistGrad)" />
          <circle cx="1080" cy="415" r="100" fill="url(#vMistGrad)" />
        </g>

        {/* ─── Layer 10: ✨ Glowing Fireflies Floating Upwards on Scroll ─── */}
        <g
          style={{
            transform: `translateY(-${progress * 260}px) scale(${1 + progress * 0.6})`,
            opacity: Math.max(0, 1 - progress * 1.2),
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
            willChange: "transform, opacity"
          }}
          className="fireflies-lake-layer"
        >
          <circle cx="440" cy="560" r="4" fill="#fef08a" className="firefly-1" />
          <circle cx="560" cy="610" r="4.5" fill="#fef08a" className="firefly-2" />
          <circle cx="690" cy="550" r="3.5" fill="#fef08a" className="firefly-3" />
          <circle cx="820" cy="600" r="5" fill="#fef08a" className="firefly-4" />
          <circle cx="980" cy="560" r="4" fill="#fef08a" className="firefly-5" />
          <circle cx="1120" cy="590" r="4.5" fill="#fef08a" className="firefly-6" />
        </g>
      </svg>

      {/* ─── Layer 11: Atmospheric Dark Gradient Scrims & Seamless Bottom Blend ─── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(90deg, 
              rgba(12, 10, 23, 0.72) 0%, 
              rgba(12, 10, 23, 0.35) 45%, 
              rgba(12, 10, 23, 0.05) 100%
            )
          `,
          pointerEvents: "none"
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(180deg, 
              rgba(12, 10, 23, 0.25) 0%, 
              transparent 35%, 
              rgba(12, 10, 23, 0.5) 68%, 
              #0c0a17 100%
            )
          `,
          pointerEvents: "none"
        }}
      />

      <style>{`
        @keyframes cloudFloat1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-8px) translateX(18px); }
        }
        @keyframes cloudFloat2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(10px) translateX(-14px); }
        }
        @keyframes mistBreathe {
          0%, 100% { transform: scale(1) translateY(0); opacity: 0.75; }
          50% { transform: scale(1.04) translateY(-10px); opacity: 0.95; }
        }
        @keyframes bambooWind {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(2.4deg) translateY(-2px); }
        }
        @keyframes reedSwayAnim {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(4.5deg) skewX(2deg); }
        }
        @keyframes flowerPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(244,63,94,0.35)); }
          50% { transform: scale(1.06); filter: drop-shadow(0 0 14px rgba(244,63,94,0.6)); }
        }
        @keyframes fireflyAnim {
          0%, 100% { opacity: 0.2; transform: translateY(0) scale(0.8); }
          50% { opacity: 1; transform: translateY(-12px) scale(1.3); filter: drop-shadow(0 0 6px #fef08a); }
        }
        @keyframes oceanWaveAnim {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-5px) scaleY(1.05); }
        }
        @keyframes craneFlyAnim {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-8px) translateX(14px); }
        }
        @keyframes wingFlap1 {
          0%, 100% { transform: rotate(0deg) scaleY(1); }
          50% { transform: rotate(-12deg) scaleY(0.75); }
        }
        @keyframes wingFlap2 {
          0%, 100% { transform: rotate(0deg) scaleY(1); }
          50% { transform: rotate(10deg) scaleY(0.8); }
        }

        .cloud-bob-1 { animation: cloudFloat1 9s ease-in-out infinite; }
        .cloud-bob-2 { animation: cloudFloat2 12s ease-in-out infinite 1.5s; }
        .floating-mountain-mist { animation: mistBreathe 8s ease-in-out infinite; }
        .bamboo-sway-group { animation: bambooWind 6s ease-in-out infinite; }
        .reeds-sway-group { animation: reedSwayAnim 4.5s ease-in-out infinite; transform-origin: bottom center; }
        .sakura-gentle-pulse { animation: flowerPulse 4s ease-in-out infinite; }
        .ocean-wave-group { animation: oceanWaveAnim 6s ease-in-out infinite; }
        .flying-crane-group { animation: craneFlyAnim 11s ease-in-out infinite; }
        .crane-flapper-1 { animation: wingFlap1 0.8s ease-in-out infinite; transform-origin: center; }
        .crane-flapper-2 { animation: wingFlap2 0.95s ease-in-out infinite 0.2s; transform-origin: center; }
        .crane-flapper-3 { animation: wingFlap1 0.88s ease-in-out infinite 0.4s; transform-origin: center; }
        .firefly-1 { animation: fireflyAnim 3s ease-in-out infinite 0.2s; }
        .firefly-2 { animation: fireflyAnim 4s ease-in-out infinite 1.2s; }
        .firefly-3 { animation: fireflyAnim 3.5s ease-in-out infinite 0.7s; }
        .firefly-4 { animation: fireflyAnim 4.2s ease-in-out infinite 1.8s; }
        .firefly-5 { animation: fireflyAnim 3.2s ease-in-out infinite 0.5s; }
      `}</style>
    </div>
  );
}

// ─── Multi-Layered Parallax Cosmic Atmosphere with Japanese Sakura ───────────
function ParallaxAtmosphere({ mouseX = 0, mouseY = 0, sakuraMode = "breeze" }) {
  const { scrollY } = useScrollInfo();

  // Pre-calculated star particles
  const stars = useMemo(() => [
    { top: "12%", left: "8%", size: 2, char: "✦", color: "#fda4af", speed: 0.12, dur: "4s" },
    { top: "24%", left: "85%", size: 3, char: "✧", color: "#f43f5e", speed: 0.18, dur: "6s" },
    { top: "38%", left: "15%", size: 2, char: "✦", color: "#e2e8f0", speed: 0.08, dur: "5s" },
    { top: "52%", left: "92%", size: 2.5, char: "✦", color: "#d8b4fe", speed: 0.22, dur: "7s" },
    { top: "68%", left: "6%", size: 3, char: "✧", color: "#fda4af", speed: 0.14, dur: "4.5s" },
    { top: "78%", left: "80%", size: 2, char: "✧", color: "#f43f5e", speed: 0.25, dur: "5.5s" },
    { top: "89%", left: "22%", size: 2.5, char: "✦", color: "#fda4af", speed: 0.16, dur: "6.5s" }
  ], []);

  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }}>
      {/* Falling Japanese Sakura Blossom Canvas Layer (Rendered BEHIND all content) */}
      <SakuraPetalsCanvas mode={sakuraMode} mouseX={mouseX} mouseY={mouseY} />

      {/* Layer 1: Parallax Deep Cyber Mesh Grid */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`
          linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize:"56px 56px",
        transform:`translateY(${(scrollY * 0.05) % 56}px)`,
        maskImage:"radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 95%)",
        WebkitMaskImage:"radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 95%)",
        willChange:"transform"
      }} />

      {/* Layer 2: Parallax Floating Deep Wine & Crimson Glow Orbs */}
      <div style={{
        position:"absolute", width:850, height:850, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(244, 63, 94, 0.14) 0%, rgba(190, 18, 60, 0.05) 50%, transparent 70%)",
        left:"10%", top:"12%",
        transform:`translate(calc(-50% + ${mouseX * 0.02}px), calc(-50% + ${mouseY * 0.02}px + ${-scrollY * 0.12}px))`,
        filter:"blur(75px)",
        animation:"ambientPulse 12s ease-in-out infinite",
        willChange:"transform"
      }} />

      <div style={{
        position:"absolute", width:750, height:750, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(168, 85, 247, 0.09) 0%, rgba(139, 92, 246, 0.03) 50%, transparent 70%)",
        right:"5%", top:"42%",
        transform:`translate(calc(50% + ${mouseX * -0.015}px), calc(-50% + ${mouseY * 0.015}px + ${-scrollY * 0.18}px))`,
        filter:"blur(80px)",
        animation:"ambientPulse 14s ease-in-out infinite 2s",
        willChange:"transform"
      }} />

      <div style={{
        position:"absolute", width:700, height:700, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(225, 29, 72, 0.09) 0%, transparent 70%)",
        left:"50%", bottom:"10%",
        transform:`translate(calc(-50% + ${mouseX * 0.01}px), calc(50% + ${mouseY * -0.01}px + ${-scrollY * 0.09}px))`,
        filter:"blur(85px)",
        willChange:"transform"
      }} />

      {/* Dynamic Laser Ray Sweep that tilts as you scroll */}
      <div style={{
        position:"absolute",
        top:"20%",
        left:"-20%",
        width:"140%",
        height:1,
        background:"linear-gradient(90deg, transparent 0%, rgba(244,63,94,0.18) 50%, transparent 100%)",
        transform:`rotate(${(-12 + (scrollY * 0.015)) % 360}deg) translateY(${scrollY * 0.15}px)`,
        filter:"blur(1px)",
        opacity:0.7,
        willChange:"transform"
      }} />

      {/* Layer 3: Floating Micro Stardust Particles with Parallax Scroll Offset */}
      {stars.map((s, idx) => (
        <div
          key={idx}
          style={{
            position:"absolute",
            top: s.top,
            left: s.left,
            fontSize: `${s.size * 5}px`,
            color: s.color,
            transform:`translateY(${-scrollY * s.speed}px)`,
            opacity: 0.65,
            animation:`starTwinkle ${s.dur} ease-in-out infinite alternate`,
            textShadow:`0 0 10px ${s.color}`,
            willChange:"transform"
          }}
        >
          {s.char}
        </div>
      ))}

      <style>{`
        @keyframes ambientPulse {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50% { opacity: 1.18; transform: scale(1.08); }
        }
        @keyframes starTwinkle {
          0% { opacity: 0.25; transform: scale(0.85); }
          100% { opacity: 0.85; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

// ─── Section Header with Dynamic Scroll-Triggered Laser Underline ────────────
function SectionHeader({ pill, title, subtitle, align = "center" }) {
  const [ref, inView] = useInView(0.15);

  return (
    <div
      ref={ref}
      style={{
        textAlign: align,
        maxWidth: 680,
        margin: align === "center" ? "0 auto 48px" : "0 0 48px",
        position: "relative"
      }}
    >
      {pill && (
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          fontFamily: "'Poppins',sans-serif",
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: "2.2px",
          textTransform: "uppercase",
          color: "#fda4af",
          background: "rgba(244, 63, 94, 0.12)",
          border: "1px solid rgba(244, 63, 94, 0.28)",
          padding: "6px 16px",
          borderRadius: 24,
          marginBottom: 16,
          boxShadow: "0 0 20px rgba(244, 63, 94, 0.15)",
          backdropFilter: "blur(12px)",
          transform: inView ? "none" : "translateY(12px)",
          opacity: inView ? 1 : 0,
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
        }}>
          {pill}
        </div>
      )}

      <h2 style={{
        fontFamily: "'Poppins',sans-serif",
        fontWeight: 800,
        fontSize: "clamp(2.1rem, 3.8vw, 3rem)",
        color: C.text,
        marginBottom: 14,
        letterSpacing: "-0.8px",
        lineHeight: 1.18,
        transform: inView ? "none" : "translateY(18px)",
        opacity: inView ? 1 : 0,
        transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 80ms"
      }}>
        {title}
      </h2>

      {/* Dynamic Animated Scroll Laser Accent Line */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: align === "center" ? "center" : "flex-start",
        gap: 8,
        margin: "0 auto 16px",
        maxWidth: 160
      }}>
        <div style={{
          height: 2,
          width: inView ? "100%" : "0%",
          background: "linear-gradient(90deg, transparent, #f43f5e, #fda4af, transparent)",
          boxShadow: "0 0 10px #f43f5e",
          transition: "width 0.9s cubic-bezier(0.16, 1, 0.3, 1) 160ms"
        }} />
      </div>

      {subtitle && (
        <p style={{
          fontFamily: "'Poppins',sans-serif",
          fontSize: 15.5,
          color: C.textMuted,
          lineHeight: 1.7,
          margin: 0,
          transform: inView ? "none" : "translateY(14px)",
          opacity: inView ? 1 : 0,
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 160ms"
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Interactive Mouse Spotlight Glass Card ──────────────────────────────────
function GlassCard({ children, style = {}, className = "" }) {
  const ref = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const cx = (x / r.width) - 0.5;
    const cy = (y / r.height) - 0.5;
    setMousePos({ x, y, active: true });
    setTilt({ x: cy * -5, y: cx * 5 });
  }, []);

  const onLeave = useCallback(() => {
    setMousePos(p => ({ ...p, active: false }));
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        background: "rgba(255, 255, 255, 0.025)",
        backdropFilter: "blur(20px) saturate(1.3)",
        WebkitBackdropFilter: "blur(20px) saturate(1.3)",
        borderRadius: 20,
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: mousePos.active
          ? "0 20px 45px rgba(0,0,0,0.5), 0 0 30px rgba(244, 63, 94, 0.16)"
          : "0 6px 24px rgba(0,0,0,0.25)",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${mousePos.active ? "translateY(-4px)" : "translateY(0)"}`,
        transition: mousePos.active
          ? "box-shadow 0.2s ease, transform 0.1s ease-out"
          : "all 0.4s cubic-bezier(.22,1,.36,1)",
        overflow: "hidden",
        willChange: "transform",
        ...style
      }}
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: mousePos.active ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(244, 63, 94, 0.15), transparent 75%)`,
          transition: "opacity 0.25s ease",
          zIndex: 1
        }}
      />

      {/* Dynamic Border Glow Mask */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: mousePos.active ? 1 : 0,
          borderRadius: 20,
          padding: 1,
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(244, 63, 94, 0.65), transparent 70%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          transition: "opacity 0.25s ease",
          zIndex: 1
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}

// ─── Interactive Sleek Micro-Action Button ────────────────────────────────────
function MagneticButton({ children, onClick, style = {}, className = "" }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`sleek-hero-btn ${className}`}
      style={{
        ...style,
        transform: hover ? "translateY(-2.5px) scale(1.02)" : "translateY(0px) scale(1)",
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      {children}
    </button>
  );
}

// ─── Minimal Pill Badge ───────────────────────────────────────────────────────
function PillLabel({ children, style = {} }) {
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:6,
      fontFamily:"'Poppins',sans-serif", fontSize:11,
      fontWeight:700, letterSpacing:"2px", textTransform:"uppercase",
      color:"#fda4af", background:"rgba(244, 63, 94, 0.12)",
      border:"1px solid rgba(244, 63, 94, 0.2)",
      padding:"5px 14px", borderRadius:20, marginBottom:16,
      ...style
    }}>{children}</span>
  );
}

// ─── True Seamless Infinite Looping Marquee Slider with Scroll Velocity Boost ──
function InfiniteLoopSlider({ items, renderItem, speed = 0.8, gap = 20, className = "" }) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const animFrameId = useRef(null);
  const scrollPos = useRef(0);
  const velocityBoost = useRef(0);

  // Track window scroll velocity
  const { velocity } = useScrollInfo();

  useEffect(() => {
    // Add dynamic push proportional to vertical scroll speed
    if (Math.abs(velocity) > 0.05) {
      velocityBoost.current = Math.max(Math.min(velocity * 4.5, 14), -14);
    }
  }, [velocity]);

  // Duplicated enough times so singleBatchWidth easily covers any screen width with zero gaps
  const loopItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    let base = [...items];
    while (base.length < 12) {
      base = [...base, ...items];
    }
    return [...base, ...base, ...base];
  }, [items]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let lastTime = performance.now();

    const step = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 16.666, 2.5);
      lastTime = currentTime;

      const singleBatchWidth = el.scrollWidth / 3;

      if (!isDragging && singleBatchWidth > 0) {
        // Decay velocity boost smoothly back to 0
        velocityBoost.current *= 0.94;

        const currentStepSpeed = (speed + velocityBoost.current) * dt;
        scrollPos.current += currentStepSpeed;

        if (scrollPos.current >= singleBatchWidth) {
          scrollPos.current -= singleBatchWidth;
        } else if (scrollPos.current < 0) {
          scrollPos.current += singleBatchWidth;
        }

        el.scrollLeft = scrollPos.current;
      }

      animFrameId.current = requestAnimationFrame(step);
    };

    animFrameId.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrameId.current);
  }, [isDragging, speed, items]);

  // Handle natural mousewheel / trackpad horizontal & vertical scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const singleBatchWidth = el.scrollWidth / 3;
      if (singleBatchWidth <= 0) return;

      // Detect trackpad horizontal swipe or regular vertical wheel
      const isHorizontalTrackpad = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontalTrackpad ? e.deltaX : e.deltaY;

      if (Math.abs(delta) > 2) {
        let next = scrollPos.current + delta * 1.1;
        while (next < 0) next += singleBatchWidth;
        while (next >= singleBatchWidth) next -= singleBatchWidth;

        scrollPos.current = next;
        el.scrollLeft = next;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, [items]);

  const onMouseDown = (e) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftStart.current = containerRef.current.scrollLeft;
  };

  const onMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const el = containerRef.current;
    const singleBatchWidth = el.scrollWidth / 3;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.35;
    let next = scrollLeftStart.current - walk;
    if (singleBatchWidth > 0) {
      while (next < 0) next += singleBatchWidth;
      while (next >= singleBatchWidth) next -= singleBatchWidth;
    }
    scrollPos.current = next;
    el.scrollLeft = next;
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onTouchStart = (e) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    startX.current = e.touches[0].pageX - containerRef.current.offsetLeft;
    scrollLeftStart.current = containerRef.current.scrollLeft;
  };

  const onTouchMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const el = containerRef.current;
    const singleBatchWidth = el.scrollWidth / 3;
    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.3;
    let next = scrollLeftStart.current - walk;
    if (singleBatchWidth > 0) {
      while (next < 0) next += singleBatchWidth;
      while (next >= singleBatchWidth) next -= singleBatchWidth;
    }
    scrollPos.current = next;
    el.scrollLeft = next;
  };

  const onTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{ position: "relative", width: "100%", overflow: "hidden" }}
      onMouseLeave={() => setIsDragging(false)}
    >
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={`infinite-loop-track ${className}`}
        style={{
          display: "flex",
          gap: gap,
          overflowX: "hidden",
          padding: "10px 4px 28px 4px",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          WebkitUserSelect: "none",
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }}
      >
        {loopItems.map((item, idx) => (
          <div key={`${item.id || item.name || idx}-${idx}`} style={{ flexShrink: 0 }}>
            {renderItem(item, idx)}
          </div>
        ))}
      </div>
      <style>{`
        .infinite-loop-track::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

// ─── Dual Responsive Nav (Desktop Top Center Island & Mobile Bottom Icon Dock) ──
function Nav({ active }) {
  const links = [
    {
      id: "home", label: "Home",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10.5 12 3l9 7.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <path d="M9 22V12h6v10"/>
        </svg>
      )
    },
    {
      id: "about", label: "About",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    },
    {
      id: "projects", label: "Projects",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="4"/>
          <path d="m9 10-2 2 2 2"/>
          <path d="m15 10 2 2-2 2"/>
          <line x1="13" x2="11" y1="9" y2="15"/>
        </svg>
      )
    },
    {
      id: "experience", label: "Experience",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="7" rx="3"/>
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          <line x1="12" x2="12" y1="12" y2="14"/>
        </svg>
      )
    },
    {
      id: "certifications", label: "Certifications",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="5"/>
          <path d="M12 13v8l3-2 3 2v-8"/>
          <path d="M9 13v8l-3-2-3 2v-8"/>
        </svg>
      )
    },
    {
      id: "skills", label: "Skills",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
        </svg>
      )
    },
    {
      id: "contact", label: "Contact",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m22 2-7 20-4-9-9-4Z"/>
          <path d="M22 2 11 13"/>
        </svg>
      )
    }
  ];

  const [scrolled, setScrolled] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef(null);
  const btnRefs = useRef({});

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const targetTab = hoveredTab || active;

  useEffect(() => {
    const el = btnRefs.current[targetTab];
    if (el && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicatorStyle({
        left: elRect.left - navRect.left,
        width: elRect.width,
        opacity: 1
      });
    }
  }, [targetTab, active]);

  const go = (s) => {
    document.getElementById(s)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ─── Top Header (Brand Logo on Left + Centered Pill for Desktop) ─── */}
      <header style={{
        position: "fixed", top: 16, left: 0, right: 0,
        zIndex: 1000, pointerEvents: "none",
        padding: "0 1.5rem"
      }}>
        <div style={{
          maxWidth: 1240, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "flex-start",
          position: "relative"
        }}>
          {/* Standalone Left Logo (Clean Text, No Border) */}
          <span
            onClick={() => go("home")}
            style={{
              pointerEvents: "auto",
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 800,
              fontSize: 22,
              background: "linear-gradient(135deg, #ffffff 0%, #fda4af 60%, #f43f5e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
              userSelect: "none",
              letterSpacing: "-0.6px",
              padding: "6px 0",
              transition: "transform 0.25s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >Wien</span>

          {/* ─── Center Floating Island Nav Pill (Desktop Only) ─── */}
          <div
            ref={navRef}
            className="desktop-nav-pill"
            onMouseLeave={() => setHoveredTab(null)}
            style={{
              pointerEvents: "auto",
              position: "absolute", left: "50%", transform: "translateX(-50%)",
              display: "flex", alignItems: "center", gap: 2,
              background: scrolled ? "rgba(12, 10, 23, 0.9)" : "rgba(12, 10, 23, 0.72)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(244, 63, 94, 0.3)",
              borderRadius: 40,
              padding: "5px 6px",
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(244, 63, 94, 0.18), inset 0 1px 0 rgba(255,255,255,0.1)",
              transition: "all 0.3s ease"
            }}
          >
            {/* Smooth Sliding Pill Indicator */}
            <div style={{
              position: "absolute",
              top: 5, bottom: 5,
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              opacity: indicatorStyle.opacity,
              background: "linear-gradient(135deg, rgba(244, 63, 94, 0.32), rgba(190, 18, 60, 0.22))",
              border: "1px solid rgba(244, 63, 94, 0.55)",
              borderRadius: 22,
              boxShadow: "0 0 18px rgba(244, 63, 94, 0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
              transition: "left 0.28s cubic-bezier(0.22, 1, 0.36, 1), width 0.28s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease",
              pointerEvents: "none", zIndex: 0
            }} />

            {links.map(({ id, label }) => {
              const isCurrent = targetTab === id;
              return (
                <button
                  key={id}
                  ref={el => btnRefs.current[id] = el}
                  onClick={() => go(id)}
                  onMouseEnter={() => setHoveredTab(id)}
                  style={{
                    position: "relative", zIndex: 1,
                    background: "transparent", border: "none",
                    borderRadius: 20, padding: "7px 16px", cursor: "pointer",
                    fontFamily: "'Poppins',sans-serif", fontSize: 13.5,
                    fontWeight: isCurrent ? 700 : 500,
                    color: isCurrent ? "#ffffff" : "rgba(255, 255, 255, 0.72)",
                    transition: "color 0.2s ease, transform 0.2s ease",
                    transform: isCurrent ? "scale(1.03)" : "scale(1)",
                    outline: "none", textTransform: "capitalize",
                    letterSpacing: "0.2px"
                  }}
                >{label}</button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ─── Floating Bottom Icon-Only Dock (Mobile / HP Screens Only) ─── */}
      <nav
        className="mobile-bottom-dock"
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "7px 10px",
          background: "rgba(14, 11, 26, 0.85)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(244, 63, 94, 0.32)",
          borderRadius: 36,
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.65), 0 0 25px rgba(244, 63, 94, 0.2), inset 0 1px 0 rgba(255,255,255,0.15)"
        }}
      >
        {links.map(({ id, label, icon }) => {
          const isCurrent = active === id;

          return (
            <button
              key={id}
              onClick={() => go(id)}
              aria-label={label}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                border: isCurrent ? "1px solid rgba(244, 63, 94, 0.65)" : "1px solid transparent",
                background: isCurrent
                  ? "linear-gradient(135deg, rgba(244, 63, 94, 0.45), rgba(190, 18, 60, 0.25))"
                  : "transparent",
                color: isCurrent ? "#ffffff" : "rgba(255, 255, 255, 0.65)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: isCurrent ? "0 0 16px rgba(244, 63, 94, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)" : "none",
                transform: isCurrent ? "scale(1.08)" : "scale(1)",
                transition: "all 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
                outline: "none"
              }}
            >
              {icon}
            </button>
          );
        })}
      </nav>

      <style>{`
        /* Desktop vs Mobile Media Queries */
        @media (min-width: 881px) {
          .mobile-bottom-dock {
            display: none !important;
          }
          .desktop-nav-pill {
            display: flex !important;
          }
        }
        @media (max-width: 880px) {
          .desktop-nav-pill {
            display: none !important;
          }
          .mobile-bottom-dock {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}

// ─── Hero 3D Parallax Avatar & Interactive Holographic Backdrop Reactor ──────
function HeroAvatar3D() {
  const { scrollY } = useScrollInfo();
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });
  const boxRef = useRef(null);

  // Normalized scroll progression for avatar area (0 to 1 over first 450px of scroll)
  const p = Math.min(Math.max(scrollY / 450, 0), 1);
  const scrollPopScale = 1 + p * 0.18; // Pops out and scales up as user scrolls down!
  const portalGlowSpread = 20 + p * 45; // Aura expands outward
  const ringRotate1 = scrollY * 0.45;
  const ringRotate2 = -scrollY * 0.38;

  const onMouseMove = (e) => {
    const r = boxRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    setTilt({ x: -y * 14, y: x * 14, active: true });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0, active: false });
  };

  return (
    <div
      ref={boxRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        position: "relative",
        width: 330,
        height: 330,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${scrollY * 0.12}px) scale(${scrollPopScale})`,
        transition: tilt.active ? "transform 0.1s ease-out" : "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform"
      }}
    >
      {/* 🔮 Expanded Scroll-Reactive Hologram Portal (Timbul & Berpendar Saat Scroll) */}
      <div style={{
        position: "absolute",
        inset: -portalGlowSpread,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(244, 63, 94, ${0.4 + p * 0.35}) 0%, rgba(168, 85, 247, ${0.25 + p * 0.2}) 45%, rgba(12, 10, 23, 0) 75%)`,
        filter: `blur(${22 + p * 12}px)`,
        transform: `scale(${1 + p * 0.3})`,
        transition: "all 0.15s ease-out",
        zIndex: 0,
        pointerEvents: "none"
      }} />

      {/* 🌀 Outer Rotating Cyber Laser Ring (Reacts to Scroll Angle) */}
      <div style={{
        position: "absolute",
        inset: -14 - p * 10,
        borderRadius: "50%",
        background: "conic-gradient(from 0deg, #f43f5e, transparent 35%, #fda4af 60%, #a855f7 85%, #f43f5e 100%)",
        transform: `rotate(${ringRotate1}deg)`,
        opacity: 0.85 + p * 0.15,
        filter: "drop-shadow(0 0 12px rgba(244,63,94,0.6))",
        zIndex: 1,
        transition: "inset 0.15s ease-out"
      }} />

      {/* 💫 Secondary Counter-Rotating Geometric Orbital Ring */}
      <div style={{
        position: "absolute",
        inset: -6 - p * 6,
        borderRadius: "50%",
        border: "1.5px dashed rgba(253, 164, 175, 0.7)",
        transform: `rotate(${ringRotate2}deg)`,
        boxShadow: "0 0 15px rgba(244,63,94,0.4), inset 0 0 15px rgba(244,63,94,0.2)",
        zIndex: 1
      }} />

      {/* Inner Mask Rim */}
      <div style={{ position: "absolute", inset: 3, borderRadius: "50%", background: "#0c0a17", zIndex: 2 }} />

      {/* Main Avatar Photo with Hologram Rim */}
      <div style={{
        position: "absolute", inset: 7, borderRadius: "50%", overflow: "hidden", zIndex: 3,
        boxShadow: "inset 0 0 24px rgba(0,0,0,0.7), 0 0 20px rgba(244,63,94,0.3)"
      }}>
        <img
          src="/fotoku.png"
          alt="Wiewien Tancaniago"
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: `scale(${1 + p * 0.05})`,
            transition: "transform 0.15s ease-out"
          }}
          onError={e => { e.target.style.background = "linear-gradient(135deg,#be123c,#f43f5e)"; }}
        />
      </div>

      {/* Floating Center Identity Pill */}
      <div style={{
        position: "absolute", bottom: -20 - p * 8, left: "50%",
        transform: `translateX(-50%) scale(${1 + p * 0.08})`,
        background: "rgba(12, 10, 23, 0.95)", backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(244, 63, 94, 0.45)", borderRadius: 24,
        padding: "8px 26px", whiteSpace: "nowrap", zIndex: 7,
        boxShadow: "0 12px 32px rgba(0,0,0,0.6), 0 0 22px rgba(244,63,94,0.3)",
        transition: "all 0.15s ease-out"
      }}>
        <p style={{
          fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 700,
          background: "linear-gradient(90deg, #ffffff 0%, #fda4af 50%, #f43f5e 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0,
          letterSpacing: "0.4px"
        }}>Designer &amp; Developer</p>
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  const words = ["Information Systems Student","Data Science Specialist","UI / Graphic Designer","Full-Stack Developer"];
  const [typed, setTyped] = useState(""); const [wi, setWi] = useState(0); const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[wi];
    if (!del && typed === word) { const t = setTimeout(() => setDel(true), 2400); return () => clearTimeout(t); }
    if (del && typed === "") { setDel(false); setWi((wi+1)%words.length); return; }
    const t = setTimeout(() => setTyped(del ? typed.slice(0,-1) : word.slice(0,typed.length+1)), del ? 35 : 65);
    return () => clearTimeout(t);
  }, [typed, del, wi]);

  return (
    <section id="home" style={{ minHeight:"100vh", display:"flex", alignItems:"center", background:"transparent", position:"relative", overflow:"hidden", padding:"120px 2rem 80px" }}>
      {/* 🌸 Dynamic Japanese Vector Scenic Stage with 3D Cinematic Dispersal ("Mencar") */}
      <HeroJapaneseDispersalStage />

      <div style={{ maxWidth:1180, margin:"0 auto", width:"100%", display:"grid", gridTemplateColumns:"1.1fr 0.9fr", gap:"4rem", alignItems:"center", position:"relative", zIndex:2 }} className="hero-grid">
        
        {/* Left Column: Bio & Intro */}
        <div className="hero-text">
          <ScrollReveal>
            {/* Live Status Pill */}
            <div style={{
              display:"inline-flex", alignItems:"center", gap:8,
              padding:"6px 16px", borderRadius:30,
              background:"rgba(255, 255, 255, 0.05)",
              border: "none",
              boxShadow:"0 0 20px rgba(244,63,94,0.15)",
              marginBottom:20, backdropFilter:"blur(12px)"
            }}>
              <span style={{ width:8, height:8, borderRadius:"50%", background:"#10b981", boxShadow:"0 0 10px #10b981", animation:"pulseGreen 2s infinite" }} />
              <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, fontWeight:600, color:"#f1f5f9" }}>
                Available for Projects &amp; Collaboration
              </span>
            </div>

            <h1 style={{
              fontFamily:"'Poppins',sans-serif", fontWeight:800,
              fontSize:"clamp(2.8rem, 5.8vw, 4.4rem)", lineHeight:1.05,
              marginBottom:18, letterSpacing:"-1.2px",
              background:"linear-gradient(135deg, #ffffff 0%, #ffe4e6 30%, #fda4af 65%, #fb7185 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"
            }}>
              Wiewien<br />Tancaniago
            </h1>

            {/* Typewriter text */}
            <div style={{
              display:"inline-flex", alignItems:"center", gap:6,
              fontFamily:"'Poppins',sans-serif", fontSize:16, fontWeight:600,
              color:"#fda4af", marginBottom:24, minHeight:26
            }}>
              <span>{typed}</span>
              <span style={{ animation:"blink 1s step-end infinite", color:"#f43f5e" }}>|</span>
            </div>

            <p style={{
              fontFamily:"'Poppins',sans-serif", fontSize:15.5, fontWeight:400,
              color:C.textMuted, lineHeight:1.85, marginBottom:36, maxWidth:480
            }}>
              Information Systems undergraduate at President University. Bridging the gap between <strong style={{ color:"#fff" }}>robust data intelligence</strong> and <strong style={{ color:"#fda4af" }}>modern UI craftsmanship</strong>.
            </p>

            {/* Action Buttons with Sleek Micro-Hover Interactions */}
            <div style={{ display:"flex", gap:16, flexWrap:"wrap" }} className="hero-btns">
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}
                className="hero-primary-btn"
                style={{
                  padding:"14px 34px", borderRadius:30, border:"none", cursor:"pointer",
                  background:C.gradButton, color:"#fff", fontFamily:"'Poppins',sans-serif",
                  fontSize:14.5, fontWeight:600,
                  boxShadow:"0 8px 24px rgba(244, 63, 94, 0.38), inset 0 1px 0 rgba(255,255,255,0.25)",
                  transition:"all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                Explore Projects
              </button>

              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
                className="hero-secondary-btn"
                style={{
                  padding:"14px 34px", borderRadius:30, cursor:"pointer",
                  background:"rgba(255, 255, 255, 0.05)", backdropFilter:"blur(12px)",
                  border:"none",
                  color:"#ffffff", fontFamily:"'Poppins',sans-serif", fontSize:14.5, fontWeight:600,
                  boxShadow:"0 8px 24px rgba(0,0,0,0.3)",
                  transition:"background 0.3s ease, transform 0.25s ease"
                }}
              >
                Contact Me
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Clean 3D Holographic Profile Avatar */}
        <div style={{ display:"flex", justifyContent:"center", position:"relative" }} className="hero-photo">
          <ScrollReveal delay={120}>
            <HeroAvatar3D />
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        @keyframes spinRing { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulseGreen { 0%, 100% { opacity:1; transform:scale(1); } 50% { opacity:0.6; transform:scale(1.2); } }

        .hero-primary-btn:hover {
          transform: translateY(-2.5px) scale(1.02);
          box-shadow: 0 14px 32px rgba(244, 63, 94, 0.55), inset 0 1px 0 rgba(255,255,255,0.4) !important;
        }
        .hero-primary-btn:active {
          transform: translateY(0px) scale(0.98);
        }
        .hero-secondary-btn:hover {
          transform: translateY(-2.5px) scale(1.02);
          background: rgba(244, 63, 94, 0.18) !important;
          box-shadow: 0 10px 24px rgba(244, 63, 94, 0.3) !important;
        }
        .hero-secondary-btn:active {
          transform: translateY(0px) scale(0.98);
        }
      `}</style>
    </section>
  );
}

// ─── About Section (Clean & Focused) ─────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ padding:"120px 2rem 60px", background:"transparent", position:"relative", overflow:"hidden" }}>
      <div style={{ maxWidth:1160, margin:"0 auto", position:"relative", zIndex:2 }}>
        <SectionHeader
          pill="About Me"
          title={<>Crafting digital solutions at the intersection of <span style={{ background:"linear-gradient(135deg, #ffffff 0%, #fda4af 50%, #f43f5e 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Data &amp; Design</span></>}
        />

        <ScrollReveal delay={100}>
          <div style={{ maxWidth:820, margin:"0 auto", textAlign:"center" }}>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"clamp(1.02rem, 1.8vw, 1.15rem)", color:C.textMuted, lineHeight:1.9, marginBottom:16, fontWeight:400 }}>
              I’m an Information Systems undergraduate at President University passionate about building digital solutions through code, data, and design.
            </p>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"clamp(1.02rem, 1.8vw, 1.15rem)", color:C.textMuted, lineHeight:1.9, fontWeight:400 }}>
              My work spans full-stack development, data analytics, UI/UX, and visual design. I enjoy transforming ideas into practical, intuitive, and engaging digital experiences — combining technical problem-solving with a strong eye for design.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" style={{ padding:"120px 2rem", background:"transparent", position:"relative", overflow:"hidden" }}>
      <div style={{ maxWidth:1240, margin:"0 auto", position:"relative", zIndex:2 }}>
        
        <SectionHeader
          pill="Selected Work"
          title="Featured Projects"
          subtitle="Swipe or scroll to explore applications, mobile solutions, and analytical systems."
        />

        {/* Clean Infinite Seamless Loop Slider */}
        <ScrollReveal delay={80}>
          <InfiniteLoopSlider
            items={PROJECTS}
            speed={0.85}
            gap={24}
            renderItem={(p) => (
              <div style={{ width: "clamp(320px, 32vw, 380px)", height: "100%", display: "flex" }}>
                <GlassCard style={{ padding: 28, width: "100%", display: "flex", flexDirection: "column", height: "100%" }}>
                  
                  {/* Header */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
                    <div style={{
                      width:44, height:44, borderRadius:14,
                      background:"rgba(244, 63, 94, 0.15)",
                      border:"1px solid rgba(244, 63, 94, 0.35)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontFamily:"'Poppins',monospace", fontSize:14, fontWeight:700, color:"#fda4af"
                    }}>{"</>"}</div>

                    <span style={{
                      fontFamily:"'Poppins',sans-serif", fontSize:11, fontWeight:700,
                      color:"#fda4af", background:"rgba(244, 63, 94, 0.12)",
                      border:"1px solid rgba(244, 63, 94, 0.25)",
                      padding:"4px 12px", borderRadius:12, letterSpacing:"0.6px"
                    }}>{p.lang}</span>
                  </div>

                  <h3 style={{ fontFamily:"'Poppins',sans-serif", fontSize:17.5, fontWeight:700, color:"#ffffff", marginBottom:12, lineHeight:1.4 }}>
                    {p.name}
                  </h3>

                  <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:13.5, color:C.textMuted, lineHeight:1.75, marginBottom:20, flex:1 }}>
                    {p.desc}
                  </p>

                  {/* Tech Tags */}
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:24 }}>
                    {p.tech.map(t => (
                      <span key={t} style={{
                        fontFamily:"'Poppins',sans-serif", fontSize:11, fontWeight:500,
                        color:"#cbd5e1", background:"rgba(255, 255, 255, 0.05)",
                        border:"1px solid rgba(255, 255, 255, 0.09)",
                        padding:"4px 10px", borderRadius:8
                      }}>{t}</span>
                    ))}
                  </div>

                  {/* Link Buttons */}
                  <div style={{ display:"flex", gap:10, marginTop:"auto" }}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex:1, textAlign:"center", padding:"10px 14px", borderRadius:12,
                        background:"rgba(255, 255, 255, 0.05)", border:"1px solid rgba(255, 255, 255, 0.12)",
                        color:"#ffffff", fontSize:13, fontFamily:"'Poppins',sans-serif",
                        textDecoration:"none", fontWeight:600, transition:"all 0.2s"
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(244, 63, 94, 0.6)"; e.currentTarget.style.background="rgba(244, 63, 94, 0.15)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255, 255, 255, 0.12)"; e.currentTarget.style.background="rgba(255, 255, 255, 0.05)"; }}
                    >GitHub</a>

                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          flex:1, textAlign:"center", padding:"10px 14px", borderRadius:12,
                          background:"linear-gradient(135deg, #f43f5e, #be123c)",
                          color:"#ffffff", fontSize:13, fontFamily:"'Poppins',sans-serif",
                          textDecoration:"none", fontWeight:600, boxShadow:"0 4px 15px rgba(244,63,94,0.3)",
                          transition:"all 0.2s"
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform="none"; }}
                      >Live Demo</a>
                    )}
                  </div>
                </GlassCard>
              </div>
            )}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Experience Section ───────────────────────────────────────────────────────
function Experience() {
  const [selectedCert, setSelectedCert] = useState(null);
  const divider = "rgba(244, 63, 94, 0.12)";

  return (
    <section id="experience" style={{ padding:"120px 2rem", background:"transparent", position:"relative", overflow:"hidden" }}>
      <div style={{ maxWidth:1180, margin:"0 auto", position:"relative", zIndex:2 }}>
        
        <SectionHeader
          pill="Career Journey"
          title="Experience &amp; Leadership"
          subtitle="Professional apprenticeships and campus leadership track record."
        />

        {/* Work Experience */}
        <ScrollReveal delay={60}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:"#fda4af", margin:0 }}>
              Work &amp; Apprenticeships
            </p>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:22, marginBottom:56 }}>
            {WORK_EXP.map((w,i) => (
              <GlassCard key={i} style={{ padding:"28px 32px" }}>
                
                {/* Org header */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: w.roles.length>1 ? 20 : 14, paddingBottom: w.roles.length>1 ? 16 : 0, borderBottom: w.roles.length>1 ? `1px solid ${divider}` : "none" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                    <div style={{ width:44, height:44, borderRadius:12, overflow:"hidden", border:"1px solid rgba(244,63,94,0.35)", flexShrink:0, background:"rgba(244,63,94,0.15)" }}>
                      {w.logo ? <img src={w.logo} alt={w.org} style={{ width:"100%", height:"100%", objectFit:"cover" }} /> : <span style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%", color:"#fda4af", fontWeight:800 }}>{w.org[0]}</span>}
                    </div>
                    <div>
                      <h3 style={{ fontFamily:"'Poppins',sans-serif", fontSize:18, fontWeight:700, color:"#ffffff", margin:0 }}>{w.org}</h3>
                    </div>
                  </div>
                  <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:12.5, fontWeight:600, color:"#fda4af", background:"rgba(244,63,94,0.12)", border:"1px solid rgba(244,63,94,0.25)", padding:"5px 14px", borderRadius:12 }}>{w.period}</span>
                </div>

                {/* Roles Timeline */}
                <div style={{ display:"flex", flexDirection:"column", gap:22, position:"relative", paddingLeft: w.roles.length>1 ? 24 : 0 }}>
                  {w.roles.length>1 && (
                    <div style={{
                      position:"absolute", left:7, top:10, bottom:10, width:2,
                      background:"linear-gradient(180deg, #f43f5e 0%, rgba(190,18,60,0.4) 70%, transparent 100%)",
                      borderRadius:2,
                      boxShadow:"0 0 8px rgba(244,63,94,0.4)"
                    }} />
                  )}
                  
                  {w.roles.map((r,j) => (
                    <div key={j} style={{ position:"relative" }}>
                      {w.roles.length>1 && (
                        <div style={{
                          position:"absolute", left:-21, top:6, width:10, height:10, borderRadius:"50%",
                          background:"#f43f5e", border:`2px solid ${C.bgAlt}`,
                          boxShadow:"0 0 10px #f43f5e, 0 0 20px rgba(244,63,94,0.6)"
                        }} />
                      )}
                      
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, marginBottom:4 }}>
                        <div>
                          <h4 style={{ fontFamily:"'Poppins',sans-serif", fontSize:15, fontWeight:600, color:"#ffffff", margin:0, marginBottom:3 }}>{r.role}</h4>
                          <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:"#fda4af", fontWeight:600 }}>{r.type}</span>
                        </div>
                        <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:C.textDim, flexShrink:0 }}>{r.period}</span>
                      </div>
                      
                      <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:C.textDim, marginBottom:10 }}>{r.location}</p>
                      
                      {r.points && (
                        <div style={{ display:"flex", flexDirection:"column", gap:6, margin:"0 0 10px" }}>
                          {r.points.map((pt,k) => (
                            <p key={k} style={{ fontFamily:"'Poppins',sans-serif", fontSize:13.5, color:C.textMuted, lineHeight:1.7, margin:0, paddingLeft: 10, borderLeft: "2px solid rgba(244, 63, 94, 0.28)" }}>{pt}</p>
                          ))}
                        </div>
                      )}

                      {r.cert && (
                        <button
                          onClick={() => setSelectedCert({ img:r.cert, title:r.role, label:r.certLabel })}
                          style={{
                            marginTop:6, display:"inline-flex", alignItems:"center", gap:6,
                            background:"rgba(244, 63, 94, 0.12)", border:"1px solid rgba(244, 63, 94, 0.35)",
                            borderRadius:10, padding:"7px 16px", cursor:"pointer",
                            color:"#fda4af", fontFamily:"'Poppins',sans-serif", fontSize:12, fontWeight:600,
                            transition:"all 0.2s"
                          }}
                          onMouseEnter={e => e.currentTarget.style.background="rgba(244,63,94,0.22)"}
                          onMouseLeave={e => e.currentTarget.style.background="rgba(244,63,94,0.12)"}
                        >{r.certLabel}</button>
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </ScrollReveal>

        {/* Organizational Experience */}
        <ScrollReveal delay={100}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:"#d8b4fe", margin:0 }}>
              Campus Leadership &amp; Organizations
            </p>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
            {ORG_EXP.map((w,i) => (
              <GlassCard key={i} style={{ padding:"28px 32px" }}>
                
                <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20, paddingBottom:16, borderBottom:`1px solid ${divider}` }}>
                  <div style={{ width:44, height:44, borderRadius:12, overflow:"hidden", border:"1px solid rgba(244,63,94,0.35)", flexShrink:0, background:"rgba(244,63,94,0.15)" }}>
                    {w.logo ? <img src={w.logo} alt={w.org} style={{ width:"100%", height:"100%", objectFit:"cover" }} /> : <span style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%", color:"#fda4af", fontWeight:800 }}>{w.org[0]}</span>}
                  </div>
                  <div>
                    <h3 style={{ fontFamily:"'Poppins',sans-serif", fontSize:17, fontWeight:700, color:"#ffffff", margin:0 }}>{w.org}</h3>
                    <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:12.5, color:C.textDim, margin:0 }}>{w.full} · {w.period}</p>
                  </div>
                </div>

                <div style={{ display:"flex", flexDirection:"column", gap:18, position:"relative", paddingLeft:24 }}>
                  {w.roles.length>1 && (
                    <div style={{
                      position:"absolute", left:7, top:10, bottom:10, width:2,
                      background:"linear-gradient(180deg, #f43f5e 0%, rgba(190,18,60,0.4) 70%, transparent 100%)",
                      borderRadius:2,
                      boxShadow:"0 0 8px rgba(244,63,94,0.4)"
                    }} />
                  )}
                  
                  {w.roles.map((r,j) => (
                    <div key={j} style={{ position:"relative" }}>
                      <div style={{
                        position:"absolute", left:-21, top:6, width:10, height:10, borderRadius:"50%",
                        background:"#f43f5e", border:`2px solid ${C.bgAlt}`,
                        boxShadow:"0 0 8px #f43f5e, 0 0 16px rgba(244,63,94,0.5)"
                      }} />
                      
                      <div style={{ display:"flex", justifyContent:"space-between", gap:8, marginBottom:4 }}>
                        <div>
                          <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:14, fontWeight:600, color:"#ffffff" }}>{r.title}</span>
                          {r.event && <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:"#fda4af", marginLeft:8, fontWeight:500 }}>{r.event}</span>}
                        </div>
                        <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:C.textDim, flexShrink:0 }}>{r.period}</span>
                      </div>

                      {r.points && (
                        <div style={{ display:"flex", flexDirection:"column", gap:5, margin:"6px 0 0" }}>
                          {r.points.map((pt,k) => <p key={k} style={{ fontFamily:"'Poppins',sans-serif", fontSize:13.5, color:C.textMuted, lineHeight:1.7, margin:0, paddingLeft: 10, borderLeft: "2px solid rgba(244, 63, 94, 0.28)" }}>{pt}</p>)}
                        </div>
                      )}
                      {r.desc && <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:13.5, color:C.textMuted, margin:"6px 0 0", lineHeight:1.7, paddingLeft: 10, borderLeft: "2px solid rgba(244, 63, 94, 0.28)" }}>{r.desc}</p>}
                      
                      {r.cert && (
                        <button
                          onClick={() => setSelectedCert({ img:r.cert, title:r.title, label:r.certLabel })}
                          style={{
                            marginTop:8, display:"inline-flex",
                            background:"rgba(244,63,94,0.12)", border:"1px solid rgba(244,63,94,0.35)",
                            borderRadius:10, padding:"7px 16px", cursor:"pointer",
                            color:"#fda4af", fontFamily:"'Poppins',sans-serif", fontSize:12, fontWeight:600
                          }}
                        >{r.certLabel}</button>
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      {selectedCert && (
        <div onClick={() => setSelectedCert(null)} style={{ position:"fixed", inset:0, zIndex:99990, background:"rgba(0,0,0,0.88)", backdropFilter:"blur(16px)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div onClick={e => e.stopPropagation()} style={{ position:"relative", maxWidth:900, maxHeight:"90vh", background:"rgba(12, 10, 23, 0.98)", backdropFilter:"blur(40px)", borderRadius:22, padding:24, display:"flex", flexDirection:"column", alignItems:"center", boxShadow:"0 30px 80px rgba(0,0,0,0.8)", border:"1px solid rgba(244, 63, 94, 0.4)", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:"10%", right:"10%", height:1.5, background:"linear-gradient(90deg,transparent,rgba(244,63,94,0.8),transparent)" }} />
            <div style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <div>
                <h4 style={{ fontFamily:"'Poppins',sans-serif", fontSize:17, fontWeight:700, color:"#ffffff", margin:0 }}>{selectedCert.title}</h4>
                <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:12.5, margin:"2px 0 0", color:"#fda4af" }}>{selectedCert.label}</p>
              </div>
              <button onClick={() => setSelectedCert(null)} style={{ background:"rgba(244,63,94,0.15)", border:"1px solid rgba(244,63,94,0.3)", borderRadius:"50%", width:36, height:36, color:"#ffffff", fontSize:20, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>&#215;</button>
            </div>
            <div style={{ flex:1, width:"100%", overflow:"auto", display:"flex", justifyContent:"center" }}>
              <img src={selectedCert.img} alt={selectedCert.title} style={{ maxWidth:"100%", maxHeight:"70vh", objectFit:"contain", borderRadius:12 }} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Certifications Section (Interactive Visual Showcase Slider) ───────────────
function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" style={{ padding:"120px 2rem", background:"transparent", position:"relative", overflow:"hidden" }}>
      <div style={{ maxWidth:1240, margin:"0 auto", position:"relative", zIndex:2 }}>
        
        <SectionHeader
          pill="Verified Credentials"
          title="Licenses &amp; Certifications"
          subtitle="Seamless infinite stream — click any certificate for high-resolution inspection."
        />

        {/* Clean Infinite Looping Visual Showcase */}
        <ScrollReveal delay={80}>
          <InfiniteLoopSlider
            items={CERTIFICATIONS}
            speed={0.75}
            gap={24}
            renderItem={(c) => (
              <div style={{ width: "clamp(340px, 35vw, 420px)", height: "100%", display: "flex" }}>
                <GlassCard style={{ padding: 22, width: "100%", display: "flex", flexDirection: "column", height: "100%" }}>
                  
                  {/* Visual Certificate Preview Frame */}
                  <div
                    onClick={() => setSelectedCert({ img: c.cert, title: c.title, label: c.issuer })}
                    style={{
                      position: "relative",
                      width: "100%",
                      height: 210,
                      borderRadius: 14,
                      overflow: "hidden",
                      marginBottom: 18,
                      cursor: "pointer",
                      background: "rgba(0, 0, 0, 0.4)",
                      border: "1px solid rgba(244, 63, 94, 0.35)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.4)"
                    }}
                    className="cert-img-container"
                  >
                    <img
                      src={c.cert}
                      alt={c.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease"
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    
                    {/* Hover Overlay with Enlarge Badge */}
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(12,10,23,0.85) 0%, rgba(12,10,23,0.2) 60%, transparent 100%)",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      padding: "12px 14px",
                      transition: "opacity 0.25s ease"
                    }}>
                      <span style={{
                        fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 700,
                        color: "#fda4af", background: "rgba(244, 63, 94, 0.35)",
                        backdropFilter: "blur(8px)", padding: "4px 10px", borderRadius: 10,
                        border: "1px solid rgba(244, 63, 94, 0.45)"
                      }}>
                        {c.badge}
                      </span>

                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 600,
                        color: "#ffffff", background: "rgba(0, 0, 0, 0.6)",
                        backdropFilter: "blur(8px)", padding: "4px 10px", borderRadius: 10,
                        border: "1px solid rgba(255, 255, 255, 0.15)"
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                        Click to Enlarge
                      </span>
                    </div>
                  </div>

                  {/* Content Info */}
                  <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <span style={{
                      fontFamily: "'Poppins',sans-serif", fontSize: 12,
                      color: "#fda4af", fontWeight: 600, marginBottom: 4
                    }}>
                      {c.issuer}
                    </span>

                    <h3 style={{
                      fontFamily: "'Poppins',sans-serif", fontSize: 17,
                      fontWeight: 700, color: "#ffffff", marginBottom: 10, lineHeight: 1.35
                    }}>
                      {c.title}
                    </h3>

                    <p style={{
                      fontFamily: "'Poppins',sans-serif", fontSize: 13,
                      color: C.textMuted, lineHeight: 1.7, marginBottom: 18, flex: 1
                    }}>
                      {c.desc}
                    </p>

                    {/* Skills Pills */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                      {c.skills.map((s) => (
                        <span key={s} style={{
                          fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 500,
                          color: "#cbd5e1", background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          padding: "3px 9px", borderRadius: 8
                        }}>{s}</span>
                      ))}
                    </div>

                    {/* Action Link Button */}
                    <button
                      onClick={() => setSelectedCert({ img: c.cert, title: c.title, label: c.issuer })}
                      style={{
                        width: "100%", padding: "10px", borderRadius: 12,
                        background: "linear-gradient(135deg, rgba(244, 63, 94, 0.25), rgba(190, 18, 60, 0.15))",
                        border: "1px solid rgba(244, 63, 94, 0.45)",
                        color: "#ffffff", fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600,
                        cursor: "pointer", transition: "all 0.2s",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                        marginTop: "auto"
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, #f43f5e, #be123c)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(244, 63, 94, 0.25), rgba(190, 18, 60, 0.15))"; }}
                    >
                      View Full Certificate
                    </button>
                  </div>
                </GlassCard>
              </div>
            )}
          />
        </ScrollReveal>
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div onClick={() => setSelectedCert(null)} style={{ position:"fixed", inset:0, zIndex:99990, background:"rgba(0,0,0,0.88)", backdropFilter:"blur(16px)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div onClick={e => e.stopPropagation()} style={{ position:"relative", maxWidth:920, maxHeight:"90vh", background:"rgba(12, 10, 23, 0.98)", borderRadius:22, padding:24, display:"flex", flexDirection:"column", alignItems:"center", boxShadow:"0 30px 80px rgba(0,0,0,0.8)", border:"1px solid rgba(244, 63, 94, 0.4)", overflow:"hidden" }}>
            <div style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <div>
                <h4 style={{ fontFamily:"'Poppins',sans-serif", fontSize:18, fontWeight:700, color:"#ffffff", margin:0 }}>{selectedCert.title}</h4>
                <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:13, margin:"3px 0 0", color:"#fda4af" }}>{selectedCert.label}</p>
              </div>
              <button onClick={() => setSelectedCert(null)} style={{ background:"rgba(244,63,94,0.15)", border:"1px solid rgba(244,63,94,0.3)", borderRadius:"50%", width:36, height:36, color:"#ffffff", fontSize:20, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>&#215;</button>
            </div>
            <div style={{ flex:1, width:"100%", overflow:"auto", display:"flex", justifyContent:"center" }}>
              <img src={selectedCert.img} alt={selectedCert.title} style={{ maxWidth:"100%", maxHeight:"72vh", objectFit:"contain", borderRadius:12, boxShadow:"0 10px 30px rgba(0,0,0,0.5)" }} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Skills & Technologies Section (Interactive Dynamic Filter Stream) ───────
function Skills() {
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = [
    { id: "All", label: "All Stack" },
    { id: "Programming Languages", label: "Programming Languages" },
    { id: "Databases & Spreadsheets", label: "Databases" },
    { id: "DevOps & APIs", label: "DevOps" },
    { id: "Automation & Frameworks", label: "Automation" },
    { id: "Data Science & ML", label: "Data Science" },
    { id: "UI / UX & Creative Design", label: "UI / UX" }
  ];

  // Flattened all skills for the dynamic streams
  const allSkills = useMemo(() => {
    return SKILLS_DATA.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.cat })));
  }, []);

  const filteredSkills = useMemo(() => {
    if (selectedCat === "All") return allSkills;
    return allSkills.filter(s => s.category === selectedCat);
  }, [selectedCat, allSkills]);

  // Split items into 2 dynamic rows for multi-layered flowing motion
  const streamRow1 = useMemo(() => {
    if (filteredSkills.length <= 4) return filteredSkills;
    return filteredSkills.slice(0, Math.ceil(filteredSkills.length / 2));
  }, [filteredSkills]);

  const streamRow2 = useMemo(() => {
    if (filteredSkills.length <= 4) return filteredSkills;
    return filteredSkills.slice(Math.ceil(filteredSkills.length / 2));
  }, [filteredSkills]);

  return (
    <section id="skills" style={{ padding:"120px 2rem", background:"transparent", position:"relative", overflow:"hidden" }}>
      <div style={{ maxWidth:1240, margin:"0 auto", position:"relative", zIndex:2 }}>
        
        <SectionHeader
          pill="Expertise"
          title="Skills &amp; Technologies"
          subtitle="Interactive tech stack — select a domain below to filter the stream in real time."
        />

        {/* ─── Category Filter Navigation (Controls the Moving Stream) ─── */}
        <ScrollReveal delay={60}>
          <div style={{
            display:"flex", justifyContent:"center", gap:10, flexWrap:"wrap",
            marginBottom:48
          }}>
            {categories.map(cat => {
              const active = selectedCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  style={{
                    padding:"9px 20px", borderRadius:24, cursor:"pointer",
                    fontFamily:"'Poppins',sans-serif", fontSize:13, fontWeight: active ? 700 : 500,
                    color: active ? "#ffffff" : "#94a3b8",
                    background: active
                      ? "linear-gradient(135deg, rgba(244, 63, 94, 0.4), rgba(190, 18, 60, 0.25))"
                      : "rgba(255, 255, 255, 0.03)",
                    border: `1px solid ${active ? "rgba(244, 63, 94, 0.65)" : "rgba(255, 255, 255, 0.07)"}`,
                    boxShadow: active ? "0 0 22px rgba(244, 63, 94, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)" : "none",
                    transform: active ? "scale(1.05)" : "scale(1)",
                    transition:"all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                    outline:"none",
                    display: "inline-flex",
                    alignItems: "center"
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* ─── Dynamic Infinite Floating Stream (Filters & Glides in Real-Time) ─── */}
        <ScrollReveal delay={120}>
          <div key={selectedCat} style={{ display:"flex", flexDirection:"column", gap:18, padding:"10px 0 20px" }}>
            {/* Stream Row 1 */}
            <InfiniteLoopSlider
              items={streamRow1}
              speed={0.65}
              gap={16}
              renderItem={(item) => <SkillCapsule item={item} />}
            />

            {/* Stream Row 2 (if multiple items exist) */}
            {streamRow2.length > 0 && (
              <InfiniteLoopSlider
                items={streamRow2}
                speed={0.52}
                gap={16}
                renderItem={(item) => <SkillCapsule item={item} />}
              />
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Floating Dynamic Skill Capsule ──────────────────────────────────────────
function SkillCapsule({ item }) {
  const [hov, setHov] = useState(false);
  const iconEl = renderSpecialIcon(item.name);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 12,
        padding: "11px 22px",
        borderRadius: 36,
        background: hov ? "rgba(244, 63, 94, 0.18)" : "rgba(255, 255, 255, 0.035)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${hov ? "rgba(244, 63, 94, 0.65)" : "rgba(255, 255, 255, 0.08)"}`,
        boxShadow: hov ? "0 0 28px rgba(244, 63, 94, 0.4), inset 0 1px 0 rgba(255,255,255,0.15)" : "0 6px 20px rgba(0,0,0,0.25)",
        transform: hov ? "translateY(-3px) scale(1.06)" : "scale(1)",
        transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        cursor: "pointer"
      }}
    >
      <div style={{
        width: 30, height: 30, borderRadius: 10,
        background: hov ? "rgba(244, 63, 94, 0.25)" : "rgba(255, 255, 255, 0.05)",
        border: `1px solid ${hov ? "rgba(244, 63, 94, 0.4)" : "rgba(255, 255, 255, 0.08)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        transition: "all 0.25s ease"
      }}>
        {iconEl ? (
          <div style={{ width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {iconEl}
          </div>
        ) : (
          <img
            src={item.icon}
            alt={item.name}
            style={{
              width: 18, height: 18, objectFit: "contain",
              filter: item.name === "GitHub" ? "invert(1)" : "none",
              transform: hov ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.25s ease"
            }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <span style={{
          fontFamily: "'Poppins',sans-serif", fontSize: 13.5, fontWeight: 600,
          color: hov ? "#ffffff" : "#e2e8f0",
          letterSpacing: "-0.2px",
          transition: "color 0.2s ease"
        }}>
          {item.name}
        </span>
        {item.category && (
          <span style={{
            fontFamily: "'Poppins',sans-serif", fontSize: 10, fontWeight: 500,
            color: hov ? "#fda4af" : "#64748b",
            lineHeight: 1
          }}>
            {item.category.split(" ")[0]}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Custom Vector Fallback Helper ───────────────────────────────────────────
function renderSpecialIcon(name) {
  if (name === "Google Sheets") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1.6" />
        <line x1="3" y1="9" x2="21" y2="9" stroke="#10b981" strokeWidth="1.5" />
        <line x1="3" y1="15" x2="21" y2="15" stroke="#10b981" strokeWidth="1.5" />
        <line x1="9" y1="3" x2="9" y2="21" stroke="#10b981" strokeWidth="1.5" />
        <line x1="15" y1="3" x2="15" y2="21" stroke="#10b981" strokeWidth="1.5" />
      </svg>
    );
  }
  if (name === "MS Excel") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#059669" fillOpacity="0.35" stroke="#059669" strokeWidth="1.6" />
        <path d="M8 8l8 8M16 8l-8 8" stroke="#34d399" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "n8n Automation") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#ea4b71" fillOpacity="0.3" stroke="#ea4b71" strokeWidth="1.6" />
        <circle cx="7" cy="12" r="2.2" fill="#fda4af" />
        <circle cx="17" cy="7" r="2.2" fill="#fda4af" />
        <circle cx="17" cy="17" r="2.2" fill="#fda4af" />
        <path d="M9.5 12h5M14.5 12l2.5-5M14.5 12l2.5 5" stroke="#fda4af" strokeWidth="1.6" />
      </svg>
    );
  }
  if (name === "RESTful APIs") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="3" fill="rgba(244,63,94,0.2)"/>
        <path d="M6 12h2M11 12h2M16 12h2"/>
      </svg>
    );
  }
  return null;
}

// ─── Contact Section (Real Email Dispatch via FormSubmit AJAX & Confetti) ──
function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText("wiwintanchaniago@gmail.com");
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#f43f5e", "#fda4af", "#ffffff"]
    });
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSending(true);
    setErrorMsg("");

    try {
      const res = await fetch("https://formsubmit.co/ajax/wiwintanchaniago@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Message from ${formData.name}`,
          _template: "table"
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSendSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.7 },
          colors: ["#f43f5e", "#fda4af", "#fb7185", "#ffffff", "#fbbf24"]
        });
      } else {
        // Fallback
        window.location.href = `mailto:wiwintanchaniago@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + "\n\nFrom: " + formData.name + " (" + formData.email + ")")}`;
        setSendSuccess(true);
      }
    } catch (err) {
      console.error("Email send error:", err);
      // Fallback
      window.location.href = `mailto:wiwintanchaniago@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + "\n\nFrom: " + formData.name + " (" + formData.email + ")")}`;
      setSendSuccess(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" style={{ padding:"120px 1.5rem 100px", background:"transparent", position:"relative", overflow:"hidden" }}>
      <div style={{ maxWidth:780, margin:"0 auto", textAlign:"center", position:"relative", zIndex:2 }}>
        
        <SectionHeader
          pill="Get In Touch"
          title="Let's Connect &amp; Build Something Great"
          subtitle="Whether you need a fullstack engineer, UI/UX designer, or data analytics specialist — feel free to reach out."
        />

        <ScrollReveal delay={100}>
          <GlassCard style={{ padding:"44px 36px", textAlign:"center", marginBottom:32, position:"relative", overflow:"hidden" }}>
            
            {/* Quick Action Badges */}
            <div style={{ display:"flex", justifyContent:"center", gap:12, marginBottom:28, flexWrap:"wrap" }}>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:8,
                background:"rgba(244, 63, 94, 0.12)", border:"1px solid rgba(244, 63, 94, 0.3)",
                padding:"6px 16px", borderRadius:20, color:"#fda4af", fontSize:13, fontWeight:600
              }}>
                <Sparkles size={15} color="#fda4af" /> Open to New Roles &amp; Projects
              </div>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:8,
                background:"rgba(168, 85, 247, 0.12)", border:"1px solid rgba(168, 85, 247, 0.3)",
                padding:"6px 16px", borderRadius:20, color:"#d8b4fe", fontSize:13, fontWeight:600
              }}>
                <MapPin size={15} color="#d8b4fe" /> Indonesia · Remote / On-Site
              </div>
            </div>

            {/* Main Email CTA Button */}
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:14, marginBottom:32, flexWrap:"wrap" }}>
              <MagneticButton
                onClick={() => window.location.href = "mailto:wiwintanchaniago@gmail.com"}
                style={{
                  display:"inline-flex", alignItems:"center", gap:10,
                  background:C.gradButton, color:"#fff", padding:"16px 36px", borderRadius:36,
                  fontSize:15, fontFamily:"'Poppins',sans-serif", fontWeight:600, border:"none",
                  cursor:"pointer",
                  boxShadow:"0 12px 36px rgba(244, 63, 94, 0.45), inset 0 1px 0 rgba(255,255,255,0.25)",
                  transition:"all 0.3s ease"
                }}
              >
                <Mail size={18} /> wiwintanchaniago@gmail.com
              </MagneticButton>

              <button
                onClick={handleCopyEmail}
                title="Copy Email"
                style={{
                  display:"inline-flex", alignItems:"center", gap:8,
                  background:"rgba(255, 255, 255, 0.06)", border:"1px solid rgba(244, 63, 94, 0.35)",
                  color:"#ffffff", padding:"15px 22px", borderRadius:36, fontSize:14,
                  fontWeight:600, cursor:"pointer", backdropFilter:"blur(12px)",
                  transition:"all 0.25s ease"
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="#f43f5e"; e.currentTarget.style.background="rgba(244, 63, 94, 0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(244, 63, 94, 0.35)"; e.currentTarget.style.background="rgba(255, 255, 255, 0.06)"; }}
              >
                {copied ? <Check size={16} color="#4ade80" /> : <Copy size={16} color="#fda4af" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Success Feedback Alert Banner */}
            {sendSuccess && (
              <div style={{
                maxWidth: 560,
                margin: "0 auto 24px",
                padding: "12px 20px",
                background: "rgba(16, 185, 129, 0.12)",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                borderRadius: 12,
                color: "#6ee7b7",
                fontFamily: "'Poppins',sans-serif",
                fontSize: 13.5,
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8
              }}>
                <CheckCircle2 size={17} color="#10b981" />
                <span>Successfully sent!</span>
              </div>
            )}

            {/* Quick Direct Message Form (Direct Delivery into wiwintanchaniago@gmail.com) */}
            <form onSubmit={handleSubmitMessage} style={{ maxWidth:560, margin:"0 auto 28px", textAlign:"left" }}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label style={{ fontSize:12.5, fontWeight:600, color:"#fda4af", marginBottom:6, display:"block" }}>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Wiewien Tan"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width:"100%", background:"rgba(255, 255, 255, 0.05)",
                      border:"1px solid rgba(244, 63, 94, 0.25)", borderRadius:12,
                      padding:"11px 16px", color:"#ffffff", fontSize:14, outline:"none",
                      fontFamily:"'Poppins',sans-serif"
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label style={{ fontSize:12.5, fontWeight:600, color:"#fda4af", marginBottom:6, display:"block" }}>Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="wiewien@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width:"100%", background:"rgba(255, 255, 255, 0.05)",
                      border:"1px solid rgba(244, 63, 94, 0.25)", borderRadius:12,
                      padding:"11px 16px", color:"#ffffff", fontSize:14, outline:"none",
                      fontFamily:"'Poppins',sans-serif"
                    }}
                  />
                </div>
                <div className="col-12">
                  <label style={{ fontSize:12.5, fontWeight:600, color:"#fda4af", marginBottom:6, display:"block" }}>Message</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Hi Wiewien, I'd like to discuss a project..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width:"100%", background:"rgba(255, 255, 255, 0.05)",
                      border:"1px solid rgba(244, 63, 94, 0.25)", borderRadius:12,
                      padding:"12px 16px", color:"#ffffff", fontSize:14, outline:"none",
                      fontFamily:"'Poppins',sans-serif", resize:"vertical"
                    }}
                  />
                </div>
                <div className="col-12" style={{ textAlign:"center", marginTop:16 }}>
                  <button
                    type="submit"
                    disabled={isSending}
                    style={{
                      display:"inline-flex", alignItems:"center", gap:8,
                      background:"linear-gradient(135deg, #f43f5e 0%, #be123c 100%)",
                      color:"#ffffff", border:"none", borderRadius:28,
                      padding:"12px 32px", fontSize:14, fontWeight:600,
                      cursor: isSending ? "not-allowed" : "pointer",
                      opacity: isSending ? 0.75 : 1,
                      boxShadow:"0 8px 24px rgba(244, 63, 94, 0.35)",
                      transition:"all 0.2s"
                    }}
                  >
                    <Send size={15} /> {isSending ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </div>
            </form>

            {/* Social Channels & WhatsApp Direct */}
            <div style={{ display:"flex", justifyContent:"center", gap:12, flexWrap:"wrap", borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:24 }}>
              {[
                { label:"WhatsApp", href:"https://wa.me/6281917623160?text=Halo%20Wiewien,%20saya%20tertarik%20berkolaborasi%20dengan%20Anda!", target:"_blank", icon: <Phone size={14} /> },
                { label:"LinkedIn", href:"https://linkedin.com/in/wiewien", target:"_blank", icon: <ExternalLink size={14} /> },
                { label:"GitHub", href:"https://github.com/wiewientan", target:"_blank", icon: <GithubIcon size={14} /> }
              ].map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.target}
                  rel={l.target ? "noopener noreferrer" : undefined}
                  style={{
                    display:"inline-flex", alignItems:"center", gap:7,
                    background:"rgba(255, 255, 255, 0.04)", backdropFilter:"blur(12px)",
                    border:"1px solid rgba(244, 63, 94, 0.25)", color:"#ffffff",
                    padding:"10px 20px", borderRadius:30, fontSize:13,
                    fontFamily:"'Poppins',sans-serif", fontWeight:600,
                    textDecoration:"none", transition:"all 0.2s"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.borderColor="rgba(244,63,94,0.7)"; e.currentTarget.style.background="rgba(244,63,94,0.18)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.borderColor="rgba(244,63,94,0.25)"; e.currentTarget.style.background="rgba(255, 255, 255, 0.04)"; }}
                >
                  {l.icon}
                  {l.label}
                </a>
              ))}
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Super Cute Ultra-Interactive Chibi Cat Companion ─────────────────────────
function CuteCatCompanion() {
  // Opening Intro Phase: 'greeting' -> 'shrinking' -> 'roaming'
  const [introPhase, setIntroPhase] = useState("greeting");

  // Position state (starts centered on opening, then moves to bottom corner)
  const [pos, setPos] = useState(() => ({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 300,
    y: typeof window !== "undefined" ? window.innerHeight / 2 - 20 : 300
  }));
  const [direction, setDirection] = useState(-1); // 1 = right, -1 = left
  const [catState, setCatState] = useState("greeting"); // greeting, walking, grooming, sitting, napping, curious, jump, grabbed, eating, playing
  const [bubble, setBubble] = useState("Hi! Nyaww~ (> <)");
  const [isBlinking, setIsBlinking] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [yarnPos, setYarnPos] = useState(null);

  const animRef = useRef(null);
  const scrollTimeout = useRef(null);
  const stateTimer = useRef(null);
  const bubbleTimer = useRef(null);
  const catRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ clientX: 0, clientY: 0, posX: 0, posY: 0, moved: false });

  const meowQuotes = useMemo(() => [
    "Nyaaa~ (> <) ♡",
    "Meow meow! (=^･ω･^=)",
    "Purrr... (˘ω˘)zzZ",
    "Ada info loker kah? (・ω・)",
    "Mew mew! Open to work! (>w<)",
    "Drop info loker yaa~ ( ˶• o •˶ )",
    "Purrr... Siap diajak kolaborasi! ( ≧ᗜ≦ )",
    "Hire me! (=^‥^=) ♡",
    "Rawr! Semangat hari ini! ( > < )",
    "Nyam nyam~ Butuh asupan loker (´• ω •`)",
    "Meooww~ Mau liat portofolio keren ini? ( ^ω^ )",
    "Purrr... Paws up for coding! ( > ‿ < )"
  ], []);

  const popBubble = useCallback((text, duration = 2800) => {
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    setBubble(text);
    bubbleTimer.current = setTimeout(() => {
      setBubble(null);
    }, duration);
  }, []);

  const triggerHearts = useCallback((count = 1) => {
    const symbols = ["♡", "♥", "★", "><", "(>w<)"];
    const newHearts = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i + Math.random(),
      offsetX: (Math.random() - 0.5) * 44,
      symbol: symbols[Math.floor(Math.random() * symbols.length)]
    }));
    setHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 1200);
  }, []);

  useEffect(() => {
    triggerHearts(4);
    const introTimer = setTimeout(() => {
      setIntroPhase("shrinking");
      setBubble("Meow! (=^･ω･^=)");
      setPos({
        x: Math.max(20, window.innerWidth - 140),
        y: Math.max(20, window.innerHeight - 85)
      });
      setTimeout(() => {
        setIntroPhase("roaming");
        setCatState("walking");
        setTimeout(() => setBubble(null), 2000);
      }, 1150);
    }, 2200);
    return () => clearTimeout(introTimer);
  }, [triggerHearts]);

  useEffect(() => {
    const handleResize = () => {
      if (introPhase === "greeting") {
        setPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 - 20 });
      } else {
        setPos((p) => ({
          x: Math.min(Math.max(20, p.x), window.innerWidth - 80),
          y: Math.min(Math.max(20, p.y), window.innerHeight - 90)
        }));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [introPhase]);

  useEffect(() => {
    if (introPhase !== "roaming") return;
    let lastTime = performance.now();
    const updateMovement = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      if (!isDragging) {
        if (yarnPos) {
          setPos((prev) => {
            const dx = yarnPos.x - prev.x;
            const dy = yarnPos.y - prev.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 15) {
              setDirection(dx >= 0 ? 1 : -1);
              setCatState("playing");
              return { x: prev.x + (dx / dist) * 120 * dt, y: prev.y + (dy / dist) * 120 * dt };
            } else {
              triggerHearts(2);
              return prev;
            }
          });
        } else if (catState === "walking") {
          setPos((prev) => {
            let nextX = prev.x + direction * 35 * dt;
            const minX = 20;
            const maxX = window.innerWidth - 90;
            if (nextX >= maxX) { setDirection(-1); return { ...prev, x: maxX }; }
            if (nextX <= minX) { setDirection(1); return { ...prev, x: minX }; }
            return { ...prev, x: nextX };
          });
        }
      }
      animRef.current = requestAnimationFrame(updateMovement);
    };
    animRef.current = requestAnimationFrame(updateMovement);
    return () => cancelAnimationFrame(animRef.current);
  }, [catState, direction, isDragging, yarnPos, triggerHearts, introPhase]);

  useEffect(() => {
    if (introPhase !== "roaming" || isDragging || yarnPos || catState === "eating" || catState === "grabbed") return;
    const cycleState = () => {
      if (catState === "curious" || catState === "jump" || catState === "eating") return;
      if (catState === "walking") {
        const restStates = ["grooming", "sitting", "napping", "grooming"];
        const next = restStates[Math.floor(Math.random() * restStates.length)];
        setCatState(next);
        stateTimer.current = setTimeout(cycleState, 4500);
      } else {
        if (Math.random() > 0.45) setDirection((d) => -d);
        setCatState("walking");
        stateTimer.current = setTimeout(cycleState, 6500);
      }
    };
    stateTimer.current = setTimeout(cycleState, 5000);
    return () => clearTimeout(stateTimer.current);
  }, [catState, isDragging, yarnPos, introPhase]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 2800);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (isDraggingRef.current || yarnPos) return;
      setCatState("curious");
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setCatState("walking");
      }, 1400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [yarnPos]);

  useEffect(() => {
    const handleGlobalRelease = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
        setCatState("jump");
        triggerHearts(2);
        popBubble("Purrr~ landed safely! (>w<)", 2000);
        setTimeout(() => {
          setCatState("walking");
        }, 600);
      }
    };
    window.addEventListener("pointerup", handleGlobalRelease);
    window.addEventListener("pointercancel", handleGlobalRelease);
    window.addEventListener("mouseup", handleGlobalRelease);
    window.addEventListener("touchend", handleGlobalRelease);
    return () => {
      window.removeEventListener("pointerup", handleGlobalRelease);
      window.removeEventListener("pointercancel", handleGlobalRelease);
      window.removeEventListener("mouseup", handleGlobalRelease);
      window.removeEventListener("touchend", handleGlobalRelease);
    };
  }, [triggerHearts, popBubble]);

  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
    isDraggingRef.current = true;
    dragStartRef.current = { clientX: e.clientX, clientY: e.clientY, posX: pos.x, posY: pos.y, moved: false };
    setIsDragging(true);
    setCatState("grabbed");
    popBubble("Nyaa?! (⊙_⊙)", 1000);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.clientX;
    const dy = e.clientY - dragStartRef.current.clientY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragStartRef.current.moved = true;
    const rawX = dragStartRef.current.posX + dx;
    const rawY = dragStartRef.current.posY + dy;
    const newX = Math.min(Math.max(25, rawX), window.innerWidth - 85);
    const newY = Math.min(Math.max(25, rawY), window.innerHeight - 85);
    if (dx > 2) setDirection(1);
    else if (dx < -2) setDirection(-1);
    setPos({ x: newX, y: newY });
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) {}
    const wasMoved = dragStartRef.current.moved;
    isDraggingRef.current = false;
    setIsDragging(false);
    if (!wasMoved) { handleCatInteract(e); return; }
    setCatState("jump");
    triggerHearts(2);
    popBubble("Purrr~ landed safely! (>w<)", 2000);
    setTimeout(() => { setCatState("walking"); }, 600);
  };

  const handlePointerCancel = (e) => {
    if (!isDraggingRef.current) return;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) {}
    isDraggingRef.current = false;
    setIsDragging(false);
    setCatState("walking");
  };

  const handleCatInteract = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const actions = ["pet", "fish", "jump", "yarn", "quote"];
    const chosen = actions[Math.floor(Math.random() * actions.length)];
    if (chosen === "fish") {
      setCatState("eating");
      triggerHearts(3);
      popBubble("nom nom sedap~ (=^･ω･^=)", 2200);
      setTimeout(() => {
        setCatState("sitting");
        setTimeout(() => setCatState("walking"), 1800);
      }, 2000);
    } else if (chosen === "yarn") {
      const randomAngle = Math.random() * Math.PI * 2;
      const distance = 130 + Math.random() * 70;
      const targetX = Math.min(Math.max(40, pos.x + Math.cos(randomAngle) * distance), window.innerWidth - 60);
      const targetY = Math.min(Math.max(60, pos.y + Math.sin(randomAngle) * distance), window.innerHeight - 80);
      setYarnPos({ x: targetX, y: targetY });
      popBubble("Catch the yarn! (> <)", 2000);
      setTimeout(() => {
        setYarnPos(null);
        setCatState("jump");
        setTimeout(() => setCatState("walking"), 1000);
      }, 4000);
    } else if (chosen === "jump") {
      setCatState("jump");
      triggerHearts(3);
      popBubble("boing! (>w<)", 1800);
      setTimeout(() => { setCatState("walking"); }, 700);
    } else if (chosen === "pet") {
      setCatState("sitting");
      triggerHearts(4);
      popBubble("purrrr (> <) ♡", 2000);
      setTimeout(() => { setCatState("walking"); }, 1800);
    } else {
      setCatState("sitting");
      triggerHearts(2);
      const quote = meowQuotes[Math.floor(Math.random() * meowQuotes.length)];
      popBubble(quote);
      setTimeout(() => { setCatState("walking"); }, 2000);
    }
  };

  const onCatClick = (e) => {
    if (isDragging) return;
    if (introPhase === "greeting") {
      setIntroPhase("shrinking");
      setBubble("Meow! (=^･ω･^=)");
      setPos({
        x: Math.max(20, window.innerWidth - 140),
        y: Math.max(20, window.innerHeight - 85)
      });
      setTimeout(() => {
        setIntroPhase("roaming");
        setCatState("walking");
        setTimeout(() => setBubble(null), 1800);
      }, 1150);
      return;
    }
    handleCatInteract(e);
  };

  return (
    <>
      <div
        onClick={onCatClick}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9993,
          background: "radial-gradient(circle at 50% 48%, rgba(244,63,94,0.16) 0%, rgba(12,10,23,0.58) 70%)",
          backdropFilter: introPhase === "greeting" ? "blur(6px)" : "blur(0px)",
          WebkitBackdropFilter: introPhase === "greeting" ? "blur(6px)" : "blur(0px)",
          opacity: introPhase === "greeting" ? 1 : 0,
          pointerEvents: introPhase === "greeting" ? "auto" : "none",
          transition: "opacity 1.15s cubic-bezier(0.22, 1, 0.36, 1), backdrop-filter 1.15s cubic-bezier(0.22, 1, 0.36, 1), -webkit-backdrop-filter 1.15s cubic-bezier(0.22, 1, 0.36, 1)"
        }}
      />

      {yarnPos && (
        <div
          onClick={handleCatInteract}
          title="Toss yarn ball! (> <)"
          style={{
            position: "fixed",
            left: yarnPos.x,
            top: yarnPos.y,
            zIndex: 9994,
            cursor: "pointer",
            transform: "translate(-50%, -50%)",
            animation: "yarnRoll 1s linear infinite",
            filter: "drop-shadow(0 4px 12px rgba(244,63,94,0.6))"
          }}
        >
          <svg width="26" height="26" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill="#f43f5e" stroke="#fda4af" strokeWidth="2" />
            <path d="M6 12 Q16 6 26 12 Q16 18 6 12" stroke="#ffffff" strokeWidth="1.8" fill="none" />
            <path d="M8 20 Q16 26 24 20 Q16 14 8 20" stroke="#ffffff" strokeWidth="1.8" fill="none" />
            <path d="M12 6 Q18 16 12 26" stroke="#ffe4e6" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      )}

      <div
        ref={catRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClick={onCatClick}
        className="chibi-cat-container"
        title={introPhase === "greeting" ? "Click to continue! ( ´ ▽ ` )ﾉ" : "Click to play / drag me anywhere! (> <)"}
        style={{
          position: "fixed",
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          zIndex: 9995,
          cursor: isDragging ? "grabbing" : introPhase === "greeting" ? "pointer" : "grab",
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "none",
          transform: `translateX(-50%) translateY(-50%) ${
            introPhase === "greeting"
              ? "scale(2.3)"
              : `${direction === -1 ? "scaleX(1)" : "scaleX(-1)"} scale(1)`
          }`,
          transition: isDragging
            ? "none"
            : introPhase === "shrinking"
            ? "all 1.15s cubic-bezier(0.22, 1, 0.36, 1)"
            : "transform 0.15s ease-out",
          filter: isDragging
            ? "drop-shadow(0 14px 28px rgba(244,63,94,0.55)) scale(1.08)"
            : introPhase === "greeting"
            ? "drop-shadow(0 18px 40px rgba(244,63,94,0.65))"
            : "drop-shadow(0 6px 18px rgba(0,0,0,0.5))"
        }}
      >
        {/* Floating Snack Fish Vector when eating */}
        {catState === "eating" && (
          <div
            style={{
              position: "absolute",
              top: -8,
              right: direction === -1 ? -12 : "auto",
              left: direction === 1 ? -12 : "auto",
              zIndex: 9996,
              animation: "bubblePop 0.25s ease-out"
            }}
          >
            <svg width="22" height="14" viewBox="0 0 30 18" fill="none">
              <path d="M28 9 C22 2 10 2 2 9 C10 16 22 16 28 9 Z" fill="#fda4af" stroke="#f43f5e" strokeWidth="1.5" />
              <polygon points="2,9 0,4 0,14" fill="#fda4af" stroke="#f43f5e" strokeWidth="1.5" />
              <circle cx="20" cy="7" r="1.5" fill="#881337" />
            </svg>
          </div>
        )}

        {/* Speech Bubble (Borderless sleek clean glass) */}
        {bubble && (
          <div
            style={{
              position: "absolute",
              bottom: introPhase === "greeting" ? 78 : 68,
              left: "50%",
              transform: `translateX(-50%) ${
                introPhase === "greeting" ? "scale(1)" : direction === -1 ? "scaleX(1)" : "scaleX(-1)"
              }`,
              background: "rgba(18, 14, 34, 0.94)",
              backdropFilter: "blur(20px)",
              border: "none",
              color: "#ffffff",
              fontFamily: "'Poppins',sans-serif",
              fontSize: introPhase === "greeting" ? 13 : 12,
              fontWeight: 700,
              padding: introPhase === "greeting" ? "8px 18px" : "6px 14px",
              borderRadius: "18px",
              boxShadow: introPhase === "greeting"
                ? "0 12px 36px rgba(0,0,0,0.65), 0 0 24px rgba(244,63,94,0.35)"
                : "0 8px 24px rgba(0,0,0,0.5), 0 0 15px rgba(244,63,94,0.2)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              animation: "bubblePop 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
            }}
          >
            {bubble}
          </div>
        )}

        {/* Floating Zzz when napping */}
        {catState === "napping" && (
          <div
            style={{
              position: "absolute",
              top: -18,
              right: 8,
              transform: direction === -1 ? "scaleX(1)" : "scaleX(-1)",
              fontFamily: "'Poppins',sans-serif",
              fontSize: 13,
              fontWeight: 800,
              color: "#fda4af",
              pointerEvents: "none",
              animation: "zzzFloat 2s ease-in-out infinite"
            }}
          >
            Zzz...
          </div>
        )}

        {/* Floating Kaomoji / Heart Particles */}
        {hearts.map((h) => (
          <span
            key={h.id}
            style={{
              position: "absolute",
              top: -14,
              left: `calc(50% + ${h.offsetX || 0}px)`,
              fontSize: 15,
              fontWeight: 800,
              color: "#fb7185",
              textShadow: "0 0 8px rgba(244,63,94,0.8)",
              pointerEvents: "none",
              animation: "heartFly 1.1s ease-out forwards"
            }}
          >
            {h.symbol || "♡"}
          </span>
        ))}

        {/* Ultra-Cute Chibi Kitten Vector SVG */}
        <div
          className={
            catState === "walking" || catState === "playing"
              ? "cat-walk-bob"
              : catState === "jump"
              ? "cat-jump-anim"
              : catState === "grabbed"
              ? "cat-dangle-anim"
              : ""
          }
          style={{ width: 68, height: 64, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <svg width="68" height="64" viewBox="0 0 100 90" fill="none">
            {/* Fluffy Tail */}
            <path
              d="M20 65 C8 58 4 40 12 30 C15 26 21 28 18 34 C12 42 16 52 26 56 Z"
              fill="#ffedd5"
              stroke="#f43f5e"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{
                transformOrigin: "26px 58px",
                animation:
                  catState === "walking" || catState === "playing"
                    ? "tailWagFast 0.5s ease-in-out infinite alternate"
                    : "tailGentle 2s ease-in-out infinite alternate"
              }}
            />

            {/* Chubby Kitten Body */}
            <ellipse cx="50" cy="58" rx="26" ry="20" fill="#fff7ed" stroke="#f43f5e" strokeWidth="2.5" />
            <ellipse cx="48" cy="60" rx="15" ry="11" fill="#ffe4e6" opacity="0.85" />

            {/* Back Left Leg */}
            <ellipse
              cx="32" cy="74" rx="7" ry="5"
              fill="#ffedd5" stroke="#f43f5e" strokeWidth="2"
              style={{
                transformOrigin: "32px 70px",
                animation:
                  catState === "walking" || catState === "playing"
                    ? "legPatterLeft 0.35s ease-in-out infinite alternate"
                    : catState === "grabbed"
                    ? "legDangle 0.3s ease-in-out infinite alternate"
                    : "none"
              }}
            />

            {/* Back Right Leg */}
            <ellipse
              cx="64" cy="74" rx="7" ry="5"
              fill="#ffedd5" stroke="#f43f5e" strokeWidth="2"
              style={{
                transformOrigin: "64px 70px",
                animation:
                  catState === "walking" || catState === "playing"
                    ? "legPatterRight 0.35s ease-in-out infinite alternate"
                    : catState === "grabbed"
                    ? "legDangle 0.3s ease-in-out 0.15s infinite alternate"
                    : "none"
              }}
            />

            {/* Left Fluffy Kawaii Ear (Wide Spaced) */}
            <polygon
              points="26,24 28,5 42,16"
              fill="#ffedd5"
              stroke="#f43f5e"
              strokeWidth="2.5"
              strokeLinejoin="round"
              style={{
                transformOrigin: "32px 20px",
                animation: catState === "curious" || isDragging || catState === "greeting" ? "earTwitch 0.25s ease infinite alternate" : "none"
              }}
            />
            <polygon points="29,21 31,9 39,16" fill="#fda4af" />

            {/* Right Fluffy Kawaii Ear (Wide Spaced) */}
            <polygon
              points="74,24 72,5 58,16"
              fill="#ffedd5"
              stroke="#f43f5e"
              strokeWidth="2.5"
              strokeLinejoin="round"
              style={{
                transformOrigin: "68px 20px",
                animation: catState === "curious" || isDragging || catState === "greeting" ? "earTwitch 0.25s ease 0.1s infinite alternate" : "none"
              }}
            />
            <polygon points="71,21 69,9 61,16" fill="#fda4af" />

            {/* Big Chibi Kitten Head */}
            <circle cx="50" cy="34" r="22" fill="#fff7ed" stroke="#f43f5e" strokeWidth="2.5" />

            {/* Cute Forehead Fluff / Hair Tuft */}
            <path d="M47 13 Q50 9 53 13" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Big Rosy Cheeks */}
            <ellipse cx="36" cy="38" rx="5" ry="3.5" fill="#fda4af" opacity="0.95" />
            <ellipse cx="64" cy="38" rx="5" ry="3.5" fill="#fda4af" opacity="0.95" />

            {/* Eyes State */}
            {catState === "napping" ? (
              /* Sleeping (⌒‿⌒) */
              <>
                <path d="M36 32 Q41 37 46 32" stroke="#881337" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M54 32 Q59 37 64 32" stroke="#881337" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            ) : isBlinking ? (
              /* Blinking Line */
              <>
                <line x1="36" y1="33" x2="46" y2="33" stroke="#881337" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="54" y1="33" x2="64" y2="33" stroke="#881337" strokeWidth="2.5" strokeLinecap="round" />
              </>
            ) : catState === "grooming" || catState === "eating" || catState === "greeting" ? (
              /* Happy Closed Manga Eyes while greeting or happy */
              <>
                <path d="M36 33 Q41 28 46 33" stroke="#881337" strokeWidth="2.6" strokeLinecap="round" fill="none" />
                <path d="M54 33 Q59 28 64 33" stroke="#881337" strokeWidth="2.6" strokeLinecap="round" fill="none" />
              </>
            ) : catState === "grabbed" ? (
              /* Surprised / Dangling Eyes (⊙_⊙) */
              <>
                <ellipse cx="41" cy="32" rx="6" ry="6" fill="#4c0519" />
                <circle cx="39" cy="30" r="2.8" fill="#ffffff" />
                <ellipse cx="59" cy="32" rx="6" ry="6" fill="#4c0519" />
                <circle cx="57" cy="30" r="2.8" fill="#ffffff" />
              </>
            ) : (
              /* Huge Shimmering Anime Manga Eyes */
              <>
                <ellipse cx="41" cy="32" rx="5.5" ry="6.5" fill="#4c0519" />
                <circle cx="39" cy="30" r="2.4" fill="#ffffff" />
                <circle cx="43" cy="34" r="1.1" fill="#ffffff" />

                <ellipse cx="59" cy="32" rx="5.5" ry="6.5" fill="#4c0519" />
                <circle cx="57" cy="30" r="2.4" fill="#ffffff" />
                <circle cx="61" cy="34" r="1.1" fill="#ffffff" />
              </>
            )}

            {/* Tiny Pink Nose & Cute Mouth */}
            <polygon points="48,37 52,37 50,39" fill="#f43f5e" />
            {catState === "eating" ? (
              /* Munching mouth with fish bone */
              <>
                <circle cx="50" cy="41" r="3.5" fill="#be123c" />
                <path d="M44 41 L56 41" stroke="#fda4af" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : catState === "greeting" ? (
              /* Happy Open Singing/Greeting Mouth :D */
              <path d="M45 40 Q50 46 55 40 Z" fill="#f43f5e" stroke="#881337" strokeWidth="1.5" />
            ) : (
              <path d="M46 40 Q50 43 50 40 Q50 43 54 40" stroke="#881337" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            )}

            {/* Whiskers */}
            <line x1="24" y1="36" x2="33" y2="37" stroke="#fda4af" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="23" y1="40" x2="32" y2="40" stroke="#fda4af" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="67" y1="37" x2="76" y2="36" stroke="#fda4af" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="68" y1="40" x2="77" y2="40" stroke="#fda4af" strokeWidth="1.5" strokeLinecap="round" />

            {/* Front Paws */}
            {catState === "greeting" ? (
              /* Waving paw in greeting mode */
              <>
                <ellipse cx="40" cy="74" rx="6" ry="4.5" fill="#fff7ed" stroke="#f43f5e" strokeWidth="2" />
                <circle
                  cx="68" cy="42" r="5.5"
                  fill="#fff7ed" stroke="#f43f5e" strokeWidth="2"
                  style={{
                    transformOrigin: "60px 52px",
                    animation: "wavePawAnim 0.35s ease-in-out infinite alternate"
                  }}
                />
              </>
            ) : catState === "grooming" ? (
              /* Paw grooming face (bersihin bulu) */
              <circle
                cx="44" cy="40" r="5"
                fill="#fff7ed" stroke="#f43f5e" strokeWidth="2"
                style={{ animation: "pawGroomCircle 0.5s ease-in-out infinite alternate" }}
              />
            ) : (
              <>
                <ellipse
                  cx="42" cy="74" rx="6" ry="4.5"
                  fill="#fff7ed" stroke="#f43f5e" strokeWidth="2"
                  style={{
                    transformOrigin: "42px 70px",
                    animation:
                      catState === "walking" || catState === "playing"
                        ? "legPatterRight 0.35s ease-in-out infinite alternate"
                        : "none"
                  }}
                />
                <ellipse
                  cx="56" cy="74" rx="6" ry="4.5"
                  fill="#fff7ed" stroke="#f43f5e" strokeWidth="2"
                  style={{
                    transformOrigin: "56px 70px",
                    animation:
                      catState === "walking" || catState === "playing"
                        ? "legPatterLeft 0.35s ease-in-out infinite alternate"
                        : "none"
                  }}
                />
              </>
            )}
          </svg>
        </div>

        <style>{`
          @keyframes wavePawAnim {
            0% { transform: translate(0, 0) rotate(0deg); }
            100% { transform: translate(2px, -6px) rotate(-22deg); }
          }
          @keyframes catWalkBob {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
            100% { transform: translateY(0px); }
          }
          .cat-walk-bob {
            animation: catWalkBob 0.35s ease-in-out infinite;
          }

          @keyframes legPatterLeft {
            0% { transform: rotate(-18deg) translateY(-2px); }
            100% { transform: rotate(18deg) translateY(2px); }
          }
          @keyframes legPatterRight {
            0% { transform: rotate(18deg) translateY(2px); }
            100% { transform: rotate(-18deg) translateY(-2px); }
          }
          @keyframes legDangle {
            0% { transform: rotate(-12deg) translateY(3px); }
            100% { transform: rotate(12deg) translateY(1px); }
          }

          @keyframes tailWagFast {
            from { transform: rotate(-18deg); }
            to { transform: rotate(22deg); }
          }
          @keyframes tailGentle {
            from { transform: rotate(-6deg); }
            to { transform: rotate(10deg); }
          }
          @keyframes earTwitch {
            from { transform: rotate(0deg); }
            to { transform: rotate(-12deg); }
          }
          @keyframes pawGroomCircle {
            0% { transform: translate(0, 0) rotate(0deg); }
            100% { transform: translate(-4px, -6px) rotate(20deg); }
          }

          @keyframes catJumpAnim {
            0% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-16px) scale(1.15); }
            100% { transform: translateY(0) scale(1); }
          }
          .cat-jump-anim {
            animation: catJumpAnim 0.45s ease-out;
          }

          @keyframes catDangleAnim {
            0% { transform: translateY(0) rotate(-4deg); }
            50% { transform: translateY(2px) rotate(4deg); }
            100% { transform: translateY(0) rotate(-4deg); }
          }
          .cat-dangle-anim {
            animation: catDangleAnim 0.6s ease-in-out infinite;
          }

          @keyframes zzzFloat {
            0% { opacity: 0; transform: translate(0, 4px) scale(0.8); }
            50% { opacity: 1; transform: translate(4px, -6px) scale(1.1); }
            100% { opacity: 0; transform: translate(8px, -16px) scale(1.3); }
          }
          @keyframes bubblePop {
            from { opacity: 0; transform: translateX(-50%) scale(0.7) translateY(8px); }
            to { opacity: 1; transform: translateX(-50%) scale(1) translateY(0); }
          }
          @keyframes heartFly {
            0% { opacity: 1; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-34px) scale(1.5); }
          }
          @keyframes yarnRoll {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  );
}

// ─── Root Application ─────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("home");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      setMouse({ x: e.clientX - window.innerWidth / 2, y: e.clientY - window.innerHeight / 2 });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const sections = ["home","about","projects","experience","certifications","skills","contact"];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold:0.25 }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg}; overflow-x: hidden; }
        a, button { cursor: pointer; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #f43f5e, #be123c); border-radius: 2px; }
        ::-webkit-scrollbar-track { background: transparent; }

        /* Responsive Layouts */
        @media (max-width: 900px) {
          section { padding: 90px 1.25rem 60px !important; }
          .hero-grid { grid-template-columns: 1fr !important; text-align: center !important; gap: 2.5rem !important; }
          .hero-text { display: flex; flex-direction: column; align-items: center; order: 2; }
          .hero-photo { order: 1; margin-bottom: 0.5rem; }
          .hero-btns { justify-content: center !important; width: 100%; }
          .hero-btns button { width: 100%; max-width: 320px; }
          .two-col { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .cards-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .glass-card { padding: 22px 18px !important; }
        }
      `}</style>

      <Cursor />
      <ScrollProgress />
      <div style={{ background: C.bg, minHeight: "100vh", position: "relative" }}>
        {/* Multi-Layered Parallax Cosmic Atmosphere Background */}
        <ParallaxAtmosphere mouseX={mouse.x} mouseY={mouse.y} sakuraMode="breeze" />
        
        <Nav active={active} />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Certifications />
        <Skills />
        <Contact />

        {/* Cute Interactive Animated Cat Mascot */}
        <CuteCatCompanion />
      </div>
    </>
  );
}
