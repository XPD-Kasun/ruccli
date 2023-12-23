export default {
       "appName": "test",
       "rootPath": "/",
       "moduleErrorComponent": true,
       "modules": [
              {
                     "id": "billing",
                     "name": "Billing",
                     "path": "/billing",
                     "layout": true,
                     "subModules": [
                            {
                                   "id": "searchCustomers",
                                   "name": "Search Customers",
                                   "path": "/search-customers"
                            },
                            {
                                   "id": "payment",
                                   "name": "Payment",
                                   "path": "/payment"
                            }
                     ],
                     "sidebarConfig": {
                            "items": [
                                   {
                                          "type": "group",
                                          "text": "Billing",
                                          "items": [
                                                 {
                                                        "type": "submodule",
                                                        "subModuleId": "searchCustomers",
                                                        "text": "Search Customers"
                                                 },
                                                 {
                                                        "type": "submodule",
                                                        "subModuleId": "payment",
                                                        "text": "Payment"
                                                 }
                                          ]
                                   },
                                   {
                                          "type": "link",
                                          "text": "External Link",
                                          "url": "http://google.com"
                                   }
                            ]
                     }
              },
              {
                     "id": "newConnections",
                     "name": "New Connections",
                     "path": "/new-connections",
                     "subModules": [
                            {
                                   "id": "newApplication",
                                   "name": "New Application",
                                   "path": "/new-application",
                                   "hasInternalRoutes": true
                            },
                            {
                                   "id": "estditems",
                                   "name": "Estditems",
                                   "path": "/estditems"
                            }
                     ],
                     "sidebarConfig": {
                            "items": [
                                   {
                                          "type": "group",
                                          "text": "New Connections",
                                          "items": [
                                                 {
                                                        "type": "submodule",
                                                        "subModuleId": "newApplication",
                                                        "text": "New Application"
                                                 },
                                                 {
                                                        "type": "submodule",
                                                        "subModuleId": "estditems",
                                                        "text": "ESTD Items"
                                                 }
                                          ]
                                   },
                                   {
                                          "type": "link",
                                          "text": "External Link 2",
                                          "url": "http://test.com"
                                   }
                            ]
                     }
              }
       ]
}