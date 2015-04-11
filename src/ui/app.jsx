/* @flow */

import React from 'react';

import {Table} from './table/table.jsx';
import {AboutView} from './about/about.jsx';
import {SettingsView} from './settings/settings.jsx';
import {GrowlContainer} from './growl/growl.jsx';

/* these should probably be somewhere else */
import a from 'necolas/normalize.css';
import b from 'purecss/build/pure.css!';
import c from 'FortAwesome/Font-Awesome/css/font-awesome.css!';
import d from './app.css!';

export class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = { route: "table" };
   }

   routeClicked(route) {
      this.setState({"route": route});
      return false;
   }

   render() {
      console.log('rendering app')
      var routes = ["home", "table", "settings", "about"].map((route) => {
         return (
            <li key={route}>
               <a className={this.state.route == route ? "active" : ""}
                  href=""
                  onClick={() => this.routeClicked(route)}>
                  {route}
               </a>
            </li>
         );
      });

      var content;

      if (this.state.route == "about")
         content = <AboutView/>;
      else if (this.state.route == "settings")
         content = <SettingsView/>;
      else
         content = <Table/>;

      return (
         <div className="app-container">
            <nav role="navigation" className="app-navbar nav-main">
               <ul className="nav-site">
                  {routes}
               </ul>
            </nav>
            <div className="app-content">
               {content}
            </div>
            <div className="app-growl">
               <GrowlContainer/>
            </div>
         </div>
      );
   }
}

React.render(<App/>, document.body);
