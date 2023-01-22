import JobList from '../components/JobList';
import Actions from '../components/ActionBar';
import logo from '../assets/JHLOGO.svg';

type Props = {};

const Home = (props: Props) => {
    return (
        <>
            <div className="hero">
                <img src={logo} alt="" className="" />
                <h1 className="">Job Hunting</h1>
                <h4 className="">Organize your job search</h4>
            </div>
            <Actions />
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
