
import { users } from '../data/users.js';

export const get_users = (req, res) => {
    res.status(200).json(users);
}

