const GetUsers = `
    SELECT * FROM users;
`;

const GetCommands = `
    SELECT * FROM commands;
`;

const GetMessages = `
    SELECT * FROM messages;
`;

const AddToken = `
    INSERT INTO refreshtokens (ownername, token, added) VALUES ($1, $2, $3) RETURNING id;
`;

const DeleteToken = `
    DELETE FROM refreshtokens WHERE ownername = $1;
`;

const GetToken = `
    SELECT * FROM refreshtokens WHERE ownername = $1;
`;

const GetEvents = `
    SELECT * FROM events;
`;

export default {
  GetUsers,
  GetCommands,
  GetMessages,
  AddToken,
  DeleteToken,
  GetToken,
  GetEvents,
};
