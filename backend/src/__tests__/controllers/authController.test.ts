import { isLoggedIn } from "../../controllers/authController";
import { Request, Response, NextFunction } from "express";
import { handleGoogleCallback } from "../../controllers/authController";

describe("Test the isLoggedIn middleware", () => {
  it("should call next middleware function when user is authenticated", () => {
    const req = {
      isAuthenticated: jest.fn().mockReturnValue(true),
    } as unknown as Request;
    const res = {};
    const next = jest.fn();

    isLoggedIn(req as Request, res as Response, next as NextFunction);

    expect(next).toHaveBeenCalled();
  });

  it("should return a 401 error with a message to log in when user is not authenticated", () => {
    const req = {
      isAuthenticated: jest.fn().mockReturnValue(false),
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    } as unknown as Response;
    const next = jest.fn();

    isLoggedIn(req as Request, res as Response, next as NextFunction);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.status(401).json).toHaveBeenCalledWith({
      error: "Access denied. Please log in.",
    });
  });
});

describe("Test the handleGoogleCallback function", () => {
  it("tests the proper handling of Google callback data and user object property assignment.", async () => {
    const req = {} as unknown as Request;
    const res = {
      redirect: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    const user = {
      googleId: "123",
      displayName: "Fulgencio Pantana",
    };

    await handleGoogleCallback(req, res, next);

    expect(user.googleId).toBe(`123`);
    expect(user.displayName).toBe("Fulgencio Pantana");
  });
});
