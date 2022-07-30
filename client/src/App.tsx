import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

// PREVENT CACHE WARING
const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                jobs: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
                interviews: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
            },
        },
    },
});

// APOLLO CLIENT
const client: any = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache,
});

function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <Router>
                    <Routes>
                        <Route>
                            <Route path="/" element={<Home />} />
                        </Route>
                    </Routes>
                </Router>
            </ApolloProvider>
        </>
    );
}

export default App;
