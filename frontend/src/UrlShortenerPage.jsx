import {useEffect, useState} from 'react';
import {getLink} from './_requests';
import {useParams} from 'react-router';

export default function UrlShortenerPage() {
    const [err, setErr] = useState('');
    const {id} = useParams();

    const showError = err && (
        <div>
            <span className="text-error">{err}</span>
        </div>
    );

    useEffect(() => {
        getLink(id)
            .then((res) => res.json())
            .then(({shortened_url}) => {
                window.location.href = shortened_url;
            })
            .catch((e) => setErr(e?.message ?? 'error'));
    }, [id]);

    if (err) return showError;

    return <h1>Loading..</h1>;
}
