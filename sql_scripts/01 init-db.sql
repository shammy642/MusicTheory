-- PostgreSQL Script
-- Mon Jan 8 10:05:15 2024

-- -----------------------------------------------------
-- Schema userdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS userdb;

-- -----------------------------------------------------
-- Table userdb.exercises
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS userdb.exercises (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  question TEXT,
  answer TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL
);
INSERT INTO userdb.exercises ("type", "question", "answer", "createdAt", "updatedAt") VALUES 
  ('noteSelect', 'Click on all of the C''s', 'c1,c2', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteSelect', 'Click the lowest F', 'f1', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteSelect', 'Click the highest A', 'a2', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteSelect', 'Click the lowest D', 'd1', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteSelect', 'Click the highest B', 'b2', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteSelect', 'Click the highest E', 'e2', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteSelect', 'Click on all of the F''s', 'f1,f2', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteSelect', 'Click the lowest B', 'b1', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteSelect', 'Click the highest D', 'd2', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteSelect', 'Click the lowest D', 'd1', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteSelect', 'Click the highest A', 'a2', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteSelect', 'Click the lowest E', 'e1', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteIdentify', NULL, 'd2', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteIdentify', NULL, 'a1', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteIdentify', NULL, 'e1', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteIdentify', NULL, 'a2', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteIdentify', NULL, 'c1', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteIdentify', NULL, 'b2', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteIdentify', NULL, 'g1', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteIdentify', NULL, 'c1', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteIdentify', NULL, 'b1', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteIdentify', NULL, 'f2', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteIdentify', NULL, 'b2', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteIdentify', NULL, 'e1', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteIdentify', NULL, 'g2', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('noteIdentify', NULL, 'c2', '2023-09-11 10:48:28', '2023-09-11 10:48:28');

-- -----------------------------------------------------
-- Table userdb.quizes
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS userdb.quizes (
  id SERIAL PRIMARY KEY,
  section TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL
);

INSERT INTO userdb.quizes ("section", "createdAt", "updatedAt") VALUES 
  ('letter_names', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('letter_names', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('letter_names', '2023-09-11 10:48:28', '2023-09-11 10:48:28'),
  ('letter_names', '2023-09-11 10:48:28', '2023-09-11 10:48:28');

-- -----------------------------------------------------
-- Table userdb.quizExercises
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "userdb"."quizExercises" (
  "quizId" INT NOT NULL,
  "exerciseId" INT NOT NULL,
  UNIQUE ("exerciseId"),
  FOREIGN KEY ("quizId") REFERENCES userdb.quizes (id),
  FOREIGN KEY ("exerciseId") REFERENCES userdb.exercises (id)
);

INSERT INTO "userdb"."quizExercises" ("quizId", "exerciseId") VALUES 
  (1, 1),
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 6),
  (3, 7),
  (3, 8),
  (3, 10),
  (4, 11),
  (4, 12),
  (4, 13),
  (3, 14),
  (2, 15),
  (2, 16),
  (2, 17),
  (2, 18),
  (2, 19),
  (3, 20),
  (3, 21),
  (3, 22),
  (4, 23),
  (4, 24),
  (4, 25);


-- -----------------------------------------------------
-- Table userdb.userQuizes
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "userdb"."userQuizes" (
  id SERIAL PRIMARY KEY,
  "userId" INT NOT NULL,
  "quizId" INT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL,
  CONSTRAINT user_quizes_user_id_quiz_id UNIQUE ("userId", "quizId")
);

-- -----------------------------------------------------
-- Table userdb.users
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS userdb.users (
  id SERIAL PRIMARY KEY,
  "userName" TEXT NOT NULL,
  "classroomId" INT,
  password TEXT NOT NULL,
  "emailAddress" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL
);
