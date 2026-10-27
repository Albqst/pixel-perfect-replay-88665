import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, type ReactNode } from "react";
import { AppStoreGlyph } from "@/components/app-store-glyph";
import { cn } from "@/lib/utils";
import girl from "@/assets/girl.png.asset.json";
import guy from "@/assets/guy.png.asset.json";
import talk from "@/assets/talk.png.asset.json";
import room from "@/assets/room.png.asset.json";
import sun from "@/assets/sun.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Riadom — ИИ-компаньон для поддержки и самопознания" },
      {
        name: "description",
        content:
          "Riadom помогает лучше понимать себя, разбираться в чувствах и находить собственные ответы.",
      },
      { property: "og:title", content: "Riadom — ИИ-компаньон рядом с тобой" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:description",
        content: "Говори о важном, узнавай себя глубже и возвращайся к своим мыслям.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      ctx = mm;
      mm.add(
        {
          desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (c) => {
          const { desktop } = c.conditions as { desktop: boolean };
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: "#hero",
              start: "top top",
              end: desktop ? "+=140%" : "+=80%",
              scrub: 0.6,
              pin: true,
            },
          });
          tl.from(".hero-title", { scale: 0.92, duration: 0.3 }, 0)
            .to(".hero-girl", { xPercent: desktop ? -45 : -20, yPercent: desktop ? 0 : -15, scale: 1.25, rotate: -4, duration: 1 }, 0)
            .to(".hero-guy", { xPercent: desktop ? 45 : 20, yPercent: desktop ? 0 : 15, scale: 1.25, rotate: 4, duration: 1 }, 0)
            .to(".hero-title", { scale: desktop ? 1.35 : 1.15, duration: 0.7 }, 0.3)
            .to([".hero-girl", ".hero-guy"], { opacity: 0, duration: 0.35 }, 0.65)
            .to(".hero-copy", { opacity: 0, y: -80, duration: 0.3 }, 0.75)
            .fromTo(".hero-next", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3 }, 0.8);

          gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
            gsap.fromTo(
              el,
              { y: 70, opacity: 0 },
              { y: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 92%", end: "top 55%", scrub: true } },
            );
          });
          gsap.utils.toArray<HTMLElement>(".tilt").forEach((el) => {
            gsap.fromTo(
              el,
              { rotate: Number(el.dataset["r"] ?? 4) },
              { rotate: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "center center", scrub: true } },
            );
          });
        },
      );
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={root} className="overflow-x-clip">
      <Nav />
      <section id="hero" className="relative h-svh overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--secondary),var(--background)_70%)]" />
        <div className="relative mx-auto grid h-full max-w-7xl grid-rows-[auto_1fr_auto] items-center gap-4 px-5 pt-20 pb-6 md:grid-cols-[1fr_1.3fr_1fr] md:grid-rows-1 md:gap-6 md:pt-16">
          <figure className="hero-girl mx-auto w-40 sm:w-52 md:w-full md:max-w-sm">
            <img src={girl.url} alt="Девушка в кресле с дневником" className="aspect-square w-full rounded-[2rem] object-cover glow-coral" />
          </figure>
          <div className="hero-copy relative z-10 text-center">
            <h1 className="hero-title font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-7xl">
              Открой <br />
              <span className="text-gradient">возможности</span>
            </h1>
            <p className="mx-auto mt-6 max-w-md text-base text-muted-foreground md:text-lg">
              Лучше понимай себя. Разбирайся в своих чувствах. Находи собственные ответы.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild className="h-auto rounded-full bg-foreground px-7 py-3.5 font-semibold text-background hover:bg-foreground/90"><a href="#about">Познакомиться с Riadom</a></Button>
              <Button asChild variant="outline" className="glass h-auto rounded-full px-6 py-3.5 font-semibold"><Link to="/chat"><MessageCircle />Чат</Link></Button>
            </div>
          </div>
          <figure className="hero-guy mx-auto w-40 sm:w-52 md:w-full md:max-w-sm">
            <img src={guy.url} alt="Парень в кресле с блокнотом" className="aspect-square w-full rounded-[2rem] object-cover glow-violet" />
          </figure>
        </div>
        <div className="hero-next pointer-events-none absolute inset-x-0 bottom-[30%] text-center opacity-0">
          <p className="font-display text-2xl md:text-4xl">Riadom — рядом, когда нужно</p>
          <p className="mt-3 text-muted-foreground">Листай дальше ↓</p>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-4xl px-5 py-28 text-center md:py-40">
        <p className="reveal text-sm tracking-[0.3em] text-primary uppercase">О приложении</p>
        <h2 className="reveal mt-6 font-display text-3xl leading-tight md:text-5xl">
          Пространство, где можно спокойно подумать вслух
        </h2>
        <p className="reveal mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Riadom — ИИ-собеседник для эмоциональной поддержки и самопознания. Он помогает
          проговорить переживания, заметить закономерности и сделать следующий небольшой шаг.
        </p>
      </section>

      <div id="features">
        <Feature n="01" title="Говори о важном" text="Пиши как есть — Riadom выслушает, задаст уточняющие вопросы и поможет разложить мысли по полочкам." phone={<ChatScreen />} />
        <Feature n="02" title="Узнавай себя глубже" text="Отслеживай настроение, привычки и особенности, которые проявляются в ваших разговорах." phone={<InsightsScreen />} reverse />
        <Feature n="03" title="Твои мысли имеют значение" text="Сохраняй заметки и наблюдения, чтобы возвращаться к ним, когда захочется вспомнить, что помогло." phone={<JournalScreen />} image={room.url} />
      </div>

      <section id="how" className="mx-auto max-w-7xl px-5 py-28 md:py-40">
        <p className="reveal text-sm tracking-[0.3em] text-primary uppercase">04 · Как это работает</p>
        <h2 className="reveal mt-4 max-w-2xl font-display text-3xl md:text-5xl">Поддержка, когда она нужна</h2>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Выговориться", "после сложного дня", "Сегодня всё навалилось сразу, хочу просто рассказать."],
            ["Разобраться", "в переживаниях", "Не понимаю, почему меня так задел этот разговор."],
            ["Сформулировать", "проблему", "Кажется, дело не в работе, а в чём-то другом."],
            ["Найти шаг", "небольшой и следующий", "Что я могу сделать уже сегодня вечером?"],
          ].map(([a, b, msg], i) => (
            <div key={a} data-r={i % 2 ? 3 : -3} className="tilt reveal glass rounded-3xl p-6">
              <p className="font-display text-xl">{a}</p>
              <p className="text-muted-foreground">{b}</p>
              <div className="mt-8 rounded-2xl rounded-br-sm bg-gradient-accent p-4 text-sm text-primary-foreground">{msg}</div>
              <div className="mt-3 w-4/5 rounded-2xl rounded-bl-sm bg-secondary p-4 text-sm text-muted-foreground">
                Я рядом. Давай начнём с того, что ты чувствуешь прямо сейчас.
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="start" className="relative mx-auto max-w-7xl px-5 pb-28">
        <div className="reveal glass relative grid items-center gap-10 overflow-hidden rounded-[2.5rem] p-8 md:grid-cols-2 md:p-14">
          <div>
            <h2 className="font-display text-3xl md:text-5xl">Начни разговор с собой</h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Riadom не заменяет специалиста, но помогает услышать себя — в любое время.
            </p>
            <a href="#hero" className="mt-8 inline-flex rounded-full bg-gradient-accent px-7 py-3.5 text-sm font-semibold text-primary-foreground">
              Начать
            </a>
          </div>
          <img src={talk.url} alt="Двое беседуют в креслах" loading="lazy" className="w-full rounded-3xl" />
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5">
          <AppStoreBadge size="lg" className="glow-violet" />
          <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
            <Logo />
            <span>© 2026 Riadom</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const APP_STORE_URL = "https://apps.apple.com/app/riadom";

function Logo() {
  return (
    <a href="#hero" className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
      <img src={sun.url} alt="" className="h-8 w-8 rounded-full object-cover" /> Riadom
    </a>
  );
}

function AppStoreBadge({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const isSm = size === "sm";
  const isLg = size === "lg";
  return (
    <a
      href={APP_STORE_URL}
      aria-label="Скачать в App Store"
      className={cn(
        "glass group inline-flex shrink-0 items-center rounded-2xl transition hover:scale-[1.03] hover:ring-1 hover:ring-primary/50",
        isSm ? "gap-2 px-3 py-1.5" : isLg ? "gap-4 px-7 py-4" : "gap-3 px-4 py-2",
        className,
      )}
    >
      <AppStoreGlyph
        className={cn("text-foreground transition group-hover:text-primary", isSm ? "h-4 w-4" : isLg ? "h-9 w-9" : "h-5 w-5")}
      />
      <span className={cn("text-left leading-none", isSm && "hidden sm:block")}>
        <span className={cn("block text-muted-foreground", isSm ? "text-[8px]" : isLg ? "text-sm" : "text-[9px]")}>Скачать в</span>
        <span className={cn("block font-display font-semibold tracking-tight text-foreground", isSm ? "mt-1 text-xs" : isLg ? "mt-2 text-2xl" : "mt-1 text-sm")}>
          App&nbsp;Store
        </span>
      </span>
    </a>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="glass mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 md:mx-5 lg:mx-auto">
        <Logo />
        <div className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#about" className="hover:text-foreground">О приложении</a>
          <a href="#features" className="hover:text-foreground">Возможности</a>
          <a href="#how" className="hover:text-foreground">Как это работает</a>
        </div>
        <div className="flex items-center gap-2">
          <AppStoreBadge size="sm" />
          <a href="#start" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Начать</a>
        </div>
      </nav>
    </header>
  );
}

function Feature({ n, title, text, phone, reverse, image }: { n: string; title: string; text: string; phone: ReactNode; reverse?: boolean; image?: string }) {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:grid-cols-2 md:py-32">
      <div className={reverse ? "md:order-2" : ""}>
        <p className="reveal font-display text-6xl text-gradient md:text-8xl">{n}</p>
        <h2 className="reveal mt-4 font-display text-3xl md:text-5xl">{title}</h2>
        <p className="reveal mt-5 max-w-md text-lg text-muted-foreground">{text}</p>
        {image && <img src={image} alt="Девушка в уютной комнате" loading="lazy" className="reveal mt-10 w-56 rounded-3xl glow-coral" />}
      </div>
      <div className="flex justify-center">
        <div data-r={reverse ? -6 : 6} className="tilt reveal w-[290px] rounded-[2.8rem] border border-border bg-card p-3 shadow-2xl glow-violet">
          <div className="h-[560px] overflow-hidden rounded-[2.2rem] bg-background p-5">{phone}</div>
        </div>
      </div>
    </section>
  );
}

function ScreenHead({ t }: { t: string }) {
  return (
    <div className="mb-5 flex items-center justify-between text-sm">
      <span className="font-display">{t}</span>
      <span className="h-2 w-2 rounded-full bg-primary" />
    </div>
  );
}

function ChatScreen() {
  return (
    <div className="flex h-full flex-col text-sm">
      <ScreenHead t="Riadom" />
      <div className="flex-1 space-y-3">
        <p className="w-4/5 rounded-2xl rounded-bl-sm bg-secondary p-3">Привет. Как прошёл твой день?</p>
        <p className="ml-auto w-4/5 rounded-2xl rounded-br-sm bg-gradient-accent p-3 text-primary-foreground">Устал. Чувствую, что ничего не успеваю.</p>
        <p className="w-4/5 rounded-2xl rounded-bl-sm bg-secondary p-3">Похоже, было много задач. Что из них забрало больше всего сил?</p>
        <p className="ml-auto w-3/5 rounded-2xl rounded-br-sm bg-gradient-accent p-3 text-primary-foreground">Наверное, встреча утром.</p>
      </div>
      <div className="glass flex items-center justify-between rounded-full px-4 py-3 text-muted-foreground">
        Напиши, что чувствуешь… <span className="text-primary">➤</span>
      </div>
    </div>
  );
}

function InsightsScreen() {
  const bars = [40, 65, 50, 80, 55, 70, 90];
  return (
    <div className="space-y-4 text-sm">
      <ScreenHead t="Мои наблюдения" />
      <div className="glass rounded-2xl p-4">
        <p className="text-muted-foreground">Настроение за неделю</p>
        <div className="mt-4 flex h-24 items-end gap-2">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-full bg-gradient-accent" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      {[["Спокойствие", 70], ["Энергия", 45], ["Тревожность", 30]].map(([l, v]) => (
        <div key={l} className="glass rounded-2xl p-4">
          <div className="flex justify-between"><span>{l}</span><span className="text-muted-foreground">{v}%</span></div>
          <div className="mt-2 h-1.5 rounded-full bg-secondary"><div className="h-full rounded-full bg-sky" style={{ width: `${v}%` }} /></div>
        </div>
      ))}
      <div className="rounded-2xl bg-accent/20 p-4 text-accent-foreground">Ты чаще чувствуешь себя лучше после прогулок.</div>
    </div>
  );
}

function JournalScreen() {
  return (
    <div className="space-y-3 text-sm">
      <ScreenHead t="Дневник" />
      {[
        ["Сегодня", "Заметил, что легче, когда говорю о том, что беспокоит, сразу."],
        ["Вчера", "Мысль на запомнить: я не обязан всё решать в одиночку."],
        ["12 окт", "Что помогло: короткий перерыв и стакан воды."],
      ].map(([d, t]) => (
        <div key={d} className="glass rounded-2xl p-4">
          <p className="text-xs text-primary">{d}</p>
          <p className="mt-1">{t}</p>
        </div>
      ))}
      <div className="rounded-2xl border border-dashed border-border p-4 text-center text-muted-foreground">+ Новая заметка</div>
    </div>
  );
}
