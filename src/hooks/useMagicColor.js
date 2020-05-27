import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function randomColor(currentColor) {
  const COLOR_LIST = ['red', 'blue', 'tomato', 'pink', 'yellow'];

  const currentIndex = COLOR_LIST.indexOf(currentColor);
  let newIndex = currentIndex;

  while (currentIndex === newIndex) {
    newIndex = Math.trunc(Math.random() * 5);
  }

  return COLOR_LIST[newIndex];
}

function useMagicColor() {
  const [color, setColor] = useState('transaparent');
  const colorRef = useRef('transaparent');

  //Change color every 1 second
  useEffect(() => {
    const colorInterval = setInterval(() => {
      const newColor = randomColor(colorRef.current);
      setColor(newColor);

      colorRef.current = newColor;
    }, 400);

    return () => {
      clearInterval(colorInterval);
    }
  }, [])

  return color;
}

export default useMagicColor;