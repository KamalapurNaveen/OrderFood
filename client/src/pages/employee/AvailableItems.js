import React from 'react';
import CardItem from './CardItem';

const AvailableItems = () => {
  // Define the items array
  const items = [
    { id: 1, title: 'Item 1', price: '$10', description: 'Description 1', available: true },
    { id: 2, title: 'Item 2', price: '$15', description: 'Description 2', available: false },
    { id: 3, title: 'Item 3', price: '$20', description: 'Description 3', available: true },
    // Add more items as needed
    { id: 4, title: 'Item 4', price: '$25', description: 'Description 4', available: true },
    { id: 5, title: 'Item 5', price: '$30', description: 'Description 5', available: false },
  ];

  const availableItems = items.filter((item) => item.available);

  return (
    <div className="container-fluid align-items-center" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {availableItems.map((item) => (
        <CardItem
          key={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
          available={item.available}
          showButtons={false} // Do not render buttons
        />
      ))}
    </div>
  );
};

export default AvailableItems;
