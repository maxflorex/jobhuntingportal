import React, { useState } from 'react';
import JobForm from './JobForm';
import SearchJobs from './SearchJobs';

type Props = {};

const Try = (props: Props) => {
    const [showForm, setShowForm] = useState(false);
    return (
        <div className="try">
            <div className={`${showForm ? 'active-search' : 'try-options'}`}>
                {!showForm && (
                    <button
                        className=""
                        onClick={() => setShowForm(true)}
                    >
                        Add a new job
                    </button>
                )}
                <SearchJobs />
            </div>
            {showForm && <JobForm show={setShowForm} />}
        </div>
    );
};

export default Try;
