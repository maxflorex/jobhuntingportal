import React, { useState } from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'

interface Props {
    setShowOptions: any
}

const OptionsModal = ({ setShowOptions }: Props) => {
    const [expand, setExpand] = useState(false)
    const [confirm, setConfirm] = useState(false)

    const closeModal = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setShowOptions(false);
        document.body.style.overflow = 'auto'
    };

    const handleConfirm = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setConfirm(true)
    }

    return (
        <div className='modal'>
            <div className="flex-center">
                <h1>Options</h1>
                <button onClick={closeModal} className='dismiss btn-close mod'><span className="material-symbols-outlined">close</span></button>
                <div>
                    <div className="flex-row" style={{margin: '2rem 0'}}>
                        <h3 onClick={() => setExpand(!expand)} style={{ cursor: 'pointer' }}>Welcome, User
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

                    {confirm && <DeleteConfirmation setConfirm={setConfirm} />}
                    {expand && !confirm &&
                        <div className='flex-row' style={{ gap: '1rem' }}>
                            <button onClick={handleConfirm}>Delete Profile</button>
                            <button onClick={handleConfirm} className='mod'>Delete All Jobs</button>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default OptionsModal
