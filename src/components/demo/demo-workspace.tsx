import { useCallback, useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { PhoneFrame } from './phone-frame';
import { OnboardingCharacter, ThemeSelector, SplashScreen } from './selectors';
import { ChatScreen, NotesScreen, PlansScreen, ProfileScreen, BottomNavigation } from './app-screens';
import { demoReply, toggleDemoTask, type DemoTheme, type DemoTab, type DemoMessage, type DemoNote, type DemoTask, type Scenario } from '@/lib/demo-state';

type Stage = 'character' | 'theme' | 'splash' | 'app';
export function DemoWorkspace() {
  const [stage, setStage] = useState<Stage>('character');
  const [personalizing, setPersonalizing] = useState(false);
  const [character, setCharacter] = useState(0);
  const [theme, setTheme] = useState<DemoTheme>('light');
  const [tab, setTab] = useState<DemoTab>('chat');
  const [scenario, setScenario] = useState<Scenario>(null);
  const [messages, setMessages] = useState<DemoMessage[]>([{ id: 0, role: 'assistant', text: 'Привет! Я рядом. Можем записать мысли, разобрать планы или просто поговорить. Что у тебя сейчас на уме?' }]);
  const [notes, setNotes] = useState<DemoNote[]>([
    { id: 1, title: 'Не нужно успевать всё', text: 'После прогулки мысли становятся яснее. Хочу чаще оставлять время без планов.', date: 'Сегодня' },
    { id: 2, title: 'Маленькое открытие', text: 'Когда записываю то, что беспокоит, становится легче увидеть следующий шаг.', date: 'Вчера' },
    { id: 3, title: 'Что даёт мне силы', text: 'Тёплый чай, разговор с другом и полчаса на любимую книгу.', date: '26 октября' },
  ]);
  const [tasks, setTasks] = useState<DemoTask[]>([
    { id: 1, title: 'Прогуляться без телефона', due: 'Сегодня', done: false },
    { id: 2, title: 'Записать три хороших момента', due: 'Сегодня вечером', done: false },
    { id: 3, title: 'Выделить время для себя', due: 'Завтра', done: false },
    { id: 4, title: 'Сделать небольшой перерыв', due: 'Сегодня', done: true },
  ]);
  const enterApp = useCallback(() => setStage('app'), []);
  const send = (text: string) => { const id = Date.now(); setMessages(previous => [...previous, { id, role: 'user', text }, { id: id + 1, role: 'assistant', text: demoReply(text, scenario) }]); };
  const startScenario = (next: Scenario) => { setScenario(next); const text = next === 'thought' ? 'Записать мысль' : next === 'plans' ? 'Разобрать планы' : 'Поговорить о себе'; const answer = next === 'thought' ? 'Что хочется сохранить? Расскажи мысль своими словами — без необходимости формулировать идеально.' : next === 'plans' ? 'Какой план сейчас занимает твои мысли? Давай найдём первый посильный шаг.' : 'Давай начнём с тебя. Как ты себя чувствуешь сегодня?'; const id = Date.now(); setMessages(previous => [...previous, { id, role: 'user', text }, { id: id + 1, role: 'assistant', text: answer }]); };
  return <main className="demo-page">
    <header className="demo-page-nav"><Button asChild variant="ghost"><Link to="/"><ArrowLeft/>На сайт</Link></Button><Link to="/" className="font-display text-sm">Riadom</Link><Button variant="ghost" size="icon" onClick={() => { setPersonalizing(false); setStage('character'); }} aria-label="Повторить знакомство" title="Повторить знакомство"><RotateCcw/></Button></header>
    <div className="demo-page-intro"><span>РЯДОМ · ПЕРСОНАЛЬНОЕ ПРОСТРАНСТВО</span><h1>Познакомься с Рядом</h1><p>Выбери своего спутника, настрой пространство и попробуй, как личный AI-компаньон помогает сохранять мысли и двигаться вперёд.</p></div>
    <PhoneFrame theme={theme}>
      {stage === 'character' && <OnboardingCharacter selected={character} onSelect={setCharacter} onContinue={() => setStage(personalizing ? 'app' : 'theme')} onBack={personalizing ? enterApp : undefined}/>}
      {stage === 'theme' && <ThemeSelector theme={theme} onSelect={setTheme} onContinue={() => setStage(personalizing ? 'app' : 'splash')} onBack={() => setStage(personalizing ? 'app' : 'character')}/>}
      {stage === 'splash' && <SplashScreen onDone={enterApp}/>}
      {stage === 'app' && <div className="demo-app">
        {tab === 'chat' && <ChatScreen character={character} messages={messages} onSend={send} onScenario={startScenario}/>}
        {tab === 'notes' && <NotesScreen notes={notes} onAdd={(title, text) => setNotes(previous => [{ id: Date.now(), title, text, date: 'Только что' }, ...previous])}/>}
        {tab === 'plans' && <PlansScreen tasks={tasks} onAdd={(title, due) => setTasks(previous => [...previous, { id: Date.now(), title, due, done: false }])} onToggle={id => setTasks(previous => toggleDemoTask(previous, id))}/>}
        {tab === 'profile' && <ProfileScreen character={character} theme={theme} completed={tasks.filter(t => t.done).length} notesCount={notes.length} onCharacter={() => { setPersonalizing(true); setStage('character'); }} onTheme={() => { setPersonalizing(true); setStage('theme'); }}/>}
        <BottomNavigation active={tab} onSelect={setTab}/>
      </div>}
    </PhoneFrame>
    <footer className="demo-page-footer">Рядом с тобой. В твоём ритме.</footer>
  </main>;
}