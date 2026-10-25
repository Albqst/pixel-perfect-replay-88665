import { describe, expect, it } from "vitest";
import { appendChatMessage } from "@/lib/chat-session";

describe("temporary chat session", () => {
  it("keeps multiple conversations isolated", () => {
    let threads = appendChatMessage([], "first", "Первый разговор", "m1");
    threads = appendChatMessage(threads, "second", "Второй разговор", "m2");
    threads = appendChatMessage(threads, "first", "Продолжение", "m3");
    expect(threads[0]?.messages.map((message) => message.parts)).toEqual([
      [{ type: "text", text: "Первый разговор" }],
      [{ type: "text", text: "Продолжение" }],
    ]);
    expect(threads[1]?.messages[0]?.parts).toEqual([{ type: "text", text: "Второй разговор" }]);
  });
  it("accepts a message without creating assistant replies", () => {
    const threads = appendChatMessage([], "first", "Привет", "m1");
    expect(threads[0]?.messages).toHaveLength(1);
    expect(threads[0]?.messages[0]?.role).toBe("user");
  });
  it("starts a new session empty without carrying previous messages", () => {
    const previous = appendChatMessage([], "first", "Личное сообщение", "m1");
    const fresh = appendChatMessage([], "first", "Новая сессия", "m2");
    expect(previous[0]?.messages[0]?.parts).not.toEqual(fresh[0]?.messages[0]?.parts);
    expect(fresh[0]?.messages).toHaveLength(1);
  });
});
