import { Event } from "../structures/Event.js";
import { Logger } from "../helpers/Logger.js";
import { InlineQueryResult } from "telegraf/types";

const inlineQueryEvent: Event = {
  type: "inline_query",
  execute: async (ctx, bot) => {
    // Narrow context manually since Event uses generic Context
    if (!ctx.inlineQuery) return;
    
    const query = ctx.inlineQuery.query;
    
    // We can handle logic based on prefix, or just return global search results
    // Example: If a user types `@bot search xyz`
    const isSearch = query.toLowerCase().startsWith("search ");
    const searchTerm = isSearch ? query.slice(7).trim() : query.trim();

    // Limit Telegram UI visual bugs when query is empty
    if (!searchTerm) {
      await ctx.answerInlineQuery([], {
        button: {
          text: "Type something to search!",
          start_parameter: "help" // Deep link to PM
        },
        cache_time: 0
      });
      return;
    }

    const results: InlineQueryResult[] = [
      {
        type: "article",
        id: `result_${Date.now()}`,
        title: `Search result for: ${searchTerm}`,
        description: "Click here to send this result",
        input_message_content: {
          message_text: `I searched for *${searchTerm}* via Inline Query!`,
          parse_mode: "Markdown"
        }
      }
    ];

    // answerInlineQuery is the native shortcut handling inline_query_id
    await ctx.answerInlineQuery(results, {
      cache_time: 10, // Short cache for dynamic results
      is_personal: false // Set to true if results are unique to the user
    });
    
    Logger.debug(`[InlineQuery] Processed query: "${query}"`);
  },
};

export default inlineQueryEvent;
