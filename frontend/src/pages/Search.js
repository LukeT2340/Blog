import useSearch from "../hooks/useSearch";
import { useParams } from "react-router-dom";
import BlogPreview from "../sharedComponents/BlogPreview";

const Search = () => {
    const { searchText } = useParams();
    const { blogs, isLoading, error } = useSearch(searchText);

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
}

export default Search;