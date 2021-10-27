interface Metadata {
  primary: boolean;
}

interface GoogleResourceName {
  displayName: string;
  familyName: string;
  middleName: string;
  givenName: string;
  metadata: Metadata;
}

export interface GoogleResourcePhone {
  type: string;
  value: string;
  metadata?: Metadata;
}

interface GoogleResourcePhoto {
  url: string;
  metadata: Metadata;
}

export interface GoogleResourceType {
  resourceName: string;
  names: GoogleResourceName[];
  phoneNumbers: GoogleResourcePhone[];
  photos: GoogleResourcePhoto[];
}

export interface ContactType {
  resourceId?: string;
  fullName?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  primary?: boolean;
  phones?: GoogleResourcePhone[];
  profilePicture?: string;
}
