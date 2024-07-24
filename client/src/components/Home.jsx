import React from "react";
import MAP from "../assets/3d-casual-life-trail-map.png";
import "../css/Home.css";
import { userContext } from "../App";
import { useContext } from "react";

function Home() {
  const user = useContext(userContext);

  return (
    <div className="background">
      <div className="container container-grid">
        {/* Col 1 */}
        {user.username ? (
              <div>
              <h1>
                Welcome, <br></br>{user.username}!
              </h1>
              <p>
                Transform your road trips with AI magic.<br></br> Crafted routes.
                Curated experiences. Crystal-clear adventures.
              </p>
              <a href="/dashboard" className="btn-home">
                Start the magic!
              </a>
            </div>
            ) : (
              <div>
          <h1>
            Let AI design <br></br> your road trip!
          </h1>
          <p>
            Transform your road trips with AI magic.<br></br> Crafted routes.
            Curated experiences. Crystal-clear adventures.
          </p>
          <a href="/signup" className="btn-home">
            Join us now!
          </a>
        </div>
            )}
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
  );
}

export default Home;