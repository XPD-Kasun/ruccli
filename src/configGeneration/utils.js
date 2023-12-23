import { fileExists, readFile, writeFile } from "../shared/fs.js";
import path from 'path';

export const normalizePath = (path) => {

       path = path.toLowerCase().replace(' ', '-');

       if (path.startsWith('/')) {
              return path.trim();
       }
       else {
              return '/' + path.trim();
       }
}

export const capitalizeName = (name) => {
       return name.trim().replace(/\b(\w)/g, s => s.toUpperCase());
};

export const makeCamelCase = (name) => {
       return name.trim().toLowerCase().replace(/\b\s(\w)/g, s => s.toUpperCase());
}

export const removeSpaces = (name) => {
       return name.replace(' ', '').trim();
};

export const getProjectLanguage = async (returnExtension = false) => {
       let isTs = await fileExists(path.join(process.cwd(), 'tsconfig.json'));
       if (returnExtension) {
              return isTs ? ".ts" : ".js";
       }
       else return isTs;
};

export const getModuleId = (moduleName) => {
       return removeSpaces(makeCamelCase(moduleName))
};


export const createReactSkeleton = async (targetPath, componentName, className, children = '', imports = []) => {

       let contents = await readFile(path.join(__dirname, '../../templates/skeleton.template'));
       contents = contents.toString('utf-8');

       if(imports.length > 0) {
              contents = contents.replace(/\{ix\}/, imports.join('\n'));
       }
       else {
              contents = contents.replace(/\{ix\}/, '');
       }

       if (contents) {
              contents = contents.replace(/\{0\}/g, componentName);
              contents = contents.replace(/\{1\}/g, className);
              contents = contents.replace(/\{2\}/g, children);
       }

       await writeFile(targetPath, contents);
}