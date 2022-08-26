import React, { useRef, useState } from 'react'
import { Button, Input, } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Translate, Avatar, DarkMode, WavesLeft, Github } from '@icon-park/react'

export default function Header() {

  const [search, setSearch] = useState(false)
  const searchInputRef: any = useRef(null)
  const searchHandled = function () {
    setSearch(!search)
    searchInputRef.focus()
  }

  return (
    <div className='h-16 border-b border-gray-300'>
      <div className='container mx-auto h-full flex justify-between items-center'>
        <div className='flex'>
          <a href="/" className='mr-4 flex items-center gap-1'>
            <WavesLeft theme="outline" size="24" fill="#D43030" />
            <span className='text-xl text-gray-800'>Music</span>
          </a>

          <Button type="text">推荐</Button>
          <Button type="text">排行</Button>
          <Button type="text">歌单</Button>
          <Button type="text">歌手</Button>



          {!search && <Button shape="circle" icon={<SearchOutlined />} onClick={searchHandled} />}
          {search && <Input placeholder="开始搜索" ref={searchInputRef} size="small" />}
        </div>

        <div className='flex gap-4'>
          <DarkMode theme="outline" size="24" fill="#333" className='cursor-pointer' />
          <Translate theme="outline" size="24" fill="#333" className='cursor-pointer' />
          <Avatar theme="outline" size="24" fill="#333" className='cursor-pointer' />
          <div className='border-r border-gray-200'></div>
          <Github theme="outline" size="24" fill="#333" />
        </div>
      </div>
    </div >
  )
}

