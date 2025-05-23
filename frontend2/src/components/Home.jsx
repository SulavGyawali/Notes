import { useState, useEffect } from 'react'

import Menu from './Menu'
import List from './List'
import Content from './Content'

const Home = () => {
  return (
    <div className='text-white flex h-[100vh] items-center relative overflow-y-hidden'>
      <Menu />
      <List />
      <Content />
    </div>
  )
}

export default Home
