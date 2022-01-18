import React from "react";

function Card({ media_id, title, category, duration, priority, url, user_id }) {
  return(
    <div className="card">
      <h3>{title}</h3>
      <p>category: {category}</p>
      <p>duration: {duration} mins</p>
      <p>priority: {priority}</p>
      <p>url: {url}</p>
    </div>
  )
};

export default Card;