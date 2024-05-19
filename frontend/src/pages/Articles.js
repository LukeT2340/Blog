import { useBlogs } from "../hooks/useBlogs";
import { Link } from "react-router-dom";
import styles from "./Articles.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogPreview from "../sharedComponents/BlogPreview";

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
