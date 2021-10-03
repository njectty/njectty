const { writeFileSync: writeFile } = require("fs");
const { join, resolve } = require("path");
const { cp, exec, exit, rm } = require("shelljs");

if (process.cwd() !== join(__dirname, "..")) exit(1);

if (test("-d", "package")) rm("-rf", "package");

exec("npx webpack");

cp("LICENSE", "README.md", "package");

createPackageJSON: {
    const source = require("../package.json");

    delete source.scripts;
    delete source.devDependencies;

    const file = JSON.stringify(source, null, "  ");

    toPackage("package.json", file);
}

createTSDeclarations: {
    toPackage("types/index.d.ts", `export * from "./public-api";\n`);
    toPackage(
        "types/implementation.d.ts",
        `export * from "./implementation";\n`
    );
}

exec("npm run test");
exec("node scripts/create-badges.js");

// service

function toPackage(path, file) {
    path = resolve(`package/${path}`);

    writeFile(path, file);
}
