const express = require('./myexpress')
const app = express();

app.get('/', (req, res)=>{
 res.end('12312')
})

app.listen(3000, ()=>{
  console.log('app listen')
})