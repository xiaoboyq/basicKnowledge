
import React, { useEffect } from 'react'


const About = lazy(()=> new Promise((resolve)=>{
  setTimeout(resolve({
    default: <div>动态加载的about组件</div>
  }), 1000)
})
)

// 该组件是动态加载的
const OtherComponent = _lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // 显示 <Spinner> 组件直至 OtherComponent 加载完成
    <_Suspence fallback={<div>加载中...</div>}>
      <div>
        <OtherComponent />
      </div>
    </_Suspence>
  );
}


// suspence 利用componentDidCatch

import React, { Component } from 'react'

export default class _Suspence extends Component {
  state = {
    isRender: true
  }
  componentDidCatch(e) {
    this.setState({isRender: false});
    e.promise.then(()=>{
      this.setState({isRender: true})
    })
  }
  render() {
    const { fallbcak, children } = this.props;
    const { isRender } = this.state;
    return (
      <div> {
        isRender ?  children : fallbcak 
        }
      </div>
    )
  }
}




// 
function _lazy(fn) {
  const fetcher = {
    status: 'pending',
    result: null,
    promise: null
  }

  return function MyComponent() {
    const fetcherPromise = fn();
    fetcher.promise = fetcherPromise;
    fetcherPromise.then(res=>{
      fetcher.status = 'resolve';
      fetcher.result = res.default
    })

    useEffect(()=>{
      if(fetcher.status === 'pending') {
        throw fetcher
      }
    },[])

    if(fetcher.status === 'resolve') {
      return fetcher.result
    }
    return null;
  }

}
