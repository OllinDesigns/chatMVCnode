import { Request, Response } from "express";
import { sendMessage1 } from "../../controllers/messageController";
// import Message from "../../models/messageModel"
// import mongoose from "mongoose";

describe("Test the sebdMessage function", () => {
  // Sends a message with valid text and authenticated user, returns 201 status code and the new message object

  // Returns an error message when user is not authenticated
  it("should return an error message when user is not authenticated", async () => {
    const req: Request = {
      body: {
        text: "Valid text",
      },
      user: undefined,
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await sendMessage1(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "User not authenticated" });
  });

  // Returns an error message when user is undefined
  it("should return an error message when user is undefined", async () => {
    const req: Request = {
      body: {
        text: "Valid text",
      },
      user: undefined,
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await sendMessage1(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "User not authenticated" });
  });

  // Returns an error message when text is undefined
  it("should return an error message when text is undefined", async () => {
    const req: Request = {
      body: {},
      user: {
        _id: "user_id",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await sendMessage1(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});



describe('getAllMessages', () => {
         // Handle and log any errors that occur during the retrieval process
  
})

// yarn jest src/__tests__/controllers/messageController.test.ts
