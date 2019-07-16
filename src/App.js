import React, { Component, useState, useEffect } from 'react';
import './App.css';

class App2 extends Component {
  state = {
    count: 0,
    size: {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  }
  // 这里使用类属性来声明 onResize ， 如果用类成员函数来声明，就不能保证this的指向
  onResize = () => {
    this.setState({
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    })
  }
  componentDidMount() {
    document.title = this.state.count;

    window.addEventListener('resize', this.onResize, false);
  }
  // 点击按钮改变state之后，同步到document上
  componentDidUpdate() {
    document.title = this.state.count;
  }
  // 很有可能就忘记在组件销毁的时候忘记移除事件
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false);
  }
  render() {
    const { count, size } = this.state;
    return (
      <button
        type="button"
        onClick={() => this.setState({count: count + 1})}
      >
        Click ({count})
        Size: {size.width} * {size.height}
      </button>
    )
  }
}

function App (props) {
  // 如果点击按钮的时候，setCount传入0，传入的的count的值没有变化，组件是不会重新渲染的
  const [count, setCount] = useState(0);
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })

  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }

  // 传入函数可以延迟初始化，也就是只调用一次
  // const [count, setCount] = useState(() => {
  //   console.log('initial count')
  //   return props.defaultCount || 0;
  // })

  // 这样处理 title 和处理 resize 的逻辑是分别在不同的useEffect中的，这就是关注点分离，每个useEffect只处理一个逻辑
  useEffect(() => {
    document.title = count;
  })

  // 有一个问题：既然useEffect每次渲染后都运行，难道就要不停的绑定和解绑么？不需要，只需要给unsEffect传递一个空数组参数就能避免这种情况
  // 只有数组中的每一项都不变的情况下，useEffect才不会执行
  // 这样绑定函数只会发生在第一次渲染之后，并且在组件卸载之前才会运行解绑函数
  useEffect(() => {
    window.addEventListener('resize', onResize, false);

    // 解绑逻辑
    // 回调函数在视图被销毁前触发，一是重渲染，二是组件卸载
    return () => {
      window.removeEventListener('resize', onResize, false);
    }
  }, [])

  // 只有count变化后，才会有打印，屏幕resize的变化不会有打印
  useEffect(() => {
    console.log('count', count);
  }, [count])

  return (
    <button
      type="button"
      onClick={() => setCount(count + 1)}
    >
      Click ({count})
      Size: {size.width} * {size.height}
    </button>
  ) 
}

export default App;
