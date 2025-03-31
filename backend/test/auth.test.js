const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const User = require("../models/User");

describe("Auth Routes", () => {
  // Connect to the DB before tests and clear users before each test
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should signup a new user", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
        confirmPassword: "password123"
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  it("should not signup a user with an existing email", async () => {
    // First signup should succeed
    await request(app)
      .post("/api/auth/signup")
      .send({
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
        confirmPassword: "password123"
      });

    // Second signup with the same email should fail
    const response = await request(app)
      .post("/api/auth/signup")
      .send({
        username: "testuser2",
        email: "testuser@example.com",
        password: "password123",
        confirmPassword: "password123"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email already in use");
  });

  it("should return 400 if passwords do not match", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({
        username: "mismatchUser",
        email: "mismatch@example.com",
        password: "password123",
        confirmPassword: "differentPassword"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Passwords do not match");
  });

  it("should login with correct credentials", async () => {
    // First, create a user
    await request(app)
      .post("/api/auth/signup")
      .send({
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
        confirmPassword: "password123"
      });

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@example.com",
        password: "password123"
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.token).toBeDefined();
    expect(response.body.userId).toBeDefined();
    expect(response.body.username).toBe("testuser");
  });

  it("should not login with incorrect credentials", async () => {
    // Create a user first
    await request(app)
      .post("/api/auth/signup")
      .send({
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
        confirmPassword: "password123"
      });

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@example.com",
        password: "wrongpassword"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid email or password");
  });

  it("should not login if user does not exist", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "nonexistent@example.com",
        password: "password123"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid email or password");
  });
});
