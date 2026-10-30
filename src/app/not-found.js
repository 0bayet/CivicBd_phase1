import { Compass, Home, Search } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="container not-found">
      <span className="state-panel__icon">
        <Compass size={32} aria-hidden="true" />
      </span>
      <h1>We couldn’t find that page</h1>
      <p>The address may be mistyped, or the page may have moved. Try one of these instead.</p>
      <div className="form-actions">
        <Button href="/" icon={Home}>
          Go to the home page
        </Button>
        <Button href="/issues" variant="secondary" icon={Search}>
          Explore issues
        </Button>
      </div>
    </section>
  );
}
