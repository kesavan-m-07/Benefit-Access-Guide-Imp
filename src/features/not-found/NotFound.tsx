import { Link } from "@tanstack/react-router";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-100 px-6">
      <div className="max-w-2xl text-center">
        <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 shadow-sm">
          <span className="text-5xl">🚧</span>
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-indigo-600">
          Coming Soon
        </p>

        <h1 className="mb-4 font-fira text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
          Page Under Construction
        </h1>

        <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-slate-600">
          We're currently building this page and adding new features. Check
          back soon, or return to the homepage to continue exploring.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50"
          >
            Go Back
          </button>
        </div>

        <div className="pointer-events-none mt-16 select-none">
          <span className="bg-linear-to-r from-indigo-200 to-blue-200 bg-clip-text text-8xl font-black tracking-tighter text-transparent md:text-9xl">
            SOON
          </span>
        </div>
      </div>
    </main>
  );
};

export default NotFound;