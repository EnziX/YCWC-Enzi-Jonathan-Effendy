import React from 'react';
import educationArticles from '../data/educationData';

export default function Tips() {
  return (
    <div className="animate-fade-in">
      <h1 className="mb-2">Tips & Education</h1>
      <p className="text-muted mb-8">Learn more about nutrition and healthy habits.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {educationArticles?.map((article, idx) => (
          <div key={idx} className="glass-panel">
            <h3 className="mb-2 text-glow">{article.title}</h3>
            <p className="text-sm text-muted mb-4">{article.content}</p>
            <div className="flex flex-wrap gap-2">
              {article.tags?.map((tag, tIdx) => (
                <span key={tIdx} className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
        
        {!educationArticles && (
          <p className="text-muted">Loading educational content...</p>
        )}
      </div>
    </div>
  );
}
