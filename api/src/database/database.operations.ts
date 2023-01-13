const GetUsers = `
    SELECT * FROM users;
`;

const GetCommands = `
    SELECT * FROM commands;
`;

const GetMessages = `
    SELECT * FROM messages;
`;

export default {
  GetUsers,
  GetCommands,
  GetMessages,
};
