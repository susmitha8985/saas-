import React from 'react';
import { HERO_CAROUSEL_IMAGES } from './assets';
import './Portfolio.css';

export default function CarouselDeck({ onSelectCard, hoveredCard, setHoveredCard }) {
  return (
    <div className="card-perspective-container">
      {HERO_CAROUSEL_IMAGES.map((card, idx) => {
        const isActive = hoveredCard?.id === card.id;
        return (
          <div
            key={card.id}
            className={`card-3d ${isActive ? 'active-card' : ''}`}
            onMouseEnter={() => setHoveredCard && setHoveredCard(card)}
            onClick={() => onSelectCard && onSelectCard(card)}
            style={{ '--index': idx }}
            role="button"
            tabIndex={0}
            aria-label={`View ${card.title}`}
          >
            <img src={card.src} alt={card.alt} loading="lazy" />
            <div className="card-overlay">
              <span className="card-overlay-title">{card.title}</span>
              {card.subtitle && <span className="card-overlay-sub">{card.subtitle}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
