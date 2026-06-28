

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

    display_name VARCHAR(100) NOT NULL,

    phone VARCHAR(20) UNIQUE,

    timezone VARCHAR(50) NOT NULL DEFAULT 'UTC',

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);



CREATE TABLE schedules (
    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    created_by UUID NOT NULL
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE TABLE schedule_members (
    schedule_id BIGINT NOT NULL
        REFERENCES schedules(id)
        ON DELETE CASCADE,

    user_id UUID NOT NULL
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    role VARCHAR(20) NOT NULL DEFAULT 'member'
        CHECK (role IN ('owner', 'member')),

    joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    PRIMARY KEY (schedule_id, user_id)
);


CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,

    schedule_id BIGINT
        REFERENCES schedules(id)
        ON DELETE CASCADE,

    owner_id UUID NOT NULL
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    assigned_to UUID
        REFERENCES profiles(id)
        ON DELETE SET NULL,

    title VARCHAR(100) NOT NULL,

    description TEXT,

    frequency VARCHAR(20) NOT NULL DEFAULT 'daily'
        CHECK (frequency IN ('daily', 'weekly', 'custom')),

    recurrence_rule TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    archived_at TIMESTAMPTZ
);



CREATE TABLE completions (
    id BIGSERIAL PRIMARY KEY,

    task_id BIGINT NOT NULL
        REFERENCES tasks(id)
        ON DELETE CASCADE,

    completed_by UUID NOT NULL
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    note TEXT
);


CREATE INDEX idx_tasks_owner
ON tasks(owner_id);

CREATE INDEX idx_tasks_schedule
ON tasks(schedule_id);

CREATE INDEX idx_tasks_assigned
ON tasks(assigned_to);

CREATE INDEX idx_completions_task
ON completions(task_id);

CREATE INDEX idx_completions_completed_at
ON completions(completed_at);

CREATE INDEX idx_schedule_members_user
ON schedule_members(user_id);