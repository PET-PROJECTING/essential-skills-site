import { footer } from "@/lib/home-data";

export function Footer() {
  return (
    <footer className="w-full border-t border-border px-5 py-8 text-xs text-muted-dim sm:px-10 lg:px-20">
      <p>{footer.copyright}</p>
    </footer>
  );
}
