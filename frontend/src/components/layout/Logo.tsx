import { Link } from "react-router-dom";

const Logo = ({ className = "h-14 w-auto" }: { className?: string }) => {
  return (
    <Link to="/">
      <img
        src="/images/logo.png"
        alt="ایران‌نما"
        className={`${className} dark:invert`}
      />
    </Link>
  );
};

export default Logo;
