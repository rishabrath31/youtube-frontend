import { useRef, useState } from "react";
import "./CategoryBar.css";
import { FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const CategoryBar = ({ onChangeCategory = () => {} }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { videos } = useSelector((state) => state.videosData || {});

  const categories = ["All", ...new Set(videos?.map((video) => video.category))];

  const scrollRef = useRef(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="category-bar-container">
      <div className="category-bar" ref={scrollRef}>
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-btn ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => {
              setActiveCategory(category);
              onChangeCategory(category);
            }}
          >
            {category}
          </button>
        ))}
      </div>
      <button className="scroll-arrow" onClick={scrollRight}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default CategoryBar;
