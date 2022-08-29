import React, { useEffect } from 'react';
import Child from 'Child';// 业务组件
import KeepAlive from '@/components/keepAlive'

export default () => {
  return <KeepAlive id={window.location.pathname}><Child /></KeepAlive>;
};
