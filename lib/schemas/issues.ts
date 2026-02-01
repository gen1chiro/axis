import { z } from 'zod';

export const IssueSchema = z.object({
    title: z.string()
        .min(3, 'Title must be at least 3 characters long')
        .max(100, 'Title must be at most 100 characters long'),
    description: z.string()
        .optional()
        .nullable(),
    status: z.enum(['backlog', 'todo', 'in_progress', 'done'], {
        errorMap: () => ({ message: 'Please select a valid status' }),
    }),
    priority: z.enum(['low', 'medium', 'high'], {
        errorMap: () => ({ message: 'Please select a valid priority' }),
    }),
    groupId: z.number().int(),
})

export const UpdateIssueSchema = IssueSchema.partial()

export type IssueData = z.infer<typeof IssueSchema>;
export type UpdateIssueData = z.infer<typeof UpdateIssueSchema>;
