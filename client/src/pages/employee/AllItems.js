import React from 'react';
import CardItem from './CardItem';

const AllItems = () => {
  // Array of objects representing data for each card
  const items = [
    { id: 1, title: 'Item 1', price: '$10', description: 'Description 1', available: true },
    { id: 2, title: 'Item 2', price: '$15', description: 'Description 2', available: false },
    { id: 3, title: 'Item 3', price: '$20', description: 'Description 3', available: true },
    // Add more items as needed
    { id: 1, title: 'Item 1', price: '$10', description: 'Description 1', available: true },
    { id: 2, title: 'Item 2', price: '$15', description: 'Description 2', available: false },
    { id: 3, title: 'Item 3', price: '$20', description: 'Description 3', available: true },
   
    { id: 1, title: 'Item 1', price: '$10', description: 'Description 1', available: true },
    { id: 2, title: 'Item 2', price: '$15', description: 'Description 2', available: false },
    { id: 3, title: 'Item 3', price: '$20', description: 'Description 3', available: true },
   
    
  ];

  return (
    <div className="container-fluid align-items-center" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {items.map((item) => (
        <CardItem
          key={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
          available={item.available}
          showButtons={true}
        />
      ))}
    </div>
  );
};

export default AllItems;
