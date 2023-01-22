import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_JOBS } from '../queries/jobQueries';
import _ from 'lodash';
import { useDispatch } from 'react-redux'
import { suggestions } from '../redux/suggestionSlice';

type Props = {};

const SearchJobs = (props: Props) => {
    const [text, setText] = useState('');
    const { loading, error, data } = useQuery(GET_JOBS);
    const dispatch = useDispatch()

    useEffect(() => {
        let matches: any = [];
        if (text.length > 0 && data.jobs) {
            matches = data.jobs.filter((job: any) => {
                const regex = new RegExp(`${text}`, 'gi');
                return job.company.match(regex);
            });
        }
        dispatch(suggestions(matches))
    }, [text])

    const clearText = () => {
        setText('');
    };


    return (
        <>
            <div className='search-input'>
                <span className="material-symbols-outlined">search</span>
                {text.length > 0 &&
                    <span className="material-symbols-outlined mod" onClick={clearText}>close</span>
                }
                <input type="text" value={text} className="input" placeholder='Search Company or Job...' onChange={(e) => setText(e.target.value)} />
            </div>
        </>
    );
};

export default SearchJobs;
