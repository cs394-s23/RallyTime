import { useEffect } from "react"
import { handleGoogleSignIn } from "./Firebase"

const LandingPage = () => {

    return (
        <div className='landing'>
            <h1>Welcome to the Landing Page</h1>
            <p>Please sign in with your email to continue.</p>
            <button onClick={handleGoogleSignIn} className='signin'>Sign in with Google</button>
        </div>
    )
}

export default LandingPage