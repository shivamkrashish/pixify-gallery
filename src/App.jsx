import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [userdata, setUserdata] = useState([])
  const [index, setindex] = useState(1)

  const getdata = async () => {
    const { data } = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`)
    setUserdata(data)
  }

  useEffect(function () {
    getdata()
  }, [index])

  let printuserdata = (
    <h3 className='text-gray-400 text-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      Loading...
    </h3>
  )

  if (userdata.length > 0) {
    printuserdata = userdata.map(function (e, idx) {
      return (
        <div
          key={idx}
          className='bg-white/10 backdrop-blur-md rounded-2xl p-3 shadow-lg hover:scale-105 transition duration-300'
        >
          <a href={e.url} target='_blank' rel="noreferrer">
            <div className='h-40 w-52 overflow-hidden rounded-xl'>
              <img
                className='h-full w-full object-cover hover:scale-110 transition duration-300'
                src={e.download_url}
                alt=""
              />
            </div>
            <h2 className='font-semibold text-center mt-2 text-sm text-gray-200'>
              {e.author}
            </h2>
          </a>
        </div>
      )
    })
  }

  return (
    <div className='bg-gradient-to-br from-black via-gray-900 to-black min-h-screen text-white'>

      {/* Header */}
      <h1 className='text-3xl font-bold text-center py-4 tracking-wide'>
        📸 Image Gallery
      </h1>

      {/* Images */}
      <div className='flex flex-wrap justify-center gap-6 px-4'>
        {printuserdata}
      </div>

      {/* Pagination */}
      <div className='flex justify-center items-center gap-6 py-6'>

        <button
          className='bg-amber-400 hover:bg-amber-500 text-black px-5 py-2 rounded-xl font-semibold shadow-md disabled:opacity-50'
          onClick={() => {
            if (index > 1) {
              setindex(index - 1)
              setUserdata([])
            }
          }}
          disabled={index === 1}
        >
          ⬅ Prev
        </button>

        <h3 className='text-lg font-semibold bg-white/10 px-4 py-2 rounded-lg'>
          Page {index}
        </h3>

        <button
          className='bg-amber-400 hover:bg-amber-500 text-black px-5 py-2 rounded-xl font-semibold shadow-md'
          onClick={() => {
            setindex(index + 1)
            setUserdata([])
          }}
        >
          Next ➡
        </button>

      </div>
    </div>
  )
}

export default App