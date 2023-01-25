import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Home from './pages/Home';
import { store } from './redux/store';

const persistor = persistStore(store)

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
    uri: 'https://jobhunt.onrender.com/graphql',
    cache,
});

function App() {
    return (
        <>
            <PersistGate persistor={persistor}>
                <Provider store={store}>
                    <ApolloProvider client={client}>
                        <Router>
                            <Routes>
                                <Route>
                                    <Route path="/" element={<Home />} />
                                </Route>
                            </Routes>
                        </Router>
                    </ApolloProvider>
                </Provider>
            </PersistGate>
        </>
    );
}

export default App;
