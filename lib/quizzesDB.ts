export const topics = [
  {
    id: 1,
    name: "معايير تشكل العالم بعد الحرب العالمية الثانية",
    icon: "assets/images/topics/icon-history.svg",
    questions: [
      // Section 1: Political and Historical Criteria
      {
        id: 1,
        type: "choose_multiple",
        question: "ماهي معايير السياسية والتاريخية لتشكل العالم بعد الحرب العالمية الثانية السياسية والتاريخية: اختر الاجابتين الصحيحتين",
        options: [
          "القضاء على الدكتاتوريات",
          "تطور وسائل الإعلام والإتصال",
          "ظهور هيئة الأمم المتحدة",
          "تطور الدراسات الطبية",
        ],
        correctAnswers: [0, 2], // Index of correct answers
      },
      {
        id: 2,
        type: "fill_gap",
        question: "املأ الفراغ",
        gaps: [
          { text: "ظهور", correctAnswer: "هيئة الأمم المتحدة" },
          { text: "القضاء", correctAnswer: "على الدكتاتوريات" },
        ],
      },
      {
        id: 4,
        type: "correct_incorrect",
        question: "اختر الجملة الخاطئة وقم بتصحيحها",
        incorrectOptions: [
          "القضاء على هيئة الأمم المتحدة",
          "ظهور الدكتاتوريات",
        ],
        corrections: [
          "ظهور هيئة الأمم المتحدة",
          "القضاء على الدكتاتوريات",
        ],
      },
      {
        id: 3,
        type: "order_answers",
        question: "أعد ترتيب الكلمات التالية",
        options: [
          "الأمم", 
          "هيئة", 
          "القضاء", 
          "المتحدة.", 
          "الدكتاتوريات.", 
          "على", 
          "ظهور",
        ],
        correctOrder: [6, 0, 1, 2, 5, 3, 4], // Correct sequence of indices
      },
      {
        id: 5,
        type: "recap_exercise",
        question: "اسحب كل معيار حسب تصنيفه في الجدول",
        criteria: [
          { text: "ظهور هيئة الأمم المتحدة", category: "سياسي" },
          { text: "بروز النظام المالي الجديد", category: "اقتصادي" },
          { text: "القضاء على الدكتاتوريات", category: "سياسي" },
          { text: "خروج أوربا مدمرة ومفلسة", category: "اجتماعي" },
          { text: "خروج الو.م.أ المستفيد من ح ع .2", category: "اقتصادي" },
        ],
      },
    ],
  },
]
