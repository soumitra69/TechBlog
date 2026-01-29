/**
 * Filters blog posts based on search query and category
 * @param {Array} posts - Array of blog post objects
 * @param {string} searchQuery - Search term
 * @param {string} selectedCategory - Selected category ('all' or specific category)
 * @returns {Array} Filtered array of blog posts
 */
export const filterPosts = (posts, searchQuery, selectedCategory) => {
    if (!posts || !Array.isArray(posts)) {
        return [];
    }

    // Filter by search query
    const searchFiltered = searchQuery.trim()
        ? posts.filter(post =>
            matchesSearch(post, searchQuery.toLowerCase())
        )
        : posts;

    // Filter by category
    const categoryFiltered = selectedCategory !== 'all'
        ? searchFiltered.filter(post =>
            post.category && post.category.toLowerCase() === selectedCategory.toLowerCase()
        )
        : searchFiltered;

    return categoryFiltered;
};

/**
 * Checks if a post matches the search query
 * @param {Object} post - Blog post object
 * @param {string} query - Lowercase search query
 * @returns {boolean} True if post matches search
 */
const matchesSearch = (post, query) => {
    if (!query) return true;

    const searchableFields = [
        post.title,
        post.description,
        post.content_text
    ];

    return searchableFields.some(field =>
        field && field.toLowerCase().includes(query)
    );
};

/**
 * Extracts unique categories from blog posts
 * @param {Array} posts - Array of blog post objects
 * @returns {Array} Array of unique category strings
 */
export const extractCategories = (posts) => {
    if (!posts || !Array.isArray(posts)) {
        return ['all'];
    }

    const categories = posts
        .map(post => post.category)
        .filter(category => category && typeof category === 'string')
        .filter((category, index, self) =>
            self.indexOf(category) === index
        )
        .sort();

    return ['all', ...categories];
};

/**
 * Gets search result count message
 * @param {number} count - Number of results
 * @param {string} query - Search query
 * @param {string} category - Selected category
 * @returns {string} Formatted message
 */
export const getResultMessage = (count, query, category) => {
    if (count === 0) {
        return 'No articles found';
    }

    const parts = [];

    if (query) {
        parts.push(`"${query}"`);
    }

    if (category && category !== 'all') {
        parts.push(`in ${category}`);
    }

    const searchText = parts.length > 0 ? ` for ${parts.join(' ')}` : '';

    return `Found ${count} article${count !== 1 ? 's' : ''}${searchText}`;
};

/**
 * Filters and sorts posts by date (newest first)
 * @param {Array} posts - Array of blog post objects
 * @returns {Array} Sorted array of blog posts
 */
export const sortByDate = (posts) => {
    return [...posts].sort((a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
    );
};

/**
 * Gets highlighted search results with matched terms
 * @param {string} text - Text to highlight
 * @param {string} query - Search query
 * @returns {Array} Array of text parts with highlight markers
 */
export const highlightMatches = (text, query) => {
    if (!text || !query) {
        return [{ text, isMatch: false }];
    }

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const parts = [];
    let lastIndex = 0;
    let index = lowerText.indexOf(lowerQuery);

    while (index !== -1) {
        // Add non-matching part
        if (index > lastIndex) {
            parts.push({
                text: text.substring(lastIndex, index),
                isMatch: false
            });
        }

        // Add matching part
        parts.push({
            text: text.substring(index, index + query.length),
            isMatch: true
        });

        lastIndex = index + query.length;
        index = lowerText.indexOf(lowerQuery, lastIndex);
    }

    // Add remaining text
    if (lastIndex < text.length) {
        parts.push({
            text: text.substring(lastIndex),
            isMatch: false
        });
    }

    return parts;
};

/**
 * Gets truncated text for preview with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) {
        return text;
    }

    // Try to truncate at a space near the max length
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    if (lastSpace > maxLength * 0.7) {
        return truncated.substring(0, lastSpace) + '...';
    }

    return truncated + '...';
};

/**
 * Filters posts by multiple criteria
 * @param {Array} posts - Blog posts
 * @param {Object} filters - Filter criteria
 * @param {string} filters.search - Search query
 * @param {string} filters.category - Category filter
 * @param {string} filters.sortBy - Sort field ('date', 'title')
 * @param {string} filters.sortOrder - Sort order ('asc', 'desc')
 * @returns {Array} Filtered and sorted posts
 */
export const applyFilters = (posts, filters = {}) => {
    const {
        search = '',
        category = 'all',
        sortBy = 'date',
        sortOrder = 'desc'
    } = filters;

    // Apply search filter
    let filtered = search.trim()
        ? posts.filter(post => matchesSearch(post, search.toLowerCase()))
        : [...posts];

    // Apply category filter
    if (category !== 'all') {
        filtered = filtered.filter(post =>
            post.category && post.category.toLowerCase() === category.toLowerCase()
        );
    }

    // Apply sorting
    filtered.sort((a, b) => {
        let aValue, bValue;

        switch (sortBy) {
            case 'title':
                aValue = a.title || '';
                bValue = b.title || '';
                break;
            case 'date':
            default:
                aValue = new Date(a.created_at || 0);
                bValue = new Date(b.created_at || 0);
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortOrder === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }

        return sortOrder === 'asc'
            ? aValue - bValue
            : bValue - aValue;
    });

    return filtered;
};

export default {
    filterPosts,
    extractCategories,
    getResultMessage,
    sortByDate,
    highlightMatches,
    truncateText,
    applyFilters
};