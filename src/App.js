import React, { Component, lazy, Suspense } from 'react';
import './App.css';

const About = lazy(() => import(/* webpackChunkName: "about" */'./About'));

// ErrorBoundary 捕获组件渲染错误的组件 componentDidCatch

class App extends Component {
  state = {
    hasError: false
  }
  // componentDidCatch() {
  //   this.setState({
  //     hasError: true
  //   })
  // }
  static getDerivedStateFromError() {
    return {
      hasError: true
    }
  }
  render() {
    if (this.state.hasError) {
      return <div>error!</div>
    }

    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <About />
        </Suspense>
      </div>
    )
  }
}

export default App;
