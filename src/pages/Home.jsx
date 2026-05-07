import Hero from '../components/home/Hero'
import Services from '../components/home/Services'
import FeaturedProducts from '../components/home/FeaturedProducts'
import WhyChooseUs from '../components/home/WhyChooseUs'
import CTA from '../components/home/CTA'
import SectionDivider from '../components/effects/SectionDivider'

export default function Home() {
  return (
    <div>
      <Hero />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <FeaturedProducts />
      <SectionDivider />
      <WhyChooseUs />
      <SectionDivider />
      <CTA />
    </div>
  )
}
