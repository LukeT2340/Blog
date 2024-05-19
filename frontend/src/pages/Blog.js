import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useBlog from '../hooks/useBlog';
import styles from './Blog.module.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-swift';
import { useNavigate } from "react-router-dom";

const Blog = () => {
    const { blogTitle } = useParams();
    const { blog, isLoading, error } = useBlog(blogTitle);
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
                    <h6 className={styles.currentDirectory}>
                        {`Articles -> SwiftUI -> ${blog.category} -> ${blog.title}`}
                    </h6>
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

export default Blog;
