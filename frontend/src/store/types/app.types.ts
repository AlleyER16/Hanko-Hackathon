export type tMealType = { _id: string; Name: string };

export type tMealTypes = tMealType[];

export type tMeal = {
  _id: string;
  Name: string;
  AvgRatings: number;
  Price: number;
  Calories: number;
  PicturePath: string;
};

export type tMeals = tMeal[];

export type tFullMeal = {
  _id: string;
  Name: string;
  NumRatings: number;
  AvgRatings: number;
  Ingredients: string[];
  Price: number;
  Calories: number;
  MealTypes: tMealTypes;
  PicturePath: string;
  SimilarMeals: tMeals;
};

export type tFullMeals = tFullMeal[];

export type tCartItem = {
  meal: tMeal;
  quantity: number;
};

export type tCartItems = tCartItem[];

export type tOrder = {
  _id: string;
  MealsAmount: number;
  Meals: {
    Meal: tMeal;
    Quantity: number;
    Amount: number;
    TotalAmount: number;
  }[];
  DeliveryFee: number;
  ShippingInformation: {
    Name: string;
    Telephone: string;
    Address: string;
    ExtraInstructions: string;
  };
  TotalAmount: number;
  Status: string;
};

export type tOrders = tOrder[];
