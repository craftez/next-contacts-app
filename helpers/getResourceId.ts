import { ContactType } from "./types";

export function getResourceId(contact: ContactType): string {
  return contact.resourceId!.replace(/people\//g, "");
}
