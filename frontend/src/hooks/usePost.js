import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const usePost = () => {
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(null);

    const post = async(formData) => {
        setError(null);

        // Retrieve token from storage
        const adminJson = localStorage.getItem('admin');
        const admin = JSON.parse(adminJson);
        const token = admin.token;
        const authorId = admin.user_id;

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/postBlog`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({formData: formData, authorId: authorId})
        });

        // Handle unsuccessful sign up
        if (!response.ok) {
            const errorData = await response.json();
            setIsSuccess(false);
            console.log(errorData);
            setError(errorData.errorMessage || 'Unknown server error. Please try again later.');
        }

        // Handle successful sign up
        if (response.ok) {
            const json = await response.json();        
            setIsSuccess(true);
        }
    }

    return { post, isSuccess, error };
};