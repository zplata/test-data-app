import type { APIRoute } from "astro";
import { WebflowClient } from "webflow-api";

/**
 * Retrieve the Webflow OAuth URL with the Webflow SDK and redirect the user
 * to the URL once constructed
 */
export const GET: APIRoute = async (context) => {
  //@ts-ignore
  const runtime = context.locals?.runtime;
  const authorizeUrl = WebflowClient.authorizeURL({
    scope: [
      "authorized_user:read",
      "sites:read",
    ],
    clientId: import.meta.env.WEBFLOW_CLIENT_ID || runtime?.env?.WEBFLOW_CLIENT_ID || "",
  });
  return Response.redirect(authorizeUrl);
};
