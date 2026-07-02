import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link
            to="/"
            className="
                text-3xl
                font-black
                text-primary
            "
        >
            ایران نما
        </Link>
    );
}

export default Logo;