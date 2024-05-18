import React from 'react';
import { useParams } from 'react-router-dom';
import useBlog from '../hooks/useBlog';
import styles from './Blog.module.css'
import Prism from "prismjs";
import { useEffect } from 'react';

const Blog = () => {
    const { blogTitle } = useParams();  
    const { blog, isLoading, error } = useBlog(blogTitle);
    Prism.manual = true;

    useEffect(() => {
        Prism.highlightAll();
    }, [blog]); 

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return (
        <>{error}</>
        );
    }

    return (
        <div className='container col-lg-8 col-sm-12 my-3'>
            {blog && (
                <>
                    <h6 className={`${styles.currentDirectory}`}>{`SwiftUI -> Tutorials -> ${blog.category} -> ${blog.title}`}</h6>
                    <div>
                        <div>
                            <style dangerouslySetInnerHTML={{ __html: blog.styles }} />
                            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </div>
                        <p>Author: {blog.author}</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default Blog;
