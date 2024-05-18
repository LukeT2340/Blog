import { useState, useEffect } from 'react';

export const useBlog = (blogTitle) => {
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/blog/getOne/?blogTitle=${blogTitle}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.error || 'Unknown server error. Please try again later.');
                    return
                }

                const json = await response.json();
                setBlog(json);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlog();
    }, []);  
    
    return { blog, isLoading, error };
}

export default useBlog;
