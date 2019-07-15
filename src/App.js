import React, { Component, PureComponent, memo } from 'react';
import './App.css';

// class Foo extends PureComponent {
//   // 如果上面没有用pureComponent 的话， pureComponet 只有传入属性本身的对比，如果属性的内部发生了变化，就没有办法了
//   // shouldComponentUpdate(nextProps, nextState) {
//   //   console.log('nextProps', nextProps)
//   //   if (nextProps.name === this.props.name) {
//   //     return false;
//   //   }

//   //   return true;
//   // }
//   render() {
//     console.log('hello foo!')
//     return null;
//   }
// }
const Foo = memo(function Foo () {
  console.log('foo render');
  return (
    <div>Foo 组件</div>
  )
})

class App extends Component {
  state = {
    count: 0
  }
  render () {
    return (
      <div>
        <button 
          onClick={() => this.setState({count: this.state.count + 1})}
        >加一</button>
        <Foo name="App" />
      </div>
    )
  }
}

export default App;
