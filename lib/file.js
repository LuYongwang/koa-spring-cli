/**
 * 项目生成脚手架
 * @type {path.PlatformPath | path}
 */
const path = require('path');
const fse = require('fs-extra');

const command = {};

/**
 * get project path
 * @param {String} projectName
 * @return {String}
 */
command.getDstPath = (projectName) => {
    if (!projectName) {
        projectName = 'demo';
    }
    return path.join(process.cwd(), projectName);
};

/**
 * generate project
 * @param {String} projectName
 */
command.generate = async (projectName) => {
    try {
        // src path
        let srcPath = path.resolve(__dirname, '../template')
        let dstPath = command.getDstPath(projectName);
        // copy folder
        await fse.copy(srcPath, dstPath);
    } catch (err) {
        throw (err);
    }
};

module.exports = command;
