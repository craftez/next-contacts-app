import { google } from "googleapis";

const auth = new google.auth.OAuth2(
  process.env.GOOGLE_ID,
  process.env.GOOGLE_SECRET
);

export const Google = {
  async getUserContacts(accessToken: string) {
    try {
      auth.setCredentials({ access_token: accessToken });
      const { data } = await google
        .people({ version: "v1", auth })
        .people.connections.list({
          resourceName: "people/me",
          personFields: "emailAddresses,names,photos,phoneNumbers",
        });

      return { contacts: data.connections, total: data.totalPeople };
    } catch (error) {
      throw error;
    }
  },
};
