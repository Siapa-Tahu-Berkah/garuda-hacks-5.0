"use server";

import { cookies } from "next/headers";

export const setUserCookie = (user: any, user_id: string, token?: string) => {
  cookies().set({
    name: "token",
    value: token || "",
    maxAge: 60 * 60 * 24 * 1, // 1 day
  });
  cookies().set({
    name: "userName",
    value: user.displayName,
    maxAge: 60 * 60 * 24 * 1, // 1 day
  });
  cookies().set({
    name: "email",
    value: user.email,
    maxAge: 60 * 60 * 24 * 1, // 1 day
  });
  cookies().set({
    name: "photo",
    value: user.photoURL,
    maxAge: 60 * 60 * 24 * 1, // 1 day
  });
  cookies().set({
    name: "id",
    value: user_id,
    maxAge: 60 * 60 * 24 * 1, // 1 day
  });
};
