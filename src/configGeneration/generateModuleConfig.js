import { getModuleId, capitalizeName, normalizePath } from "./utils.js";

export default async function generateModuleConfig(infoModel) {

       let moduleConfig = {};

       moduleConfig.appName = infoModel.appName;
       moduleConfig.rootPath = normalizePath(infoModel.rootPath);
       moduleConfig.moduleErrorComponent = infoModel.createModuleErrorComponent;
       moduleConfig.modules = [];

       for (let module of infoModel.modules) {

              let m = {
                     id: getModuleId(module.name),
                     name: capitalizeName(module.name),
                     path: normalizePath(module.path)
              };

              if (moduleConfig.defaultModule === module.name) {
                     m.isDefault = true;
              }
              
              if (module.hasLayout) {
                     m.layout = true;
              }

              m.subModules = buildSubModulesConfig(module);
              m.sidebarConfig = {
                     items: buildSidebarConfig(module.sidebarItems)
              };

              moduleConfig.modules.push(m);

       }

       return moduleConfig;

}


const buildSubModulesConfig = (module) => {

       let subModules = [];

       for (let subModule of module.subModules) {

              let subModuleId = getModuleId(subModule.name);           

              let s = {
                     id: subModuleId,
                     name: capitalizeName(subModule.name),
                     path: normalizePath(subModule.path)
              };

              if (!subModule.showSidebar) {
                     s.hideSidebar = true;
              }

              if (subModule.hasInternalRoutes) {
                     s.hasInternalRoutes = true;
              }

              subModules.push(s);
       }

       return subModules;

};

const getSidebarItemType = (type) => {

       switch (type) {

              case 'group':
                     return 'group';

              case 'url':
                     return 'link';

              case 'subModuleLink':
                     return 'submodule';

       }

};

const buildSidebarConfig = (sidebarItems) => {

       let outputSidebarItems = [];

       for (let sidebarItem of sidebarItems) {

              let s = {
                     type: getSidebarItemType(sidebarItem.type),
                     text: sidebarItem.text                     
              };

              if(s.type === 'group') {

                     s.items = sidebarItem.items ? sidebarItem.items.map(item => {
                            return {
                                   type: getSidebarItemType(item.type),
                                   subModuleId: item.subModuleId,
                                   text: item.text,
                                   url: item.url
                            };
                     }) : [];
              }
              else if(s.type === 'link') {
                     s.url = sidebarItem.url;
              }
              else if(s.type === 'submodule') {
                     s.subModuleId = sidebarItem.subModuleId;
              }

              outputSidebarItems.push(s);
       }

       return outputSidebarItems;

};