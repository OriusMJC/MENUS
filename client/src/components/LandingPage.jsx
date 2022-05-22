import {Link} from 'react-router-dom'

export default function LandingPage(){
    return(
        <div>
            <h1>PI-Food</h1>
            <Link to='/home'>
                <button>Home</button>
            </Link>
        </div>
        )
}