import { QueryFindUserArgs } from '../../gql.types';
import { users } from '../../mock-data';

const filterUsersByUserIds = (userIds: string[]) => 
    users.filter(user => userIds.includes(user.id));

const findUserByUserId = (userId: string) => users.find(user => user.id === userId);

const findUserByUsername = (username: string) => users.find(user => user.username === username);

const findUserByUserEmail = (email: string) => users.find(user => user.email === email);

const findUser = (_p: any, { input }: QueryFindUserArgs, _c: any) => {
    const { id, email, username } = input;
    if(id) return findUserByUserId(id);
    if(email) return findUserByUserEmail(email);
    if(username) return findUserByUsername(username);
    console.log(id, username, email);
    return null;
}

module.exports = findUser;
