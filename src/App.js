import React, { Component, useState } from 'react';
import './App.css';

class App2 extends Component {
  state = {
    count: 0
  }
  render() {
    const { count } = this.state;
    return (
      <button
        type="button"
        onClick={() => this.setState({count: count + 1})}
      >Click ({count})</button>
    )
  }
}

function App (props) {
  // 如果点击按钮的时候，setCount传入0，传入的的count的值没有变化，组件是不会重新渲染的
  const [count, setCount] = useState(0);
  console.log('app render')

  // 传入函数可以延迟初始化，也就是只调用一次
  // const [count, setCount] = useState(() => {
  //   console.log('initial count')
  //   return props.defaultCount || 0;
  // })

  return (
    <button
      type="button"
      onClick={() => setCount(count + 1)}
    >Click ({count})</button>
  ) 
}

export default App;
