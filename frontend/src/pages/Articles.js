import { useBlogs } from "../hooks/useBlogs";
import { Link } from "react-router-dom";
import styles from "./Articles.module.css";

const BlogPreview = (blog) => {
    const urlTitle = blog.title.trim().replace(/\s+/g, '-');
    const createdAt = new Date(blog.createdAt);
    const formattedDate = createdAt.toISOString().split('T')[0];
    const tags = blog.tags ? blog.tags.split(', ') : [];
    return (
        <div className={`container d-flex shadow flex-column border rounded col-md-3 col-sm-10 p-0 m-2 ${styles.blogPreview}`}>
            <Link to={`/${urlTitle}`} className={`${styles.titleLink}`}>
                <img src={blog.thumbnail} class={`${styles.thumbnail} mb-2`}></img>
                <h1 className={`${styles.title} mx-1`}>{blog.title}</h1>
            </Link>
            <div className="m-2 mt-auto">
                <p className={`${styles.description} mx-1`}>{blog.description}</p>
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

const Articles = () => {
    const { blogs, isLoading, error } = useBlogs();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="row m-5">
            {blogs && blogs.map((blog) => (
                <BlogPreview key={blog.id} {...blog} />
            ))}
        </div>
    );
};

export default Articles;
