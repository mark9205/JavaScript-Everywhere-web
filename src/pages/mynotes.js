import React, { useEffect } from 'react';

const Mynotes = () => {
  useEffect(() => {
    //обновляем заголовок документа
    document.title = 'My notes - notedly';
  });

  return (
    <div>
      <h1>NOTES</h1>
      <p>These are home notes</p>
    </div>
  );
};

export default Mynotes;
