import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './TastingsPicker.css';

const tastings = [
  { name: 'Манго-малина', image: '/tastings/mango-malina.jpg', price: 200 },
  { name: 'Манго-маракуйя', image: '/tastings/mango-marakuya.jpg', price: 200 },
  { name: 'Печеное яблоко', image: '/tastings/pechenoe-yabloko.jpg', price: 0 },
  { name: 'Морковная', image: '/tastings/morkovnaya.jpg', price: 0 },
  { name: 'Фисташка-малина', image: '/tastings/fistashka-malina.jpg', price: 300 },
  { name: 'Черемуха-малина', image: '/tastings/cheremukha-malina.jpg', price: 300 },
  { name: 'Три шоколада', image: '/tastings/3shokolada.jpg', price: 300 },
  { name: 'Янтарный', image: '/tastings/yantarny.jpg', price: 300 },
];

const TastingsPicker = ({ tiers }) => {
  console.log(tiers);
  const renderTierButtons = () => {
    let tierButtons = [];
    for (let i = 1; i <= tiers; i++) {
      const tierButtonClassName = `tier-button-${i}`;
      const tastingsContainerClassName = `tastings-container-${i} p-3 mb-2`
      tierButtons.push(
      <div key={i}>
        <Button key={i} className={tierButtonClassName}>Выберите начинку для {i} яруса</Button>
        <div className={tastingsContainerClassName}>
          {tastings.map((tasting) => (
            <div
            className="tasting-item"
            key={tasting.name}
            >
              <img src={tasting.image} alt={tasting.name} className="tasting-image" />
              <div className="tasting-name">
                {tasting.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      );
    }
    return tierButtons;
  };

  return (
    <>
      <div>
        <h5>tastings picker</h5>
        {renderTierButtons()}
      </div>
    </>
  );
};

export default TastingsPicker;
