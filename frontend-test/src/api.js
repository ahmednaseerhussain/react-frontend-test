import { useState, useEffect } from 'react';

const fetchMeals = async () => {
  try {
    const response = await fetch('https://dummyjson.com/recipes');
    if (!response.ok) {
      throw new Error('Failed to fetch meals.');
    }
    const data = await response.json();
    return data.recipes; // The recipes array
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const useMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchMeals();
      setMeals(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { meals, isLoading };
};
