import React, { Component, useState, createContext, useContext } from 'react';

const CountContext = createContext();

class Foo extends Component {
  render() {
    return (
      <CountContext.Consumer>
        {
          count => <h1>{count}</h1>
        }
      </CountContext.Consumer>
    )
  }
}

class Bar extends Component {
  static contextType = CountContext;

  render() {
    const count = this.context;
    return (
      <h1>{count}</h1>
    )
  }
}

function Counter() {
  const count = useContext(CountContext);
  return (
    <h1>{count}</h1>
  )
}

function App (props) {
  // 如果点击按钮的时候，setCount传入0，传入的的count的值没有变化，组件是不会重新渲染的
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
      type="button"
      onClick={() => setCount(count + 1)}
      >
        Click ({count})
      </button>
      <CountContext.Provider value={count}>
        <Foo />
        <Bar />
        <Counter />
      </CountContext.Provider>
    </div>
  ) 
}

export default App;
