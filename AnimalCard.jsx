import React from "react";
import { Link } from "react-router-dom";

const AnimalCard = ({ animal }) => (
  <Link to={`/animals/${animal._id}`} style={{ display: "block" }}>
    <div className="animal-card">
      <div>
        <div className="name">{animal.name}</div>
        <div className="species">{animal.species} · {animal.tagId}</div>
      </div>
      <span className={`badge ${animal.status}`}>{animal.status}</span>
    </div>
  </Link>
);

export default AnimalCard;
