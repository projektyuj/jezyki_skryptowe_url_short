import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createLink } from './_requests';

const schema = z.object({
    link: z.httpUrl({ message: 'Incorrect URL' }),
});

export default function LandingPage() {
    const [err, setErr] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            link: 'https://',
        },
        resolver: zodResolver(schema),
        mode: 'onChange'
    });

    //fetching error
    const showError = err && (
        <div>
            <span className='text-error'>{err}</span>
        </div>
    );

    const onSubmit = async ({link} ) => {
        createLink({link}).then(res => setShortUrl(res)).catch(e => setErr(e?.message ?? 'error'));
    }
    return (
        <div className='container'>
            <span className='header'> URL shortener </span>
            {shortUrl && <a className='header'>{shortUrl}</a>}
            
            <form className='container-generate' onSubmit={handleSubmit(onSubmit)}>
                <input className='input' {...register('link')} />
                <button className='button' type='submit' disabled={!isValid}>
                    Generate url
                </button>
            </form>
            {errors.link && <p className='text-error'>{errors.link.message}</p>}
            {showError}
        </div>
    );
}
