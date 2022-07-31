import React from 'react';
import JobForm from './JobForm';

type Props = {};

const Try = (props: Props) => {
    return (
        <div>
            <div className="section has-background-info texture2">
                <div className="column is-half has-background-white box is-offset-one-quarter rounded">
                    <h1 className="is-size-4 pt-6 px-4 has-text-centered has-text-weight-bold">
                        Job Application
                    </h1>
                    {/* <div className="icon column is-centered is-offset-4">
                        <span className="material-icons ">&#xE87C;</span>
                    </div> */}
                    <JobForm />
                </div>
            </div>
        </div>
    );
};

export default Try;
