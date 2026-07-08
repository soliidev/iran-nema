import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useAppDispatch } from "@/store/hooks";
import { loginStart, loginSuccess, loginFailure } from "@/store/slices/authSlice";
import { toast } from "sonner";
import Container from "@/components/layout/Container";
import api from "@/services/axios";
import Logo from "@/components/layout/Logo";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(loginStart());
    try {
      const { data } = await api.post("/auth/login", { email, password });
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      toast.success("با موفقیت وارد شدید");
      navigate(data.user.is_admin ? "/dashboard" : "/");
    } catch (err: unknown) {
      dispatch(loginFailure());
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "خطا در ورود";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>ورود | ایران‌نما</title></Helmet>
      <section className="flex min-h-[80vh] items-center py-16">
        <Container>
          <div className="mx-auto max-w-md">
            <Card>
              <CardContent className="pt-10">
                <div className="mb-8 flex justify-center">
                  <Logo className="h-20 w-auto" />
                </div>
                <CardDescription className="mb-6 text-center">
                  به ایران‌نما خوش آمدید
                </CardDescription>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">ایمیل</label>
                    <Input type="email" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">رمز عبور</label>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="pe-9" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 end-0 my-auto flex cursor-pointer items-center pe-3 text-muted-foreground">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      رمز عبور را فراموش کرده‌اید؟
                    </Link>
                  </div>
                  <Button type="submit" className="w-full gap-2" size="lg" disabled={isLoading}>
                    <LogIn className="h-5 w-5" />
                    {isLoading ? "در حال ورود..." : "ورود"}
                  </Button>
                </form>
                <p className="mt-6! text-center text-sm text-muted-foreground">
                  حساب کاربری ندارید؟{" "}
                  <Link to="/register" className="font-medium text-primary hover:underline">ثبت نام</Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
};

export default LoginPage;
