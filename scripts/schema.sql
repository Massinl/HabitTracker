-- Habit Tracker Schema
CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  number        VARCHAR(20) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name  VARCHAR(100) NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- A group for shared/collaborative tasks ex "Our Apartment"
CREATE TABLE schedules (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  created_by  INTEGER NOT NULL REFERENCES users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Who belongs to a shared schedule
CREATE TABLE schedule_members (
  schedule_id  INTEGER NOT NULL REFERENCES schedules(id) ON DELETE CASCADE,
  user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role         VARCHAR(20) NOT NULL DEFAULT 'member', -- 'owner' | 'member'
  joined_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (schedule_id, user_id)
);

-- A single trackable item: personal habit 
-- OR a shared task inside a schedule 
CREATE TABLE tasks (
  id           SERIAL PRIMARY KEY,
  schedule_id  INTEGER REFERENCES schedules(id) ON DELETE CASCADE, -- NULL = personal habit
  owner_id     INTEGER NOT NULL REFERENCES users(id),              -- who created it
  assigned_to  INTEGER REFERENCES users(id),                       -- shared tasks: whose turn it is (nullable)
  title        VARCHAR(100) NOT NULL,        -- e.g. "Brush teeth", "Clean bathtub"
  description  TEXT,
  frequency    VARCHAR(20) NOT NULL DEFAULT 'daily', -- 'daily' | 'weekly' | 'custom'
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at  TIMESTAMPTZ -- soft delete: NULL means active
);

-- Append-only log of every time a task was completed.
-- NEVER delete rows here this is for streaks/stats/history.
CREATE TABLE completions (
  id            SERIAL PRIMARY KEY,
  task_id       INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  completed_by  INTEGER NOT NULL REFERENCES users(id),
  completed_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  note          TEXT
);

-- Helpful indexes for common queries
CREATE INDEX idx_tasks_owner ON tasks(owner_id);
CREATE INDEX idx_tasks_schedule ON tasks(schedule_id);
CREATE INDEX idx_completions_task ON completions(task_id);
CREATE INDEX idx_completions_completed_at ON completions(completed_at);
