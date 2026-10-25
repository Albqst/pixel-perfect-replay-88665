import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUp, MessageCircle, Plus, Trash2, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit } from "@/components/ai-elements/prompt-input";
import { useChatSession } from "@/components/chat-session";
import { cn } from "@/lib/utils";
import sun from "@/assets/sun.png.asset.json";

export function ChatWorkspace({ threadId }: { threadId?: string }) {
  const { threads, createThread, send, remove } = useChatSession();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);
  const activeThread = threads.find((thread) => thread.id === threadId);

  useEffect(() => { textarea.current?.focus(); }, [threadId]);

  function newThread() {
    const id = createThread();
    setSidebarOpen(false);
    void navigate({ to: "/chat/$threadId", params: { threadId: id } });
  }

  return <div className="flex h-svh flex-col bg-background">
    <header className="flex h-20 shrink-0 items-center justify-between gap-4 border-b border-border px-4 md:px-8">
      <Link to="/" className="flex items-center gap-3 font-display text-lg font-semibold">
        <img src={sun.url} alt="" className="size-9 rounded-full object-cover" />Riadom
      </Link>
      <Button asChild variant="ghost" className="text-muted-foreground"><Link to="/"><ArrowLeft />На сайт</Link></Button>
    </header>
    <div className="relative flex min-h-0 flex-1">
      <aside aria-label="Разговоры" className={cn("absolute inset-y-0 left-0 z-20 flex w-72 shrink-0 flex-col border-r border-border bg-card p-4 md:static md:flex", sidebarOpen ? "flex" : "hidden")}>
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Разговоры</p>
          <Button size="icon" variant="ghost" className="md:hidden" aria-label="Закрыть список разговоров" onClick={() => setSidebarOpen(false)}><PanelLeftClose /></Button>
        </div>
        <Button onClick={newThread} variant="outline" className="justify-start"><Plus />Новый разговор</Button>
        <div className="mt-5 flex-1 space-y-2 overflow-y-auto">
          {threads.map((thread) => <div key={thread.id} className={cn("flex min-w-0 items-center gap-1 rounded-lg", thread.id === threadId && "bg-secondary")}>
            <Button asChild variant="ghost" className="min-w-0 flex-1 justify-start px-3 hover:bg-secondary"><Link to="/chat/$threadId" params={{ threadId: thread.id }} onClick={() => setSidebarOpen(false)}><MessageCircle /><span className="truncate">{thread.title}</span></Link></Button>
            <Button size="icon-sm" variant="ghost" aria-label={`Удалить разговор: ${thread.title}`} title="Удалить разговор" className="mr-1 shrink-0 text-muted-foreground hover:text-destructive" onClick={() => {
              remove(thread.id);
              if (thread.id === threadId) void navigate({ to: "/chat" });
            }}><Trash2 /></Button>
          </div>)}
        </div>
      </aside>
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-border px-4 md:px-8">
          <Button size="icon" variant="ghost" className="md:hidden" aria-label="Открыть список разговоров" onClick={() => setSidebarOpen(true)}><PanelLeftOpen /></Button>
          <h1 className="truncate font-display text-sm">{activeThread?.title ?? "Чат с Riadom"}</h1>
          <span className="ml-auto shrink-0 text-xs text-muted-foreground">Без ответов</span>
        </div>
        <Conversation key={threadId ?? "new"} className="min-h-0">
          <ConversationContent className="mx-auto max-w-3xl gap-5 px-5 py-8">
            {!activeThread?.messages.length ? <ConversationEmptyState className="min-h-64 py-10 md:min-h-80">
              <img src={sun.url} alt="" className="mb-4 size-20 rounded-full object-cover glow-violet" />
              <h2 className="font-display text-2xl leading-relaxed">Что у тебя на душе?</h2>
            </ConversationEmptyState> : activeThread.messages.map((message) => <Message key={message.id} from={message.role}>
              <MessageContent className="group-[.is-user]:bg-secondary group-[.is-user]:text-secondary-foreground">
                {message.parts.map((part, index) => part.type === "text" ? message.role === "assistant" ? <MessageResponse key={index}>{part.text}</MessageResponse> : <p key={index} className="whitespace-pre-wrap break-words text-base leading-relaxed">{part.text}</p> : null)}
              </MessageContent>
            </Message>)}
          </ConversationContent>
          <ConversationScrollButton aria-label="К последнему сообщению" />
        </Conversation>
        <div className="mx-auto w-full max-w-3xl shrink-0 px-4 pt-3 pb-5 md:px-5">
          <PromptInput key={threadId ?? "new"} className="[&_[data-slot=input-group]]:bg-card" onSubmit={({ text }) => {
            if (!text.trim()) return;
            const id = threadId ?? createThread();
            send(id, text);
            setDraft("");
            if (!threadId) void navigate({ to: "/chat/$threadId", params: { threadId: id } });
            textarea.current?.focus();
          }}>
            <PromptInputTextarea ref={textarea} value={draft} onChange={(event) => setDraft(event.target.value)} aria-label="Сообщение" placeholder="Напиши, что чувствуешь…" className="min-h-20 text-base" />
            <PromptInputFooter className="justify-end"><PromptInputSubmit status="ready" disabled={!draft.trim()} aria-label="Отправить сообщение" title="Отправить сообщение" className="size-9 rounded-full"><ArrowUp /></PromptInputSubmit></PromptInputFooter>
          </PromptInput>
        </div>
      </main>
    </div>
  </div>;
}