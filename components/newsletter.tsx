import { NewsletterForm } from "@/components/newsletter-form";

export function Newsletter() {
  return (
    <section className="rounded-borde border border-borde-ciruela-sutil bg-blanco px-md py-lg text-center">
      <svg
        className="mx-auto mb-sm block h-8 w-8 stroke-oro stroke-1"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <path d="M16 4a12 12 0 1 0 0 24 9 9 0 0 1 0-24z" />
      </svg>
      <h2>El cielo del mes</h2>
      <p className="mx-auto max-w-[65ch]">
        Una nota breve, una vez al mes: una lectura personal que cruza tu ascendente y tu luna natal con la luna
        llena del mes. Para quien quiera sostener la práctica entre una sesión y otra.
      </p>

      <NewsletterForm variant="home" />
    </section>
  );
}
