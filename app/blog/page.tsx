import React from 'react'
import moment from 'moment';
interface Post {
  attributes: any;
}
export default async function Blog() {
  const post = await getData()  
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Discover, Learn, and Inspire!
          </h2>
          <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
            {post.data.map((post: Post, index: any) => (
              <div key={index}>
                 <article key={post.attributes.slug} className="flex max-w-xl flex-col items-start justify-between">
                  <div className="flex items-center gap-x-4 text-xs">
                    <span>{moment(post.attributes.updatedAt).format('MMMM Do YYYY')}</span>
                    <a
                      href={`/blog/${post.attributes.category.data.attributes.slug}`}
                      className="relative z-10 rounded-full bg-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 capitalize"
                    >
                      {post.attributes.category.data.attributes.title}
                    </a>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href={`/blog/${post.attributes.category.data.attributes.slug}/${post.attributes.route}`}>
                        <span className="absolute inset-0" />
                        {post.attributes.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.attributes.description}</p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <div className="text-sm leading-6">
                     
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>  )
}


async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?populate=*&sort[0]=updatedAt:desc`, {
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
  }});
  
  if (!res.ok) {
    console.error(`Failed to fetch posts. Status: ${res.status}`);
    throw new Error('Failed to fetch posts.');
  }

  return res.json()
}