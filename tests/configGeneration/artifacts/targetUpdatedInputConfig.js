import { rootFolder } from "../../config";
import path from 'path';

export default {
       "appName": "Test",
       "rootPath": "/",
       "moduleErrorComponent": true,
       "isTs": false,
       "modules": [
              {
                     "name": "Billing",
                     "path": "/Billing",
                     "hasLayout": true,
                     "subModules": [
                            {
                                   "name": "search customers",
                                   "path": "/search customers",
                                   "showSidebar": true,
                                   "hasInternalRoutes": false,
                                   "moreSubmodules": true,
                                   "moduleFolderRelative": "./billing/searchCustomers",
                                   "moduleFolderAbsolute": path.join(rootFolder, "modules/billing/searchCustomers")
                            },
                            {
                                   "name": "payment",
                                   "path": "/payment",
                                   "showSidebar": true,
                                   "hasInternalRoutes": false,
                                   "moreSubmodules": true,
                                   "moduleFolderRelative": "./billing/payment",
                                   "moduleFolderAbsolute": path.join(rootFolder, "modules/billing/payment")
                            }
                     ],
                     "sidebarItems": [
                            {
                                   "text": "Billing",
                                   "type": "group",
                                   "items": [
                                          {
                                                 "text": "Search Customers",
                                                 "type": "subModuleLink",
                                                 "subModuleId": "searchCustomers",
                                                 "needMoreGroupItems": true
                                          },
                                          {
                                                 "text": "Payment",
                                                 "type": "subModuleLink",
                                                 "subModuleId": "payment",
                                                 "needMoreGroupItems": false
                                          }
                                   ],
                                   "needMore": true
                            },
                            {
                                   "text": "External Link",
                                   "type": "url",
                                   "url": "https://test.com",
                                   "needMore": false
                            }
                     ],
                     "needMore": true,
                     "moduleFolderRelative": "./billing/",
                     "moduleFolderAbsolute": path.join(rootFolder, "modules/billing")
              },
              {
                     "name": "new connections",
                     "path": "/new connections",
                     "hasLayout": false,
                     "subModules": [
                            {
                                   "name": "new application",
                                   "path": "/new application",
                                   "showSidebar": true,
                                   "hasInternalRoutes": false,
                                   "moreSubmodules": true,
                                   "moduleFolderRelative": "./newConnections/newApplication",
                                   "moduleFolderAbsolute": path.join(rootFolder, "modules/newConnections/newApplication")
                            },
                            {
                                   "name": "ESTDItems",
                                   "path": "/ESTDItems",
                                   "showSidebar": true,
                                   "hasInternalRoutes": false,
                                   "moreSubmodules": false,
                                   "moduleFolderRelative": "./newConnections/estditems",
                                   "moduleFolderAbsolute": path.join(rootFolder, "modules/newConnections/estditems")
                            }
                     ],
                     "sidebarItems": [
                            {
                                   "text": "New Connections",
                                   "type": "group",
                                   "items": [
                                          {
                                                 "text": "New Registration",
                                                 "type": "subModuleLink",
                                                 "subModuleId": "newApplication",
                                                 "needMoreGroupItems": true
                                          },
                                          {
                                                 "text": "submitted to ESTD System",
                                                 "type": "subModuleLink",
                                                 "subModuleId": "eSTDItems",
                                                 "needMoreGroupItems": false
                                          }
                                   ],
                                   "needMore": true
                            },
                            {
                                   "text": "External Link 2",
                                   "type": "url",
                                   "url": "https://test2.com",
                                   "needMore": false
                            }
                     ],
                     "needMore": false,
                     "moduleFolderRelative": "./newConnections/",
                     "moduleFolderAbsolute": path.join(rootFolder, "modules/newConnections")
              }
       ]
};