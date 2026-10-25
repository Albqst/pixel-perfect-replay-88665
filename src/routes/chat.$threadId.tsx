import { createFileRoute } from "@tanstack/react-router";
import { ChatWorkspace } from "@/components/chat-workspace";

export const Route = createFileRoute("/chat/$threadId")({
  head: () => ({
    meta: [
      { title: "Твой разговор — Riadom" },
      { name: "description", content: "Твой текущий разговор с Riadom." },
      { property: "og:title", content: "Твой разговор — Riadom" },
      { property: "og:description", content: "Твои мысли и переживания в разговоре с Riadom." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatThreadPage,
});
function ChatThreadPage() {
  const { threadId } = Route.useParams();
  return <ChatWorkspace key={threadId} threadId={threadId} />;
}
