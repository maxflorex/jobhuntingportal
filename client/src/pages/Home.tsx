import JobList from '../components/JobList';
import Try from '../components/Try';
import logo from '../assets/JHLOGO.svg';

type Props = {};

const Home = (props: Props) => {
    return (
        <>
            <section className="">
                <div className="hero">
                    <img src={logo} alt="" className="" />
                    <h1 className="">Job Hunting</h1>
                    <h4 className="">Organize your job search</h4>
                </div>
            </section>
            <Try />
            <JobList />
            <footer>
                <p>
                    Designed & developed with ❤ by<a href="https://maxflores.dev" target="_blank" className='ml-1'> Max Flores</a>
                </p>
            </footer>
        </>
    );
};

export default Home;
