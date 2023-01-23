import React from 'react'

type Props = {
    setShowReg: any
}

const Signup = ({ setShowReg }: Props) => {
    return (
        <form>
            <h3>Sign Up</h3>
            <label>Username</label>
            <input type="text" />
            <label>Email</label>
            <input type="text" />
            <label>Password</label>
            <input type="password" />
            <label>Confirm Password</label>
            <input type="password" />
            <button>Submit</button>
            <p>Already registered? <span className='link' style={{ textUnderlineOffset: '0.6rem' }} onClick={() => setShowReg(false)}>Login</span></p>
        </form>
    )
}

export default Signup