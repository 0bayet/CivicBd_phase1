import { Users, ShieldCheck, Eye } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Why CivicBD exists"
        description="A community reporting platform for potholes, waste, drainage, streetlights, public infrastructure and water supply problems."
      />

      <div className="container page-body about">
        <div className="about__grid">
          <section className="card card--padded prose" aria-labelledby="purpose-title">
            <h2 id="purpose-title">Purpose</h2>
            <p>
              Problems in a neighbourhood are often known to everyone who walks past them and recorded nowhere. Civic
              Issue Reporter gives residents one shared place to document a problem, see that others have confirmed it,
              and follow what happened next.
            </p>
            <p>
              The platform focuses on the seven categories people raise most often: roads and potholes, garbage and
              waste, drainage and waterlogging, streetlights, public infrastructure, water supply, and anything else
              that needs attention.
            </p>
          </section>

          <div className="about__side">
            <section className="card card--padded">
              <span className="step__icon">
                <Users size={22} aria-hidden="true" />
              </span>
              <h2 className="aside-title">For residents</h2>
              <p className="aside-text">
                Designed for people who want a clear, shared record of problems in their area and a way to follow them
                until they are fixed.
              </p>
            </section>
            <section className="card card--padded">
              <span className="step__icon">
                <Eye size={22} aria-hidden="true" />
              </span>
              <h2 className="aside-title">Open progress</h2>
              <p className="aside-text">
                Every report moves through four visible stages, from pending to resolved, so anyone can see where it
                stands.
              </p>
            </section>
            <section className="card card--padded">
              <span className="step__icon">
                <ShieldCheck size={22} aria-hidden="true" />
              </span>
              <h2 className="aside-title">Independent</h2>
              <p className="aside-text">
                This is not an official municipal or government service, and it is not affiliated with any authority.
              </p>
            </section>
          </div>
        </div>

        <div className="form-actions">
          <Button href="/report">Report an issue</Button>
          <Button href="/issues" variant="secondary">
            Browse issues
          </Button>
        </div>
      </div>
    </>
  );
}
