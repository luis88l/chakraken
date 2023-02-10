import NextAuth from "next-auth/next";

import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        user: { label: "User", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        token: { label: "token", type: "text" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        const url = String(process.env.NEXT_PUBLIC_URL_API);

        console.log(credentials);
        const res = await fetch(`${url}/users/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (user.status === 200) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user != null) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (token) {
        // @ts-expect-error: Unreachable code error
        session.user = token.user;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
