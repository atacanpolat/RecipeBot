import Hero from '../components/Hero';
import FeatureWithSteps from '../components/Steps'
import TeamSection from '../components/TeamCard';

function Homepage() {
  
  return (
  <section style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems:"center", width: "100%", gap:"20px"}}>
    <Hero />
    <FeatureWithSteps/>
    <TeamSection />
  </section>
    
  )
}

export default Homepage