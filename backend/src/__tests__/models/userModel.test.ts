import User from "../../models/userModel";
import mongoose from "mongoose";

describe("Tests the interface IUser", () => {
  it("should create a user with required fields when all required fields are provided", () => {
    const user = new User({
      googleId: "2255335",
      displayName: "Heinz Keller",
      messages: [],
    });
    expect(user.googleId).toBe("2255335");
    expect(user.displayName).toBe("Heinz Keller");
    expect(user.messages).toEqual([]);
  });

  it("should allow adding messages to a user when messages are provided", () => {
    const user = new User({
      googleId: "2255335",
      displayName: "Heinz Keller",
      messages: [],
    });
    const message = new mongoose.Types.ObjectId();
    user.messages.push(message);
    expect(user.messages).toContain(message);
  });
});

describe("Tests the userSchema", () => {
  it("should allow messages to be empty", () => {
    const user = new User({
      googleId: "2255335",
      displayName: "Heinz Keller",
      messages: [],
    });
    expect(user.messages).toEqual([]);
  });
});
