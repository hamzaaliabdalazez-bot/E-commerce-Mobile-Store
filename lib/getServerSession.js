import { getServerSession as nextAuthGetServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export function getServerSession(request, response) {
  return nextAuthGetServerSession(request, response, authOptions);
}
