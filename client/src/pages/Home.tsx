import JobList from '../components/JobList';
import Actions from '../components/ActionBar';
import logo from '../assets/JHLOGO.svg';
import { useSelector } from 'react-redux';
import { Login } from '../components/Login';

type Props = {};

const Home = (props: Props) => {
    const auth: any = useSelector((state: any) => state.currentState.value)

    console.log(auth.length);

    if (auth.length === 0) {
        return <Login />
    }

    return (
        <>
            <div className="hero">
                <div>
                    <img src={logo} alt="Logo" />
                    <h1>Job Hunting</h1>
                    <h4>Organize your job search</h4>
                </div>
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
