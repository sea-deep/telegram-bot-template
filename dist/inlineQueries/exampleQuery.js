const exampleQuery = {
    // Matches when the user types: @bot search <anything>
    name: /^search\s+(.+)$/i,
    options: {
        cooldown: 2, // Prevent spamming searches
    },
    execute: async (ctx, bot) => {
        // We safely extract the regex match from the query text
        const queryStr = ctx.inlineQuery.query;
        const match = queryStr.match(/^search\s+(.+)$/i);
        const searchTerm = match ? match[1] : "nothing";
        // You would typically query a database or API here
        const results = [
            {
                type: "article",
                id: `search_result_1_${Date.now()}`,
                title: `Search result for: ${searchTerm}`,
                description: "Click here to send the result to the chat",
                input_message_content: {
                    message_text: `I searched for *${searchTerm}* and found this awesome result!`,
                    parse_mode: "Markdown",
                },
            },
            {
                type: "article",
                id: `search_result_2_${Date.now()}`,
                title: `Alternative result for: ${searchTerm}`,
                description: "Click here for another result",
                input_message_content: {
                    message_text: `Here is another great result for *${searchTerm}*!`,
                    parse_mode: "Markdown",
                },
            },
        ];
        await ctx.answerInlineQuery(results, { cache_time: 0 }); // cache_time: 0 for dev
    },
};
export default exampleQuery;
