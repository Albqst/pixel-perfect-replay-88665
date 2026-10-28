import { useEffect, useState, type ReactNode } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ChevronLeft, ChevronRight, Check, Sparkles, MessageCircle, NotebookPen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { characters, themes, type DemoTheme } from '@/lib/demo-state';

function Carousel({ count, initial, onSelect, children }: { count: number; initial: number; onSelect: (index: number) => void; children: ReactNode }) {
  const [ref, api] = useEmblaCarousel({ startIndex: initial, loop: true });
  const [index, setIndex] = useState(initial);
  useEffect(() => {
    if (!api) return;
    const select = () => { const current = api.selectedScrollSnap(); setIndex(current); onSelect(current); };
    api.on('select', select);
    return () => { api.off('select', select); };
  }, [api, onSelect]);
  return <div className="demo-carousel">
    <div className="overflow-hidden" ref={ref}><div className="flex touch-pan-y">{children}</div></div>
    <div className="mt-4 flex items-center justify-center gap-5">
      <Button variant="ghost" size="icon-sm" onClick={() => api?.scrollPrev()} aria-label="Предыдущий вариант" title="Предыдущий вариант"><ChevronLeft/></Button>
      {count > 5 ? <span className="text-xs text-muted-foreground tabular-nums" aria-live="polite">{index + 1} / {count}</span> : <div className="flex gap-2">{Array.from({ length: count }, (_, i) => <Button key={i} variant="ghost" className={`demo-dot ${index === i ? 'is-selected' : ''}`} onClick={() => api?.scrollTo(i)} aria-label={`Вариант ${i + 1}`} aria-pressed={index === i}/>)}</div>}
      <Button variant="ghost" size="icon-sm" onClick={() => api?.scrollNext()} aria-label="Следующий вариант" title="Следующий вариант"><ChevronRight/></Button>
    </div>
  </div>;
}

export function OnboardingCharacter({ selected, onSelect, onContinue, onBack }: { selected: number; onSelect: (index: number) => void; onContinue: () => void; onBack?: (() => void) | undefined }) {
  return <section className="demo-onboarding demo-enter">
    <div className="demo-step"><Button variant="ghost" size="icon-sm" disabled={!onBack} onClick={onBack} aria-label="Назад"><ArrowLeft/></Button><span>ТВОЙ СПУТНИК</span><span>01 / 02</span></div>
    <h2>Выбери того,<br/>кто будет рядом</h2><p className="demo-subtitle">Твой спутник для мыслей, идей и маленьких шагов вперёд.</p>
    <Carousel count={characters.length} initial={selected} onSelect={onSelect}>
      {characters.map((character, i) => <div className="demo-slide" key={character.name}>
        <figure className={`character-portrait ${selected === i ? 'is-selected' : ''}`}><img src={character.image} alt={character.name} className={character.uploaded ? 'object-contain!' : ''}/><span className="character-check"><Check size={14}/></span></figure>
        <h3>{character.name}</h3><p className="demo-trait">{character.trait}</p><p className="demo-character-description">{character.description}</p>
      </div>)}
    </Carousel>
    <Button className="demo-primary" onClick={onContinue}>Выбрать <span>{characters[selected]?.name}</span><ChevronRight/></Button>
  </section>;
}

export function ThemeSelector({ theme, onSelect, onContinue, onBack }: { theme: DemoTheme; onSelect: (theme: DemoTheme) => void; onContinue: () => void; onBack: () => void }) {
  return <section className="demo-onboarding demo-enter">
    <div className="demo-step"><Button variant="ghost" size="icon-sm" onClick={onBack} aria-label="Назад"><ArrowLeft/></Button><span>ТВОЁ ПРОСТРАНСТВО</span><span>02 / 02</span></div>
    <h2>Выбери своё<br/>пространство</h2><p className="demo-subtitle">Настрой приложение под себя.</p>
    <Carousel count={themes.length} initial={themes.findIndex(t => t.id === theme)} onSelect={index => { const next = themes[index]; if (next) onSelect(next.id); }}>
      {themes.map(item => <div key={item.id} className="demo-slide">
        <div className={`theme-preview demo-theme-${item.id}`}><div className="flex items-center justify-between"><strong>рядом</strong><Sparkles size={18}/></div><p className="mt-5 text-xs text-muted-foreground">Время для твоих мыслей</p><div className="preview-bubble">Привет! Как ты сегодня?</div><div className="preview-bubble preview-user">Хочу немного замедлиться.</div><div className="preview-note"><NotebookPen size={16}/><span>Маленькие открытия<br/><small>Сегодня, 9:41</small></span></div><div className="mt-6 flex justify-center gap-10"><MessageCircle size={18}/><NotebookPen size={18}/></div></div>
        <h3>{item.name}</h3><p className="demo-character-description">{item.description}</p>
      </div>)}
    </Carousel>
    <Button className="demo-primary" onClick={onContinue}>Продолжить<ChevronRight/></Button>
  </section>;
}

export function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => { const timeout = window.setTimeout(onDone, 1100); return () => window.clearTimeout(timeout); }, [onDone]);
  return <div className="demo-splash demo-enter"><div className="demo-symbol"><Sparkles size={32}/></div><h2>рядом</h2><p>заметки осмысляющие тебя</p></div>;
}