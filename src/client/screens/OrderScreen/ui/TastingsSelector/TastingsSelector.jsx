import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import './TastingSelector.css'

const weightPercentages = {
  1: [100],
  2: [65, 35],
  3: [55, 30, 15]
};

const tastings = [
  { name: 'Манго-малина', image: '/tastings/mango-malina.jpg', price: 200 },
  { name: 'Манго-маракуйя', image: '/tastings/mango-marakuya.jpg', price: 200 },
  { name: 'Печеное яблоко', image: '/tastings/pechenoe-yabloko.jpg', price: 0 },
  { name: 'Морковная', image: '/tastings/morkovnaya.jpg', price: 0 },
  { name: 'Фисташка-малина', image: '/tastings/fistashka-malina.jpg', price: 300 },
  { name: 'Черемуха-малина', image: '/tastings/cheremukha-malina.jpg', price: 300 },
  { name: 'Три шоколада', image: '/tastings/3shokolada.jpg', price: 300 },
  { name: 'Янтарный', image: '/tastings/yantarny.jpg', price: 300 },
  // Add more tastings as needed
];

const TastingSelector = ({ tiers, onSelectedTastingsChange, overallWeight, onAdditionalPriceChange }) => {

  const [selectedTastingsByTier, setSelectedTastingsByTier] = useState({});

  const handleSelectTasting = (tier, tasting) => {
    setSelectedTastingsByTier(prevSelectedTastingsByTier => ({
      ...prevSelectedTastingsByTier,
      [tier]: tasting
    }));
    onSelectedTastingsChange({
      ...selectedTastingsByTier,
      [tier]: tasting,
    });
  };

  const calculateWeights = () => {
    const weightPercentage = weightPercentages[tiers];
    let tierWeights = [];
    for (let i = 0; i < tiers; i++) {
      const weight = (overallWeight / 100) * weightPercentage[i];
      tierWeights.push(weight);
    }
    return tierWeights;
  };

  const [tierWeights, setTierWeights] = useState(calculateWeights());
  

  useEffect(() => {
    setTierWeights(calculateWeights());
  }, [tiers, overallWeight]);

  const calculateAdditionalPrice = (tasting, weight) => {
    if (tasting.price === 0) {
      onAdditionalPriceChange(0);
      return 0;
    }
    const additionalPrice = tasting.price * weight;
    onAdditionalPriceChange(additionalPrice);
    return additionalPrice;
  };
  // const calculateAdditionalPrice = (tasting, weight) => {
  //   if (tasting.price === 0) {
  //     return 0;
  //   }
  //   return tasting.price * weight;
  // };
  

  useEffect(() => {
    let additionalPrice = 0;
    Object.values(selectedTastingsByTier).forEach((tasting, index) => {
      if (tasting && tasting.price > 0) {
        additionalPrice += tierWeights[index] * tasting.price;
      }
    });
    onAdditionalPriceChange(additionalPrice);
  }, [onAdditionalPriceChange, selectedTastingsByTier, tierWeights]);

  return (
    <Card>
      <Card.Body className='tasting-selector__body'>
        <Card.Title>
          Выбор начинок:
        </Card.Title>
        {[...Array(tiers).keys()].reverse().map((tier) => (
          <div key={tier} className='tasting-wrap'>
              <button
                type="button"
                className="tasting-form-button"
                onClick={() => handleSelectTasting(tier, null)}
              >
                {selectedTastingsByTier[tier] ? 
                (
                  <>
                    <div>
                      {`${tier + 1} ярус: ${selectedTastingsByTier[tier].name}`}
                    </div>
                    <div>
                      {`Вес: ${tierWeights[tier].toFixed(1)} кг`}
                    </div>
                      {selectedTastingsByTier[tier].price > 0 && (
                        <span>Доплата за начинку: {calculateAdditionalPrice(selectedTastingsByTier[tier], tierWeights[tier]).toFixed(2)} руб.</span>
                      )}
                  </>
                ) : 
                (
                  `Выберите начинку для ${tier + 1} яруса`
                )}
              </button>
                {selectedTastingsByTier[tier] === null && (
                  <div className="tasting-container mb-2">
                    {tastings.map((tasting) => (
                      <button
                        type='button'
                        className="tasting-item"
                        key={tasting.name}
                        onClick={() => handleSelectTasting(tier, tasting)}
                      >
                        <img src={tasting.image} alt={tasting.name} className="tasting-image" />
                        <div className="tasting-name">{tasting.name}</div>
                      </button>
                    ))}
                  </div>
                )}
            </div>
        ))}
      </Card.Body>
    </Card>
  )
}

export default TastingSelector;