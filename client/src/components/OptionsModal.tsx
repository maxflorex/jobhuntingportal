import React from 'react'

interface Props {
    setShowOptions: any
}

const OptionsModal = ({ setShowOptions }: Props) => {

    const closeModal = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setShowOptions(false);
        document.body.style.overflow = 'auto'
    };

    return (
        <div className='modal'>
            <div className="flex-center">
                <h1>Options</h1>
                <button onClick={closeModal} className='dismiss btn-close mod'><span className="material-symbols-outlined">close</span></button>

                <div className="flex-center" style={{ gap: '1rem' }}>
                    <h2 className='link'>Profile</h2>
                    <h2 className='link'>Delete All Jobs</h2>
                </div>

            </div>
        </div>
    )
}

export default OptionsModal
