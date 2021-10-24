import { writeFileSync as writeFile } from "fs";
import { join, resolve } from "path";
import { cp, exec, exit, rm, test } from "shelljs";

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
    toPackage("index.d.ts", `export * from "./types/public-api";\n`);
    toPackage(
        "implementation.d.ts",
        `export * from "./types/implementation";\n`
    );
}

exec("npm run test");
exec("npm run create-badges");

// service

function toPackage(path: string, file: string): void {
    path = resolve(`package/${path}`);

    writeFile(path, file);
}
