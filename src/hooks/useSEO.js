import { useMemo } from 'react';
import formatDate from '../utils/formatDate';

export const useSEO = (article = null) => {
    const seoData = useMemo(() => {
        const baseData = {
            title: "Tech Insights Blog | Latest Technology News & Tutorials",
            description: "Stay updated with the latest technology trends, programming tutorials, and software development insights from industry experts.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop",
            url: "https://techblog.example.com",
            type: "website"
        };

        if (article) {
            return {
                title: `${article.title} | Tech Insights Blog`,
                description: article.description,
                image: article.photo_url || baseData.image,
                url: `https://techblog.example.com/article/${article.id}`,
                type: "article",
                publishedTime: article.created_at,
                modifiedTime: article.updated_at,
                author: `User ${article.user_id}`,
                section: article.category
            };
        }

        return baseData;
    }, [article]);

    const structuredData = useMemo(() => {
        if (article) {
            // Article schema
            return {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": article.title,
                "description": article.description,
                "image": article.photo_url,
                "datePublished": article.created_at,
                "dateModified": article.updated_at,
                "author": {
                    "@type": "Person",
                    "name": `User ${article.user_id}`
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Tech Insights Blog",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://techblog.example.com/logo.png"
                    }
                },
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `https://techblog.example.com/article/${article.id}`
                }
            };
        }

        // Website schema for homepage
        return {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Tech Insights Blog",
            "url": "https://techblog.example.com",
            "description": "Latest technology news and programming tutorials",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://techblog.example.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        };
    }, [article]);

    return { seoData, structuredData };
};