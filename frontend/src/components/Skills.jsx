import React, { useState } from 'react';
import {
  Code2,
  Server,
  Layout,
  Database,
  Wrench,
  Cloud,
  Cpu,
  CheckCircle2
} from 'lucide-react';

export default function Skills({ skillsByCategory }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Category Icon Mapping
  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'languages':
        return <Code2 size={18} />;
      case 'backend':
        return <Server size={18} />;
      case 'frontend':
        return <Layout size={18} />;
      case 'database':
        return <Database size={18} />;
      case 'tools':
        return <Wrench size={18} />;
      case 'cloud':
        return <Cloud size={18} />;
      default:
        return <Cpu size={18} />;
    }
  };

  const categories = Object.keys(skillsByCategory || {});
  const filterOptions = ['All', ...categories];

  const displayedCategories =
    selectedCategory === 'All'
      ? categories
      : categories.filter((cat) => cat.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">02 // Capabilities</span>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            Technologies, frameworks, and developer tools applied across academic projects and practical internship experience.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="skills-filter-tabs">
          {filterOptions.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat !== 'All' && <span className="tab-icon">{getCategoryIcon(cat)}</span>}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="skills-category-grid">
          {displayedCategories.map((category) => {
            const skillList = skillsByCategory[category] || [];
            return (
              <div key={category} className="card skill-category-card">
                <div className="category-header">
                  <span className="category-icon">{getCategoryIcon(category)}</span>
                  <h3 className="category-title">{category}</h3>
                  <span className="category-count font-mono">{skillList.length}</span>
                </div>

                <div className="skill-items-wrap">
                  {skillList.map((skill) => (
                    <div key={skill.id || skill.name} className="skill-item">
                      <span className="skill-dot"></span>
                      <span className="skill-name">{skill.name}</span>
                      {skill.proficiencyLevel && skill.proficiencyLevel !== 'Proficient' && (
                        <span className="skill-level-badge">{skill.proficiencyLevel}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
