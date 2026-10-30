import { ClipboardList, MapPin, Activity, CircleCheck } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Report the problem",
    text: "Add a title, category, a short description and a photo of what you saw.",
  },
  {
    icon: MapPin,
    title: "Share its location",
    text: "Describe the exact spot with a street, area or landmark. Coordinates are optional.",
  },
  {
    icon: Activity,
    title: "Track the progress",
    text: "Follow the report from pending review to verified to in progress.",
  },
  {
    icon: CircleCheck,
    title: "Check the resolution",
    text: "See when a report is marked resolved and confirm the fix in your area.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section section--surface" aria-labelledby="how-title">
      <div className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 id="how-title">Four steps from spotting a problem to seeing it fixed</h2>
          </div>
        </div>

        <ol className="steps">
          {STEPS.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="card step">
              <div className="step__top">
                <span className="step__icon">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className="step__number" aria-hidden="true">
                  {index + 1}
                </span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
