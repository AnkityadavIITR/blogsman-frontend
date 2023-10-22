import React from 'react'

const Posts = ({post ,key }) => {
  return (
    <>
    {
        
        post?(
        <div className='max-w-[800px]  mx-auto justify-between border-2 rounded-[10px] p-6 mt-5'>
            <h1 className='text-2xl font-bold'>{post?.title}</h1>
            <p className='text-md'>{post?.content}</p>
        </div>)
        :(<p>No post added</p>)
    }
    </>
  )
}

export default Posts
