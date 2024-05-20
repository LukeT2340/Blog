import { useState } from 'react';

// Deletes blog
export const useDelete = () => {
    const [deletionError, setDeletionError] = useState(null);
    const [successfullyDeleted, setSuccessfullyDeleted] = useState(null);

    const deleteBlog = async(blogId) => {
        setDeletionError(null);

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
            setSuccessfullyDeleted(false);
            setDeletionError(errorData.message || 'Unknown server error. Please try again later.');
        }

        // Handle successful deletion
        if (response.ok) {
            const json = await response.json();        
            setSuccessfullyDeleted(true);
        }
    }

    return { deleteBlog, successfullyDeleted, deletionError } ;
};