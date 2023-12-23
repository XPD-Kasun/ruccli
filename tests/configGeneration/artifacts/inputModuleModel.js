export default [
       {
              name: 'billing',
              path: '/billing',
              hasLayout: true,
              subModules: [
                     {
                            name: 'search customers',
                            path: '/search customers',
                            showSidebar: true,
                            hasInternalRoutes: false
                     },
                     {
                            name: 'payment',
                            path: '/payment',
                            showSidebar: true,
                            hasInternalRoutes: false
                     }
              ],
              sidebarItems: [
                     {
                            text: 'Billing',
                            type: 'group',
                            items: [
                                   {
                                          text: 'Search Customers',
                                          type: 'subModuleLink',
                                          subModuleId: 'searchCustomers'
                                   },
                                   {
                                          text: 'Payment',
                                          type: 'subModuleLink',
                                          subModuleId: 'payment'
                                   }
                            ]
                     },
                     {
                            text: 'External Link',
                            type: 'url',
                            url: 'http://google.com'
                     }
              ]
       },
       {
              name: 'new connections',
              path: '/new connections',
              hasLayout: false,
              subModules: [
                     {
                            name: 'New Application',
                            path: '/New application',
                            showSidebar: true,
                            hasInternalRoutes: true
                     },
                     {
                            name: 'estditems',
                            path: '/ESTDItems',
                            showSidebar: true,
                            hasInternalRoutes: false
                     }
              ],
              sidebarItems: [
                     {
                            text: 'New Connections',
                            type: 'group',
                            items: [
                                   {
                                          text: 'New Application',
                                          type: 'subModuleLink',
                                          subModuleId: 'newApplication'
                                   },
                                   {
                                          text: 'ESTD Items',
                                          type: 'subModuleLink',
                                          subModuleId: 'estditems'
                                   }
                            ]
                     },
                     {
                            text: 'External Link 2',
                            type: 'url',
                            url: 'http://test.com'
                     }
              ]
       }
];