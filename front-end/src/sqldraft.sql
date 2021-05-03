CREATE TABLE teams(
  team_id SERIAL PRIMARY KEY,
  team_name VARCHAR
);

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR,
  email VARCHAR,
  password VARCHAR
);

CREATE TABLE boards(
  board_id SERIAL PRIMARY KEY,
  board_name VARCHAR
);

CREATE TABLE tasks(
  task_id SERIAL PRIMARY KEY,
  task_name VARCHAR,
  section INTEGER,
  priority INTEGER,
  timestamp INTEGER
);

CREATE TABLE sections(
  section_id SERIAL PRIMARY KEY,
  section_name VARCHAR,
  position INTEGER
);

CREATE TABLE users_tasks(
  user_id INTEGER REFERENCES users (user_id) ON UPDATE CASCADE,
  task_id INTEGER REFERENCES tasks (task_id) ON UPDATE CASCADE,
  CONSTRAINT users_tasks_pkey PRIMARY KEY (user_id, task_id)
);

CREATE TABLE teams_users(
  team_id INTEGER REFERENCES teams (team_id) ON UPDATE CASCADE,
  user_id INTEGER REFERENCES users (user_id) ON UPDATE CASCADE,
  CONSTRAINT teams_users_pkey PRIMARY KEY (team_id, user_id)
);

ALTER TABLE boards ADD COLUMN team_id INTEGER REFERENCES teams (team_id) ON UPDATE CASCADE;

ALTER TABLE tasks ADD COLUMN board_id INTEGER REFERENCES boards (board_id) ON UPDATE CASCADE;

ALTER TABLE sections ADD COLUMN board_id INTEGER REFERENCES boards (board_id) ON UPDATE CASCADE;


INSERT INTO teams (team_name) VALUES ('Team 1');
INSERT INTO teams (team_name) VALUES ('Team 2');

INSERT INTO users (username, email, password) VALUES ('john', 'john@gmail.com', 'changeme');
INSERT INTO users (username, email, password) VALUES ('maria', 'maria@gmail.com', 'guess');
INSERT INTO users (username, email, password) VALUES ('phelizer', 'phelizer@ukr.net', 'admin');

INSERT INTO teams_users VALUES (1, 1);
INSERT INTO teams_users VALUES (1, 2);
INSERT INTO teams_users VALUES (2, 2);
INSERT INTO teams_users VALUES (2, 3);

INSERT INTO boards (board_name, team_id) VALUES ('Aao', 1);
INSERT INTO boards (board_name, team_id) VALUES ('Lorem', 2);
INSERT INTO boards (board_name, team_id) VALUES ('Ipsum', 2);

INSERT INTO sections (section_name, position, board_id) VALUES ('Backlog', 0, 1);
INSERT INTO sections (section_name, position, board_id) VALUES ('Ongoing', 1, 1);
INSERT INTO sections (section_name, position, board_id) VALUES ('Done', 2, 1);

INSERT INTO sections (section_name, position, board_id) VALUES ('Backlog', 0, 2);
INSERT INTO sections (section_name, position, board_id) VALUES ('Ongoing', 1, 2);
INSERT INTO sections (section_name, position, board_id) VALUES ('Done', 2, 2);
INSERT INTO sections (section_name, position, board_id) VALUES ('Rework', 3, 2);

INSERT INTO sections (section_name, position, board_id) VALUES ('Backlog', 0, 3);
INSERT INTO sections (section_name, position, board_id) VALUES ('Ongoing', 1, 3);
INSERT INTO sections (section_name, position, board_id) VALUES ('Done', 2, 3);

INSERT INTO tasks (task_name, section, priority, timestamp, board_id) VALUES ('Write tests for module X', 1, 1, 1000000000, 1);
INSERT INTO tasks (task_name, section, priority, timestamp, board_id) VALUES ('Pitch project', 2, 1, 1000000000, 2);
INSERT INTO tasks (task_name, section, priority, timestamp, board_id) VALUES ('Do brainstorm', 3, 1, 1000000000, 3);

INSERT INTO users_tasks VALUES (1, 1);
INSERT INTO users_tasks VALUES (2, 2);
INSERT INTO users_tasks VALUES (3, 3);

/////////////////////////



SELECT board_id, board_name, boards.team_id, team_name FROM teams_users LEFT JOIN boards ON teams_users.team_id = boards.team_id
LEFT JOIN teams ON boards.team_id = teams.team_id WHERE user_id = 2;

SELECT board_id, board_name, boards.team_id, team_name FROM boards LEFT JOIN teams
ON boards.team_id = teams.team_id;