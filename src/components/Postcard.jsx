import React from 'react';

const Card=()=> {
  return (
    <div className='max-w-[500px] mx-auto flex flex-col border-[1px] border-slate-400 rounded-b-3xl'>
        <section className='max-w-[500px]'>
            <img src={"https://res.cloudinary.com/dj9mg9kwa/image/upload/v1698401026/skcyh0hhvatmugutx10v.jpg"} alt="" className='h-[300px] w-[100%] object-fit' />
        </section>
        <section className='md:p-4 sm:p-2'>
            <h3 className='text-2xl font-semibold text-center' >Hey</h3>
        </section>

    </div>
  );
}
export default Card