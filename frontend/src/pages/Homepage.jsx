import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import logo from '../images/Vector.png'
import landingImage from "../images/bnr-article-foodbeverage-ai.avif"
import { GenerateRecipeButton } from '../components/GenerateRecipeButton'


function Homepage() {
  const navigate = useNavigate()
  
  const onSubmit = (e) => {
    e.preventDefault()

    navigate('/generate')
  }

  return (
    <>
      <section className='heading'>
        <h1>Meet RecipeBot, AI in your kitchen</h1>
        <p>Subtext</p>
      </section>

      <section className='content'>
       <div>
        <img className='landingImage' src={landingImage} />
        <p>description text............................................................</p>
       </div>
       <div className="form-group">
         <GenerateRecipeButton />
      </div>
      </section>
    </>
  )
}

export default Homepage