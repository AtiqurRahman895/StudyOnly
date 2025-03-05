// import React from 'react';
// import PropTypes from 'prop-types';

import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { TransferLists } from "../../Contexts/TransferLists";
import NavSideBar from "./NavSideBar";
import ThemeToggler from "../CommonComponent/ThemeToggler";

import useGetUserRole from "../../Hooks/useGetUserRole";
import { useState } from "react";
import ContactSection from "./ContactSection";

const Base = () => {
  const {role } = useGetUserRole();
  const [lightTheme, setLightTheme]=useState(false)

  const location = useLocation();
  const path = location.pathname;

  const faqData = [
    {
      category: "General",
      questions: [
        {
          question: "What is StudyOnly?",
          answer:
            "StudyOnly is an online learning platform that connects students with expert tutors for interactive study sessions. We also provide study materials, quizzes, and other educational resources.",
        },
        {
          question: "Who can use StudyOnly?",
          answer:
            "Anyone! Whether you're a student looking for academic help or a tutor wanting to share your expertise, StudyOnly is open to learners of all levels.",
        },
        {
          question: "Do I need an account to use StudyOnly?",
          answer:
            "Yes, you need to create an account to book tutoring sessions, access personalized study materials, and track your learning progress.",
        },
      ],
    },
    {
      category: "Booking & Sessions",
      questions: [
        {
          question: "How do I book a tutoring session?",
          answer:
            "1. Browse available tutors on the platform.\n2. Select a tutor and choose an available time slot.\n3. Confirm your booking and proceed with payment.\n4. Join your session at the scheduled time.",
        },
        {
          question: "Can I reschedule or cancel a session?",
          answer:
            "Yes! You can reschedule or cancel a session from your dashboard before the session starts. Cancellation policies may vary based on tutor preferences.",
        },
        {
          question: "How long is a typical tutoring session?",
          answer:
            "Session durations depend on the tutor and subject, but most sessions last between 30 minutes to 1 hour.",
        },
      ],
    },
    {
      category: "Payments & Refunds",
      questions: [
        {
          question: "What payment methods are accepted?",
          answer:
            "We accept credit/debit cards, PayPal, and Stripe payments.",
        },
        {
          question: "Is my payment information secure?",
          answer:
            "Yes! All transactions are encrypted and processed securely through Stripe.",
        },
        {
          question: "Can I get a refund if I'm not satisfied with a session?",
          answer:
            "Refunds are available under certain conditions. If you face an issue, please contact support within 24 hours of your session.",
        },
      ],
    },
    {
      category: "Tutors & Teaching",
      questions: [
        {
          question: "How can I become a tutor on StudyOnly?",
          answer:
            "If you're interested in teaching, sign up as a Tutor, complete your profile, and submit your application for approval.",
        },
        {
          question: "How do tutors get paid?",
          answer:
            "Tutors receive payments directly into their registered account after completing a session. Payment cycles may vary (weekly/monthly).",
        },
        {
          question: "Can I teach multiple subjects?",
          answer:
            "Yes! Tutors can list multiple subjects based on their expertise.",
        },
      ],
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "I forgot my password. What should I do?",
          answer:
            "Click on 'Forgot Password' on the login page and follow the instructions to reset your password.",
        },
        {
          question: "Which devices are supported?",
          answer:
            "StudyOnly works on laptops, tablets, and smartphones via any modern web browser.",
        },
        {
          question: "I'm facing technical issues. How can I get help?",
          answer:
            "If you experience any technical problems, contact our support team at studyOnly@gmail.com.",
        },
      ],
    },
  ];

  const value = {
    role,
    lightTheme, setLightTheme,
    faqData,
  };

  return (
    <>
      <TransferLists.Provider value={value}>
        <NavSideBar>
          <Header />
          <Outlet />

          {
            (path==="/login" || path==="/register" || path==="/forgot-password" || path.includes("/payment") || path.includes("/session"))?"":
            <ContactSection />
          }
          
          <Footer />
          <section className="fixed bottom-[10%] right-4 z-50">
            <ThemeToggler/>
          </section>
        </NavSideBar>
      </TransferLists.Provider>
    </>
  );
};

// Base.propTypes = {

// };

export default Base;
