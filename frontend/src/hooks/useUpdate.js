import { useState } from 'react';

// Update blog content
export const useUpdate = () => {
    const [errorUpdatingBlog, setErrorUpdatingBlog] = useState(null);
    const [updateSuccessful, setUpdateSuccessful] = useState(null);

    const update = async(formData) => {
        setErrorUpdatingBlog(null);

        // Retrieve token from storage
        const adminJson = localStorage.getItem('admin');
        const admin = JSON.parse(adminJson);
        const token = admin.token;
        const authorId = admin.user_id;

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/blog/update`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({formData: formData, authorId: authorId})
        });

        // Handle unsuccessful blog update
        if (!response.ok) {
            const errorData = await response.json();
            setUpdateSuccessful(false);
            console.log(errorData);
            setErrorUpdatingBlog(errorData.errorMessage || 'Unknown server error. Please try again later.');
        }

        // Handle successful blog update
        if (response.ok) {
            const json = await response.json();        
            setUpdateSuccessful(true);
        }
    }

    return { update, updateSuccessful, errorUpdatingBlog };
};