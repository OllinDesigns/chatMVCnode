import { getAllUsers } from '../../controllers/userController'
import {Request, Response} from 'express'
import User  from  '../../models/userModel';


describe("Test the getAllUsers function", () => {

    // Should return all users when there are users in the database
    it('should return all users when there are users in the database', async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;

      const users = [{ name: 'User 1' }, { name: 'User 2' }];
      User.find = jest.fn().mockResolvedValue(users);

      await getAllUsers(req, res);


      expect(User.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it('should handle and return an error message when there are no users in the database', async () => {
      const req = {} as Request;;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;;

      User.find = jest.fn().mockResolvedValue([]);

      await getAllUsers(req, res);

      expect(User.find).toHaveBeenCalled();
    });
      

})

  