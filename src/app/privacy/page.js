import PageHeader from "@/components/ui/PageHeader";

export const metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy policy"
        description="How CivicBD handles your information."
      />

      <div className="container page-body">
        <div className="card card--padded prose prose--narrow">
          <h2>What the site does</h2>
          <p>
            The forms on this site check what you type inside your own browser. Reports, photos, names, email addresses
            and passwords are not transmitted to a server and are gone when you leave or refresh the page.
          </p>

          <h2>Cookies and tracking</h2>
          <p>The site sets no cookies of its own and does not use analytics or advertising trackers.</p>

          <h2>If this changes</h2>
          <p>
            Before any personal information is collected, this policy will be updated to explain what is stored, why it
            is needed, who can see it and how to ask for it to be removed.
          </p>

          <h2>Questions</h2>
          <p>This site is not run by a government body. Questions about it can be sent to the site maintainers.</p>
        </div>
      </div>
    </>
  );
}
