import React, { Component, createContext } from 'react';
import './App.css';

const BatteryContext = createContext(90); // 这里面传递的默认值就是consumer找不到对应的provider的时候用到的

class Leaf extends Component {
  static contextType = BatteryContext;

  render() {
    const battery = this.context;
    return (
      <h1>Battery: {battery}</h1>
    )
  }
}
class Middle extends Component {
  render() {
    return <Leaf />
  }
}

class App extends Component {
  state = {
    online: false,
    battery: 60
  }
  render() {
    const { battery, online } = this.state;

    return (
      <BatteryContext.Provider value={battery}>
          <button type="button" onClick={() => this.setState({battery: battery - 1})}>减一</button>
          <button type="button" onClick={() => this.setState({online: !online})}>切换</button>
          <Middle />
      </BatteryContext.Provider>
    );
  }
}

export default App;
