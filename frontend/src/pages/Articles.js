import { useBlogs } from "../hooks/useBlogs";
import { Link } from "react-router-dom";
import styles from "./Articles.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogPreview from "../sharedComponents/BlogPreview";

// Fetches all existing articles and displays titles, descriptions and thumbnails
const Articles = () => {
    const { blogs, isLoading, error } = useBlogs();

    if (isLoading) {
        return <div className={styles.loadingPage}></div>;
    }

    if (error) {
        return <div className={styles.errorPage}>
            <h1>{error}</h1>
        </div>;
    }

    return (
        <div className={`${styles.articlesPage} align-items-center justify-items-center col m-0 p-0`}>
            <div className={`${styles.articleHeader}`}>
                <h2 className={`${styles.articleTitle}`}>Latest Articles</h2>
                <p className={`${styles.articleBlurb}`}>Explore in-depth articles covering iOS programming, techniques, language features, architectural patterns, and beyond.</p>
            </div>
            <div className="row justify-content-center my-5">
                {blogs && blogs.map((blog) => (
                    <BlogPreview key={blog.id} {...blog} />
                ))}
            </div>
        </div>
    );
};

export default Articles;
