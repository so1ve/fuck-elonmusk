import fs from "node:fs/promises";

const { version } = JSON.parse(await fs.readFile("package.json"));
const content = await fs.readFile("script.user.js", "utf8");
const newContent = content.replace(
	/\/\/ @version\s+(?:\S.*)?$/m,
	`// @version      ${version}`,
);
await fs.writeFile("script.user.js", newContent, "utf8");
