import React, { useEffect } from 'react';

const Favorites = () => {
  useEffect(() => {
    //обновляем заголовок документа
    document.title = 'Favorites - notedly';
  });

  return (
    <div>
      <h1>FAVORITES</h1>
      <p>These are Favorites</p>
    </div>
  );
};

export default Favorites;
