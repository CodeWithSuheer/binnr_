import { useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqSection = () => {
  return (
    <section className="relative px-4 xl:px-0 py-10">
      <div className="max-w-5xl xxl:max-w-5xl mx-auto ">
        <div className="flex flex-col space-y-4">
          <div className="text-center my-5">
            <p className="text-3xl font-bold tracking-wider">FAQs</p>
            <p className="mt-2 text-lg">
              You've got questions. We've got answers
            </p>
          </div>
          <div>
            {FAQsData?.map((iter, index) => (
              <FaqItem
                key={index}
                question={iter?.Question}
                answer={iter?.Answer}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFaq = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="group border-b border-gray-300 mt-3 [&_summary::-webkit-details-marker]:hidden">
      <div
        onClick={toggleFaq}
        className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg p-4 text-black"
      >
        <h2 className="font-medium text-md md:text-lg">{question}</h2>

        <svg
          className={`size-5 shrink-0 transition-transform duration-300 ${
            isOpen ? "-rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <div
        className={`overflow-hidden transition-all duration-1000 ease-in-out ${
          isOpen ? "max-h-1000px opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="mt-2 pb-4 px-4 leading-relaxed text-gray-700">{answer}</p>
      </div>
    </div>
  );
};

export default FaqSection;

const FAQsData = [
  {
    id: 0,
    Question: "How does Binnr work?",
    Answer:
      "Binnr connects you with local affiliates who will pick up your trash at a scheduled time. Simply create an account, choose your plan, select an affiliate, and enjoy hassle-free trash collection.",
  },
  {
    id: 1,
    Question: "Can I change my pickup schedule?",
    Answer:
      "Yes! You can modify your pickup schedule anytime through our user-friendly interface. Flexibility is key, and we’re here to fit into your lifestyle.",
  },
  {
    id: 2,
    Question: "What happens if I miss a pickup?",
    Answer:
      "No worries! Just reschedule the pickup through the app. Our affiliates are flexible and ready to accommodate changes as needed.",
  },
  {
    id: 3,
    Question: " Is there a contract or long-term commitment?",
    Answer:
      "We offer weekly, monthly, and yearly plans. While you're committed for the duration of your selected plan, you can easily adjust or upgrade your plan at any time.",
  },
  {
    id: 4,
    Question: "How do I become an affiliate?",
    Answer:
      "Becoming an affiliate is easy! Visit our 'Affiliate Program' page, fill out the sign-up form, and we’ll guide you through the onboarding process. Join our community and start earning!",
  },
];
