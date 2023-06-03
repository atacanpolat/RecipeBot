import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import logo from '../images/Vector.png'
import landingImage from "../images/bnr-article-foodbeverage-ai.avif"
import Hero from '../components/Hero';
import FeatureWithSteps from '../components/Steps'
import tw from 'twin.macro'
import HeroScreenshotImage from '../images/hero-screenshot-2.png'

function Homepage() {
  
  return (
  <section>
    <Hero />
    <FeatureWithSteps/>
  </section>
    
  )
}

export default Homepage