import { useMutation } from "@tanstack/react-query";
import {
  LoginBody,
  LoginResponse,
  UserRoles,
  VerifyEmailBody,
  VerifyEmailResponse,
} from "@types";
import { authApis } from "apis";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { __DEV__ } from "utils";
export function useVerifyEmailMutation() {
  const router = useRouter();

  const verifyEmailMutation = useMutation<
    VerifyEmailResponse,
    string,
    VerifyEmailBody,
    unknown
  >({
    mutationFn: (body) => authApis.verifyEmail(body),
    onError: () => router.push("/verify"),
  });
  return verifyEmailMutation;
}

export function useLoginMutation() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const loginMutation = useMutation<LoginResponse, string, LoginBody>({
    mutationFn: (body) => authApis.login(body),
    onSuccess: (response) => {
      const now = new Date();
      const expires = new Date(
        now.getFullYear() + 1,
        now.getMonth(),
        now.getDate()
      );

      setCookie(process.env.NEXT_PUBLIC_COOKIE_RT, response.refreshToken, {
        domain: __DEV__ ? "localhost" : process.env.NEXT_PUBLIC_DOMAIN,
        expires,
      });
      setCookie(process.env.NEXT_PUBLIC_COOKIE_AT, response.accessToken, {
        domain: __DEV__ ? "localhost" : process.env.NEXT_PUBLIC_DOMAIN,
        expires,
      });
      if (__DEV__) {
        window.location.href = "http://localhost:3000/";
        return;
      }
      let redirectURL = null;
      switch (response.user.role) {
        case UserRoles.SystemAdmin:
          redirectURL = process.env.NEXT_PUBLIC_FU_SA_URL;
          break;
        case UserRoles.WorkspaceAdmin:
          redirectURL = `http://admin.${response.workspaceDomain}`;
          break;
        default:
          redirectURL = `http://${response.workspaceDomain}`;
          break;
      }
      window.location.href = redirectURL;
    },
  });
  return loginMutation;
}
