// walk folder get file map and tree
// 遍历文件夹的到指定后缀的目录结构以及map
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const rootPath = path.join(__dirname, './testing');
const spaceSize = 4;
const initYamlPath = './dir.yaml';
const distPath = path.join(__dirname, './dist');
const mapPath = path.join(__dirname, 'dist.map.json');
let line = 0;

function createSpace(indent) {
    return ''.padStart(indent * spaceSize, ' ');
}

// 得到目录结构的yaml格式
async function walk(dirPath, deep) {
    const files = await fs.promises.readdir(dirPath, {withFileTypes: true});

    let count = 0;
    const promiseList = files.map(async (file) => {
        let childrenList = '';
        if (file.isDirectory()) {
            childrenList = await walk(path.join(dirPath, file.name), deep+1);
        } else if (!file.name.match('.jpg')) {
            return '';
        }
        return `${createSpace(deep)}- ${file.name}${childrenList? ':': ''}\n${childrenList}`;
    });
    return (await Promise.all(promiseList)).join('');
}

// yaml格式写入文件
async function createDirectoryYaml() {
    const data = await walk(rootPath, 0);
    return fs.promises.writeFile(initYamlPath, data, {
        encoding: 'utf8',
        flag: 'w+'
    });
}

// yaml生成map
async function renameFileInitMap() {
    const initError = await createDirectoryYaml();
    if (!initError) {
        const data = await fs.promises.readFile(initYamlPath, 'utf8');
        const res = YAML.parse(data);
        console.log(res);
        const err = await checkRenameDir();
    } else {
        console.log(initError);
    }
}

function checkRenameDir() {
    return fs.promises.access(distPath).catch(err => {
        return fs.promises.mkdir(distPath);
    });
}

const map = {};
function runRename(data, parentDirName='') {
    if (Array.isArray(data)) {
        data.forEach((dir) => {
            Object.keys(dir).forEach((key) => {
                if (typeof(dir[key][0]) == 'object') {
                    runRename(dir[key], key);
                } else {
                    dir[key].forEach((name, index) => {
                        map[name] = `${line}-${index}.jpg`;
                        const relativePath = `${parentDirName}/${key}/${name}`;
                        const oldPath = path.join(rootPath, relativePath);
                        const newPath = path.join(distPath, map[name]);
                        fs.rename(oldPath, newPath, (err) => {
                        });
                        if (dir[key].length - 1 == index && line == 9) {
                            fs.promises.writeFile(mapPath, JSON.stringify(map), {
                                encoding: 'utf8',
                                flag: 'w+'
                            });
                        }
                    });
                    line++;
                }
            });
        })
    }
}

renameFileInitMap();
