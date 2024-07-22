import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

function Categories() {
  const categories = [
    { name: "Healthy and Tasty", image: "/catagory/healthy foods.png", slug: "diet=balanced" },
    { name: "Quick and Easy", image: "/catagory/Quick and Easy (1).png", slug: "time=10" },
    { name: "Vegetarian", image: "/catagory/veg.png", slug: "health=vegetarian" },
    { name: "Vegan", image: "/catagory/veg.jpg", slug: "health=vegan" },
    { name: "Low Carb", image: "/catagory/low carb.png", slug: "diet=low-carb" },
    { name: "High Protein", image: "/catagory/high protein.jpg", slug: "diet=high-protein" },
    { name: "Sweets", image: "/catagory/sweets.jpg", slug: "dishType=Sweets" },
    { name: "Deserts", image: "/catagory/desert.jpg", slug: "dishType=Desserts" },
    { name: "Beverages", image: "/catagory/Beverages.jpg", slug: "dishType=Drinks" }
  ]

  return (
    <div className='ml-1 lg:ml-36 mb-14 dark:bg-black dark:text-white'>
      <h3 className='text-lg lg:text-xl font-semibold ml-2 lg:ml-0 mt-3'>Browse By Popular Categories</h3>
      <div className='flex flex-wrap space-y-4 lg:mr-36 justify-between lg:justify-start'>
        <div className='hidden lg:visible'></div>
        {categories.map((category, index) => (
          <Link href={`/search/${category.slug}`} key={index} className='basis1/2 lg:basis-1/5'>
            <Image 
              src={category.image} 
              alt={category.name} 
              width={176} 
              height={99} 
              className='rounded-xl px-1 lg:px-0'
            />
            <div className="text-center lg:text-left text-sm lg:text-lg font-semibold mt-2">{category.name}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories