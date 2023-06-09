import Hero from '../components/Hero';
import FeatureWithSteps from '../components/Steps'


function Homepage() {
  
  return (
  <section style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems:"center", width: "100%", gap:"20px"}}>
    <Hero />
    <FeatureWithSteps/>
  </section>
    
  )
}

export default Homepage