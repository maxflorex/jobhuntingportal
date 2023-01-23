import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { USER_LOGIN } from '../mutations/JobMutation'
import { currentUser } from '../redux/userSlice'
import Signup from './Signup'

type Props = {}

export const Login = (props: Props) => {
    const [showReg, setShowReg] = useState(false)
    const [newUser, setNewUser] = useState({
        username: '',
        pw: ''
    })
    const { username, pw } = newUser
    const dispatch = useDispatch()

    // LOGIN MUTATION
    const [userLogin]: any = useMutation(USER_LOGIN, {
        variables: { username, pw }
    })

    // HANDLE CHANGE
    const handleChange = (e: any) => {
        setNewUser({
            ...newUser, [e.target.name]: e.target.value
        })
    }
    
    // SIGNIN
    const signIn = (e: any) => {

        e.preventDefault()

        userLogin(username, pw).then((res: any) => {
            const user = res.data.userLogin

            if (user !== null) {
                dispatch(currentUser(user))

                document.body.style.overflow = 'visible'
            } else {
                alert('Wrong ID or Password');
            }
            
        }).catch(() => {
            alert('Wrong ID or Password');
        })
    }
    


    return (
        <div className='modal'>
            <div className="flex-center">
                {!showReg
                    ?
                    <form onSubmit={signIn}>
                        <h3>Login</h3>
                        <label>Username</label>
                        <input type="text" name='username' value={username} onChange={handleChange} />
                        <label>Password</label>
                        <input type="password" name='pw' value={pw} onChange={handleChange} />
                        <button>Login</button>
                        <p>Need an account? <span className='link mod' style={{ textUnderlineOffset: '0.6rem' }} onClick={() => setShowReg(true)}>Sign Up</span></p>
                    </form>
                    :
                    <Signup setShowReg={setShowReg} />}
            </div>
        </div>
    )
}