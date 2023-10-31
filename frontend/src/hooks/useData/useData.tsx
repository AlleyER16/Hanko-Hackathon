import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import api_client from "../../api/client";

import { tRootState } from "../../store";

import {
  updateMealTypes,
  updateMealsCache,
  updateNewestMeals,
  updateTopDishes,
} from "../../store/cacheReducer";

const useData = () => {
  const dispatch = useDispatch();

  const { newestMeals, topDishes } = useSelector(
    (state: tRootState) => state.cache
  );
  const cart = useSelector((state: tRootState) => state.cart.cart);

  const fetchNewestMeals = useCallback(() => {
    return new Promise((resolve, reject) => {
      api_client({
        url: "/meals?page=1&division=12",
        method: "GET",
      })
        .then((res) => {
          dispatch(updateNewestMeals(res.data.data));
        })
        .catch(() => {
          if (!newestMeals?.length) reject("Error fetching newest meals");
        })
        .finally(() => {
          resolve("Newest meals fetched successfully");
        });
    });
  }, [dispatch, newestMeals?.length]);

  const fetchTopDishes = useCallback(() => {
    return new Promise((resolve, reject) => {
      api_client({
        url: "/meals?page=1&division=5&top=true",
        method: "GET",
      })
        .then((res) => {
          dispatch(updateTopDishes(res.data.data));
        })
        .catch(() => {
          if (!topDishes?.length) reject("Error fetching top dishes");
        })
        .finally(() => {
          resolve("Top dishes fetched successfully");
        });
    });
  }, [dispatch, topDishes?.length]);

  const fetchMeal = useCallback(
    (mealId: string) => {
      return new Promise((resolve, reject) => {
        api_client({
          url: `/meals/${mealId}`,
          method: "GET",
        })
          .then((res) => {
            dispatch(updateMealsCache(res.data.data));
          })
          .catch(() => {
            reject("Error fetching meal");
          })
          .finally(() => {
            resolve("Meal fetched successfully");
          });
      });
    },
    [dispatch]
  );

  // No unhandled error
  const fetchMealTypes = useCallback(() => {
    return new Promise((resolve) => {
      api_client({
        method: "GET",
        url: "/meal-types",
      })
        .then((res) => {
          dispatch(updateMealTypes(res.data.data));

          resolve("Meal types fetched successfully");
        })
        .catch(() => {
          resolve("Error fetching meal types");
        });
    });
  }, [dispatch]);

  // not API fetch
  const inCart = useCallback(
    (mealId: string) => {
      return !!cart.find((cartItem) => cartItem.meal._id === mealId);
    },
    [cart]
  );

  return {
    fetchNewestMeals,
    fetchMealTypes,
    fetchTopDishes,
    fetchMeal,
    inCart,
  };
};

export default useData;
