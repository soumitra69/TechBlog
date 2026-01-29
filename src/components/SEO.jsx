import { Helmet } from "react-helmet-async";
import { useSEO } from "../hooks/useSEO";

const SEO = () => {
  const { seoData, structuredData } = useSEO();

  return (
    <Helmet>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:url" content={seoData.url} />
      <meta property="og:type" content={seoData.type} />
      <meta property="og:site_name" content="Tech Insights Blog" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.image} />

      <link rel="canonical" href={seoData.url} />

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Helmet>
  );
};

export default SEO;
