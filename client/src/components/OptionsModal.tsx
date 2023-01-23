import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signoutCurrent } from '../redux/userSlice'
import { DeleteConfirmation } from './DeleteConfirmation'

interface Props {
    setShowOptions: any
}

const OptionsModal = ({ setShowOptions }: Props) => {
    const [expand, setExpand] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const user: any = useSelector((state: any) => state.currentState.value)
    const dispatch = useDispatch()
    const [deleting, setDeleting] = useState('')

    const closeModal = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setShowOptions(false);
        document.body.style.overflow = 'auto'
    };

    const handleConfirm = (e: React.SyntheticEvent, item: string) => {
        e.preventDefault()
        setConfirm(true)
        setDeleting(item)
    }

    // LOGOUT
    const logOut = (e: any) => {
        e.preventDefault()
        dispatch(signoutCurrent())
    }

    return (
        <div className='modal'>
            <div className="flex-center">
                <h1>Options</h1>
                <button onClick={closeModal} className='dismiss btn-close mod'><span className="material-symbols-outlined">close</span></button>
                <button onClick={logOut} className='logout'>Logout</button>
                <div>
                    <div className="flex-row" style={{ margin: '2rem 0' }}>
                        <h3 onClick={() => setExpand(!expand)} style={{ cursor: 'pointer' }}>Welcome, {user.username}
                            <span className="material-symbols-outlined">
                                {expand
                                    ?
                                    'expand_less'
                                    :
                                    'expand_more'
                                }
                            </span>
                        </h3>

                    </div>

                    {confirm && <DeleteConfirmation setConfirm={setConfirm} deleting={deleting} closeModal={closeModal} />}
                    {expand && !confirm &&
                        <div className='flex-row' style={{ gap: '1rem' }}>
                            <button onClick={(e) => handleConfirm(e, 'user')}>Delete Profile</button>
                            <button onClick={(e) => handleConfirm(e, 'jobs')} className='mod'>Delete All Jobs</button>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default OptionsModal
