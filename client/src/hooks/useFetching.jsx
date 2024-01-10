import { useState } from 'react';

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...arg) => {
        try {
            
            setIsLoading(true);
            await callback(...arg);
            console.log('fetching');
        } catch (error) {
            setError(error?.response?.data?.message);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000)
            
        }
    }

    return [fetching, isLoading, error]
}