import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const Error = ({error}) => {
  return (
    <div className="flex flex-col align-middle justify-center">
      <div className="w-fit h-fit mx-auto">
        <Image
          src="/something_went_wrong img.png"
          alt="no recipes found"
          height={600}
          width={600}
          layout="fixed"
        />
        <div className="text-red-600 text-base lg:text-xl font-medium w-fit mx-auto bg-red-200 dark:bg-red-900 dark:text-red-300 rounded-xl px-4 py-1 mb-3">{error}</div>
        <Link
          href="/"
          className="flex text-green-400 border border-green-400 p-2 h-fit w-fit rounded-xl dark:hover:bg-green-500 dark:hover:text-white hover:bg-green-400 hover:text-white mb-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            fill="currentColor"
            className="bi bi-arrow-left-circle h-fit my-auto mr-3"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
            />
          </svg>
          <span>Back To Home</span>
        </Link>
      </div>
    </div>
  )
}
