import React, { useState } from 'react';
import JobForm from './JobForm';

type Props = {};

const Try = (props: Props) => {
    const [showForm, setShowForm] = useState(false);
    return (
        <div className=''>
            <div className="section has-background-info texture2">
                {!showForm && (
                    <button
                        className="button is-primary is-light"
                        onClick={() => setShowForm(true)}
                    >
                        Add a new job
                    </button>
                )}
                {showForm && (
                    <div className="column is-half has-background-white box is-offset-one-quarter rounded">
                        <h1 className="is-size-4 pt-6 px-4 has-text-centered has-text-weight-bold">
                            Job Application
                        </h1>
                        <JobForm show={setShowForm} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Try;
