import React from 'react';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import Try from '../components/Try';
import logo from '../assets/JHLOGO.svg'

type Props = {};

const Home = (props: Props) => {
    return (
        <>
            <section className="section is-medium has-background-link texture sticky">
                <img src={logo} alt="" className='image is-64x64 mb-1' />
                <h1 className="title has-text-white">Job Hunting</h1>
                <h2 className="subtitle has-text-white">
                    Organize your job search
                </h2>
            </section>
            {/* <JobForm /> */}
            <Try />
            <JobList />
        </>
    );
};

export default Home;
