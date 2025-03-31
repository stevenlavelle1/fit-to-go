const mongoose = require("mongoose");
const User = require("../models/User");

describe("User Model", () => {
  // Before each test, clear the users collection
  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a user successfully", async () => {
    const user = new User({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123"
    });

    const savedUser = await user.save();
    expect(savedUser.username).toBe("testuser");
    expect(savedUser.email).toBe("testuser@example.com");
  });

  it("should throw an error if username is missing", async () => {
    const user = new User({
      email: "invalid@example.com",
      password: "password123"
    });

    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors.username).toBeDefined();
  });
});
