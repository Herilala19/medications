"use client";
import { Button, Input, Card, CardContent, Typography } from "@/components";
import { Link } from "@/i18n/routing";
import { useAuth } from "@/hooks/useAuth";
import { signUpSchema, type SignUpFormData } from "@/lib/validations";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const { signUp, loading, isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/drugs");
    }
  }, [isAuthenticated, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignUpFormData) => {
    setError(null);
    try {
      await signUp(data.firstname, data.lastname, data.email, data.password);
    } catch (err: any) {
      setError(err.message || "An error occurred during sign up");
    }
  };

  if (isAuthenticated()) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-text-secondary">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            {t("signUpTitle")}
          </h1>
          <p className="text-text-secondary mt-2">{t("signUpDescription")}</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    label={t("firstname")}
                    type="text"
                    placeholder={t("firstnamePlaceholder")}
                    {...register("firstname")}
                    error={errors.firstname?.message}
                    disabled={isSubmitting || loading}
                  />

                  <Input
                    label={t("lastname")}
                    type="text"
                    placeholder={t("lastnamePlaceholder")}
                    {...register("lastname")}
                    error={errors.lastname?.message}
                    disabled={isSubmitting || loading}
                  />
                </div>

                <Input
                  label={t("email")}
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  {...register("email")}
                  error={errors.email?.message}
                  disabled={isSubmitting || loading}
                />

                <Input
                  label={t("password")}
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  {...register("password")}
                  error={errors.password?.message}
                  disabled={isSubmitting || loading}
                />

                <Input
                  label={t("confirmPassword")}
                  type="password"
                  placeholder={t("confirmPasswordPlaceholder")}
                  {...register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                  disabled={isSubmitting || loading}
                />
              </div>

              <div className="space-y-4">
                <Button
                  type="submit"
                  variant="default"
                  disabled={isSubmitting || loading}
                  className="w-full"
                >
                  {isSubmitting || loading ? "Signing up..." : t("signUp")}
                </Button>

                <div className="text-center">
                  <span className="text-text-secondary text-sm">
                    {t("hasAccount")}
                  </span>
                  <Link
                    href="/signin"
                    className="ml-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    {t("signIn")}
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
