import JobList from '../components/JobList';
import Try from '../components/Try';
import logo from '../assets/JHLOGO.svg';
import Footer from '../components/Footer';
import SearchJobs from '../components/SearchJobs';

type Props = {};

const Home = (props: Props) => {
    return (
        <>
            <section className="section is-medium has-background-link texture sticky">
                <div className="container">
                    <img src={logo} alt="" className="image is-64x64 mb-1" />
                    <h1 className="title has-text-white">Job Hunting</h1>
                    <h2 className="subtitle has-text-white">
                        Organize your job search
                    </h2>
                </div>
            </section>
            <Try />
            <JobList />
            <Footer />
        </>
    );
};

export default Home;
