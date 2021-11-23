import React, { Component } from 'react';
import Sidebar from './Sidebar.js';
import Graph from './Graph.js';
import './App.css';
import __ from './Utils.js';

var module_id_next = 0;
class Module {
  constructor(type) {
    this.type = type;
    this.name = null;
    this.id = `${module_id_next++}`;
    this.x = 0;
    this.y = 0;
    this.links = []
  }

  connectTo(destinationModule) {
    //m.links.push(prev);
  }

  cx() { return this.x + (100/2); }
  cy() { return this.y + (50/2); }
}

class App extends Component {

  constructor() {
    super()
    this.state = {
      modules: []
    };

    this.onCreateModule = this.onCreateModule.bind(this);
  }

  onCreateModule(x) {
    const m = new Module(x)
    const prev = __.last(this.state.modules);
    if (prev) {
      m.connectTo(prev)
    }
    const modules = [ ...this.state.modules, m ];
    this.setState({ modules });

    console.log(modules);
  }

  render() {
    return (
      <div className="mainLayout">
        <Sidebar onCreateModule={this.onCreateModule} />
        <Graph modules={this.state.modules} />
      </div>
    );
  }

}

export default App;
