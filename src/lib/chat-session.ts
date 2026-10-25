import type { UIMessage } from "ai";

export type ChatThread = { id: string; title: string; messages: UIMessage[] };

export function appendChatMessage(
  threads: ChatThread[],
  threadId: string,
  text: string,
  messageId: string,
): ChatThread[] {
  const trimmed = text.trim();
  if (!trimmed) return threads;
  const message: UIMessage = {
    id: messageId,
    role: "user",
    parts: [{ type: "text", text: trimmed }],
  };
  const existing = threads.find((thread) => thread.id === threadId);
  if (!existing)
    return [...threads, { id: threadId, title: trimmed.slice(0, 44), messages: [message] }];
  return threads.map((thread) =>
    thread.id === threadId
      ? {
          ...thread,
          title: thread.messages.length ? thread.title : trimmed.slice(0, 44),
          messages: [...thread.messages, message],
        }
      : thread,
  );
}
