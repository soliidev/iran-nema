import Container from "@/components/layout/Container";
import {Breadcrumb} from "@/components/common";
import {Helmet} from "react-helmet-async";
import {FileText} from "lucide-react";

const TermsPage = () => {
    return (
        <>
            <Helmet>
                <title>قوانین و مقررات | ایران‌نما</title>
            </Helmet>
            <section className="py-8">
                <Container>
                    <Breadcrumb />
                    <div className="mt-8 flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <h1 className="text-3xl font-black">قوانین و مقررات</h1>
                    </div>
                    <div className="mt-8 leading-relaxed text-muted-foreground overflow-wrap break-words">
                        <h2 className="mb-4 text-xl font-bold text-foreground">۱. مقدمه</h2>
                        <p className="mb-4">
                            استفاده از سایت ایران‌نما به معنی پذیرش کامل قوانین و مقررات ذیل است. در صورت عدم پذیرش هر
                            یک از این موارد، از استفاده از سایت خودداری کنید.
                        </p>

                        <h2 className="mb-4 text-xl font-bold text-foreground">۲. دقت اطلاعات</h2>
                        <p className="mb-4">
                            تمامی اطلاعات ارائه‌شده در این سایت شامل توضیحات مکان‌ها، تصاویر و قیمت‌ها با
                            دقت ممکن به‌روزرسانی می‌شوند. با این حال، ایران‌نما مسئولیت دقت صد درصد اطلاعات را
                            نمی‌پذیرد و تغییرات بدون اطلاع قبلی امکان‌پذیر است.
                        </p>

                        <h2 className="mb-4 text-xl font-bold text-foreground">۳. مسئولیت کاربر</h2>
                        <p className="mb-4">
                            کاربران مسئول ارائه اطلاعات صحیح و به‌روز هنگام ثبت‌نام و استفاده از خدمات سایت
                            هستند. هرگونه خسارت ناشی از استفاده غیرمجاز از حساب کاربری دیگران،
                            مسئولیت آن بر عهده کاربر مخالف است.
                        </p>

                        <h2 className="mb-4 text-xl font-bold text-foreground">۴. حقوق مالکیت فکری</h2>
                        <p className="mb-4">
                            تمامی محتوای سایت شامل متن، تصاویر، لوگو، طراحی و کد منبع متعلق به ایران‌نما
                            است و بدون اجازه کتبی، بازتولید، توزیع یا استفاده تجاری از آن ممنوع است.
                        </p>

                        <h2 className="mb-4 text-xl font-bold text-foreground">۵. حریم خصوصی</h2>
                        <p className="mb-4">
                            اطلاعات شخصی کاربران فقط برای ارائه بهترین خدمات استفاده می‌شوند و
                            بدون رضایت کاربر به اشخاص ثالث ارائه نمی‌گردد. جزئیات بیشتر در
                            سیاست حریم خصوصی سایت قابل مشاهده است.
                        </p>

                        <h2 className="mb-4 text-xl font-bold text-foreground">۶. ممنوعیت‌ها</h2>
                        <ul className="mb-4 list-disc pr-6 space-y-2">
                            <li>انتشار محتوای غیرقانونی، تهدیدآمیز یا تخریب‌آور</li>
                            <li>استفاده از سایت در مقاصد تبلیغاتی بدون مجوز</li>
                            <li>تلاش برای نفوذ به سیستم یا خرابکاری عملکرد سایت</li>
                            <li>انتشار اطلاعات جعلی یا گمراه‌کننده درباره مکان‌ها</li>
                        </ul>

                        <h2 className="mb-4 text-xl font-bold text-foreground">۷. تغییر قوانین</h2>
                        <p className="mb-4">
                            ایران‌نما حق تغییر، اضافه یا حذف هر بخش از قوانین و مقررات را بدون
                            اطلاع قبلی کاربران دارد. استفاده مداوم از سایت پس از اعمال تغییرات،
                            مبنای پذیرش جدید آن‌ها محسوب می‌شود.
                        </p>

                        <h2 className="mb-4 text-xl font-bold text-foreground">۸. تماس با ما</h2>
                        <p className="mb-4">
                            در صورت هرگونه سوال یا انتقاد درباره قوانین و مقررات، از طریق صفحه
                            تماس با ما یا ایمیل info@irannema.ir با ما در ارتباط باشید.
                        </p>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default TermsPage;