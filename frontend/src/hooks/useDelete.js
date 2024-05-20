import { useState } from 'react';

// Deletes blog
export const useDelete = () => {
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(null);

    const deleteBlog = async(blogId) => {
        setError(null);

        // Retrieve token from storage
        const adminJson = localStorage.getItem('admin');
        const admin = JSON.parse(adminJson);
        const token = admin.token;

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/blog/delete`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({blogId: blogId})
        });

        // Handle unsuccessful deletion
        if (!response.ok) {
            const errorData = await response.json();
            setIsSuccess(false);
            console.log(errorData);
            setError(errorData.errorMessage || 'Unknown server error. Please try again later.');
        }

        // Handle successful deletion
        if (response.ok) {
            const json = await response.json();        
            setIsSuccess(true);
        }
    }

    return { deleteBlog, isSuccess, error };
};