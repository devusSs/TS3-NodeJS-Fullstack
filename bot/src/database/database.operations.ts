const AddUserConnect = `
    INSERT INTO users (
        ts_id, first_username, latest_username,
        first_ip, latest_ip,
        first_connection, latest_connection,
        country, version, platform, unique_id
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
    ) RETURNING id;
`;

const UpdateUserConnect = `
    UPDATE users SET latest_username = $1, latest_ip = $2,
        latest_connection = $3, country = $4, version = $5, platform = $6 
        WHERE ts_id = $7 
        RETURNING id;
`;

const UpdateUserDisconnect = `
    UPDATE users SET latest_username = $1, latest_ip = $2,
        latest_disconnect = $3, country = $4, version = $5, platform = $6
        WHERE ts_id = $7
        RETURNING id;
`;

const AddCommand = `
    INSERT INTO commands (
        name, output, userlevel, added, user_added
    ) VALUES (
        $1, $2, $3, $4, $5
    ) RETURNING id;
`;

const EditCommand = `
    UPDATE commands SET output = $1, userlevel = $2,
        edited = $3, user_edited = $4
        WHERE name = $5
        RETURNING id;
`;

const DeleteCommand = `
    DELETE FROM commands WHERE name = $1;
`;

const GetCommand = `
    SELECT * FROM commands WHERe name = $1;
`;

const GetCommands = `
    SELECT * FROM commands;
`;

const AddMessage = `
    INSERT INTO messages (
        invoker_nick, invoker_dbid, invoker_uid, invoker_ip,
        message, targetmode, datetime
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7
    );
`;

export default {
  AddUserConnect,
  UpdateUserConnect,
  UpdateUserDisconnect,
  AddCommand,
  EditCommand,
  DeleteCommand,
  GetCommand,
  GetCommands,
  AddMessage,
};
