import { useState, type FormEvent } from "react";
import Container from "@/components/layout/Container";
import { Breadcrumb } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { messageService } from "@/services/message.service";

const contactInfo = [
  { icon: Mail, label: "ایمیل", value: "info@irannema.ir" },
  { icon: Phone, label: "تلفن", value: "۰۲۱-۱۲۳۴۵۶۷۸" },
  { icon: MapPin, label: "آدرس", value: "تهران، ایران" },
];

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await messageService.send({ name, email, subject, message });
      toast.success("پیام شما با موفقیت ارسال شد");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      toast.error("خطا در ارسال پیام");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>تماس با ما | ایران‌نما</title>
      </Helmet>
      <section className="py-8">
        <Container>
          <Breadcrumb />
          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-5xl font-black">تماس با ما</h1>
              <p className="mt-4 leading-8 text-muted-foreground">
                برای هرگونه سوال، پیشنهاد یا همکاری با ما در ارتباط باشید.
              </p>
              <div className="mt-10 space-y-6">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border bg-card p-6">
              <h2 className="text-2xl font-bold mb-4!">ارسال پیام</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder="نام و نام خانوادگی" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input type="email" placeholder="ایمیل" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <Input placeholder="موضوع" value={subject} onChange={(e) => setSubject(e.target.value)} required />
              <Textarea placeholder="متن پیام..." rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required />
              <Button type="submit" size="lg" className="w-full gap-2" disabled={sending}>
                {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <MessageSquare className="h-5 w-5" />}
                {sending ? "در حال ارسال..." : "ارسال پیام"}
              </Button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ContactPage;
