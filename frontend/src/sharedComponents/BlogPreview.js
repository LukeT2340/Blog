import { useBlogs } from "../hooks/useBlogs";
import { Link } from "react-router-dom";
import styles from "../pages/Articles.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faH, faHand, faHandPointUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const BlogPreview = (blog) => {
    const urlTitle = blog.title.trim().replace(/\s+/g, '-');
    const createdAt = new Date(blog.createdAt);
    const formattedDate = createdAt.toISOString().split('T')[0];
    const tags = blog.tags ? blog.tags.split(', ') : [];
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
        className={`col-lg-2 col-md-5 col-sm-10`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
            <div className={`d-flex flex-column m-0 shadow ${styles.blogPreview}`}>
                <Link to={`/${urlTitle}`} className={`d-flex ${styles.titleLink} flex-column justify-content-center`}>
                    <div className={styles.imageContainer}>
                        <img src={blog.thumbnail} className={`${styles.thumbnail}`}></img>
                        {isHovered && (
                            <FontAwesomeIcon icon={faHandPointUp} className={`${styles.overlayIcon}`} />
                        )}
                    </div>
                    <h1 className={`${styles.title} mx-2 mt-2`}>{blog.title}</h1>
                </Link>
                <p className={`${styles.description} mx-2`}>{blog.description}</p>
                <div className="mx-2 mt-auto">
                    <div className="d-flex align-items-center justify-content-center ">
                        {tags.map((tag, index) => ( 
                            <Link to={`/tag/${tag}`} className={`${styles.tagLink}`} key={index}>
                                <p className={`${styles.tagName}`}>{tag}</p>
                            </Link>
                        ))}
                        <p className={`${styles.createdAt} ms-auto`}>{formattedDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPreview;