import { useState } from 'react';
import { Check, ChevronRight, MessageCircle, NotebookPen, Plus, Send, UserRound, ListChecks, Palette, Users, Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Conversation, ConversationContent } from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import { PromptInput, PromptInputTextarea, PromptInputSubmit } from '@/components/ai-elements/prompt-input';
import { characters, themes, type DemoTheme, type DemoTab, type DemoMessage, type DemoNote, type DemoTask, type Scenario } from '@/lib/demo-state';

export function ChatScreen({ character, messages, onSend, onScenario }: { character: number; messages: DemoMessage[]; onSend: (text: string) => void; onScenario: (scenario: Scenario) => void }) {
  const [draft, setDraft] = useState('');
  const companion = characters[character] ?? characters[0];
  return <section className="demo-chat demo-enter">
    <header className="demo-chat-header"><div><h2>рядом</h2><p>{companion?.name} · твой спутник</p></div><img src={companion?.image} alt={companion?.name}/></header>
    <Conversation className="min-h-0 flex-1"><ConversationContent className="demo-transcript">
      <div className="demo-chat-label"><Sparkles size={12}/>Демонстрационный диалог</div>
      {messages.map(message => <Message key={message.id} from={message.role} className="demo-message demo-enter"><MessageContent>{message.text}</MessageContent></Message>)}
    </ConversationContent></Conversation>
    <div className="demo-chat-actions">{([['thought', 'Записать мысль'], ['plans', 'Разобрать планы'], ['self', 'Поговорить о себе']] as const).map(([scenario, text]) => <Button variant="outline" key={scenario} onClick={() => onScenario(scenario)}>{text}</Button>)}</div>
    <div className="demo-composer"><PromptInput onSubmit={({ text }) => { if (!text.trim()) return; onSend(text); setDraft(''); }}>
      <PromptInputTextarea aria-label="Сообщение" placeholder="Что у тебя на уме?" value={draft} onChange={event => setDraft(event.target.value)} className="min-h-10 text-sm"/>
      <PromptInputSubmit aria-label="Отправить сообщение" title="Отправить сообщение" disabled={!draft.trim()} className="demo-send"><Send size={17}/></PromptInputSubmit>
    </PromptInput></div>
  </section>;
}

export function NotesScreen({ notes, onAdd }: { notes: DemoNote[]; onAdd: (title: string, text: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(''); const [text, setText] = useState('');
  return <section className="demo-section demo-enter"><div className="demo-section-heading"><div><p>СОХРАНИТЬ ВАЖНОЕ</p><h2>Заметки</h2></div><Button size="icon" onClick={() => setEditing(true)} aria-label="Создать заметку" title="Создать заметку"><Plus/></Button></div>
    {editing ? <form className="demo-editor" onSubmit={event => { event.preventDefault(); if (!title.trim() || !text.trim()) return; onAdd(title.trim(), text.trim()); setTitle(''); setText(''); setEditing(false); }}><Button variant="ghost" size="icon-sm" onClick={() => setEditing(false)} type="button" aria-label="Отменить заметку"><ArrowLeft/></Button><input aria-label="Название заметки" placeholder="Название" value={title} onChange={e => setTitle(e.target.value)} required maxLength={100}/><textarea aria-label="Текст заметки" placeholder="О чём хочется помнить?" value={text} onChange={e => setText(e.target.value)} required maxLength={3000}/><Button className="demo-primary" type="submit">Сохранить заметку</Button></form> : <div className="demo-list">{notes.map(note => <article key={note.id} className="demo-note"><div className="flex items-center justify-between"><NotebookPen size={17}/><time>{note.date}</time></div><h3>{note.title}</h3><p>{note.text}</p></article>)}</div>}
  </section>;
}

export function PlansScreen({ tasks, onAdd, onToggle }: { tasks: DemoTask[]; onAdd: (title: string, due: string) => void; onToggle: (id: number) => void }) {
  const [adding, setAdding] = useState(false); const [title, setTitle] = useState(''); const [due, setDue] = useState('');
  const completed = tasks.filter(t => t.done).length;
  return <section className="demo-section demo-enter"><div className="demo-section-heading"><div><p>ШАГ ЗА ШАГОМ</p><h2>Планы</h2></div><Button size="icon" onClick={() => setAdding(true)} aria-label="Добавить задачу" title="Добавить задачу"><Plus/></Button></div>
    <div className="demo-progress"><Sparkles size={18}/><span>{completed} из {tasks.length} шагов сделано</span><progress value={completed} max={tasks.length || 1}/></div>
    {adding && <form className="demo-editor" onSubmit={event => { event.preventDefault(); if (!title.trim()) return; onAdd(title.trim(), due); setTitle(''); setDue(''); setAdding(false); }}><input aria-label="Название задачи" value={title} onChange={e => setTitle(e.target.value)} placeholder="Небольшой следующий шаг" required maxLength={150}/><label className="text-xs">Срок<input aria-label="Срок задачи" type="date" value={due} onChange={e => setDue(e.target.value)}/></label><div className="flex gap-2"><Button type="submit">Добавить</Button><Button variant="ghost" type="button" onClick={() => setAdding(false)}>Отмена</Button></div></form>}
    <div className="demo-list">{tasks.map(task => <label className={`demo-task ${task.done ? 'is-done' : ''}`} key={task.id}><input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} aria-label={task.title}/><span className="demo-task-check">{task.done && <Check size={14}/>}</span><span><strong>{task.title}</strong><small>{task.done ? 'Выполнено' : task.due || 'Без срока'}</small></span></label>)}</div>
  </section>;
}

export function ProfileScreen({ character, theme, completed, notesCount, onCharacter, onTheme }: { character: number; theme: DemoTheme; completed: number; notesCount: number; onCharacter: () => void; onTheme: () => void }) {
  const companion = characters[character] ?? characters[0];
  return <section className="demo-section demo-enter"><div className="demo-section-heading"><div><p>В СВОЁМ РИТМЕ</p><h2>Моё пространство</h2></div></div><div className="demo-profile"><div className="demo-profile-avatar"><UserRound size={30}/></div><h3>Это ты</h3><p>Здесь можно быть собой</p></div><div className="demo-stats"><div><strong>{notesCount}</strong><span>заметок</span></div><div><strong>{completed}</strong><span>шагов сделано</span></div></div><h3 className="demo-settings-heading">Мой Рядом</h3><Button className="demo-setting" variant="ghost" onClick={onCharacter}><Users/><span>Мой спутник<small>{companion?.name}</small></span><img src={companion?.image} alt=""/><ChevronRight/></Button><Button className="demo-setting" variant="ghost" onClick={onTheme}><Palette/><span>Моё оформление<small>{themes.find(t => t.id === theme)?.name}</small></span><ChevronRight/></Button><p className="demo-profile-footer">Маленькие шаги тоже имеют значение.</p></section>;
}

export function BottomNavigation({ active, onSelect }: { active: DemoTab; onSelect: (tab: DemoTab) => void }) {
  return <nav className="demo-bottom-nav" aria-label="Разделы приложения">{([{ id: 'chat', text: 'Чат', icon: MessageCircle }, { id: 'notes', text: 'Заметки', icon: NotebookPen }, { id: 'plans', text: 'Планы', icon: ListChecks }, { id: 'profile', text: 'Я', icon: UserRound }] as const).map(item => <Button variant="ghost" key={item.id} className={active === item.id ? 'is-active' : ''} onClick={() => onSelect(item.id)} aria-pressed={active === item.id}><item.icon/><span>{item.text}</span></Button>)}</nav>;
}