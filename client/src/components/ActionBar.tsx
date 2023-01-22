import React, { useState } from 'react';
import JobForm from './JobForm';
import OptionsModal from './OptionsModal';
import SearchJobs from './SearchJobs';

type Props = {
 
};

const Try = (props: Props) => {
    const [showForm, setShowForm] = useState(false);
    const [showOptions, setShowOptions] = useState(false)

    const exit = () => {
        setShowForm(false)
        document.body.style.overflow = 'visible'
    }

    const handleShowOptions = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setShowOptions(true)
        document.body.style.overflow = 'hidden'
    }

    return (
        <div className="try">
            <div className={`${showForm ? 'active-search' : 'try-options'}`}>
                {!showForm && (
                    <div className='flex-row'>
                        <button
                            className="btn-danger"
                            style={{ margin: 0, padding: '0.2rem' }}
                            onClick={handleShowOptions}
                        >
                            <span className="material-symbols-outlined">apps</span>
                        </button>
                        <button
                            onClick={() => setShowForm(true)}
                        >
                            Add a new job
                        </button>
                    </div>
                )}
                <SearchJobs />
            </div>
            {showForm && <JobForm show={setShowForm} />}
            {showOptions && <OptionsModal setShowOptions={setShowOptions} />}
        </div>
    );
};

export default Try;
