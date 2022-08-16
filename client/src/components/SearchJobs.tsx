import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { GET_JOBS } from '../queries/jobQueries';
import _ from 'lodash';
import SearchSuggestions from './SearchSuggestions';

type Props = {};

const SearchJobs = (props: Props) => {
    const [text, setText] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const { loading, error, data } = useQuery(GET_JOBS);

    // FILTERING JOBS BASED ON SEARCH
    const onChangeHandler = (text: string) => {
        let matches: any = [];
        if (text.length > 0 && data.jobs) {
            matches = data.jobs.filter((job: any) => {
                const regex = new RegExp(`${text}`, 'gi');
                return job.company.match(regex);
            });
        }
        // CLEAN UP
        setSuggestions(matches);
        setText(text);
    };

    // LOADASH ;)
    const chunked = _.chunk(suggestions, 4);

    // CLICK HANDLER
    const hanldeCLick = (dog: any) => {
        setText('');
    };

    return (
        <>
            <div className='is-flex-direction-column'>
                <div className='z-10 is-full'>
                    <input type="text" className="input " placeholder='Serch Company or Job...' onChange={(e) => onChangeHandler(e.target.value)} />
                </div>
                {chunked.length > 0 &&
                    <SearchSuggestions data={chunked} />
                }
            </div>
        </>
    );
};

export default SearchJobs;
