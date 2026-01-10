import {useEffect, useState} from 'react';
import {getStats} from './_requests';
import {useParams} from 'react-router';

export default function StatisticsPage() {
    const [count, setCount] = useState('');
    const [err, setErr] = useState('');
    const {id} = useParams();

    useEffect(() => {
        getStats(id)
            .then((res) => res.json())
            .then(({visits}) => {
                setCount(visits);
            })
            .catch((e) => setErr(e?.message ?? 'error'));
    }, [id]);

    const showError = err && (
        <div>
            <span className="text-error">{err}</span>
        </div>
    );
    return (
        <div className="container">
            <span className="header"> URL statistics </span>
            <div className="container-generate">Link has been clicked: {count}</div>
            {showError}
        </div>
    );
}
