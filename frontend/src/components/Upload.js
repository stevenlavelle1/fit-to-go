import React, { useState } from "react";
import "./Upload.css";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [exercises, setExercises] = useState([{ name: "", sets: "", amount: "" }]);

  const handleExerciseChange = (index, field, value) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise, i) =>
        i === index ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: "", amount: "" }]);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, category, exercises });
    alert("Workout uploaded successfully!");
  };

  return (
    <div className="uploadContainer">
      <h2>Upload a New Workout</h2>
      <form onSubmit={handleSubmit} className="uploadForm">
        <label>Workout Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="Strength">Strength</option>
          <option value="Cardio">Cardio</option>
          <option value="Flexibility">Flexibility</option>
          <option value="Endurance">Endurance</option>
        </select>

        <h3>Exercises</h3>
        {exercises.map((exercise, index) => (
          <div key={index} className="exerciseRow">
            <input
              type="text"
              placeholder="Exercise Name"
              value={exercise.name}
              onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Sets"
              value={exercise.sets}
              onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Reps/Time"
              value={exercise.amount}
              onChange={(e) => handleExerciseChange(index, "amount", e.target.value)}
              required
            />
            <button type="button" className="removeBtn" onClick={() => removeExercise(index)}>
              ✖
            </button>
          </div>
        ))}

        <button type="button" className="addBtn" onClick={addExercise}>
          + Add Exercise
        </button>
        <button type="submit" className="submitBtn">Upload Workout</button>
      </form>
    </div>
  );
};

export default Upload;
