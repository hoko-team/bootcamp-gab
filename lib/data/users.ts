import usersData from "@/data/users.json";
import type { User } from "@/lib/types";

export function getUsers(): User[] {
  return usersData as User[];
}

export function getUserById(id: string): User | undefined {
  return getUsers().find((user) => user.id === id);
}

export function getUsersByIds(ids: string[]): User[] {
  return ids.map((id) => getUserById(id)).filter((user): user is User => !!user);
}

export function getSpeakersForEvent(speakerIds: string[]): User[] {
  return getUsersByIds(speakerIds);
}

export function getRegisteredUsersForEvent(registeredUserIds: string[]): User[] {
  return getUsersByIds(registeredUserIds);
}
