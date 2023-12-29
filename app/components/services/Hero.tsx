import React from 'react'
import Link from 'next/link'
export default function Hero() {
    return (
        <div className="relative isolate px-6 pt-14 lg:px-8">
            <div className="mx-auto max-w-2xl pb-24 pt-32 sm:pb-32 lg:pb-48">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Lorem ipsum dolor sit amet.
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                        fugiat veniam occaecat fugiat aliqua.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="/blog"
                            className="rounded-md bg-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
