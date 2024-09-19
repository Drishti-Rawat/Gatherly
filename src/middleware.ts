import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';


const publicRoutes = [
  '/',
  '/events/:id',
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing',
'/sign-in(.*)',  // This will match all routes under /sign-in
  '/sign-up(.*)' 

];


const isPublicRoute = createRouteMatcher(publicRoutes);

export default clerkMiddleware((auth, request) => {
    if (!isPublicRoute(request)) {
      auth().protect()
    }
  })

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)', '/',
    '/(api|trpc)(.*)',
  ],
};