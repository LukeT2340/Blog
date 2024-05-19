import { useBlogs } from "../hooks/useBlogs";
import { Link } from "react-router-dom";
import styles from "./Articles.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogPreview from "../sharedComponents/BlogPreview";

const Articles = () => {
    const { blogs, isLoading, error } = useBlogs();

    if (isLoading) {
        return <div className={styles.loadingPage}></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="col m-0 p-0">
            <div class={`${styles.articleHeader}`}>
                <h2 class={`${styles.articleTitle}`}>Latest Articles</h2>
                <p class={`${styles.articleBlurb}`}>Explore in-depth articles covering iOS programming, techniques, language features, architectural patterns, and beyond.</p>
            </div>
            <div className="d-flex row justify-content-center align-items-center my-3 mx-5">
                {blogs && blogs.map((blog) => (
                    <BlogPreview key={blog.id} {...blog} />
                ))}
            </div>
        </div>
    );
};

export default Articles;
