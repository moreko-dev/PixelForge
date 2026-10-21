import { PrimaryButton, SecondaryButton } from "@src/components/buttons.js";
import { LuArrowLeft, LuHouse, LuImageOff } from "react-icons/lu";
import { Link } from "react-router";

function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12 text-foreground">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand opacity-[0.06] blur-[120px]" />

      <section className="relative flex w-full max-w-lg flex-col items-center text-center">
        <div className="relative mb-8 flex size-24 items-center justify-center rounded-3xl border border-border bg-surface shadow-lg">
          <LuImageOff className="size-10 text-brand" strokeWidth={1.5} />

          <span className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-xl border border-border bg-surface-raised text-xs font-semibold text-muted-foreground">
            ?
          </span>
        </div>

        <h1 className="bg-linear-to-r from-brand to-link bg-clip-text text-8xl font-extrabold tracking-tight text-transparent sm:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Lost in the workspace?
        </h2>

        <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground sm:text-base">
          The page you are looking for doesn't exist or may have been moved.
          Let's get you back to your projects.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/">
            <PrimaryButton icon={<LuHouse className="size-4" />}>
              Back to Home
            </PrimaryButton>
          </Link>

          <SecondaryButton
            type="button"
            onClick={() => window.history.back()}
            icon={<LuArrowLeft className="size-4" />}
          >
            Go back
          </SecondaryButton>
        </div>

        <div className="mt-12 flex items-center gap-2 text-xs text-subtle-foreground">
          <span className="size-1.5 rounded-full bg-brand" />
          <span>Back to creating something amazing.</span>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
