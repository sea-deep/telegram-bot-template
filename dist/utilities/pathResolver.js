import { glob } from "glob";
import { pathToFileURL } from "node:url";
import path from "node:path";
/**
 * Dynamically resolves file URLs for modules in a target directory (e.g. "commands", "events").
 * Automatically supports both development (.ts files via tsx) and production (.js files in dist/).
 */
export async function resolveFiles(subDir) {
    const cwd = process.cwd();
    const searchPattern = `${cwd}/+(src|dist)/${subDir}/**/*.{ts,js}`.replace(/\\/g, "/");
    const files = await glob(searchPattern);
    const validFiles = files.filter((file) => !file.endsWith(".d.ts") && !file.endsWith(".map"));
    const isDevMode = process.argv[1]?.includes("src") ||
        process.execArgv.some((arg) => arg.includes("tsx")) ||
        process.env.TSX === "true";
    const targetFiles = validFiles.filter((file) => {
        if (isDevMode) {
            return file.includes("/src/") || file.includes("\\src\\");
        }
        else {
            return file.includes("/dist/") || file.includes("\\dist\\");
        }
    });
    const finalFiles = targetFiles.length > 0 ? targetFiles : validFiles;
    return finalFiles.map((file) => pathToFileURL(path.resolve(file)).toString());
}
