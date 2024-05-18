import { useCategoryBlogs } from "../hooks/useCategoryBlogs";
import { Link } from "react-router-dom";

const BlogPreview = (blog) => {
    const urlTitle = blog.title.trim().replace(/\s+/g, '-')
    return (
        <div className="col blog-preview">
        <Link to={`/${urlTitle}`}>
            <h1>{blog.title}</h1>
        </Link>
        </div>
    );
}

const Category = ({ category }) => {
    const { blogs, isLoading, error } = useCategoryBlogs(category);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="col-6">
            {blogs && blogs.map((blog) => (
                <BlogPreview key={blog.id} {...blog} />
            ))}
        </div>
    );
};

export default Category;
