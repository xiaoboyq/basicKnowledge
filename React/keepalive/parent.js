import React from 'react'
import { AliveScope } from '../components/keepAlive'
import Index from 'index'

export default function parent() {
  return (
    <AliveScope>
      <div>parent</div>
      <Index/>
    </AliveScope>

  )
}
