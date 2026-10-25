import { createContext, useContext, useState, type ReactNode } from "react";
import { appendChatMessage, type ChatThread } from "@/lib/chat-session";

type ChatSession = {
  threads: ChatThread[];
  createThread: () => string;
  send: (threadId: string, text: string) => void;
  remove: (threadId: string) => void;
};
const ChatSessionContext = createContext<ChatSession | null>(null);

export function ChatSessionProvider({ children }: { children: ReactNode }) {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  return (
    <ChatSessionContext.Provider
      value={{
        threads,
        createThread: () => {
          const id = crypto.randomUUID();
          setThreads((previous) => [...previous, { id, title: "Новый разговор", messages: [] }]);
          return id;
        },
        send: (threadId, text) =>
          setThreads((previous) =>
            appendChatMessage(previous, threadId, text, crypto.randomUUID()),
          ),
        remove: (threadId) =>
          setThreads((previous) => previous.filter((thread) => thread.id !== threadId)),
      }}
    >
      {children}
    </ChatSessionContext.Provider>
  );
}

export function useChatSession() {
  const session = useContext(ChatSessionContext);
  if (!session) throw new Error("ChatSessionProvider is required");
  return session;
}
