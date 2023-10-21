import { Request, Response } from "express";
import { sendMessage1, getMessages } from "../../controllers/messageController";
import Message from "../../models/messageModel";

describe("Test the sendMessage function", () => {
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
});

describe("Testiung the getMessages function", () => {
  it("should return a 401 status code and an error message when there is no user authenticated", async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    await getMessages(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
  });

  it("should return a 200 status code and an array of messages when there is an authenticated user and messages in the database", async () => {
    const req = {
      user: {
        _id: "mockedUserId",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockedMessages = [
      {
        author: "mockedUserId",
        text: "Message 1",
        createdAt: new Date(),
      },
      {
        author: "mockedUserId",
        text: "Message 2",
        createdAt: new Date(),
      },
    ];

    jest.spyOn(Message, "find").mockResolvedValue(mockedMessages);

    await getMessages(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockedMessages);
  });

  it("should return an empty array when there are no messages in the database", async () => {
    const req = {
      user: {
        _id: "mockedUserId",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    jest.spyOn(Message, "find").mockResolvedValue([]);

    await getMessages(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it("should return a 200 status code and an array of messages sorted by date when there are messages in the database", async () => {
    const req = {
      user: {
        _id: "mockedUserId",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const messages = [
      {
        _id: "messageId1",
        author: "userId1",
        text: "Message 1",
        createdAt: new Date("2023-10-10T10:00:00.000Z"),
      },
      {
        _id: "messageId2",
        author: "userId2",
        text: "Message 2",
        createdAt: new Date("2023-10-11T11:00:00.000Z"),
      },
    ];

    jest.spyOn(Message, "find").mockResolvedValue(messages);

    await getMessages(req, res);

    const expectedSortedMessages = [...messages].sort(
      (a: any, b: any) => a.createdAt - b.createdAt
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedSortedMessages);
  });
});

// yarn jest src/__tests__/controllers/messageController.test.ts
