import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://api.slingacademy.com/v1/sample-data/blog-posts?offset=0&limit=10';

const useFetchBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await axios.get(API_URL);

                if (response.data.success) {
                    setBlogs(response.data.blogs);
                } else {
                    throw new Error(response.data.message || 'Failed to fetch blogs');
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching blogs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return { blogs, loading, error };
};

export default useFetchBlogs;