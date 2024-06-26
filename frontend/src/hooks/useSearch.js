import { useState, useEffect } from 'react';

export const useSearch = (searchText) => {
    const [blogs, setBlogs] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/blog/search/?searchText=${searchText}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Unknown server error. Please try again later.');
                }

                const json = await response.json();
                setBlogs(json);
            } catch (error) {
                setError(error.error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, [searchText]);  
    
    return { blogs, isLoading, error };
}

export default useSearch;
