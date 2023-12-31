"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";

import { alertDialogStateAtom } from "../shared-ui/ErrorAlertDialog/atom";

import { inviteTokenAtom } from "@/domain/auth/store/atom";
import { addOperator } from "@/domain/event/api/add-operator";

const InvitePage = () => {
  // TODO:tokenのParamsをリダイレクト時に保持してくれないので、パッチ的にatomに保持しておく
  const [inviteToken, setInviteToken] = useAtom(inviteTokenAtom);
  const user = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const setDialogState = useAtom(alertDialogStateAtom)[1];

  const handleSubmit = async () => {
    const paramsToken = searchParams.get("token");
    await setInviteToken(paramsToken);

    if (!paramsToken && !inviteToken) {
      alert("招待トークンがありません。");
      return;
    }
    if (!user.user) {
      await router.push(
        `/api/auth/login?returnTo=/invite?token=${inviteToken}`,
      );
      return;
    }

    try {
      await addOperator(inviteToken || paramsToken!);

      setInviteToken(null);
      await router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setDialogState({ isOpen: true, error });
      }
      return;
    }
  };

  return (
    <main className={"grid h-full place-items-center"}>
      <div
        className={"relative flex flex-col items-center justify-center gap-4"}
      >
        <img
          alt="repaintのロゴ"
          src={"/repaint-logo.svg"}
          width={300}
          height={200}
        />
        <button
          onClick={handleSubmit}
          className={"rounded-lg bg-deepBlue px-4 py-2 text-white"}
          aria-label="招待の承認"
        >
          {user.user ? "招待を承認する" : "ログインする"}
        </button>
      </div>
    </main>
  );
};

export default InvitePage;
