require("dotenv").config();

const path = require("path");
// const fs = require("fs");
const fsPromises = require("fs/promises");

const { connect, disconnect } = require("mongoose");

const { MealTypesModel } = require("../models/meal-types.model");
const { MealsModel } = require("../models/meals.model");

let mealTypes = [
  {
    Name: "Breakfast",
  },
  {
    Name: "Lunch",
  },
  {
    Name: "Dinner",
  },
  {
    Name: "Main Course",
  },
  {
    Name: "Appetizer",
  },
  {
    Name: "Dessert",
  },
];

const meals = [
  {
    Name: "Avocado Toast",
    Ingredients: [
      "Whole grain bread",
      "Ripe avocado",
      "Cherry tomatoes",
      "Feta cheese",
      "Olive oil",
    ],
    Price: 3000,
    Calories: 300,
    MealTypes: [0],
    Picture: "avocado-toast.png",
  },
  {
    Name: "Beef Lasagna",
    Ingredients: [
      "Ground beef",
      "Lasagna noodles",
      "Tomato sauce",
      "Ricotta cheese",
      "Mozzarella cheese",
    ],
    Price: 7500,
    Calories: 450,
    MealTypes: [3],
    Picture: "beef-lasagna.png",
  },
  {
    Name: "Beef Stir-Fry with Brown Rice",
    Ingredients: [
      "Sliced beef",
      "Mixed vegetables",
      "Soy sauce",
      "Ginger",
      "Garlic",
    ],
    Price: 10000,
    Calories: 400,
    MealTypes: [2],
    Picture: "beef-stir-fry-with-brown-rice.png",
  },
  {
    Name: "Brushetta",
    Ingredients: [
      "Toasted baguette slices",
      "Diced tomatoes",
      "Garlic",
      "Basil",
      "Olive oil",
    ],
    Price: 3500,
    Calories: 75,
    MealTypes: [4],
    Picture: "brushetta.png",
  },
  {
    Name: "Caprese Skewers",
    Ingredients: [
      "Fresh mozzarella balls",
      "Cherry tomatoes",
      "Fresh basil",
      "Balsamic glaze",
    ],
    Price: 4000,
    Calories: 150,
    MealTypes: [4],
    Picture: "capreese-skewers.png",
  },
  {
    Name: "Cheesecake",
    Ingredients: [
      "Cream cheese",
      "Sugar",
      "Eggs",
      "Sour cream",
      "Butter",
      "Graham cracker crumbs",
    ],
    Price: 9750,
    Calories: 350,
    MealTypes: [5],
    Picture: "cheesecake.png",
  },
  {
    Name: "Classic Chocolate Cake",
    Ingredients: [
      "Flour",
      "Sugar",
      "Cocoa Butter",
      "Eggs",
      "Butter",
      "Baking Powder",
    ],
    Price: 7500,
    Calories: 250,
    MealTypes: [5],
    Top: true,
    Picture: "classic-chocolate-cake.png",
  },
  {
    Name: "Classic Omelette",
    Ingredients: [
      "Eggs",
      "Bell peppers",
      "Onions",
      "Tomatoes",
      "Spinach",
      "Cheese",
    ],
    Price: 6250,
    Calories: 300,
    MealTypes: [0],
    Top: true,
    Picture: "classic-omelette.png",
  },
  {
    Name: "Fruit Salad with Yogurt",
    Ingredients: [
      "Strawberries",
      "Blueberries",
      "Mango",
      "Kiwi",
      "Yogurt",
      "Honey",
    ],
    Price: 5250,
    Calories: 150,
    MealTypes: [5],
    Picture: "fruit-salad-with-yogurt.png",
  },
  {
    Name: "Fruit Smoothie",
    Ingredients: [
      "Banana",
      "Mixed berries",
      "Spinach",
      "Almond milk",
      "Protein powder",
    ],
    Price: 2500,
    Calories: 200,
    MealTypes: [0],
    Picture: "fruit-smoothie.png",
  },
  {
    Name: "Fudgy Brownies",
    Ingredients: [
      "Chocolate",
      "Butter",
      "Sugar",
      "Eggs",
      "Flour",
      "Cocoa Powder",
    ],
    Price: 2500,
    Calories: 180,
    MealTypes: [5],
    Picture: "fudgy-brownies.png",
  },
  {
    Name: "Greek Yogurt Parfait",
    Ingredients: ["Greek yogurt", "Mixed berries", "Granola", "Honey"],
    Price: 7250,
    Calories: 250,
    MealTypes: [0],
    Picture: "greek-yogurt-parfait.png",
  },
  {
    Name: "Grilled Chicken Salad",
    Ingredients: [
      "Grilled chicken breast",
      "Mixed greens",
      "Cherry tomatoes",
      "Cucumber",
      "Avocado",
      "Vinaigrette",
    ],
    Price: 10500,
    Calories: 400,
    MealTypes: [1],
    Top: true,
    Picture: "grilled-chicken-salad.png",
  },
  {
    Name: "Lemon Basil Chicken Pasta",
    Ingredients: [
      "Chicken breast",
      "Pasta",
      "Fresh basil leaves",
      "Garlic",
      "Olive oil",
      "Lemon juice",
    ],
    Price: 15000,
    Calories: 500,
    MealTypes: [3],
    Top: true,
    Picture: "lemon-basil-chicken-pasta.png",
  },
  {
    Name: "Miso Glazed Salmon with Brown Rice",
    Ingredients: [
      "Grilled miso-glazed salmon fillet",
      "Brown rice",
      "Steamed broccoli",
      "Sesame seeds",
    ],
    Price: 8200,
    Calories: 450,
    MealTypes: [1],
    Picture: "miso-glazed-salmon-with-brown-rice.png",
  },
  {
    Name: "Shrimp Cocktail",
    Ingredients: ["Steamed or poached shrimp served with cocktail sauce"],
    Price: 2800,
    Calories: 50,
    MealTypes: [4],
    Picture: "shrimp-cocktail.png",
  },
  {
    Name: "Spinach and Artichoke Dip",
    Ingredients: [
      "Spinach",
      "Artichokes",
      "Cream cheese",
      "Sour cream",
      "Parmesan cheese",
    ],
    Price: 1500,
    Calories: 150,
    MealTypes: [4],
    Picture: "spinach-and-artichoke.png",
  },
  {
    Name: "Stuffed Mushrooms",
    Ingredients: [
      "Mushrooms",
      "Cream cheese",
      "Garlic",
      "Breadcrumbs",
      "Parmesan cheese",
    ],
    Price: 5000,
    Calories: 70,
    MealTypes: [4],
    Picture: "stuffed-mushrooms.png",
  },
  {
    Name: "Vegetarian Pad Thai",
    Ingredients: [
      "Rice noodles",
      "Tofu",
      "Bean sprouts",
      "Peanuts",
      "Tofu",
      "Tamarind sauce",
    ],
    Price: 12800,
    Calories: 350,
    MealTypes: [3],
    Top: true,
    Picture: "tofu-pad-thai-noodles.png",
  },
  {
    Name: "Turkey and Avocado Wrap",
    Ingredients: [
      "Sliced turkey",
      "Avocado",
      "Lettuce",
      "Tomato",
      "Whole wheat tortilla",
      "Mustard",
    ],
    Price: 11645,
    Calories: 400,
    MealTypes: [1],
    Picture: "turkey-and-avocado.png",
  },
  {
    Name: "Vanilla Ice Cream Sundae",
    Ingredients: [
      "Vanilla ice cream",
      "Chocolate syrup",
      "Whipped cream",
      "Nuts",
      "Cherry",
    ],
    Price: 10000,
    Calories: 400,
    MealTypes: [5],
    Picture: "vanilla-ice-cream-sundae.png",
  },
  {
    Name: "Vegetarian Black Bean Chili",
    Ingredients: [
      "Black beans",
      "Tomatoes",
      "Bell peppers",
      "Onions",
      "Corn",
      "Chili spices",
    ],
    Price: 8700,
    Calories: 320,
    MealTypes: [1],
    Picture: "vegen-black-bean-chilli.png",
  },
  {
    Name: "Vegetable Curry with Brown Rice",
    Ingredients: [
      "Potatoes",
      "Carrots",
      "Peas",
      "Coconut milk",
      "Curry spices",
      "Served with brown rice",
    ],
    Price: 8700,
    Calories: 320,
    MealTypes: [3],
    Picture: "vegetable-curry-and-rice.png",
  },
  {
    Name: "Vegetable Curry with Brown Rice",
    Ingredients: [
      "Quinoa",
      "Roasted vegetables",
      "Chickpeas",
      "Feta cheese",
      "Lemon-tahini dressing",
    ],
    Price: 9000,
    Calories: 300,
    MealTypes: [1],
    Picture: "vegetable-quinoa-bowl.png",
  },
  {
    Name: "Whole Wheat Pancakes",
    Ingredients: [
      "Whole wheat flour",
      "Milk",
      "Eggs",
      "Baking powder",
      "Cinnamon",
    ],
    Price: 1800,
    Calories: 220,
    MealTypes: [0],
    Picture: "whole-wheat-pancakes.png",
  },
];

const loadData = async () => {
  // for (const meal of meals) {
  //   mealTypes[meal.MealTypes[0]].Total =
  //     (mealTypes[meal.MealTypes[0]].Total || 0) + 1;
  //   console.log(
  //     meal.Name,
  //     meal.Ingredients.length,
  //     fs.existsSync(path.join(__dirname, `./meals/${meal.PicturePath}`)),
  //   );
  // }
  // console.log(mealTypes);

  // Adding meal types
  console.log("Adding meal types");
  mealTypes = await MealTypesModel.create(mealTypes);
  console.log(mealTypes);

  // Adding meals
  console.log("Adding meals");
  const addedMeals = await MealsModel.create(
    meals.map((meal) => ({
      ...meal,
      MealTypes: meal.MealTypes.map((ind) => mealTypes[ind]._id),
    })),
  );
  console.log(addedMeals);

  // Creating meal files
  console.log("Creating path");
  await Promise.all(
    addedMeals.map(async (meal) => {
      fsPromises.mkdir(path.join(__dirname, `./meals/${meal._id}`));

      const picturePath = path.join(__dirname, `./meals/${meal.Picture}`);

      const newPictureName = `${Date.now()}-${Math.round(
        Math.random() * 1e9,
      )}${path.extname(picturePath.toLowerCase())}`;

      const destinationPath = path.join(
        __dirname,
        `./meals/${meal._id}/${newPictureName}`,
      );

      await fsPromises.copyFile(picturePath, destinationPath);
      await fsPromises.unlink(picturePath);

      meal.Picture = newPictureName;
      await meal.save();
    }),
  );
  console.log("End creating path");
};

(async () => {
  await connect(process.env.MONGO_URI);
  console.log("Connected to database successfully");
  await loadData();
  console.log("Data loaded successfully");
  await disconnect();
  console.log("Database disconected successfully");
})();
