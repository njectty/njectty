import { npmPackagr } from "npm-packagr";
import {
    assets,
    badge,
    BadgeType,
    doIf,
    file,
    git,
    npx,
    packageJSON,
    publish,
    test,
    version,
} from "npm-packagr/pipelines";

npmPackagr({
    pipelines: [
        doIf("publish", [
            npx("npx webpack"),

            test(),

            badge(BadgeType.Test),
            badge(BadgeType.License),

            git("commit", "njectty"),

            version("patch"),
        ]),

        packageJSON((packageJson) => {
            delete packageJson.scripts;
            delete packageJson.devDependencies;
        }),

        assets("LICENSE", "README.md"),

        file(() => ({
            path: "types",
            name: "index.d.ts",
            content: `export * from "./public-api";`,
        })),

        file(() => ({
            path: "types",
            name: "implementation.d.ts",
            content: `export * from "./implementation";`,
        })),

        doIf("publish", [
            publish({
                account: "njectty",
                email: "njectty@gmail.com",
            }),
        ]),

        doIf("dev", [npx("webpack --config ./webpack.dev.config.js --watch")]),
    ],
});
