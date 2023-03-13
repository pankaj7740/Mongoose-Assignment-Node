import { Response } from 'express';

const makeResponse = async (res: Response, statusCode: number, success: boolean, message: string, payload: any) =>
  new Promise<any>(resolve => {
    res.status(statusCode)
      .send({
        success,
        message,
        data: payload
      });
    resolve(statusCode);
  });

export { makeResponse };
