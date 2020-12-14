const fs = require('fs');
const path = require('path');

const rootPath = path.join(__dirname, './日本齿轮工业株式会社产品');
const logPath = path.resolve(__dirname, './log.txt');
const spaceSize = 4;

function createSpace(indent) {
    return ''.padStart(indent * spaceSize, ' ');
}

// 得到目录结构的yaml格式
async function walk(dirPath, deep) {
    const files = await fs.promises.readdir(dirPath, {withFileTypes: true});

    const promiseList = files.map(async (file, index) => {
        let childrenName = '';
        if (file.isDirectory()) {
            childrenName = await walk(path.join(dirPath, file.name), deep+1);
        }
        return `${createSpace(deep)}- ${file.name}\n${childrenName}`;
    });

    return (await Promise.all(promiseList)).join('');
}

// yaml格式写入文件
async function createDirectoryYaml() {
    const data = await walk(rootPath, 0);
    fs.writeFile('dir.yaml',
        `\n${data}`,
        {
            encoding: 'utf8',
            flag: 'a+'
        },
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}
