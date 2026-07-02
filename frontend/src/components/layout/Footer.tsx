import { Link } from "react-router-dom";

import Container from "./Container";

const Footer = () => {
    return (
        <footer className="border-t py-12">

            <Container>

                <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">

                    <div>

                        <h3 className="text-2xl font-bold">
                            ایران نما
                        </h3>

                        <p className="mt-3 text-muted-foreground">
                            تجربه بازدید مجازی از جاذبه‌های گردشگری ایران.
                        </p>

                    </div>

                    <div className="flex gap-10">

                        <div>

                            <h4 className="mb-4 font-semibold">
                                صفحات
                            </h4>

                            <div className="flex flex-col gap-3">

                                <Link to="/">خانه</Link>

                                <Link to="/places">
                                    مکان‌ها
                                </Link>

                                <Link to="/virtual-tour">
                                    تور مجازی
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </Container>

        </footer>
    );
}

export default Footer;