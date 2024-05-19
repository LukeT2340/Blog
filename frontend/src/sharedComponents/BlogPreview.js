import { useBlogs } from "../hooks/useBlogs";
import { Link } from "react-router-dom";
import styles from "../pages/Articles.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const BlogPreview = (blog) => {
    const urlTitle = blog.title.trim().replace(/\s+/g, '-');
    const createdAt = new Date(blog.createdAt);
    const formattedDate = createdAt.toISOString().split('T')[0];
    const tags = blog.tags ? blog.tags.split(', ') : [];
    return (
        <div className={`container d-flex shadow flex-column col-md-3 col-sm-10 p-0 m-2 ${styles.blogPreview}`}>
            <Link to={`/${urlTitle}`} className={`${styles.titleLink}`}>
                <img src={blog.thumbnail} className={`${styles.thumbnail} mb-2`}></img>
                <h1 className={`${styles.title} mx-3`}>{blog.title}</h1>
            </Link>
            <p className={`${styles.description} mx-3`}>{blog.description}</p>
            <div className="m-2 mt-auto">
                <div className="d-flex mt-auto m-2">
                    {tags.map((tag, index) => ( 
                        <Link to={`/tag/${tag}`} className={`${styles.tagLink}`} key={index}>
                            <p className={`${styles.tagName}`}>{tag}</p>
                        </Link>
                    ))}
                    <p className={`${styles.createdAt} ms-auto`}>{formattedDate}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogPreview;