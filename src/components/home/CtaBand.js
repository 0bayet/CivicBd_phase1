import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";

export default function CtaBand() {
  return (
    <section className="section section--tight" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-band">
          <div>
            <h2 id="cta-title">See something that needs fixing?</h2>
            <p>Write down what you found and where. It takes about two minutes.</p>
          </div>
          <div className="cta-band__actions">
            <Button href="/report" size="lg" variant="secondary" iconAfter={ArrowRight}>
              Report an issue
            </Button>
            <Button href="/issues" size="lg" variant="ghost" className="cta-band__ghost">
              Browse reports
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
