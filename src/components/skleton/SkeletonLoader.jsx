import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonLoader = () => (
  <ContentLoader
    speed={2}
    width="100%"  // Full width of the container
    height="100%"
    viewBox="0 0 500 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    {/* Nama dan Bubble Chat Left */}
    <rect x="10" y="20" rx="3" ry="3" width="60%" height="10" /> {/* Nama pengirim */}
    <rect x="10" y="35" rx="10" ry="10" width="60%" height="20" />
    <rect x="10" y="60" rx="10" ry="10" width="50%" height="20" />

    {/* Nama dan Bubble Chat Right */}
    <rect x="30%" y="90" rx="3" ry="3" width="60%" height="10" /> {/* Nama pengirim */}
    <rect x="30%" y="105" rx="10" ry="10" width="60%" height="20" />
    <rect x="40%" y="130" rx="10" ry="10" width="50%" height="20" />

    {/* Nama dan Bubble Chat Left */}
    <rect x="10" y="170" rx="3" ry="3" width="60%" height="10" /> {/* Nama pengirim */}
    <rect x="10" y="185" rx="10" ry="10" width="60%" height="20" />
    <rect x="10" y="210" rx="10" ry="10" width="40%" height="20" />

    {/* Nama dan Bubble Chat Right */}
    <rect x="30%" y="240" rx="3" ry="3" width="60%" height="10" /> {/* Nama pengirim */}
    <rect x="30%" y="255" rx="10" ry="10" width="60%" height="20" />
    <rect x="40%" y="280" rx="10" ry="10" width="50%" height="20" />

    {/* Nama dan Bubble Chat Left */}
    <rect x="10" y="320" rx="3" ry="3" width="60%" height="10" /> {/* Nama pengirim */}
    <rect x="10" y="335" rx="10" ry="10" width="60%" height="20" />
    <rect x="10" y="360" rx="10" ry="10" width="70%" height="20" />
  </ContentLoader>
);

export default SkeletonLoader;
