import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <main className="relative isolate overflow-hidden bg-white py-24 sm:py-32">

      {/* Section 1 */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">About us</h2>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
            fugiat veniam occaecat fugiat aliqua.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-800">{stat.name}</dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-gray-600">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Section 2 */}
      <section className='border-t mt-16 sm:mt-[7.125rem] border-gray-200 mx-auto max-w-7xl px-6 lg:px-8'>
        <div className="bg-white pt-[8rem]">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <p className="text-base font-semibold leading-7 text-blue-600">Deploy faster</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better workflow</h1>
              <div className="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-700 lg:max-w-none lg:grid-cols-2">
                <div>
                  <p>
                    Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet
                    vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque
                    erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
                    semper sed amet vitae sed turpis id.
                  </p>
                  <p className="mt-8">
                    Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor
                    fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac
                    adipiscing egestas.
                  </p>
                </div>
                <div>
                  <p>
                    Erat pellentesque dictumst ligula porttitor risus eget et eget. Ultricies tellus felis id dignissim
                    eget. Est augue maecenas risus nulla ultrices congue nunc tortor.
                  </p>
                  <p className="mt-8">
                    Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor
                    fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac
                    adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </main>
  )
}


const stats = [
  { name: 'Offices worldwide', value: '12' },
  { name: 'Full-time colleagues', value: '300+' },
  { name: 'Hours per week', value: '40' },
  { name: 'Paid time off', value: 'Unlimited' },
]
