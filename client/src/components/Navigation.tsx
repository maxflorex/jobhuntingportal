import React, { useState } from 'react'
import JobForm from './JobForm'
import OptionsModal from './OptionsModal'

type Props = {}

const Navigation = (props: Props) => {
    const [showForm, setShowForm] = useState(false);
    const [showOptions, setShowOptions] = useState(false)

    const handleShowOptions = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setShowOptions(true)
        document.body.style.overflow = 'hidden'
    }

    const handleShowForm = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setShowForm(true)
        document.body.style.overflow = 'hidden'
    }

    return (
        <header>
            <nav>
                <button
                    className="btn-danger"
                    style={{ margin: 0, padding: '0.2rem' }}
                    onClick={handleShowOptions}
                >
                    <span className="material-symbols-outlined">apps</span>
                </button>
                <button
                    onClick={handleShowForm}
                >
                    Add a new job
                </button>
            </nav>
            {showForm && <JobForm show={setShowForm} />}
            {showOptions && <OptionsModal setShowOptions={setShowOptions} />}
        </header>
    )
}

export default Navigation