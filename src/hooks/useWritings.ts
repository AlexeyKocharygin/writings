import { useSelector } from 'react-tagged-state';
import { useEffect, useState } from 'react';
import { userState } from '../store/states/userState';
import { fetchWritings } from '../actions/fetchWritings';

export const useWritings = (): boolean => {
    const user = useSelector(userState);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetchWritings()
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, [user]);

    return isLoading;
};
