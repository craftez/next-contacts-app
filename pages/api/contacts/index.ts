import { getToken } from "next-auth/jwt";
import { Google } from "../../../helpers/Google";

const secret = process.env.APP_SECRET;

export default async function getAllContacts(req: any, res: any) {
  const token = await getToken({ req, secret });
  const accessToken = token?.accessToken as string;

  if (token) {
    const result = await Google.getUserContacts(accessToken);
    return res.json(result);
  }

  return res.json({ error: "Not logged in" });
}
