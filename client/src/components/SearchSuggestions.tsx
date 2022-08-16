import { chunk } from 'lodash'
import React from 'react'

type Props = {
    data: any
}

const SearchSuggestions = ({ data }: Props) => {
    return (
        <section className='box is-shadowless mt-2 cloumns is-full'>

            <ul className="is-flex-direction-column">

                {data[0].map((job: any, i: number) => {
                    return <li key={i} className="box is-shadowless">
                        <div className="is-flex is-flex-wrap-wrap is-align-content-center">

                        <a href={job.jobDesc} className=''>
                            <div className="columns">

                            <img
                                src={job.logo}
                                onError={(e: any) =>
                                    (e.target.src =
                                        'https://www.turnkeytec.com/wp-content/uploads/2020/07/placeholder-image-400x300.jpg')
                                    }
                                    alt="logo"
                                    className="logoSm mr-4"
                                    />
                                <h2 className="is-size-6 is-italic">
                                    {job.company}
                                </h2>
                            </div>
                            <p className='is-size-7 is-italic'>- Job: {job.jobTitle}</p>
                        </a>
                        </div>
                    </li>
                })}
                <li className='box has-background-warning is-shadowless is-size-7'>{data.length > 1 ? 'Keep Typing...' : 'Type somthing else'}</li>
            </ul>
        </section>
    )
}

export default SearchSuggestions