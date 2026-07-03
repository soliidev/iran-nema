import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img
        src="/images/logo.png"
        alt="ایران‌نما"
        className="h-14 w-auto"
      />
    </Link>
  );
};

export default Logo;
