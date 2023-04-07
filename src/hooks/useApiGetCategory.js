import { useState, useEffect } from 'react';
import { axiosInstance } from '~/utils/axiosInStance';

export const useApiGetCategory = (endpoint, page, year) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalMovie, setTotalMovie] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get(endpoint, {
                    params: { year, page },
                });
                setData(response.data.data.items);
                setTotalMovie(response.data.data.params?.pagination);
            } catch (error) {
                console.log('ERROR:', error);
            }

            setIsLoading(false);
        };

        fetchData();
    }, [endpoint, year, page]);

    return { data, isLoading, totalMovie };
};
