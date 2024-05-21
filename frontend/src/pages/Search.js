import useSearch from "../hooks/useSearch";
import { useParams } from "react-router-dom";
import BlogPreview from "../sharedComponents/BlogPreview";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import styles from "./Search.module.css";

const Search = () => {
    const { searchText } = useParams();
    const { blogs, isLoading, error } = useSearch(searchText);
    const navigate = useNavigate();

    useEffect(() => {
        if (!searchText || searchText.trim() === "null") {
            navigate('/articles');
        }
    }, [navigate, searchText]);

    if (isLoading) {
        return <div className={styles.loadingPage}></div>;
    }

    if (error) {
        return <div className={styles.errorPage}>{error}</div>;
    }

    return (
            <div className={`${styles.page} d-flex flex-column align-items-center  justify-items-center col m-0 p-0`}>
                {blogs && blogs.length === 0 ? (
                    <h3 className={styles.noResultsPage}>No search results for '{searchText}'</h3>
                ) : <h3> Search results for '{searchText}'</h3>}
                <div className="d-flex">
                    {blogs && blogs.map((blog) => (
                        <BlogPreview key={blog.id} {...blog} />
                    ))}
                </div>
            </div>
    );
}

export default Search;