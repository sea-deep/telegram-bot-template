import { Logger } from "../helpers/Logger.js";
const exampleResult = {
    // Matches any result ID that starts with "search_result_"
    name: /^search_result_/,
    execute: async (ctx, bot) => {
        const resultId = ctx.chosenInlineResult.result_id;
        const query = ctx.chosenInlineResult.query;
        Logger.info(`User selected inline result [${resultId}] for query [${query}]`);
        // In a real bot, you could update analytics, increment usage counters,
        // or log which specific autocomplete results users are clicking the most.
    },
};
export default exampleResult;
