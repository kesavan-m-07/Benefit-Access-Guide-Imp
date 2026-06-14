import { Link } from "@tanstack/react-router";
import { Logo } from "@shared/components/Logo";
import { footerNav } from "./data/nav-links";

const Footer = () => {
  return (
    <footer className="w-full mt-16 py-10 border-t border-slate-200/80 bg-white/20 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        <Logo iconSize={30} />
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-6 text-center">
          {footerNav.map((footer, i) => (
            <Link
              to={footer.to}
              key={i}
              className="font-lato text-[11px] uppercase tracking-wider font-medium text-slate-500 hover:text-indigo-600 hover:scale-105 transition-all duration-300">
              {footer.label}
            </Link>
          ))}
        </div>
        <p className="mt-8 text-[10px] font-lato uppercase tracking-widest text-slate-400">
          &copy; Benefits Access Center, 2026
        </p>
      </div>
    </footer>
  );
};

export default Footer;
