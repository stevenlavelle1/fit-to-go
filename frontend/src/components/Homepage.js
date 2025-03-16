import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Homepage.css"; // Import the styles for the homepage

const Homepage = () => {
  // Example categories
  const categories = [
    "HIIT",
    "Cardio",
    "Weights",
    "Legs",
    "Back",
    "CrossFit",
    "Yoga",
    "Strength Training",
    "Bodybuilding"
  ];

  const workoutPlans = {
    HIIT: [
      "Full Body HIIT Blast",
      "30-Minute Fat Burn",
      "HIIT for Beginners"
    ],
    Cardio: [
      "30-Minute Running Routine",
      "Cycling for Endurance",
      "Stair Climber Workout"
    ],
    Weights: [
      "Upper Body Strength",
      "Leg Day Weights",
      "Full Body Strength Training"
    ],
    Legs: ["Legs for Days", "Legs and Core", "Lower Body Blast"],
    Back: ["Back Day Routine", "Strong Back Workouts", "Upper Back Focus"],
    CrossFit: [
      "CrossFit for Beginners",
      "CrossFit Strength Training",
      "CrossFit WOD"
    ],
    Yoga: [
      "Morning Yoga Flow",
      "Yoga for Flexibility",
      "Yoga for Strength"
    ],
    "Strength Training": [
      "Strength Training for Beginners",
      "Advanced Strength Routine",
      "Total Body Strength Training"
    ],
    Bodybuilding: [
      "Bodybuilding Workout for Mass",
      "Full Body Muscle Building",
      "Bodybuilding Strength Routine"
    ]
  };

  const user = useSelector((state) => state.auth.user);
  const [selectedCategory, setSelectedCategory] = useState("HIIT");
  const [displayedWorkouts, setDisplayedWorkouts] = useState(workoutPlans[selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setDisplayedWorkouts(workoutPlans[category]);
  };

  return (
    <div className="homePage">
       {user && <h2>Welcome, {user.username}!</h2>}
      <h2>Workout Plans</h2>
      {user && <h2>Welcome, {user.username}!</h2>}
      
      {/* Scrollable category selection bar */}
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`categoryButton ${category === selectedCategory ? "active" : ""}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Display workouts based on selected category */}
      <div className="workoutPlans">
        <h3>{selectedCategory} Workouts</h3>
        <ul>
          {displayedWorkouts.map((workout, index) => (
            <li key={index}>{workout}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Homepage;
