export const topics = [
  {
    id: 1,
    name: "معايير تشكل العالم بعد الحرب العالمية الثانية",
    icon: "/assets/images/topics/icon-history.svg",
    questions: [
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
        corrections: [
          "القضاء على الدكتاتوريات",
          "ظهور هيئة الأمم المتحدة",
        ],
      },
      {
        id: 2,
        type: "fill_gap",
        question: "املأ الفراغ",
        gaps: [
          { text: " هيئة الأمم المتحدة", correctAnswer: "ظهور" },
          { text: " على الدكتاتوريات", correctAnswer: "القضاء" },
        ],
        suggestions: ["سقوط", "بناء", "احتلال", "القضاء", "ظهور"],
        corrections: [
          "ظهور هيئة الأمم المتحدة",
          "القضاء على الدكتاتوريات",
        ],
      },
      {
        id: 3,
        type: "order_answers",
        question: "أعد ترتيب الكلمات التالية",
        sentences: [
          {
            options: ["ظهور", "هيئة", "الأمم", "المتحدة"],
            correctOrder: [0, 1, 2, 3],
          },
          {
            options: ["القضاء", "على", "الدكتاتوريات"],
            correctOrder: [0, 1, 2],
          },
        ],
        corrections: [
          "ظهور هيئة الأمم المتحدة",
          "القضاء على الدكتاتوريات",
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
        suggestions: [
          [
            "ظهور هيئة الأمم المتحدة", // Correct answer
            "القضاء على هيئة الأمم المتحدة",
            "ظهور الأمم المتحدة",
          ],
          [
            "القضاء على الدكتاتوريات", // Correct answer
            "ظهور الدكتاتوريات",
            "هيئة الدكتاتوريات",
          ],
        ],
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
        corrections: [
          "سياسي: ظهور هيئة الأمم المتحدة, القضاء على الدكتاتوريات",
          "اقتصادي: خروج أوربا مدمرة ومفلسة, خروج الو.م.أ المستفيد من ح ع .2",
          "اجتماعي: خروج أوربا مدمرة ومفلسة",
        ],
      },


    ],
  },


  {
    "id": 2,
    "name": "معايير تشكل العالم بعد الحرب العالمية الثانية",
    "icon": "/assets/images/topics/icon-geography.svg",
    "questions": [
      {
        "id": 1,
        "type": "choose_multiple",
        "question": "ماهي معايير الاقتصادية والاجتماعية لتشكل العالم بعد الحرب العالمية الثانية: اختر الاجابتين الصحيحتين",
        "options": [
          "ظهور هيئة الأمم المتحدة",
          "بروز النظام المالي الجديد",
          "القضاء على الدكتاتوريات",
          "خروج أوربا مدمرة ومفلسة"
        ],
        "correctAnswers": [1, 3],
        "corrections": [
          "بروز النظام المالي الجديد",
          "خروج أوربا مدمرة ومفلسة"
        ]
      },
      {
        "id": 2,
        "type": "fill_gap",
        "question": "املأ الفراغ",
        "gaps": [
          { "text": " المالي الجديد", "correctAnswer": "بروز" },
          { "text": " مدمرة ومفلسة", "correctAnswer": "خروج أوروبا" }
        ],
        "suggestions": ["بروز", "خروج", "النظام", "الصندوق", "أوروبا"],
        "corrections": [
          "بروز النظام المالي الجديد",
          "خروج أوروبا مدمرة ومفلسة"
        ]
      },
      {
        "id": 3,
        "type": "order_answers",
        "question": "أعد ترتيب الكلمات التالية",
        "sentences": [
          {
            "options": ["وخروج", "أوروبا", "مدمرة", "مفلسة"],
            "correctOrder": [0, 1, 2, 3]
          },
          {
            "options": ["خروج", "الو.م.أ", "المستفيد", "من", "الحرب", "أكبر"],
            "correctOrder": [0, 1, 2, 3, 4, 5]
          }
        ],
        "corrections": [
          "وخروج أوروبا مدمرة ومفلسة.",
          "خروج الو.م.أ المستفيد من الحرب أكبر."
        ]
      },
      {
        "id": 4,
        "type": "correct_incorrect",
        "question": "اختر الجملة الخاطئة وقم بتصحيحها",
        "incorrectOptions": [
          "خروج أمريكا مدمرة ومفلسة",
          "بروز النظام الدولي الجديد."
        ],
        "corrections": [
          "خروج الو.م.أ المستفيد من الحرب.",
          "بروز النظام المالي الجديد."
        ],
        "suggestions": [
          [
            "خروج الو.م.أ المستفيد من الحرب.",
            "خروج أمريكا مدمرة ومفلسة",
            "خروج أوروبا المستفيدة"
          ],
          [
            "بروز النظام المالي الجديد.",
            "بروز النظام الدولي الجديد.",
            "ظهور النظام الجديد."
          ]
        ]
      },
      {
        "id": 5,
        "type": "recap_exercise",
        "question": "اسحب كل معيار حسب تصنيفه في الجدول",
        "criteria": [
          { "text": "بروز النظام المالي الجديد", "category": "اقتصادي" },
          { "text": "خروج أوربا مدمرة ومفلسة", "category": "اجتماعي" },
          { "text": "خروج الو.م.أ المستفيد من ح ع .2", "category": "اقتصادي" }
        ],
        "corrections": [
          "اقتصادي: بروز النظام المالي الجديد, خروج الو.م.أ المستفيد من ح ع .2",
          "اجتماعي: خروج أوربا مدمرة ومفلسة"
        ]
      }
    ]
  }
]
