// pages/ResourceLibrary.tsx
import React, { useState } from 'react';
import ResourceCard from '../components/ResourceCard.tsx';
import SearchBar from '../components/SearchBar.tsx';

// Resource type definition
interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link: string;
}

const ResourceLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Sample resources
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Sustainable Transportation Guide',
      description: 'Learn how to reduce your carbon footprint through eco-friendly transportation options.',
      category: 'transport',
      imageUrl: '/images/transport.jpg',
      link: '/resources/sustainable-transportation',
    },
    {
      id: '2',
      title: 'Plant-Based Diet Benefits',
      description: 'Discover how a plant-based diet can significantly lower your carbon footprint.',
      category: 'food',
      imageUrl: '/images/food.jpg',
      link: '/resources/plant-based-diet',
    },
    {
      id: '3',
      title: 'Home Energy Efficiency Tips',
      description: 'Simple changes to make your home more energy-efficient and reduce carbon emissions.',
      category: 'household',
      imageUrl: '/images/home.jpg',
      link: '/resources/energy-efficiency',
    },
    {
      id: '4',
      title: 'Sustainable Shopping Guide',
      description: 'How to make environmentally conscious purchasing decisions.',
      category: 'shopping',
      imageUrl: '/images/shopping.jpg',
      link: '/resources/sustainable-shopping',
    },
    {
      id: '5',
      title: 'Carbon Offset Programs Explained',
      description: 'Understanding carbon offset programs and how they can help neutralize your carbon footprint.',
      category: 'other',
      imageUrl: '/images/offset.jpg',
      link: '/resources/carbon-offsets',
    },
  ];

  // Filter resources based on search term and category
  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Available categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'transport', name: 'Transportation' },
    { id: 'food', name: 'Food & Diet' },
    { id: 'household', name: 'Household' },
    { id: 'shopping', name: 'Shopping' },
    { id: 'other', name: 'Other' },
  ];

  return (
    <div className="resource-library-container">
      <h1>Resource Library</h1>
      <p>Explore our collection of guides and tips for sustainable living.</p>
      
      <div className="resource-controls">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
          placeholder="Search resources..." 
        />
        
        <div className="category-filter">
          <div className="category-buttons">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="resources-grid">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        ) : (
          <div className="no-resources-message">
            <p>No resources found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceLibrary;
