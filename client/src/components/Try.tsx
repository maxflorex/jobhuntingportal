import React, { useState } from 'react';
import JobForm from './JobForm';
import SearchJobs from './SearchJobs';

type Props = {};

const Try = (props: Props) => {
    const [showForm, setShowForm] = useState(false);
    return (
        <div className="">
            <div className="section has-background-info texture2">
                <div className="container">
                    <div className="is-flex is-flex-direction-column-reverse">
                        <div className={`is-flex ${showForm && 'is-justify-content-center mt-6'}`}>
                            {!showForm && (
                                <button
                                    className="button is-primary is-light mr-4"
                                    onClick={() => setShowForm(true)}
                                >
                                    Add a new job
                                </button>
                            )}
                            <SearchJobs />
                        </div>
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
            </div>
        </div>
    );
};

export default Try;
