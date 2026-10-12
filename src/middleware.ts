import { defineMiddleware } from 'astro:middleware';
import { localizeHtml } from './i18n/persian';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (!context.url.pathname.startsWith('/fa/') || (response.headers.has('content-type') && !response.headers.get('content-type')?.includes('text/html'))) return response;
  const html = localizeHtml(await response.text());
  const headers=new Headers(response.headers);
  headers.delete('content-length');
  headers.set('content-language','fa');
  headers.set('content-type','text/html; charset=utf-8');
  return new Response(html,{status:response.status,headers});
});
