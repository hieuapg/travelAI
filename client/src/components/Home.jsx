import React from 'react'
import MAP from '../assets/3d-casual-life-trail-map.png'
import '../css/Home.css'

const Home = () => {
  return (
    <div className="background">
      <div className="container container-grid">
        {/* Col 1 */}
        <div>
          <h1>Let AI design <br></br> your road trip!</h1>
          <p>
            Transform your road trips with AI magic.<br></br> Crafted routes. Curated
            experiences. Crystal-clear adventures.
          </p>
          <a href="/login" className="btn-home"> 
            Start the magic!
          </a>
        </div>
        {/* Col 2 */}

        <div className="image-fit up-down">
          <img
            className="drop-shadow"
            src="https://img.pikbest.com/origin/09/24/92/79bpIkbEsTgTF.png!sw800"
            alt="robot image"
          />
        </div>

        {/* Col 3 */}
        <div className="image-fit ">
          <img className="up-down drop-shadow" src={MAP} />
        </div>
      </div>
    </div>
  )
}

export default Home