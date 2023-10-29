import React from 'react'
import { Context } from '../main'
import { useContext } from 'react'

const Posts = ({ key,title,author,image, content,date }) => {
  const {user}=useContext(Context);
  return (
    <>
        <div className='max-w-[700px]  mx-auto justify-between border-2 rounded-[10px] p-6 mt-5' id={key}>
          <section className='flex pb-2 border-b-2 '>
            {
              image?(
                <span className='w-9 rounded-full overflow-hidden mr-3'>
                  <img src={image}   className=' object-cover w-full h-full' alt="" />
                </span>
              ):(
                <span className='w-9 rounded-full overflow-hidden mr-3'>
                  <img src={user.photo.url}   className=' object-cover w-full h-full' alt="" />
                </span>
              )
            }
            <h1 className='text-lg my-auto'>{author}</h1>

          </section>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='text-md'>{content}</p>
            <p className='text-sm'>{date}</p>

            <section className='border-t-2'>
              
            </section>
        </div>
    
    </>
  )
}

export default Posts
