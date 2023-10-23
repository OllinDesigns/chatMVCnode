import {
  getAllUsers,
  createUserFromOAuth,
} from "../../controllers/userController";
import { Request, Response } from "express";
import User from "../../models/userModel";
import { AuthenticatedUser } from "../../controllers/userController";

describe("Test the getAllUsers function", () => {
  it("should return all users when there are users in the database", async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const users = [{ name: "User 1" }, { name: "User 2" }];
    User.find = jest.fn().mockResolvedValue(users);

    await getAllUsers(req, res);

    expect(User.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(users);
  });
});

describe("Test the createUserFromOAuth function", () => {
  it("should return an existing user when valid input data is provided", async () => {
    const userData: AuthenticatedUser = {
      googleId: "123456789",
      displayName: "Fulgencio Pantana",
    };

    const existingUser = new User(userData);
    jest.spyOn(User, "findOne").mockResolvedValue(existingUser);

    const result = await createUserFromOAuth(userData);

    expect(result).toBe(existingUser);
  });
});
