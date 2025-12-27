import {
    pgTable,
    pgEnum,
    integer,
    text,
    timestamp,
} from "drizzle-orm/pg-core";
import { relations, InferSelectModel } from "drizzle-orm";

export const statusEnum = pgEnum('status', [
    'backlog',
    'todo',
    'in_progress',
    'done',
])

export const priorityEnum = pgEnum('priority', [
    'low',
    'medium',
    'high',
])

export const users = pgTable('users', {
    id: text('id').primaryKey(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const issues = pgTable('issues', {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    title: text('title').notNull(),
    description: text('description'),
    status: statusEnum('status').notNull().default('backlog'),
    priority: priorityEnum('priority').notNull().default('low'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    userId: text('user_id').notNull(),
})

export const userRelations = relations(users, ({ many }) => ({
    issues: many(issues),
}))

export const issueRelations = relations(issues, ({ one }) => ({
    user: one(users, {
        fields: [issues.userId],
        references: [users.id],
    }),
}))

export type User = InferSelectModel<typeof users>;
export type Issue = InferSelectModel<typeof issues>;

export const ISSUE_STATUS = {
    backlog: { label: 'Backlog', value: 'backlog' },
    todo: { label: 'Todo', value: 'todo' },
    in_progress: { label: 'In Progress', value: 'in_progress' },
    done: { label: 'Done', value: 'done' },
}

export const ISSUE_PRIORITY = {
    low: { label: 'Low', value: 'low' },
    medium: { label: 'Medium', value: 'medium' },
    high: { label: 'High', value: 'high' },
}