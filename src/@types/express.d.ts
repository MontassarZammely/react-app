// src/@types/express.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number; // Change this to the appropriate type if necessary
        // Add any other user properties if needed
      };
    }
  }
}
