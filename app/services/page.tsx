import React from 'react'
import Cta from '../components/homepage/Cta'
import Faq from '../components/services/Faq'
import Features from '../components/services/Features'
import Hero from '../components/services/Hero'
import Pricing from '../components/services/Pricing'
import Stats from '../components/services/Stats'

export default function Services() {
  return (
    <main>
        <Hero/>
        <Stats/>
        <Features/>
        <Pricing/>
        <Cta/>
        <Faq/>
    </main>
  )
}
