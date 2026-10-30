import { FAQS } from "@/data/faqs";

export default function Faq() {
  return (
    <section className="section section--surface" aria-labelledby="faq-title">
      <div className="container faq">
        <div className="faq__intro">
          <h2 id="faq-title">Questions people ask</h2>
          <p>Short answers about what this project is and what it can do today.</p>
        </div>

        <div className="faq__list">
          {FAQS.map(({ question, answer }) => (
            <details className="faq__item" key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
