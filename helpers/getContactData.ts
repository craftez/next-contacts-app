import type { ContactType, GoogleResourceType } from "./types";

export function getContactData(
  googleResource: GoogleResourceType
): ContactType {
  const name = googleResource.names.length ? googleResource.names[0] : null;
  const phones = googleResource.phoneNumbers;
  const photo = googleResource.photos.length ? googleResource.photos[0] : null;

  return {
    resourceId: googleResource.resourceName,
    fullName: name?.displayName,
    firstName: name?.givenName,
    middleName: name?.middleName,
    lastName: name?.familyName,
    primary: name?.metadata.primary,
    phones,
    profilePicture: photo?.url,
  };
}
