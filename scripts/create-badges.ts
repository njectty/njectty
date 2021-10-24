import { makeBadge } from "badge-maker";
import { writeFileSync as writeFile } from "fs";
import { not } from "logical-not";
import { join, resolve } from "path";
import { exit, mkdir, rm, test } from "shelljs";

if (process.cwd() !== join(__dirname, "..")) exit(1);

const badgesPath = resolve("assets/badges");

clean();

createBadge("tests", "passing");

license: {
    const { license } = require("../package");

    createBadge("license", license, "green");
}

// service

function createBadge(label: string, message: string, color = "success"): void {
    if (not(test("-d", badgesPath))) mkdir("-p", badgesPath);

    const filePath = join(badgesPath, label + ".svg");
    const svg = makeBadge({ label, message, color }) + "\n";

    writeFile(filePath, svg);
}

function clean(): void {
    const pattern = join(badgesPath, "*.svg");

    if (test("-e", pattern)) rm(pattern);
}
