import fs from "node:fs/promises";

const { version } = JSON.parse(await fs.readFile("package.json"));
const content = await fs.readFile("index.user.js", "utf8");
const newContent = content.replace(
	/\/\/ @version\s+(?:\S.*)?$/m,
	`// @version      ${version}`,
);
await fs.writeFile("index.user.js", newContent, "utf8");
