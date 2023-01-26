const GetUsers = `
    SELECT * FROM users;
`;

const GetUsersByLatestUsernameOrUID = `
    SELECT * FROM users WHERE (latest_username = $1) OR (unique_id = $2);
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

export default {
  GetUsers,
  GetUsersByLatestUsernameOrUID,
  GetCommands,
  GetMessages,
  AddToken,
  DeleteToken,
  GetToken,
};
