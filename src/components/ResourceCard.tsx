// components/ResourceCard.tsx
import React from 'react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link: string;
}

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  // Placeholder image URL for development
  const imageSrc = resource.imageUrl || `/api/placeholder/300/200`;

  return (
    <div className={`resource-card category-${resource.category}`}>
      <div className="resource-image">
        <img src={imageSrc} alt={resource.title} />
        <span className="resource-category">{resource.category}</span>
      </div>
      <div className="resource-content">
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
        <a href={resource.link} className="resource-link">
          Learn More →
        </a>
      </div>
    </div>
  );
};

export default ResourceCard;