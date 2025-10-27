"use client";
import {
  Button,
  Icon,
  Typography,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import useTheme from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { type LocaleType, usePathname, useRouter, Link } from "@/i18n/routing";
import { LANGUAGES } from "@/utils/constants";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { type FC, useTransition, useState, useEffect } from "react";
import classNames from "classnames";

export const Header: FC = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  const { theme, changeTheme } = useTheme();
  const { user, isAuthenticated, signOut } = useAuth();
  const t = useTranslations("Drugs");
  const tAuth = useTranslations("Auth");

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const clickChangeTheme = () => {
    changeTheme(theme === "dark" ? "" : "dark");
  };

  const changeLanguage = (value: string) => {
    const nextLocale = value as LocaleType;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <header className="sticky left-0 top-0 w-full border-b border-b-br-regular bg-background p-4">
      <div className="mx-auto flex w-full max-w-4xl justify-between">
        <div className="flex gap-2">
          <Image src="/assets/svg/logo.svg" alt="logo" width={24} height={24} />
          <Typography.Text className="font-medium place-self-center">
            App
          </Typography.Text>
        </div>
        <div className="flex gap-4">
          {!isMounted ? (
            // Render a placeholder during SSR to prevent hydration mismatch
            <div className="h-10 w-32 animate-pulse bg-background-component rounded-lg" />
          ) : !isAuthenticated() ? (
            <>
              <Link
                href="/signin"
                className={classNames(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  "text-text-regular hover:text-primary hover:bg-background-component",
                )}
              >
                {tAuth("signIn")}
              </Link>
              <Link
                href="/signup"
                className={classNames(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  "text-text-regular hover:text-primary hover:bg-background-component",
                )}
              >
                {tAuth("signUp")}
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/drugs"
                className={classNames(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  "text-text-regular hover:text-primary hover:bg-background-component",
                )}
              >
                {t("title")}
              </Link>
              <div className="flex items-center gap-2">
                <Typography.Text className="text-sm text-text-regular">
                  {user?.firstname || user?.email}
                </Typography.Text>
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  {tAuth("signOut")}
                </Button>
              </div>
            </>
          )}
          <Select
            value={locale}
            onValueChange={changeLanguage}
            disabled={isPending}
          >
            <SelectTrigger className="w-15 w-fit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Icon
            onClick={clickChangeTheme}
            className="cursor-pointer h-6 w-6 place-self-center"
            name={theme === "dark" ? "Sun" : "Moon"}
          />
        </div>
      </div>
    </header>
  );
};
