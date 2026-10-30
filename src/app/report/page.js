import { Lightbulb, FileText, MapPin, Image as ImageIcon, ListChecks } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Alert from "@/components/ui/Alert";
import ReportForm from "@/components/forms/ReportForm";

export const metadata = { title: "Report an issue" };

const TIPS = [
  { icon: FileText, text: "A specific title, such as “pothole outside Dhanmondi Lake gate”, not “road bad”." },
  { icon: MapPin, text: "A location others can find, with a nearby landmark." },
  { icon: ImageIcon, text: "One clear photo taken in daylight, if it is safe to take one." },
  { icon: ListChecks, text: "What the problem means for people using the area." },
];

export default function ReportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Report an issue"
        title="Tell the community what you found"
        description="Describe the problem, where it is and what it affects."
      />

      <div className="container page-body">
        <div className="report-layout">
          <ReportForm />

          <aside className="report-aside">
            <section className="card card--padded" aria-labelledby="tips-title">
              <h2 className="aside-title" id="tips-title">
                <Lightbulb size={20} aria-hidden="true" />
                What makes a useful report
              </h2>
              <ul className="tip-list">
                {TIPS.map(({ icon: Icon, text }) => (
                  <li key={text}>
                    <Icon size={18} aria-hidden="true" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </section>

            <Alert variant="error" title="Danger to life or property?">
              Call 999 first. Do not use this form for emergencies.
            </Alert>

          </aside>
        </div>
      </div>
    </>
  );
}
