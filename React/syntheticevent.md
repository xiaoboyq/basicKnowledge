
# react 16
```javascript
    document.addEventListener('click', dispatchEvent)

    function dispatchEvent(e) {
      const paths = [];
      let current = e.target;
      while(current) {
        paths.push(current);
        current = current.parentNode;
      }

     for(let i = 0; i < paths.length; i++) {
        let hander =  paths[i].onClick;
        hander&&hander()
     }

      for(let i = paths.length - 1 ; i >= 0; i--) {
          let hander =  paths[i].onClickCapture;
          hander&&hander()
      }
  }


 document.addEventListener('click', function() {
   //xxx
 })

  document.addEventListener('click', function() {
   //xxx
 },true)

e.nativeEvent.stopImmediatePropagation()
```

```javascript
componentDidMount() {
  document.addEventListener('click', ()=>{
    this.setState({
      modalVisible: false
    })
  })
}

  clickBtn = e=>{
    e.nativeEvent.stopImmediatePropagation()
      this.setState({
      modalVisible: true
    })
  }

  render() {
    return <div>
    <button onClick={clickBtn}>显示</button>
    {
      modalVisible&& <Modal />
    }

    </div>
  }



```