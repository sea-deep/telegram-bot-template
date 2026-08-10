import { Logger } from "../helpers/Logger.js";
const chosenInlineResultEvent = {
    type: "chosen_inline_result",
    execute: async (ctx, bot) => {
        // Narrow context manually
        if (!ctx.chosenInlineResult)
            return;
        const resultId = ctx.chosenInlineResult.result_id;
        const query = ctx.chosenInlineResult.query;
        // This event is completely optional. You must enable inline feedback via @BotFather
        // to actually receive these events. Use it for analytics or database logging.
        Logger.info(`[ChosenResult] User selected result [${resultId}] for query [${query}]`);
    },
};
export default chosenInlineResultEvent;
