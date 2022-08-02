import React from 'react';

type Props = {};

const Footer = (props: Props) => {
    return (
        <div className="section has-background-primary-light texture is-flex is-align-content-center is-justify-content-center">
            <div className="content has-text-centered is-flex is-align-content-center">
                <h6 className='is-flex is-italic'>
                    Designed & developed with{' '}
                    <span className="material-symbols-outlined mx-2">favorite</span> by
                    <a href="https://maxflores.dev" target="_blank" className='ml-1'>Max Flores</a>
                </h6>
            </div>
        </div>
    );
};

export default Footer;
