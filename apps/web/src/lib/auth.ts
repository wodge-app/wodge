import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { Adapter } from "@auth/core/adapters";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { DbAdapter } from "./adapter";
import { db } from "@repo/data/db";
import { env } from "./env";
import { users } from "@repo/data/schemas";
import { sendMagicLink } from "./server-utils";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/login/error",
    newUser: "/onboarding",
    signOut: "/logout",
  },

  events: {
    async linkAccount({ user, account }) {
      if (account.provider === "github" || account.provider === "google") {
        user?.id &&
          (await db
            .update(users)
            .set({ emailVerified: new Date() })
            .where(eq(users.id, user.id)));
      }
    },
  },

  callbacks: {
    async session({ user, session }) {
      return {
        ...session,
        user: {
          id: user.id,
          username: user?.username,
        },
      };
    },
  },

  adapter: DbAdapter(db) as Adapter,

  session: {
    strategy: "database",
    generateSessionToken() {
      return nanoid();
    },
  },

  providers: [
    Github({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),

    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,

      profile(profile) {
        return {
          ...profile,
          id: profile.sub,
          image: profile.picture,
        };
      },
    }),
    {
      id: "email",
      type: "email",
      from: "auth@example.com",
      server: {},
      maxAge: 300,
      name: "Email",
      options: {},
      async sendVerificationRequest({ identifier, url }) {
        sendMagicLink({ identifier, url });
      },
      async generateVerificationToken() {
        return nanoid();
      },
    },
  ],
});
