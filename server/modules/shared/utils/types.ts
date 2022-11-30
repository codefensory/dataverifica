export type ToCreate<T> = Omit<T, "id" | "createdAt" | "updatedAt" | "deletedAt">;
