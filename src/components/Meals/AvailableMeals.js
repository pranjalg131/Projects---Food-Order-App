import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    // Nested function is required as the main one cannot be async.
    const fetchMeals = async () => {
      const res = await fetch(
        "https://food-order-app-a9bfa-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await res.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    // .catch was used as we could not await the fetch meals function since that would mean turning the main function async, which is not allowed, hence there are two workarounds , one make two seperate functions (one to handle the http request , other for error handling.) and the other is using the .catch to handle the error.
    fetchMeals().catch((err) => {
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsIsLoading}>
        <h1>Loading...</h1>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <h1>{httpError}</h1>
      </section>
    );
  }

  const mealItems = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealItems}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
