import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {createLink} from './_requests';

const schema = z.object({
    url: z.httpUrl({message: 'Incorrect URL'}),
});

export default function LandingPage() {
    const [err, setErr] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm({
        defaultValues: {
            url: 'https://',
        },
        resolver: zodResolver(schema),
        mode: 'onChange',
    });

    const showError = err && (
        <div>
            <span className="text-error">{err}</span>
        </div>
    );

    const onSubmit = async ({url}) => {
        const body = {url};
        createLink(body)
            .then(async (res) => {
                const json = await res.json();

                console.log(json.url);
                setShortUrl(json.url);
            })
            .catch((e) => setErr(e?.message ?? 'error'));
    };

    const location = window.location.href.split('generate')[0];

    return (
        <div className="container">
            <span className="header"> URL shortener </span>
            {shortUrl && <a className="header">{`${location}${shortUrl}`}</a>}

            <form className="container-generate" onSubmit={handleSubmit(onSubmit)}>
                <input className="input" {...register('url')} />
                <button className="button" type="submit" disabled={!isValid}>
                    Generate url
                </button>
            </form>
            {errors.url && <p className="text-error">{errors.url.message}</p>}
            {showError}
        </div>
    );
}
