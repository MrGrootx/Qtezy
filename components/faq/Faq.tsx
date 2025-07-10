import React from "react";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqs = [
  {
    question: "Where do the quotes come from?",
    answer:
      "We collect quotes from public domain sources, famous authors, and community submissions.",
  },
  {
    question: "Can I share quotes on social media?",
    answer:
      "Yes! You can easily share quotes directly from the app to your favorite platforms.",
  },
  {
    question: "Is the app free to use?",
    answer: "Yes, the app is completely free to use. No hidden fees.",
  },
  {
    question: "Can I save my favorite quotes?",
    answer:
      "Once you sign in, you can save quotes to your personal collection for quick access later.",
  },
  {
    question: "Do you send daily quotes?",
    answer:
      "No. We respect your inbox and do not send daily emails. You can explore quotes anytime within the app.",
  },
  {
    question: "Does the app support dark mode?",
    answer:
      "Yes, dark mode is available and automatically adapts to your device settings.",
  },
];

const Faq = () => {
  return (
    <div className="mt-24 w-full p-5 flex flex-col items-center justify-center space-y-2 mb-24">
      <Button variant="outline" className="pointer-events-none">
        FAQs
      </Button>
      <div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <h2
            className="lg:text-5xl text-xl  font-semibold text-shadow"
            style={{
              fontFamily: "Rubik, sans-serif",
            }}
          >
            We’ve Got the Answers
          </h2>
          <h2
            className="lg:text-4xl text-xl  font-semibold text-shadow"
            style={{
              fontFamily: "Rubik, sans-serif",
            }}
          >
            You’re Looking For
          </h2>
        </div>
        <p className="text-center text-gray-300 text-sm mt-1">
          Everything you need to know about using our quotes app.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full max-w-2xl   "
        defaultValue="item-1"
        orientation="horizontal"
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index + 1}`}
            style={{
              fontFamily: "Rubik, sans-serif",
            }}
          >
            <AccordionTrigger className="!no-underline hover:cursor-pointer text-md">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
