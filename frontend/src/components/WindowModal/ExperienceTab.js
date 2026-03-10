import React from "react";
import { motion } from "framer-motion";
import "../../styles/ProjectTab.css";
import { FaGithub, FaYoutube, FaCode, FaGlobe } from "react-icons/fa";
import ImagesCarousel from "./ImageCarousel"; // Import ImageCarousel component

const ExperienceTab = ({ data, isBatterySavingOn }) => {
  const renderLogos = (urls) => {
    if (!urls) return null; // Check if URLs exist

    return Object.entries(urls).map(([key, value]) => {
      const IconComponent = getIconForLink(value);
      return (
        <motion.a
          key={key}
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          initial={isBatterySavingOn ? {} : { opacity: 0, scale: 0, rotate: 0 }}
          animate={
            isBatterySavingOn ? {} : { opacity: 1, scale: 1, rotate: 360 }
          }
          transition={
            isBatterySavingOn
              ? {}
              : {
                  delay: 1.7 + 0.4 * key,
                  type: "ease",
                }
          }
          viewport={{ once: true }}
        >
          <IconComponent className="project-window-logo" />
        </motion.a>
      );
    });
  };

  const getIconForLink = (link) => {
    if (link.includes("github")) return FaGithub;
    if (link.includes("youtube") || link.includes("youtu")) return FaYoutube;
    if (link.includes("devpost")) return FaCode;
    return FaGlobe;
  };

  return (
    <>
      <motion.div className="project-window-tab-container">
        {/* Images Section */}
        {data.experienceImages && (
          <div className="project-image-container">
            <ImagesCarousel
              data={data.experienceImages} // Repeat images 9 times
              title={data.experienceTitle || "Experience"}
              isBatterySavingOn={isBatterySavingOn}
            />
          </div>
        )}

        <motion.div
          className="project-window-content"
          initial={isBatterySavingOn ? {} : { opacity: 0, scale: 0.8 }}
          animate={isBatterySavingOn ? {} : { opacity: 1, scale: 1 }}
          transition={isBatterySavingOn ? {} : { delay: 0.5, type: "ease" }}
        >
          {data.experienceTitle && (
            <motion.h2
              className="project-window-title"
              initial={isBatterySavingOn ? {} : { opacity: 0, scale: 0 }}
              animate={isBatterySavingOn ? {} : { opacity: 1, scale: 1 }}
              transition={isBatterySavingOn ? {} : { delay: 0.7, type: "ease" }}
              viewport={{ once: true }}
            >
              {data.experienceTitle}
            </motion.h2>
          )}

          {data.experienceSubTitle && data.experienceSubTitle !== "NA" && (
            <motion.h3
              className="project-window-subtitle"
              initial={isBatterySavingOn ? {} : { opacity: 0, scale: 0 }}
              animate={isBatterySavingOn ? {} : { opacity: 1, scale: 1 }}
              transition={isBatterySavingOn ? {} : { delay: 0.9, type: "ease" }}
              viewport={{ once: true }}
            >
              {data.experienceSubTitle}
            </motion.h3>
          )}

          {data.experienceTimeline && data.experienceTimeline !== "NA" && (
            <motion.h4
              className="project-window-timeline"
              initial={isBatterySavingOn ? {} : { opacity: 0 }}
              animate={isBatterySavingOn ? {} : { opacity: 1 }}
              transition={isBatterySavingOn ? {} : { delay: 1.1, type: "ease" }}
              viewport={{ once: true }}
            >
              {data.experienceTimeline}
            </motion.h4>
          )}

          {data.experienceTagline && data.experienceTagline !== "NA" && (
            <motion.h4
              className="project-window-tagline"
              initial={isBatterySavingOn ? {} : { opacity: 0, scale: 0 }}
              animate={isBatterySavingOn ? {} : { opacity: 1, scale: 1 }}
              // drag
              // dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              // dragElastic={0.3}
              // dragTransition={{
              //   bounceStiffness: 250,
              //   bounceDamping: 15,
              // }}
              whileHover={isBatterySavingOn ? {} : { scale: 1.01 }}
              whileTap={
                isBatterySavingOn
                  ? {}
                  : {
                      scale: 0.98,
                      boxsizing: "border-box",
                      outline: "1px solid limegreen !important",
                    }
              }
              transition={isBatterySavingOn ? {} : { delay: 1.3, type: "ease" }}
              viewport={{ once: true }}
            >
              {data.experienceTagline}
            </motion.h4>
          )}

          {data.experienceURLs.length > 0 && (
            <motion.div
              className="project-window-urls"
              initial={isBatterySavingOn ? {} : { opacity: 0, scale: 0 }}
              // drag
              // dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              // dragElastic={0.3}
              // dragTransition={{
              //   bounceStiffness: 250,
              //   bounceDamping: 15,
              // }}
              animate={isBatterySavingOn ? {} : { opacity: 1, scale: 1 }}
              whileHover={isBatterySavingOn ? {} : { scale: 1.01 }}
              whileTap={isBatterySavingOn ? {} : { scale: 0.98 }}
              transition={isBatterySavingOn ? {} : { delay: 1.5, type: "ease" }}
              viewport={isBatterySavingOn ? {} : { once: true }}
            >
              {renderLogos(data.experienceURLs)}
            </motion.div>
          )}

          {data.experienceParagraphs &&
            data.experienceParagraphs.length > 0 && (
              <motion.div
                className="project-window-paragraphs glass"
                initial={isBatterySavingOn ? {} : { opacity: 0, scale: 0 }}
                animate={isBatterySavingOn ? {} : { opacity: 1, scale: 1 }}
                transition={isBatterySavingOn ? {} : { delay: 2, type: "ease" }}
                viewport={{ once: true }}
              >
                {data.experienceParagraphs.map((para, index) => (
                  <motion.p
                    key={index}
                    className="project-window-paragraph"
                    initial={isBatterySavingOn ? {} : { opacity: 0, scale: 0 }}
                    animate={isBatterySavingOn ? {} : { opacity: 1, scale: 1 }}
                    transition={
                      isBatterySavingOn ? {} : { delay: 0, type: "ease" }
                    }
                    viewport={{ once: true }}
                  >
                    {para}
                  </motion.p>
                ))}
              </motion.div>
            )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default ExperienceTab;
