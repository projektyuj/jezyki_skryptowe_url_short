import './App.css';
import {Routes, Route, Navigate} from 'react-router';
import Layout from './Layout';
import LandingPage from './LandingPage';
import UrlShortenerPage from './UrlShortenerPage';
import StatisticsPage from './StatisticsPage';
import ErrorPage from './ErrorPage';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/generate" replace />} />
                <Route path="/:id" element={<UrlShortenerPage />} exact />
                <Route path="/generate" element={<LandingPage />} />
                <Route path="/metrics/:id" element={<StatisticsPage />} />
                <Route path="/404" element={<ErrorPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>
        </Routes>
    );
}

export default App;

