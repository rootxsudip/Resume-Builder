import React, { useState } from 'react';
import './Faq.css';

function Faq() {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        { question: 'What makes ResumeSnap one of the best resume builder tool?', answer: 'What sets us apart from the rest of the competition is, ResumeSnap is easy to use. We provide both free and premium features. It has ATS friendly templates and many customization and design options.' },
        { question: 'Is this a completely free resume builder?', answer: 'Yes, ResumeSnap is 100% free resume builder. If you’re on a budget, you can use it to create your resume completely free of charge. If you use any of our premium features, the software will let you know about it'},
        { question: 'What is a Resume?', answer: 'A resume (also known as a CV, or curriculum vitae) is a 1-2 page document that summarizes your work experience and career history.It usually includes information about the following:- Your work history,Educational background,Achievements,Contact information, Skills and Resume summary or resume objective' },
        { question: 'How can I create my resume?', answer: 'With ResumeSnap you can create your resume in a snap! Just pick one of our resume templates.Then, you’ll be forwarded to our resume builder, where all you have to do is fill in your resume content!' },
        { question: 'What should a resume include?', answer: 'The must-have contents in your resume includes:- Work experience, Educational background, Contact information, Resume summary or objective. The optional ones are:- Hobbies,Interests and Voluntering experience '}
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <h1>Frequently Asked Questions</h1>
            {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                    <div className="faq-question" onClick={() => toggleFAQ(index)}>
                        <span className={`faq-toggle ${activeIndex === index ? 'active' : ''}`}>+</span>
                        <span className="faq-text">{faq.question}</span>
                    </div>
                    <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
                        {faq.answer}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Faq;
