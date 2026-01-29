import { useState, useEffect } from "react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setSubscriptionStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Subscribing email:", email);

      setSubscriptionStatus({
        type: "success",
        message: "Thank you for subscribing to our newsletter!",
      });
      setEmail("");
    } catch (error) {
      setSubscriptionStatus({
        type: "error",
        message: "Subscription failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);

      setTimeout(() => {
        setSubscriptionStatus(null);
      }, 5000);
    }
  };

  const footerLinks = {
    "Quick Links": [
      { name: "Home", href: "#", ariaLabel: "Go to homepage" },
      {
        name: "All Articles",
        href: "#articles",
        ariaLabel: "View all articles",
      },
      {
        name: "Popular Topics",
        href: "#popular",
        ariaLabel: "Browse popular topics",
      },
      { name: "Latest News", href: "#latest", ariaLabel: "See latest news" },
    ],
    Categories: [
      {
        name: "Programming",
        href: "#programming",
        ariaLabel: "View programming articles",
      },
      {
        name: "Web Development",
        href: "#webdev",
        ariaLabel: "View web development articles",
      },
      {
        name: "Mobile Dev",
        href: "#mobile",
        ariaLabel: "View mobile development articles",
      },
      { name: "DevOps", href: "#devops", ariaLabel: "View DevOps articles" },
      {
        name: "AI/ML",
        href: "#ai",
        ariaLabel: "View AI and Machine Learning articles",
      },
      {
        name: "Cybersecurity",
        href: "#security",
        ariaLabel: "View cybersecurity articles",
      },
    ],
    Resources: [
      { name: "Documentation", href: "#docs", ariaLabel: "View documentation" },
      { name: "Tutorials", href: "#tutorials", ariaLabel: "Browse tutorials" },
      { name: "Code Samples", href: "#code", ariaLabel: "Access code samples" },
      { name: "API Reference", href: "#api", ariaLabel: "View API reference" },
    ],
    Company: [
      { name: "About Us", href: "#about", ariaLabel: "Learn about us" },
      { name: "Contact", href: "#contact", ariaLabel: "Contact us" },
      {
        name: "Privacy Policy",
        href: "#privacy",
        ariaLabel: "Read privacy policy",
      },
      {
        name: "Terms of Service",
        href: "#terms",
        ariaLabel: "View terms of service",
      },
      {
        name: "Careers",
        href: "#careers",
        ariaLabel: "View career opportunities",
      },
    ],
  };

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
      ariaLabel: "Follow us on Twitter",
    },
    {
      name: "GitHub",
      href: "https://github.com",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
      ariaLabel: "View our GitHub repository",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
            clipRule="evenodd"
          />
        </svg>
      ),
      ariaLabel: "Connect with us on LinkedIn",
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      ariaLabel: "Watch our videos on YouTube",
    },
    {
      name: "RSS Feed",
      href: "/rss.xml",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19.199 24C19.199 13.467 10.533 4.8 0 4.8V0c13.165 0 24 10.835 24 24h-4.801zM3.291 17.415c1.814 0 3.293 1.479 3.293 3.295 0 1.813-1.485 3.29-3.301 3.29C1.47 24 0 22.526 0 20.71s1.475-3.295 3.291-3.295zM15.909 24h-4.665c0-6.169-5.075-11.245-11.244-11.245V8.09c8.727 0 15.909 7.184 15.909 15.91z" />
        </svg>
      ),
      ariaLabel: "Subscribe to our RSS feed",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-20" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                <span className="text-blue-400">Tech</span>Blog
              </h2>
              <p className="text-gray-400 mt-2 max-w-md">
                Your trusted source for the latest technology news, programming
                tutorials, and software development insights from industry
                experts.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for the latest tech insights
                delivered to your inbox.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-500"
                    aria-label="Email address for newsletter subscription"
                    required
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    aria-label={
                      isSubmitting
                        ? "Subscribing..."
                        : "Subscribe to newsletter"
                    }
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Subscribing...
                      </span>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>

                {subscriptionStatus && (
                  <div
                    className={`p-3 rounded-lg text-sm ${subscriptionStatus.type === "success" ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"}`}
                    role="alert"
                    aria-live="polite"
                  >
                    {subscriptionStatus.message}
                  </div>
                )}

                <p className="text-xs text-gray-500">
                  By subscribing, you agree to our Privacy Policy and consent to
                  receive updates from our blog.
                </p>
              </form>
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {section}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition duration-200 flex items-center"
                      aria-label={link.ariaLabel}
                    >
                      <svg
                        className="w-4 h-4 mr-2 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            <p>© {currentYear} TechInsights Blog. All rights reserved.</p>
            <p className="mt-1">
              Made By <span className="text-red-500">♥</span> Soumitra Samanta
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">Follow us:</span>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label={social.ariaLabel}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <div className="flex flex-wrap items-center justify-center gap-4 mb-2 md:mb-0">
              <a
                href="#privacy"
                className="hover:text-white transition"
                aria-label="Privacy policy"
              >
                Privacy Policy
              </a>
              <span className="hidden md:inline">•</span>
              <a
                href="#terms"
                className="hover:text-white transition"
                aria-label="Terms of service"
              >
                Terms of Service
              </a>
              <span className="hidden md:inline">•</span>
              <a
                href="#cookies"
                className="hover:text-white transition"
                aria-label="Cookie policy"
              >
                Cookie Policy
              </a>
              <span className="hidden md:inline">•</span>
              <a
                href="#sitemap"
                className="hover:text-white transition"
                aria-label="View sitemap"
              >
                Sitemap
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-gray-400 hover:text-white transition flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
                aria-label="Scroll back to top"
              >
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                Back to top
              </button>

              <div className="relative group">
                <button
                  className="flex items-center text-gray-400 hover:text-white transition focus:outline-none"
                  aria-label="Select language"
                  aria-haspopup="true"
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                  </svg>
                  English
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div className="absolute bottom-full mb-2 right-0 w-40 bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-700 focus:bg-gray-700 focus:outline-none">
                      English
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-700 focus:bg-gray-700 focus:outline-none">
                      Español
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-700 focus:bg-gray-700 focus:outline-none">
                      Français
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-700 focus:bg-gray-700 focus:outline-none">
                      Deutsch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
