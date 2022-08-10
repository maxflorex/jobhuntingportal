import React from 'react';

type Props = {};

const SearchJobs = (props: Props) => {
    return (
        <div className='z-10'>
            <input type="text" className="input " placeholder='Serch Company or Job...' />
        </div>
    );
};

export default SearchJobs;
