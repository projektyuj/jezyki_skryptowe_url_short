import { useState } from 'react';

export default function StatisticsPage() {
    const [count, setCount] = useState('');
    const [err, setErr] = useState('');
    //input link, formik form
    //add mobile , increase font, move button lower, increase input size
    const showError = err && (
        <div>
            <span className='text-error'>{err}</span>
        </div>
    );
    return (
        <div className='container'>
            <span className='header'> URL statistics </span>
            <div className='container-generate'>Link has been clicked: {count}</div>
            {showError}
        </div>
    );
}
