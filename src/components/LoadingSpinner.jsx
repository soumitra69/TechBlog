import { useState, useEffect } from "react";

const LoadingSpinner = ({
  type = "spinner",
  size = "medium",
  color = "primary",
  fullScreen = false,
  message = "Loading...",
  progress = null,
  showPercentage = false,
  showDots = false,
  speed = "normal",
  customClassName = "",
  transparent = false,
}) => {
  const [dotCount, setDotCount] = useState(0);

  
  useEffect(() => {
    if (!showDots) return;

    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, [showDots]);

 
  const sizeClasses = {
    "extra-small": {
      spinner: "w-4 h-4",
      text: "text-xs",
      skeleton: "h-12",
      bar: "h-1",
    },
    small: {
      spinner: "w-6 h-6",
      text: "text-sm",
      skeleton: "h-16",
      bar: "h-1.5",
    },
    medium: {
      spinner: "w-8 h-8",
      text: "text-base",
      skeleton: "h-20",
      bar: "h-2",
    },
    large: {
      spinner: "w-12 h-12",
      text: "text-lg",
      skeleton: "h-24",
      bar: "h-2.5",
    },
    "extra-large": {
      spinner: "w-16 h-16",
      text: "text-xl",
      skeleton: "h-32",
      bar: "h-3",
    },
  };

  // Color mapping
  const colorClasses = {
    primary: "text-blue-600",
    secondary: "text-gray-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    danger: "text-red-600",
    info: "text-blue-400",
    light: "text-gray-300",
    dark: "text-gray-800",
  };

  // Speed mapping
  const speedClasses = {
    slow: "duration-1000",
    normal: "duration-700",
    fast: "duration-300",
    "extra-fast": "duration-150",
  };

  // Render different spinner types
  const renderSpinner = () => {
    const sizeConfig = sizeClasses[size];
    const colorClass = colorClasses[color];
    const speedClass = speedClasses[speed];

    switch (type) {
      case "dots":
        return (
          <div className="flex items-center justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`${sizeConfig.spinner} rounded-full bg-current ${colorClass} animate-pulse`}
                style={{
                  animationDelay: `${i * 0.15}s`,
                  opacity: 0.6 + i * 0.2,
                }}
              />
            ))}
          </div>
        );

      case "pulse":
        return (
          <div className={`${sizeConfig.spinner} ${colorClass} animate-pulse`}>
            <div className="w-full h-full rounded-full bg-current opacity-20"></div>
          </div>
        );

      case "ring":
        return (
          <div className={`${sizeConfig.spinner} relative`}>
            <div
              className={`absolute inset-0 border-2 border-current border-t-transparent rounded-full animate-spin ${speedClass}`}
            ></div>
            <div
              className={`absolute inset-2 border-2 border-current border-b-transparent rounded-full animate-spin ${speedClass}`}
              style={{ animationDirection: "reverse" }}
            ></div>
          </div>
        );

      case "bounce":
        return (
          <div className="flex items-center justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`${sizeConfig.spinner} bg-current ${colorClass} rounded-full animate-bounce`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "0.6s",
                }}
              />
            ))}
          </div>
        );

      case "progress":
        return (
          <div className="w-full max-w-xs">
            <div
              className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeConfig.bar}`}
            >
              <div
                className={`h-full bg-current ${colorClass} transition-all duration-300 ease-out`}
                style={{ width: `${progress || 0}%` }}
              ></div>
            </div>
            {showPercentage && progress !== null && (
              <div
                className={`text-center mt-2 ${sizeConfig.text} ${colorClass}`}
              >
                {Math.round(progress)}%
              </div>
            )}
          </div>
        );

      case "skeleton":
        return (
          <div className="w-full">
            <div
              className={`animate-pulse ${sizeConfig.skeleton} bg-gray-200 rounded-lg`}
            >
              <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
            </div>
          </div>
        );

      case "hourglass":
        return (
          <div className={`${sizeConfig.spinner} relative ${colorClass}`}>
            <div className="absolute inset-0 border-2 border-current border-t-transparent border-b-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-2 border-current border-l-transparent border-r-transparent rounded-full animate-spin"></div>
          </div>
        );

      case "dual-ring":
        return (
          <div className={`${sizeConfig.spinner} relative`}>
            <div
              className={`absolute inset-0 border-4 border-current border-t-transparent rounded-full animate-spin ${speedClass}`}
            ></div>
            <div
              className={`absolute inset-2 border-4 border-current border-b-transparent rounded-full animate-spin ${speedClass}`}
              style={{ animationDirection: "reverse" }}
            ></div>
          </div>
        );

      case "cube":
        return (
          <div
            className={`${sizeConfig.spinner} relative transform rotate-45 ${colorClass}`}
          >
            <div className="absolute inset-0 bg-current opacity-20 animate-ping"></div>
            <div className="absolute inset-1 bg-current animate-pulse"></div>
          </div>
        );

      // Default spinner
      default:
        return (
          <div className={`${sizeConfig.spinner} ${colorClass}`}>
            <div
              className={`w-full h-full border-2 border-current border-t-transparent rounded-full animate-spin ${speedClass}`}
            ></div>
          </div>
        );
    }
  };

  // Render loading dots in message
  const renderMessage = () => {
    if (!message) return null;

    if (showDots) {
      const dots = ".".repeat(dotCount);
      return (
        <span className="inline-flex items-center">
          {message}
          <span className="w-8 text-left">{dots}</span>
        </span>
      );
    }

    return message;
  };

  // Full screen overlay
  if (fullScreen) {
    return (
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${
          transparent ? "bg-black/20" : "bg-white/95 backdrop-blur-sm"
        }`}
        role="status"
        aria-live="polite"
        aria-label="Loading content"
      >
        <div className="animate-fadeInUp">{renderSpinner()}</div>
        {message && (
          <p
            className={`mt-4 ${sizeClasses[size].text} text-gray-600 font-medium animate-fadeInUp`}
            style={{ animationDelay: "0.1s" }}
          >
            {renderMessage()}
          </p>
        )}
      </div>
    );
  }

  // Inline spinner
  return (
    <div
      className={`flex flex-col items-center justify-center ${customClassName}`}
      role="status"
      aria-label="Loading"
    >
      <div className="animate-fadeIn">{renderSpinner()}</div>
      {message && (
        <p
          className={`mt-2 ${sizeClasses[size].text} text-gray-600 text-center`}
        >
          {renderMessage()}
        </p>
      )}
    </div>
  );
};

// Skeleton Loader Components
export const CardSkeleton = ({ count = 1, type = "article" }) => {
  const skeletons = Array(count).fill(0);

  if (type === "article") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skeletons.map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
            role="status"
            aria-label="Loading article"
          >
            <div className="h-48 bg-gray-200 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="h-6 w-24 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className="space-y-4">
        {skeletons.map((_, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow animate-pulse"
            role="status"
            aria-label="Loading list item"
          >
            <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 w-1/4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

// Page Loader
export const PageLoader = ({
  title = "Loading",
  subtitle = "Please wait while we prepare your content",
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-center">
      <div className="max-w-md w-full px-8 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
            <div
              className="absolute inset-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
              style={{ animationDuration: "1.5s" }}
            ></div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {["React", "TypeScript", "Next.js", "Tailwind", "Node.js"].map(
            (tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                {tech}
              </span>
            ),
          )}
        </div>
      </div>

      <div className="absolute bottom-8">
        <p className="text-sm text-gray-500">
          Your content is being loaded securely...
        </p>
      </div>
    </div>
  );
};

// Content Placeholder
export const ContentPlaceholder = ({ lines = 3, variant = "paragraph" }) => {
  const lineArray = Array(lines).fill(0);

  if (variant === "paragraph") {
    return (
      <div className="space-y-3">
        {lineArray.map((_, index) => (
          <div
            key={index}
            className="h-4 bg-gray-200 rounded animate-pulse"
            style={{
              width: `${90 - index * 10}%`,
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "heading") {
    return (
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div
          className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"
          style={{ animationDelay: "0.1s" }}
        ></div>
      </div>
    );
  }

  return null;
};

// Shimmer Effect Component
export const Shimmer = ({
  width = "100%",
  height = "20px",
  rounded = true,
}) => {
  return (
    <div
      className="relative overflow-hidden bg-gray-200"
      style={{ width, height, borderRadius: rounded ? "0.375rem" : 0 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
    </div>
  );
};

export default LoadingSpinner;
