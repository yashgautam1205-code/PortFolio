import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  GitBranch,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  Star,
  TerminalSquare,
  X
} from 'lucide-react';
import { navLinks, orderedProjects as projects, skills, socialLinks, timeline, workingPrinciples } from './data/site';

type ContactField = 'name' | 'email' | 'subject' | 'message';
type ContactForm = Record<ContactField, string>;

type FormState = {
  type: 'idle' | 'submitting' | 'success' | 'error' | 'validation' | 'unconfigured';
  message: string;
  invalidField?: ContactField;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const currentYear = new Date().getFullYear();
const contactRequestTimeoutMs = 15_000;

function isFormspreeSuccess(response: unknown): response is { ok: true } {
  return typeof response === 'object' && response !== null && 'ok' in response && response.ok === true;
}

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const submissionInFlightRef = useRef(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSkillCategories, setExpandedSkillCategories] = useState<Set<string>>(() => new Set());
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', subject: '', message: '' });
  const [formState, setFormState] = useState<FormState>({ type: 'idle', message: '' });
  const contactEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();
  const [activeSection, setActiveSection] = useState('home');
  const [architectureProjectIndex, setArchitectureProjectIndex] = useState(0);
  const [architectureStepIndex, setArchitectureStepIndex] = useState(0);

  const toggleSkillCategory = (category: string) => {
    setExpandedSkillCategories((current) => {
      const next = new Set(current);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  useEffect(() => {
    const root = appRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (typeof window.IntersectionObserver !== 'function') return;

    const targets = root.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    root.classList.add('motion-ready');
    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      root.classList.remove('motion-ready');
    };
  }, []);

  useEffect(() => {
    let frame = 0;

    const handleScroll = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
        if (progressRef.current) {
          progressRef.current.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }
        frame = 0;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        document.getElementById('mobile-menu-toggle')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (typeof window.IntersectionObserver !== 'function') return;

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: 0.15 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleFieldChange = (field: ContactField, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setFormState((current) =>
      current.type === 'validation' || current.type === 'success'
        ? { type: 'idle', message: '' }
        : current
    );
  };

  const applyMagnetic = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    target.style.setProperty('--move-x', `${offsetX * 0.22}px`);
    target.style.setProperty('--move-y', `${offsetY * 0.22}px`);
  };

  const resetMagnetic = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    event.currentTarget.style.setProperty('--move-x', '0px');
    event.currentTarget.style.setProperty('--move-y', '0px');
  };

  const applyProjectPointer = (event: React.PointerEvent<HTMLElement>) => {
    if (
      event.pointerType !== 'mouse' ||
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    card.style.setProperty('--pointer-x', `${x * 100}%`);
    card.style.setProperty('--pointer-y', `${y * 100}%`);
    card.style.setProperty('--art-offset-x', `${(x - 0.5) * 12}px`);
    card.style.setProperty('--art-offset-y', `${(y - 0.5) * 8}px`);
    card.style.setProperty('--tilt-x', `${(0.5 - y) * 2.2}deg`);
    card.style.setProperty('--tilt-y', `${(x - 0.5) * 2.2}deg`);
  };

  const resetProjectPointer = (event: React.PointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    card.style.setProperty('--pointer-x', '50%');
    card.style.setProperty('--pointer-y', '50%');
    card.style.setProperty('--art-offset-x', '0px');
    card.style.setProperty('--art-offset-y', '0px');
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionInFlightRef.current) return;

    const formElement = event.currentTarget;
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedSubject = form.subject.trim();
    const trimmedMessage = form.message.trim();

    const invalidField: ContactField | undefined = !trimmedName
      ? 'name'
      : !trimmedEmail || !emailPattern.test(trimmedEmail)
        ? 'email'
        : !trimmedSubject
          ? 'subject'
          : !trimmedMessage
            ? 'message'
            : undefined;

    if (invalidField) {
      const validationMessages: Record<ContactField, string> = {
        name: 'Please enter your full name.',
        email: 'Please enter a valid email address.',
        subject: 'Please enter a subject.',
        message: 'Please enter a message.'
      };
      setFormState({ type: 'validation', message: validationMessages[invalidField], invalidField });
      formElement.querySelector<HTMLElement>(`[name="${invalidField}"]`)?.focus();
      return;
    }

    if (!contactEndpoint) {
      setFormState({
        type: 'unconfigured',
        message: 'Online messaging is not configured yet. Please email me directly.'
      });
      return;
    }

    const submission = new FormData(formElement);
    if (String(submission.get('_gotcha') ?? '').trim()) {
      setFormState({
        type: 'error',
        message: 'Message could not be sent. Please try again or contact me directly by email.'
      });
      return;
    }

    submission.set('name', trimmedName);
    submission.set('email', trimmedEmail);
    submission.set('_replyto', trimmedEmail);
    submission.set('subject', trimmedSubject);
    submission.set('_subject', trimmedSubject);
    submission.set('message', trimmedMessage);

    submissionInFlightRef.current = true;
    setFormState({ type: 'submitting', message: 'Sending your message…' });

    const requestController = new AbortController();
    const requestTimeout = window.setTimeout(() => requestController.abort(), contactRequestTimeoutMs);

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: submission,
        signal: requestController.signal
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      const result: unknown = await response.json();
      if (!isFormspreeSuccess(result)) {
        throw new Error('Formspree did not confirm the submission');
      }

      setForm({ name: '', email: '', subject: '', message: '' });
      setFormState({
        type: 'success',
        message: "Thank you! Your message has been submitted successfully. I'll get back to you soon."
      });
    } catch {
      setFormState({
        type: 'error',
        message: 'Message could not be sent. Please try again or contact me directly by email.'
      });
    } finally {
      window.clearTimeout(requestTimeout);
      submissionInFlightRef.current = false;
    }
  };

  const handleGoTop = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const architectureProject = projects[architectureProjectIndex];
  const architectureStep = architectureProject.architectureSteps[architectureStepIndex];

  return (
    <div ref={appRef} className="min-h-screen bg-[#070b14] text-slate-100">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="fixed inset-x-0 top-0 z-[100] h-1 bg-transparent" aria-hidden="true">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-sky-400 via-blue-400 to-violet-400 shadow-[0_0_24px_rgba(96,165,250,0.65)]"
        />
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(117,150,255,0.14),transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.12),transparent_34%)]" />
        <div className="grid-overlay" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070b14]/70 backdrop-blur-xl">
        <nav aria-label="Primary navigation" className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="brand-mark group flex items-center gap-3 uppercase tracking-[0.28em] text-slate-200">
            <span className="brand-monogram inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-sky-400/40 bg-sky-400/10 text-[9px] font-semibold tracking-[-0.08em] text-sky-200">
              <img
                src="/images/yash-gautam-profile.jpeg"
                alt="Yash Gautam profile photograph"
                className="h-full w-full object-cover object-[50%_30%]"
              />
            </span>
            <span className="brand-name text-[10px] text-slate-200/80 sm:text-[11px]">Yash Gautam</span>
          </a>

          <div className="nav-links hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
                className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="desktop-cta hidden lg:block">
            <a
              href="#contact"
              className="magnetic inline-flex items-center gap-2 rounded-full border border-sky-400/35 bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-100 transition hover:border-sky-300/60 hover:bg-sky-400/15"
              onMouseMove={applyMagnetic}
              onMouseLeave={resetMagnetic}
            >
              Let&apos;s connect
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <button
            id="mobile-menu-toggle"
            type="button"
            className="menu-toggle inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-200 transition hover:bg-white/10 focus-visible:outline lg:hidden"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((state) => !state)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        <div id="mobile-navigation" hidden={!mobileOpen} className="mobile-navigation border-t border-white/10 bg-[#090f18]/95 lg:hidden">
          <div className="mobile-navigation__links mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
                className="rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-sm text-slate-200"
                onClick={() => {
                  setMobileOpen(false);
                  window.requestAnimationFrame(() => {
                    document.getElementById('mobile-menu-toggle')?.focus();
                  });
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main id="main-content" className="relative z-10">
        <section id="home" className="hero-section mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
          <div className="hero-layout grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="hero-copy space-y-8">
              <div
                className="hero-kicker inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-sky-200"
              >
                <span className="status-pulse" aria-hidden="true" />
                Computer Science Engineering Student
              </div>

              <div
                className="hero-intro space-y-6"
              >
                <p className="hero-index">Independent mind. Intentional software.</p>
                <h1 className="hero-name text-[2.3rem] font-semibold leading-[0.94] tracking-[-0.08em] text-white sm:text-[4rem] lg:text-[5.2rem]">
                  YASH <span>GAUTAM</span>
                </h1>

                <h2 className="hero-headline max-w-xl text-lg font-normal leading-relaxed text-slate-300 sm:text-xl">
                  I BUILD DIGITAL EXPERIENCES THAT FEEL LIKE THE FUTURE.
                </h2>

                <p className="hero-description max-w-xl text-base leading-8 text-slate-400">
                  Computer Science Engineering Student · Full-Stack Developer · AI &amp; Agent Enthusiast.
                  I&apos;m interested in the seams between interfaces, data, and useful automation.
                </p>
              </div>

              <div
                className="hero-actions flex flex-col gap-4 sm:flex-row"
              >
                <a
                  href="#projects"
                  className="magnetic inline-flex items-center justify-center gap-2 rounded-full border border-sky-300/30 bg-gradient-to-r from-sky-400/20 to-violet-500/15 px-6 py-3 text-sm font-medium text-white transition hover:shadow-[0_0_30px_rgba(96,165,250,0.35)]"
                  onMouseMove={applyMagnetic}
                  onMouseLeave={resetMagnetic}
                >
                  Explore my work
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="#contact"
                  className="magnetic inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-slate-100 transition hover:border-slate-300/30 hover:bg-white/10"
                  onMouseMove={applyMagnetic}
                  onMouseLeave={resetMagnetic}
                >
                  Let&apos;s connect
                </a>
              </div>

              <div className="hero-meta flex flex-wrap items-center gap-4 pt-3 text-sm text-slate-400">
                <span>Mysuru, India</span>
                <span aria-hidden="true">—</span>
                <span>Curiosity, craft &amp; code</span>
              </div>
            </div>

            <div className="hero-art-wrap relative">
              <div className="hero-glow absolute -inset-y-10 -inset-x-4 rounded-[32px] bg-[radial-gradient(circle,_rgba(96,165,250,0.21),transparent_58%)] blur-3xl" aria-hidden="true" />
              <div className="hero-art" role="group" aria-label="Yash Gautam portrait in an abstract orbital illustration">
                <div className="hero-art__topline">
                  <span>Y/G — SYSTEMS IN MOTION</span>
                  <span>01 / 04</span>
                </div>
                <div className="hero-orbit">
                  <div className="hero-orbit__ring hero-orbit__ring--outer" aria-hidden="true" />
                  <div className="hero-orbit__ring hero-orbit__ring--middle" aria-hidden="true" />
                  <div className="hero-orbit__ring hero-orbit__ring--inner" aria-hidden="true" />
                  <div className="hero-orbit__core">
                    <img
                      src="/images/yash-gautam-portrait.webp"
                      alt="Portrait of Yash Gautam"
                      width="768"
                      height="1024"
                      className="hero-orbit__portrait"
                    />
                  </div>
                  <span className="hero-orbit__satellite hero-orbit__satellite--one" aria-hidden="true" />
                  <span className="hero-orbit__satellite hero-orbit__satellite--two" aria-hidden="true" />
                  <span className="hero-orbit__satellite hero-orbit__satellite--three" aria-hidden="true" />
                </div>
                <div className="hero-art__caption">
                  <span>Ideas, engineered<br />into experiences.</span>
                  <span className="hero-art__coordinates">12°18&apos;N<br />76°39&apos;E</span>
                </div>
              </div>
            </div>
          </div>
          <a className="scroll-cue" href="#about">
            <span>Scroll to explore</span>
            <ArrowDown aria-hidden="true" size={15} />
          </a>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="section-heading reveal">
            <p className="eyebrow">About</p>
            <h2 className="section-title">Building practical products with clarity.</h2>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="reveal rounded-[28px] border border-white/10 bg-white/5 p-7 shadow-soft">
              <p className="text-lg leading-8 text-slate-300">
              I&apos;m Yash Gautam, a Computer Science Engineering student at ATME College of Engineering in
              Mysuru. I&apos;m building my foundations in full-stack development while exploring practical AI
              and automation.
              </p>

              <p className="mt-6 text-lg leading-8 text-slate-300">
              I&apos;m especially drawn to problems where complex systems need a calmer, clearer interface:
              understanding the workflow, making system behavior legible, and keeping a person in control.
              The project notes below separate ideas and prototypes from verified implementations.
              </p>
            </div>

            <div className="reveal grid gap-4">
              <div className="rounded-[26px] border border-sky-400/20 bg-sky-400/5 p-5">
                <div className="flex items-center gap-3 text-sky-100">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm uppercase tracking-[0.2em]">Based in</span>
                </div>
                <p className="mt-4 text-lg text-slate-200">Mysuru, Karnataka</p>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-3 text-slate-100">
                  <BriefcaseBusiness className="h-5 w-5 text-violet-300" />
                  <span className="text-sm uppercase tracking-[0.2em]">Current focus</span>
                </div>
                <p className="mt-4 text-lg text-slate-200">
                  Full-stack product building, AI workflows, and Agent development
                </p>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-3 text-slate-100">
                  <Code2 className="h-5 w-5 text-sky-300" />
                  <span className="text-sm uppercase tracking-[0.2em]">Interest</span>
                </div>
                <p className="mt-4 text-lg text-slate-200">
                  Product engineering, UX systems, modern interfaces, AI tooling
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="section-heading reveal">
            <p className="eyebrow">Technical stack</p>
            <h2 className="section-title">Curious, practical, and always learning.</h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {skills.map((group, index) => (
              <div
                key={group.category}
                className="skill-card reveal rounded-[28px] border border-white/10 bg-white/5 p-6"
              >
                <div className="skill-disclosure">
                  <button
                    id={`skill-toggle-${index}`}
                    type="button"
                    className="skill-disclosure__toggle"
                    aria-expanded={expandedSkillCategories.has(group.category)}
                    aria-controls={`skill-items-${index}`}
                    onClick={() => toggleSkillCategory(group.category)}
                  >
                    <span className="skill-icon">
                      {group.category.includes('Frontend') ? (
                        <Code2 aria-hidden="true" size={20} />
                      ) : group.category.includes('Backend') ? (
                        <TerminalSquare aria-hidden="true" size={20} />
                      ) : group.category.includes('AI') ? (
                        <BrainCircuit aria-hidden="true" size={20} />
                      ) : (
                        <Sparkles aria-hidden="true" size={20} />
                      )}
                    </span>
                    <span className="skill-category">{group.category}</span>
                    <span className="skill-count">{String(group.items.length).padStart(2, '0')} areas</span>
                    <span className="skill-chevron" aria-hidden="true">+</span>
                  </button>
                  <div
                    id={`skill-items-${index}`}
                    className="skill-items"
                    role="region"
                    aria-labelledby={`skill-toggle-${index}`}
                    hidden={!expandedSkillCategories.has(group.category)}
                  >
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="projects-section mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="section-heading reveal">
            <p className="eyebrow">Selected explorations</p>
            <h2 className="section-title">Ideas worth taking seriously.</h2>
            <p className="section-intro">
              BrandGuard, Context-Surgeon, and NPC are summarized from public repositories; the other three entries
              are concept or prototype directions. Descriptions distinguish inspected implementation evidence from
              proposals.
            </p>
          </div>

          <div className="project-grid mt-12 grid gap-6 xl:grid-cols-2">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="reveal project-card group rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(9,13,20,0.92))] p-5 shadow-soft"
                onPointerMove={applyProjectPointer}
                onPointerLeave={resetProjectPointer}
              >
                <div className="case-visual" data-project={project.title.toLowerCase().replaceAll(' ', '-')}>
                  <div className="case-visual__top">
                    <span>FIELD NOTES&nbsp; / &nbsp;0{index + 1}</span>
                    <span className="case-status">{project.status}</span>
                  </div>
                  <div className="case-visual__art">
                    <img className="case-project-image" src={project.visualSrc} alt={project.visualAlt} />
                    {project.title === 'JARVIS' && (
                      <div className="case-art case-art--jarvis" aria-hidden="true">
                        {Array.from({ length: 17 }, (_, bar) => (
                          <span key={bar} style={{ animationDelay: `${bar * 45}ms` }} />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="case-visual__footer">
                    <span>{project.label}</span>
                    <span>Y/G</span>
                  </div>
                </div>

                <div className="case-heading">
                  <div>
                    <p className="case-number">PROJECT&nbsp; / &nbsp;0{index + 1}</p>
                    <h3>{project.title}</h3>
                    <p className="case-label">{project.label}</p>
                  </div>
                  <div className="case-repository-wrap">
                    <a
                      className="case-repository"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} repository on GitHub (opens in a new tab)`}
                    >
                      <GitBranch aria-hidden="true" size={16} />
                      <span>View Repository</span>
                      <ArrowUpRight aria-hidden="true" size={14} />
                    </a>
                  </div>
                </div>

                <details className="case-details">
                  <summary>
                    <span>Explore {project.title} case details</span>
                    <ArrowUpRight aria-hidden="true" size={17} />
                  </summary>
                  <div className="case-details__content">
                    <div className="case-copy">
                      <h4>The problem</h4>
                      <p>{project.problem}</p>
                    </div>
                    <div className="case-copy">
                      <h4>Objective</h4>
                      <p>{project.objective}</p>
                    </div>
                    <div className="case-copy">
                      <h4>{project.solutionType}</h4>
                      <p>{project.solution}</p>
                    </div>
                    <div className="case-copy">
                      <h4>Architecture</h4>
                      <p>{project.architecture}</p>
                    </div>
                    <div className="case-contribution">
                      <h4>{project.sourceInspected ? 'Repository basis' : 'Personal contribution (as described)'}</h4>
                      <p>{project.role}</p>
                    </div>
                    <div className="case-copy">
                      <h4>Challenge</h4>
                      <p>{project.challenge}</p>
                    </div>
                    <div className="case-copy">
                      <h4>Evidence available</h4>
                      <p>{project.evidence}</p>
                    </div>
                    <div className="case-tools">
                      <h4>{project.sourceInspected ? 'Verified technology stack' : 'Technologies considered'}</h4>
                      <div className="case-tags">
                        {project.technologies.map((tech) => <span key={tech}>{tech}</span>)}
                      </div>
                      <p className="case-tools__note">
                        {project.sourceInspected
                          ? 'Based on dependencies and imports in the public repository; optional components may require separate runtime configuration.'
                          : 'These are proposed or explored technologies; implementation details have not been independently reviewed.'}
                      </p>
                    </div>
                    <div className="case-copy">
                      <h4>Current implementation status</h4>
                      <p>{project.statusDetail}</p>
                    </div>
                    <div className="case-copy">
                      <h4>Future scope (proposed)</h4>
                      <p>{project.futureScope}</p>
                    </div>
                    {(project.demoUrl || project.screenshots.length > 0) && (
                      <div className="case-links">
                        {project.demoUrl && (
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            Live demo <ArrowUpRight aria-hidden="true" size={15} />
                          </a>
                        )}
                        {project.screenshots.map((screenshot) => (
                          <img key={screenshot} src={screenshot} alt={`${project.title} project screenshot`} loading="lazy" />
                        ))}
                      </div>
                    )}
                  </div>
                </details>
              </article>
            ))}
          </div>
        </section>

        <section id="architecture" className="architecture-section mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="section-heading reveal">
            <p className="eyebrow">Interactive system map</p>
            <h2 className="section-title">Follow an idea through its system.</h2>
            <p className="section-intro">
              Explore the documented workflow or repository-backed implementation for each project. Concept and
              prototype entries are labeled separately from source-verified project flows.
            </p>
          </div>

          <div className="architecture-explorer reveal">
            <div className="architecture-explorer__top">
              <div>
                <p className="architecture-explorer__eyebrow">Choose a project</p>
                <div className="architecture-projects" role="group" aria-label="Choose architecture project">
                  {projects.map((project, index) => (
                    <button
                      key={project.title}
                      type="button"
                      aria-pressed={architectureProjectIndex === index}
                      onClick={() => {
                        setArchitectureProjectIndex(index);
                        setArchitectureStepIndex(0);
                      }}
                    >
                      <span>{project.title}</span>
                      <span>{project.status}</span>
                    </button>
                  ))}
                </div>
              </div>
              <p className="architecture-concept-label">
                <span aria-hidden="true" />
                {architectureProject.sourceInspected
                  ? 'Repository-backed flow · summary of published source'
                  : 'Conceptual workflow · not an implementation diagram'}
              </p>
            </div>

            <div className="architecture-explorer__body">
              <div className="architecture-flow-wrap">
                <p className="architecture-explorer__eyebrow">Data flow · select a component</p>
                <ol
                  className="architecture-flow"
                  aria-label={`${architectureProject.title} ${architectureProject.sourceInspected ? 'repository' : 'conceptual'} data flow`}
                >
                  {architectureProject.architectureSteps.map((step, index) => (
                    <li key={step.label}>
                      <button
                        type="button"
                        aria-pressed={architectureStepIndex === index}
                        aria-controls="architecture-step-detail"
                        onClick={() => setArchitectureStepIndex(index)}
                      >
                        <span className="architecture-flow__index">{String(index + 1).padStart(2, '0')}</span>
                        <span>{step.label}</span>
                        <ArrowRight aria-hidden="true" size={16} />
                      </button>
                    </li>
                  ))}
                </ol>
              </div>

              <div id="architecture-step-detail" className="architecture-detail" aria-live="polite">
                <p className="architecture-explorer__eyebrow">
                  {architectureProject.title} / component {String(architectureStepIndex + 1).padStart(2, '0')}
                </p>
                <h3>{architectureStep.label}</h3>
                <p>{architectureStep.detail}</p>
                <div className="architecture-detail__stack">
                  <span>{architectureProject.sourceInspected ? 'Verified technologies' : 'Technologies considered'}</span>
                  <div className="case-tags">
                    {architectureStep.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                  </div>
                </div>
                <div className="architecture-decision">
                  <span>Project decision</span>
                  <p>{architectureProject.technicalDecision}</p>
                </div>
              </div>
            </div>
            <p className="architecture-explorer__note">
              Repository-backed flows summarize inspected source and do not imply measured performance. Conceptual
              flows describe proposals and do not imply that their components or integrations have been built.
            </p>
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="section-heading reveal">
            <p className="eyebrow">Education & experience</p>
            <h2 className="section-title">A foundation in progress.</h2>
            <p className="section-intro">
              My published background is a mix of formal study and self-directed product exploration.
            </p>
          </div>

          <div className="journey-list mt-12 space-y-6">
            {timeline.map((item, index) => (
              <div
                key={item.title}
                className="journey-card reveal rounded-[28px] border border-white/10 bg-white/5 p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="journey-period">
                      {index === 0 ? <GraduationCap aria-hidden="true" size={16} /> : <Sparkles aria-hidden="true" size={15} />}
                      <span>{item.period}</span>
                    </div>
                    <h3 className="mt-3 text-2xl font-medium text-white">{item.title}</h3>
                    <p className="mt-2 text-slate-400">{item.meta}</p>
                  </div>

                  <div className="journey-kind">
                    {index === 0 ? 'Education' : 'Independent practice'}
                  </div>
                </div>

                <p className="mt-5 max-w-3xl leading-8 text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="recognition" className="recognition-section mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="recognition-card">
            <div className="recognition-mark" aria-hidden="true"><BadgeCheck size={23} /></div>
            <div>
              <p className="eyebrow">Recognition</p>
              <h2 className="section-title">Substance over badges.</h2>
              <p className="section-intro">
                No awards or formal achievements have been shared for publication. Verified milestones can be
                added here as they happen.
              </p>
            </div>
            <span className="recognition-index">— / —</span>
          </div>
        </section>

        <section id="approach" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="section-heading reveal">
            <p className="eyebrow">How I work</p>
            <h2 className="section-title">Principles for building useful products.</h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {workingPrinciples.map((item) => (
              <div
                key={item.title}
                className="reveal rounded-[26px] border border-white/10 bg-white/5 p-6"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/25 bg-sky-400/10 text-sky-100">
                  <Star className="h-5 w-5 fill-sky-300 text-sky-300" />
                </div>
                <h3 className="text-xl font-medium text-white">{item.title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(145deg,rgba(26,35,52,0.84),rgba(11,15,24,0.85))] p-7 shadow-soft">
              <p className="eyebrow">Contact</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white">
                Let&apos;s build something meaningful.
              </h2>

              <div className="mt-7 space-y-5 text-slate-300">
                {socialLinks.map((link) => {
                  const isExternal = link.href.startsWith('http');
                  const icon =
                    link.label === 'GitHub' ? (
                      <GitBranch className="h-5 w-5 text-sky-300" />
                    ) : link.label === 'LinkedIn' ? (
                      <BadgeCheck className="h-5 w-5 text-sky-300" />
                    ) : (
                      <Mail className="h-5 w-5 text-sky-300" />
                    );

                  const content = (
                    <>
                      {icon}
                      <span>{link.label}</span>
                      {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
                    </>
                  );

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      aria-label={
                        link.label === 'Email'
                          ? 'Email Yash Gautam'
                          : `Visit Yash Gautam on ${link.label} (opens in a new tab)`
                      }
                      className="flex items-center gap-3 transition hover:text-sky-200"
                    >
                      {content}
                    </a>
                  );
                })}
              </div>

              <p className="mt-7 text-base leading-7 text-slate-400">
                You can find me on GitHub and LinkedIn, or email me directly.
              </p>
            </div>

            <form
              noValidate
              onSubmit={handleSubmit}
              className="rounded-[30px] border border-white/10 bg-white/5 p-7 shadow-soft"
            >
              <div className="grid gap-5">
                {!contactEndpoint && (
                  <p className="text-sm leading-6 text-slate-300" role="status">
                    Contact form is temporarily unavailable.{' '}
                    <a className="text-sky-200 underline underline-offset-4" href="mailto:yashgautam1205@gmail.com">
                      Please email me directly.
                    </a>
                  </p>
                )}

                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  hidden
                />

                <label className="block">
                  <span className="mb-2 block text-sm uppercase tracking-[0.18em] text-slate-400">Full Name</span>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    maxLength={100}
                    required
                    value={form.name}
                    disabled={formState.type === 'submitting'}
                    aria-invalid={formState.type === 'validation' && formState.invalidField === 'name'}
                    aria-describedby={
                      formState.type === 'validation' && formState.invalidField === 'name'
                        ? 'contact-form-feedback'
                        : undefined
                    }
                    onChange={(event) => handleFieldChange('name', event.target.value)}
                    placeholder="Your name"
                    className="input-field"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm uppercase tracking-[0.18em] text-slate-400">Email Address</span>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    value={form.email}
                    disabled={formState.type === 'submitting'}
                    aria-invalid={formState.type === 'validation' && formState.invalidField === 'email'}
                    aria-describedby={
                      formState.type === 'validation' && formState.invalidField === 'email'
                        ? 'contact-form-feedback'
                        : undefined
                    }
                    onChange={(event) => handleFieldChange('email', event.target.value)}
                    placeholder="you@example.com"
                    className="input-field"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm uppercase tracking-[0.18em] text-slate-400">Subject</span>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    autoComplete="off"
                    maxLength={150}
                    required
                    value={form.subject}
                    disabled={formState.type === 'submitting'}
                    aria-invalid={formState.type === 'validation' && formState.invalidField === 'subject'}
                    aria-describedby={
                      formState.type === 'validation' && formState.invalidField === 'subject'
                        ? 'contact-form-feedback'
                        : undefined
                    }
                    onChange={(event) => handleFieldChange('subject', event.target.value)}
                    placeholder="What would you like to discuss?"
                    className="input-field"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm uppercase tracking-[0.18em] text-slate-400">Message</span>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    maxLength={5000}
                    required
                    value={form.message}
                    disabled={formState.type === 'submitting'}
                    aria-invalid={formState.type === 'validation' && formState.invalidField === 'message'}
                    aria-describedby={
                      formState.type === 'validation' && formState.invalidField === 'message'
                        ? 'contact-form-feedback'
                        : undefined
                    }
                    onChange={(event) => handleFieldChange('message', event.target.value)}
                    placeholder="Tell me about your idea, project, or opportunity..."
                    className="input-field min-h-[150px] resize-y"
                  />
                </label>

                {formState.message && (
                  <div
                    id="contact-form-feedback"
                    className={`rounded-2xl border px-4 py-3 text-sm ${
                      formState.type === 'success'
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                        : formState.type === 'error' || formState.type === 'validation'
                          ? 'border-red-500/30 bg-red-500/10 text-red-200'
                          : 'border-sky-500/30 bg-sky-500/10 text-sky-100'
                    }`}
                    role={
                      formState.type === 'error' || formState.type === 'validation' || formState.type === 'unconfigured'
                        ? 'alert'
                        : 'status'
                    }
                    aria-live={
                      formState.type === 'error' || formState.type === 'validation' || formState.type === 'unconfigured'
                        ? 'assertive'
                        : 'polite'
                    }
                    aria-busy={formState.type === 'submitting'}
                  >
                    {formState.message}
                    {formState.type === 'error' && (
                      <>
                        {' '}
                        <a className="underline underline-offset-4" href="mailto:yashgautam1205@gmail.com">
                          Email me directly
                        </a>
                      </>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState.type === 'submitting'}
                  aria-busy={formState.type === 'submitting'}
                  className="magnetic inline-flex items-center justify-center gap-2 rounded-full border border-sky-300/25 bg-gradient-to-r from-sky-400/20 to-violet-500/15 px-5 py-3 text-sm font-medium text-white"
                  onMouseMove={applyMagnetic}
                  onMouseLeave={resetMagnetic}
                >
                  {formState.type === 'submitting'
                    ? 'Sending…'
                    : formState.type === 'error'
                      ? 'Try again'
                      : 'Send message'}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#070b14]/80">
        <div className="footer-inner mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="footer-main">
            <a href="#home" className="footer-identity">
              <span className="brand-monogram">Y</span>
              <span>
                <strong>Yash Gautam</strong>
                <small>Full-stack · AI · Agent</small>
              </span>
            </a>
            <div className="footer-links">
              <a href="#projects">Selected work <ArrowUpRight aria-hidden="true" size={14} /></a>
              <a href="#contact">Get in touch <ArrowUpRight aria-hidden="true" size={14} /></a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {currentYear} Yash Gautam</p>
            <p>Made with curiosity, care &amp; clean code.</p>
            <button type="button" aria-label="Back to top" onClick={handleGoTop}>
              Back to top <ArrowUp aria-hidden="true" size={14} />
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
