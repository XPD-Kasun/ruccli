import { lazy } from 'react';
import ErrorComponent from './ErrorComponent';

const s = {
       appName: "myapp",
       modules: [
              {
                     name: 'My Module',
                     path: '/app',
                     sidebarConfig: {
                            items: [
                                   {
                                          type: 'submodule',
                                          subModuleId: 'sm1',
                                   }
                            ]
                     },
                     subModules: [
                            {
                                   id: 'sm1',
                                   name: 'Sub Module 1',
                                   path: '/',
                                   component: lazy(() => import('./myModule/subModule1'))
                            }
                     ]

              }
       ],
       moduleErrorComponent: ErrorComponent
};

export default s;