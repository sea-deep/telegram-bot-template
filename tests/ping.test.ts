import { describe, it, expect, vi } from "vitest";
import pingCommand from "../src/commands/ping.js";

describe("Ping Command", () => {
  it("should respond with latency", async () => {
    const mockEditMessageText = vi.fn();
    const mockReply = vi.fn().mockResolvedValue({
      message_id: 1234,
    });

    const mockCtx = {
      reply: mockReply,
      chat: { id: 5678 },
      telegram: {
        editMessageText: mockEditMessageText,
      },
    } as any;

    const mockBot = {} as any;

    await pingCommand.execute(mockCtx, mockBot, []);

    expect(mockReply).toHaveBeenCalledWith("🏓 Pinging...");
    expect(mockEditMessageText).toHaveBeenCalledTimes(1);
    expect(mockEditMessageText.mock.calls[0][0]).toBe(5678);
    expect(mockEditMessageText.mock.calls[0][1]).toBe(1234);
    // Formatting is handled by telegraf/format, so we can just check if it was called
  });
});
