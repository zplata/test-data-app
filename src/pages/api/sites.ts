import type { APIRoute } from "astro";
import {WebflowClient} from "webflow-api";

export const GET: APIRoute = async ({request}) => {
  const token = request.headers.get('X-WF-Thing')?.replace('Bearer ', '');
  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }
  const wf = new WebflowClient({ accessToken: token });
  const sites = await wf.sites.list();
  if (sites && sites.sites?.length) {
    return new Response(
      JSON.stringify({
        sites: sites.sites,
      })
    );
  }
  return Response.error();
};
