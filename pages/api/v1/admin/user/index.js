import { getUsers } from '@/backend/controllers/authController';
import {
  authorizeRoles,
  isAuthenticatedUser,
} from '@/backend/middlewares/auth';
import ErrorHandlingChecker from '@/backend/middlewares/errors';
import { connectToDB } from '@/backend/utils/dbConnection';
import nc from 'next-connect';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     await connectToDB();
//     await isAuthenticatedUser(req, res, () => {
//       authorizeRoles('admin');
//       getUsers(req, res);
//     });
//   } else {
//     return res.status(405).json({
//       message: 'Method not allowed! Please try again',
//     });
//   }
// }

const handler = nc({
  onError: ErrorHandlingChecker,
});

connectToDB();

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(getUsers);

export default handler;
