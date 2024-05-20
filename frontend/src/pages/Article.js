import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useBlog from '../hooks/useBlog';
import styles from './Article.module.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-swift';
import { useNavigate } from "react-router-dom";
import { useDelete } from "../hooks/useDelete";
import { useAuthContext } from "../hooks/useAuthContext";

// Displays the entire article
const Article = () => {
    const { articleTitle } = useParams();
    const { blog, isLoading, error } = useBlog(articleTitle);
    const { deleteBlog, successfullyDeleted, deletionError } = useDelete();
    const [ showFinalDeleteButton, setShowFinalDeleteButton ] = useState(false);
    const { admin } = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (blog && blog.content) {
            // Create a temporary DOM element to parse the HTML content
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(blog.content, 'text/html');

            // Find all <pre> tags
            const preElements = htmlDocument.querySelectorAll('pre');

            // Highlight each code block using PrismJS
            preElements.forEach(pre => {
                const code = pre.innerText; // Get the raw code
                const highlightedCode = Prism.highlight(code, Prism.languages.swift, 'swift'); // Highlight the code
                pre.innerHTML = `<pre class="language-swift">${highlightedCode}</pre>`; // Replace inner content with highlighted code
            });

            // Serialize the updated HTML content
            const highlightedContent = htmlDocument.body.innerHTML;

            // Update the blog content with highlighted content
            document.getElementById('blog-content').innerHTML = highlightedContent;
        }
    }, [blog]);

    // If user clicks the delete button, an 'are you sure' prompt will appear.
    const handleFirstDeleteButtonClicked = () => {
        setShowFinalDeleteButton(true);
    }

    // Delete the blog post
    const handleFinalDeleteButtonClicked = async () => {
        await deleteBlog(blog.id);
    }

    // Navigate to the page where the user can edit the article
    const handleEditButtonClicked = () => {
        navigate(`/editBlog/${articleTitle}`)
    }

    const handleCancelDelete = () => {
        setShowFinalDeleteButton(false);
    }

    if (isLoading) {
        return <div className={styles.loadingPage}></div>;
    }

    if (error) {
        navigate('/articles');
    }

    return (
        <div className='container col-lg-7 col-sm-12 py-0'>
            {blog && (
                <>
                <div className='d-flex'>
                    <h6 className={`${styles.currentDirectory}`}>
{`Articles -> SwiftUI -> ${blog.category} -> ${blog.title}`}</h6>

                        {successfullyDeleted ? (
                            <h5 className='ms-auto'>Blog deleted.</h5>
                        ) : <>
                        {deletionError && (
                            <h5 className='ms-auto'>Error deleting blog.</h5>
                        )}
                        {admin && (
                            <>
                                {showFinalDeleteButton ? (
                                <div className='ms-auto'>
                                    <button className={` ${styles.deleteButton}`} onClick={handleFinalDeleteButtonClicked}>Confirm Delete</button>
                                    <button className={`${styles.cancelButton}`} onClick={handleCancelDelete}>Cancel</button>
                                </div>
                            ) : (
                                <div className='ms-auto'>
                                    <button className={`${styles.editButton}`} onClick={handleEditButtonClicked}>Edit</button>
                                    <button className={` ${styles.deleteButton}`} onClick={handleFirstDeleteButtonClicked}>Delete Blog</button>
                                </div>
                            )}
                            </>
                        )}</>}
                        </div>
                    <div>
                        <div>
                            <style dangerouslySetInnerHTML={{ __html: blog.styles }} />
                            <div id="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </div>
                        <p>Author: {blog.author}</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default Article;
