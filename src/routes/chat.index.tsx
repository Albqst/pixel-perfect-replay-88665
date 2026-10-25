import { createFileRoute } from "@tanstack/react-router";
import { ChatWorkspace } from "@/components/chat-workspace";

export const Route = createFileRoute("/chat/")({
  head: () => ({ meta: [
    { title: "Чат с Riadom — новый разговор" },
    { name: "description", content: "Личное пространство Riadom для твоих мыслей и переживаний." },
    { property: "og:title", content: "Чат с Riadom — новый разговор" },
    { property: "og:description", content: "Пространство для разговора о важном." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ChatIndex,
});
function ChatIndex() { return <ChatWorkspace />; }