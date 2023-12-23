import {
       UberConsoleProvider,
       AppShell,
       SidebarNavigationSection,
       SidebarSection,
       Footer,
       Flex,
       Header,
       HeaderDropdown,
       PopoverManager
} from 'react-uberconsole';
import 'react-uberconsole/styles.css';
import './styles/index.scss'
import moduleConfig from './modules/moduleConfig';

export default function App() {

       let sidebar = (
              <>
                     <SidebarSection>
                            <div className="sidebar-logo">
                                   <div className="logo"></div>
                            </div>
                     </SidebarSection>
                     <SidebarNavigationSection />
              </>
       )


       return (
              <UberConsoleProvider uberConfig={{ moduleConfig: moduleConfig }}>
                     <div className="app">
                            <Header>
                                   <PopoverManager>
                                          <Flex align="left">
                                                 <div className="logo" />
                                          </Flex>
                                          <Flex align="right">
                                                 <div className="menu-area">
                                                        <HeaderDropdown
                                                               dropdownClass="dropdown"
                                                               headerElement={<div className="settings">Settings</div>}>
                                                               <ul className="top-menu-item">
                                                                      <li>Sample Menu</li>
                                                               </ul>
                                                        </HeaderDropdown>
                                                        <HeaderDropdown
                                                               dropdownClass="dropdown"
                                                               headerElement={<div className="account">Account</div>}>
                                                               <ul className="top-menu-item">
                                                                      <li>Play with menus</li>
                                                               </ul>
                                                        </HeaderDropdown>
                                                 </div>
                                          </Flex>
                                   </PopoverManager>
                            </Header>

                            { /* Here the sum of the default footer and header height is 70px. Let us substract it from 100vh to expand it to the rest of the screen.  */}

                            <AppShell height="calc(100vh - 70px)" sidebar={sidebar}>
                            </AppShell>

                            <Footer>
                                   <Flex align="left">
                                          <div style={{ paddingLeft: 10 }}>Built with React Uber Console</div>
                                   </Flex>
                                   <Flex align="center">
                                          <div>Copyright &copy; 2022</div>
                                   </Flex>
                            </Footer>

                     </div>
              </UberConsoleProvider>
       );
}