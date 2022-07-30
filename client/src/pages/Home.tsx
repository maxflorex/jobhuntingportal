import React from 'react';
import JobForm from '../components/JobForm';
import Try from '../components/Try';

type Props = {};

const Home = (props: Props) => {
    return (
        <>
            <section className="section is-medium has-background-link">
                <h1 className="title has-text-white">Job Hunting</h1>
                <h2 className="subtitle has-text-white">
                    Organize your job search
                </h2>
            </section>
            {/* <JobForm /> */}
            <Try />
        </>
    );
};

export default Home;
