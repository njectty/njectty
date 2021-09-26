const { spawnSync: spawn } = require("child_process");
const { readdir: readDirectory } = require("fs").promises;
const { join, basename } = require("path");

async function main() {
    const testsDone = (await readDirectory(__dirname))
        .filter((file) => /\.test\.js$/.test(file))
        .reduce(test, true);

    process.exit(testsDone ? 0 : 1);
}
main();

function test(testsDone, file) {
    const path = join(__dirname, file);
    const program = `
        let fail = true;

        global.success = () => {
            fail = false;
        };

        require('${path}');

        if (fail) throw new Error;
    `;

    const { status } = spawn("node", [`--eval=${program}`]);

    const ok = status === 0;
    const preffix = ok ? "\x1b[32m\u2713\x1b[0m " : "\x1b[31m\u2716\x1b[0m ";

    console.log(preffix + basename(file, ".test.js"));

    return testsDone ? ok : false;
}
