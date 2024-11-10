import type { APIRoute } from "astro";
import { WebflowClient } from "webflow-api";

/**
 * Retrieve the Webflow OAuth URL with the Webflow SDK and redirect the user
 * to the URL once constructed
 */
export const GET: APIRoute = async () => {
  const authorizeUrl = WebflowClient.authorizeURL({
    scope: [
      "authorized_user:read",
      "sites:read",
    ],
    clientId: import.meta.env.WEBFLOW_CLIENT_ID || "",
  });
  return Response.redirect(authorizeUrl);
};
