import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/slices/authSlice";
import { toast } from "sonner";
import Container from "@/components/layout/Container";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      dispatch(loginSuccess({ user: { id: 1, name, email, role: "user" }, token: "demo-token" }));
      toast.success("حساب کاربری ایجاد شد");
      navigate("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>ثبت نام | ایران‌نما</title></Helmet>
      <section className="flex min-h-[80vh] items-center py-16">
        <Container>
          <div className="mx-auto max-w-md">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-black">ثبت نام</CardTitle>
                <CardDescription>ایجاد حساب کاربری جدید</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">نام و نام خانوادگی</label>
                    <Input placeholder="نام خود را وارد کنید" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">ایمیل</label>
                    <Input type="email" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">رمز عبور</label>
                    <Input type="password" placeholder="حداقل ۸ کاراکتر" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
                  </div>
                  <Button type="submit" className="w-full gap-2" size="lg" disabled={isLoading}>
                    <UserPlus className="h-5 w-5" />
                    {isLoading ? "در حال ثبت نام..." : "ثبت نام"}
                  </Button>
                </form>
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  حساب کاربری دارید؟{" "}
                  <Link to="/login" className="font-medium text-primary hover:underline">ورود</Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
};

export default RegisterPage;
