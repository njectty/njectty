const { makeBadge } = require("badge-maker");
const { writeFileSync: writeFile } = require("fs");
const { not } = require("logical-not");
const { join, resolve } = require("path");
const { exit, mkdir, rm, test } = require("shelljs");

if (process.cwd() !== join(__dirname, "..")) exit(1);

const badgesPath = resolve("assets/badges");

clean();

createBadge("tests", "passing");

license: {
    const { license } = require("../package");

    createBadge("license", license, "green");
}

// service

function createBadge(label, message, color = "success") {
    if (not(test("-d", badgesPath))) mkdir("-p", badgesPath);

    const filePath = join(badgesPath, label + ".svg");
    const svg = makeBadge({ label, message, color }) + "\n";

    writeFile(filePath, svg);
}

function clean() {
    const pattern = join(badgesPath, "*.svg");

    if (test("-e", pattern)) rm(pattern);
}
