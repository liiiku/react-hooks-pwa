import React, { Component, PureComponent, useState, useMemo, memo, useEffect, useCallback, useRef } from 'react';

// const Counter = memo(function Counter(props) {
//   console.log('counter render');
//   return (
//     <h1 onClick={props.onClick}>{props.count}</h1>
//   )
// })

class Counter extends PureComponent {
  speak() {
    console.log(`now counter is: ${this.props.count}`)
  }
  render() {
    const { props } = this;
    return (
      <h1 onClick={props.onClick}>{props.count}</h1>
    )
  }
}

function App (props) {
  // 如果点击按钮的时候，setCount传入0，传入的的count的值没有变化，组件是不会重新渲染的
  const [count, setCount] = useState(0);
  const counterRef = useRef();
  let it = useRef();

  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000);
  }, []);

  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current);
    }
  })

  // 参数和useEffect是一样的
  // 调用时机是不一样的，useEffect 是副作用，所以在render 渲染之后再运行
  // useMemo 是要有返回值的，而且返回值可以直接参与渲染，所以useMemo是在渲染期间完成的
  const double = useMemo(() => {
    return count * 2;
  }, [count === 3]); // 这里不是说是false就不执行了，这里是和上一次的值做比较，如果不同就执行useMemo中的函数

  const half = useMemo(() => {
    return double / 4
  }, [double])

  // App 重渲染后，onClick 句柄的变化，导致Counter也被连带重新渲染了，但是他不来不应该这样的
  // const onClick = () => {
  //   console.log('click');
  // }

  // const onClick = useMemo(() => {
  //   return () => {
  //     console.log('click');
  //   }
  // }, [])

  // 如果useMemo返回的是一个函数，就可以用useCallback来省略顶层的函数
  const onClick = useCallback(() => {
      console.log('click');
      // console.log(counterRef.current);
      counterRef.current.speak();
  }, [counterRef]);

  return (
    <div>
      <button
      type="button"
      onClick={() => setCount(count + 1)}
      >
        Click ({count}), Double: ({double}), Half: ({half})
      </button>
      <Counter ref={counterRef} count={double} onClick={onClick} />
    </div>
  ) 
}

export default App;
