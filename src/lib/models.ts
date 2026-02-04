import z from "zod";

export const submissionSchema = z.object({
    channelName: z.string().min(1).max(100),
    targetLength: z.number().min(100).max(500),
    includeAts: z.boolean().default(false),
    usersName: z.string().min(1).max(100).optional(),
    excludeMods: z.boolean().default(true),
    excludeVips: z.boolean().default(true),
    localTime: z.iso.datetime()
});
export type Submission = z.infer<typeof submissionSchema>;

export const localStorageSchema = z.object({
    channelName: z.string().min(1).max(100),
    usersName: z.string().min(1).max(100).optional()
});
export type LocalStorage = z.infer<typeof localStorageSchema>;