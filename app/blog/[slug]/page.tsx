import React from 'react'
import moment from 'moment'

export async function generateStaticParams() {
  const category = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate=*`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  }).then((res) => res.json())  
 
  return category.data.map((cat: any) => ({
    slug: cat.attributes.slug,
  }))
}

export default async function Category({params}: any) {
  const { slug } = params

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?filters[slug][$eq]=${slug}&populate=*`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      }).then((r) => r.json())
    
  
  const category = res.data[0].attributes
  
  return (
    <div className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl capitalize">{category.title}
        </h2>
        <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
          {category.posts.data.map((post: any, index: any) => (
            <div key={index}>
               <article key={post.attributes.slug} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                <span>{moment(post.attributes.updatedAt).format('MMMM Do YYYY')}</span>
                 
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={`/blog/${category.slug}/${post.attributes.route}`}>
                      <span className="absolute inset-0" />
                      {post.attributes.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.attributes.description}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div> 
  )
}
