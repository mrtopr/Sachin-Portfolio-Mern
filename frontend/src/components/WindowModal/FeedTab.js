import React, { useState, useEffect, useRef } from "react";
import { styled } from "@stitches/react";
import { motion } from "framer-motion";
import LikeButton from "../SpecialComponents/LikeButton";
import { FaExternalLinkAlt } from "react-icons/fa";
import axios from "axios";
import "../../styles/FeedTab.css";

const FEEDS_PER_PAGE = 5;
const PREVIEW_LIMIT = 150;
const API_URL = `${process.env.REACT_APP_API_URI}`;

const FeedTab = () => {
  const [feeds, setFeeds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedFeeds, setExpandedFeeds] = useState({});
  const [globalExpanded, setGlobalExpanded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        // console.log("Fetching feeds...");
        const response = await axios.get(`${API_URL}/getFeeds`);
        if (response) {
          const data = await response.data;
          // console.log("Fetched feeds:", data);
          setFeeds(
            data.sort(
              (a, b) => new Date(b.feedCreatedAt) - new Date(a.feedCreatedAt)
            )
          );
        } else {
          console.log("Failed to fetch feeds");
        }
      } catch (error) {
        console.log("Error fetching feeds:", error);
      }
    };
    fetchFeeds();
  }, []);

  useEffect(() => {
    const totalPages = Math.ceil(feeds.length / FEEDS_PER_PAGE);
    if (currentPage === totalPages) {
      setGlobalExpanded(feeds.length % FEEDS_PER_PAGE <= 3);
    } else {
      setGlobalExpanded(false);
    }
  }, [currentPage, feeds]);

  const toggleReadMore = (feedId) => {
    setExpandedFeeds((prev) => ({ ...prev, [feedId]: !prev[feedId] }));
  };

  const handleGlobalLoadMore = () => setGlobalExpanded(true);

  const handlePageChange = (page) => {
    if (!globalExpanded && page > currentPage) return;
    setCurrentPage(page);
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const totalPages = Math.ceil(feeds.length / FEEDS_PER_PAGE);
  const currentFeeds = feeds.slice(
    (currentPage - 1) * FEEDS_PER_PAGE,
    currentPage * FEEDS_PER_PAGE
  );

  const getImageURL = (feedImageURL) => {
    if (!feedImageURL) return "";
    // Plain string URL (e.g. "https://..." or stored as a URL string)
    if (typeof feedImageURL === "string") return feedImageURL;
    // Base64 object from file upload: { data: "data:image/..." }
    if (feedImageURL.data && typeof feedImageURL.data === "string") {
      return feedImageURL.data.startsWith("data:image") ? feedImageURL.data : "";
    }
    return "";
  };

  return (
    <>
      <h1 className="feed-tab-title">Sachin's Feed</h1>

      <div className="feed-tab" ref={containerRef}>
        {/* <h1 className="feed-warning">Under Construction!</h1> */}
        <p className="feed-tab-description">
          Welcome to your personalized Feed Tab, follow the latest updates and
          transformative moments.
        </p>

        <div className="feed-items">
          {(globalExpanded ? currentFeeds : currentFeeds.slice(0, 3)).map(
            (feed, id) => {
              const imgURL = getImageURL(feed.feedImageURL);
              const categories = Array.isArray(feed.feedCategory)
                ? feed.feedCategory
                : feed.feedCategory
                ? [feed.feedCategory]
                : [];
              const isExpanded = expandedFeeds[feed._id];
              const contentText = Array.isArray(feed.feedContent)
                ? feed.feedContent.join(" ")
                : feed.feedContent || "";
              const links = Array.isArray(feed.feedLinks)
                ? feed.feedLinks
                : feed.feedLinks
                ? [feed.feedLinks]
                : [];

              return (
                <motion.div
                  key={feed._id.$oid}
                  className="feed-item glass"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + 0.15 * id, type: "spring", stiffness: 80, damping: 18 }}
                >
                  {/* Thumbnail */}
                  <div className="feed-thumbnail">
                    {imgURL ? (
                      <img
                        src={imgURL}
                        alt={feed.feedTitle}
                        className="feed-thumb-img"
                      />
                    ) : (
                      <div className="feed-thumb-placeholder">
                        <span className="feed-thumb-initial">
                          {feed.feedTitle ? feed.feedTitle.charAt(0).toUpperCase() : "F"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="feed-item-container">
                    {/* Like Button */}
                    <div className="feed-like-wrapper">
                      <LikeButton
                        type="Feed"
                        title={feed.feedTitle}
                        onLikeSuccess={() =>
                          setFeeds((prevFeeds) =>
                            prevFeeds.map((f) =>
                              f.feedTitle === feed.feedTitle
                                ? { ...f, likesCount: (f.likesCount || 0) + 1 }
                                : f
                            )
                          )
                        }
                      />
                    </div>

                    {/* Categories */}
                    {categories.length > 0 && (
                      <div className="feed-item-categories">
                        {categories.map((cat, idx) => (
                          <span key={idx} className="feed-category">
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="feed-item-title">{feed.feedTitle}</h2>

                    {/* Content */}
                    <div className="feed-item-content">
                      {!isExpanded ? (
                        <>
                          {contentText.length > PREVIEW_LIMIT ? (
                            <>
                              {contentText.slice(0, PREVIEW_LIMIT)}...{" "}
                              <button
                                className="read-more-btn"
                                onClick={() => toggleReadMore(feed._id)}
                              >
                                Read More ▼
                              </button>
                            </>
                          ) : (
                            contentText
                          )}
                        </>
                      ) : (
                        <>
                          {contentText}{" "}
                          <button
                            className="read-more-btn"
                            onClick={() => toggleReadMore(feed._id)}
                          >
                            Show Less ▲
                          </button>
                        </>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="feed-item-footer">
                      <div className="feed-footer-left">
                        {links.map((link, idx) => (
                          <motion.a
                            key={idx}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="feed-visit-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Visit Link
                            <FaExternalLinkAlt className="feed-visit-icon" />
                          </motion.a>
                        ))}
                      </div>
                      <div className="feed-footer-right">
                        {feed.likesCount > 0 && (
                          <span className="feed-likes">♥ {feed.likesCount}</span>
                        )}
                        <span className="feed-timestamp">
                          {feed.feedCreatedAt &&
                            new Date(feed.feedCreatedAt).toLocaleDateString(
                              "en-US",
                              { year: "numeric", month: "short", day: "numeric" }
                            )}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>

        {!globalExpanded && currentFeeds.length > 3 && (
          <button className="load-more-btn" onClick={handleGlobalLoadMore}>
            Load More &gt;&gt;&gt;
          </button>
        )}

        <div className="pagination">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i + 1}
              className={`page-btn ${i + 1 === currentPage ? "active" : ""}`}
              disabled={!globalExpanded && i + 1 > currentPage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeedTab;

const ButtonPart = styled("span", {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: 8,
});

const ButtonShadow = styled(ButtonPart, {
  background: "hsl(0deg 0% 0% / 0.1)",
  transform: "translateY(2px)",
  transition: "transform 250ms ease-out",
});

const ButtonEdge = styled(ButtonPart, {
  background: `linear-gradient(
    to left,
    hsl(0deg 0% 69%) 0%,
    hsl(0deg 0% 85%) 8%,
    hsl(0deg 0% 85%) 92%,
    hsl(0deg 0% 69%) 100%
  )`,
});

const ButtonLabel = styled("span", {
  fontFamily: "Montserrat",
  fontSize: "14px",
  display: "block",
  position: "relative",
  borderRadius: 5,
  color: "#212529",
  padding: "1rem 1.5rem",
  background: "#f8f9fa",
  transform: "translateY(-4px)",
  width: "100%",
  userSelect: "none",
  transition:
    "transform 250ms ease-out, background-color 0.3s ease, color 0.3s ease",
  "&:hover": {
    backgroundColor: "#6366f1",
    color: "#212529",
    transform: "scale(1.05)",
  },
});

const StyledButton = styled("button", {
  border: "none",
  fontWeight: 600,
  width: "fit-content",
  cursor: "pointer",
  background: "transparent",
  position: "relative",
  padding: 0,
  transition: "filter 250ms ease-out",
  "&:hover": {
    filter: "brightness(110%)",
    [`& ${ButtonLabel}`]: { transform: "translateY(-8px)" },
    [`& ${ButtonShadow}`]: { transform: "translateY(6px)" },
  },
  "&:active": {
    [`& ${ButtonLabel}`]: {
      transform: "translateY(-2px)",
      transition: "transform 34ms",
    },
    [`& ${ButtonShadow}`]: {
      transform: "translateY(1px)",
      transition: "transform 34ms",
    },
  },
});
