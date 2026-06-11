import { Link } from "@tanstack/react-router";
import { Logo } from "../Logo";
import { footerNav } from "./data/nav-links";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <Logo />
      <div className="space-y-5 text-center mt-5">
        {footerNav.map((footer, i) => (
          <Link
            to={footer.to}
            key={i}
            className="font-lato block uppercase text-xs tracking-wider font-medium text-muted hover:scale-110 duration-300">
            {footer.label}
          </Link>
        ))}
      </div>
      <p className="mt-8 mb-6 font-lato block uppercase text-xs tracking-wider font-medium text-muted">
        &copy;Benefits Access Center, 2025
      </p>
    </div>
  );
};

export default Footer;
