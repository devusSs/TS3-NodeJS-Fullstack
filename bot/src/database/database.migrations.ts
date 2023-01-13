const CREATEUSERTABLE = `
    CREATE TABLE IF NOT EXISTS users (
        id bigserial NOT NULL,
        ts_id bigint NOT NULL,
        first_username varchar(255) NOT NULL,
        latest_username varchar(255) NOT NULL,
        first_ip varchar(255) NOT NULL,
        latest_ip varchar(255) NOT NULL,
        first_connection timestamp NOT NULL,
        latest_connection timestamp NOT NULL,
        latest_disconnect timestamp,
        country varchar(255),
        version varchar(255) NOT NULL,
        platform varchar(255) NOT NULL,
        unique_id varchar(255) UNIQUE NOT NULL
    );
`;

const CREATECOMMANDSTABLE = `
    CREATE TABLE IF NOT EXISTS commands (
        id bigserial NOT NULL,
        name varchar(255) UNIQUE NOT NULL,
        output varchar(255) NOT NULL,
        userlevel varchar(255) NOT NULL,
        added timestamp NOT NULL,
        user_added varchar(255) NOT NULL,
        edited timestamp,
        user_edited varchar(255)
    );
`;

const CREATEMESSAGESTABLE = `
    CREATE TABLE IF NOT EXISTS messages (
        id bigserial NOT NULL,
        invoker_nick varchar(255) NOT NULL,
        invoker_dbid bigint NOT NULL,
        invoker_uid varchar(255) NOT NULL,
        invoker_ip varchar(255) NOT NULL,
        message varchar(1024) NOT NULL,
        targetmode varchar(255) NOT NULL,
        datetime timestamp
    );
`;

export default { CREATEUSERTABLE, CREATECOMMANDSTABLE, CREATEMESSAGESTABLE };
