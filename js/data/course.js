// Constitution Quest — Chapters, badges, founders, quizzes, glossary

const chapters = [
  {
    id: 1,
    title: "We the People",
    subtitle: "Why the Constitution exists",
    collectible: { type: "founder", id: "madison" },
    badge: "we-the-people",
    beats: [
      {
        type: "story",
        text:
          "After independence in 1776, the Articles of Confederation were too " +
          "weak. Congress could not tax, raise an army, or enforce laws. The " +
          "states acted like 13 separate countries.",
      },
      {
        type: "story",
        text:
          "In 1786, Shays' Rebellion — armed farmers shutting down courts — " +
          "showed the government could not keep order. Something had to change.",
      },
      {
        type: "story",
        text:
          "In summer 1787, 55 delegates gathered at Philadelphia's Independence " +
          "Hall. Windows shut for secrecy, sweating through the heat, arguing " +
          "for months. The result: a brand-new Constitution.",
      },
      {
        type: "didyouknow",
        text:
          "Benjamin Franklin was 81 at the Convention, the oldest delegate. He " +
          "needed help walking and speaking, but his wit kept the debates going.",
      },
      {
        type: "story",
        text:
          "The Preamble starts with 'We the People' — not 'We the States.' That " +
          "was intentional. Government power comes from citizens, not states. " +
          "Six goals: unity, justice, peace, defense, welfare, liberty.",
      },
      { type: "check" },
    ],
    check: [
      {
        q: "What did the Articles of Confederation fail to give Congress?",
        options: [
          "The power to declare war",
          "The power to tax",
          "The power to make treaties",
          "A place to meet",
        ],
        correct: 1,
        explanation:
          "Without taxing power, Congress could not pay debts or fund a " +
          "government. That weakness drove the 1787 Convention.",
      },
      {
        q: "Why do the Preamble's first words matter?",
        options: [
          "They list the states in order of size",
          "They name the President",
          "They say power comes from citizens, not state governments",
          "They promise a Bill of Rights",
        ],
        correct: 2,
        explanation:
          "'We the People' locates sovereignty in citizens. That was a " +
          "radical claim in 1787.",
      },
      {
        q: "What did Shays' Rebellion expose?",
        options: [
          "That farmers were well organized",
          "That the national government could not keep order",
          "That the army was too strong",
          "That courts were unnecessary",
        ],
        correct: 1,
        explanation:
          "The national government had no power to respond, which convinced " +
          "many that the Articles needed replacing.",
      },
    ],
  },
  {
    id: 2,
    title: "Three Branches",
    subtitle: "Articles I-III — How power is divided",
    collectible: { type: "founder", id: "washington" },
    badge: "three-branches",
    beats: [
      {
        type: "story",
        text:
          "The Framers feared giving anyone too much power. The solution: " +
          "split government into three branches that check each other.",
      },
      {
        type: "story",
        text:
          "Article I creates Congress — the legislative branch that MAKES laws. " +
          "The House is by population; the Senate gets two per state (the " +
          "Great Compromise settled this).",
      },
      {
        type: "story",
        text:
          "Article II creates the President — the executive branch that " +
          "ENFORCES laws. The President commands the military, can veto bills, " +
          "and appoints judges.",
      },
      {
        type: "story",
        text:
          "Article III creates the Supreme Court — the judicial branch that " +
          "INTERPRETS laws. Judges serve for life. Marbury v. Madison (1803) " +
          "established judicial review.",
      },
      {
        type: "didyouknow",
        text:
          "The Constitution does not say the Supreme Court has judicial " +
          "review. The Court claimed that power in Marbury v. Madison, and no " +
          "serious challenge to it has succeeded.",
      },
      {
        type: "story",
        text:
          "Checks and balances: Congress makes laws, the President can veto, " +
          "Congress can override with a two-thirds vote, and the Supreme Court " +
          "can strike laws down. No one branch dominates.",
      },
      { type: "check" },
    ],
    check: [
      {
        q: "Which branch makes federal laws?",
        options: [
          "Executive",
          "Judicial",
          "Legislative",
          "The states",
        ],
        correct: 2,
        explanation:
          "Article I assigns lawmaking to Congress. The Executive enforces and " +
          "the Judiciary interprets.",
      },
      {
        q: "How did the Great Compromise settle representation?",
        options: [
          "One chamber by population, one equal per state",
          "All states get equal seats",
          "Only large states vote",
          "The President picks members",
        ],
        correct: 0,
        explanation:
          "The House is apportioned by population and the Senate gives each " +
          "state two seats.",
      },
      {
        q: "Where did judicial review come from?",
        options: [
          "Article III's text",
          "The Bill of Rights",
          "Marbury v. Madison (1803)",
          "A constitutional amendment",
        ],
        correct: 2,
        explanation:
          "The power to void unconstitutional laws was asserted by the Court " +
          "in Marbury v. Madison, not written explicitly in Article III.",
      },
    ],
  },
  {
    id: 3,
    title: "The Union and Change",
    subtitle: "Articles IV-VII — States, amendments, ratification",
    collectible: { type: "founder", id: "hamilton" },
    badge: "federalist",
    beats: [
      {
        type: "story",
        text:
          "Article IV: states must respect each other's laws. A marriage valid " +
          "in one state is valid in all. The federal government protects " +
          "states from invasion.",
      },
      {
        type: "story",
        text:
          "Article V: amend by two-thirds of Congress, ratify by three-fourths " +
          "of the states. Deliberately hard — only 27 amendments in 230+ years.",
      },
      {
        type: "story",
        text:
          "Article VI: the Supremacy Clause. The Constitution and federal laws " +
          "are the 'supreme Law of the Land.' No religious test is required " +
          "for office.",
      },
      {
        type: "story",
        text:
          "Article VII: 9 of 13 states needed to ratify. Federalists backed " +
          "the Constitution; Anti-Federalists feared a too-powerful central " +
          "government. The Federalist Papers, 85 essays, argued the case.",
      },
      {
        type: "didyouknow",
        text:
          "The Federalist Papers were published under the pen name 'Publius.' " +
          "They were opinion columns in New York newspapers, not a book.",
      },
      {
        type: "story",
        text:
          "New Hampshire became the ninth state on June 21, 1788. The " +
          "Constitution was law. Anti-Federalists won a key promise: a Bill of " +
          "Rights would be added immediately.",
      },
      { type: "check" },
    ],
    check: [
      {
        q: "What does the Supremacy Clause establish?",
        options: [
          "State law always wins",
          "Federal law outranks conflicting state law",
          "The President outranks Congress",
          "Courts write legislation",
        ],
        correct: 1,
        explanation:
          "Article VI makes the Constitution and federal law the supreme law " +
          "of the land.",
      },
      {
        q: "How many states were needed for ratification?",
        options: ["7", "9", "11", "All 13"],
        correct: 1,
        explanation:
          "Article VII required conventions in nine of the thirteen states.",
      },
      {
        q: "Who wrote the Federalist Papers?",
        options: [
          "Jefferson, Adams, Franklin",
          "Hamilton, Madison, Jay",
          "Washington, Hamilton, Morris",
          "Madison, Jay, Jefferson",
        ],
        correct: 1,
        explanation:
          "Hamilton, Madison, and John Jay wrote them under the name Publius.",
      },
    ],
  },
  {
    id: 4,
    title: "The Bill of Rights",
    subtitle: "Amendments 1-10 — Your freedoms",
    collectible: { type: "stamp", id: "bill-of-rights" },
    badge: "rights-reader",
    beats: [
      {
        type: "story",
        text:
          "Many people worried: 'Where are our rights?' Madison thought a Bill " +
          "of Rights was unnecessary, but he helped pass one to win " +
          "ratification and keep a promise.",
      },
      {
        type: "story",
        text:
          "Amendment 1: five core freedoms — religion, speech, press, " +
          "assembly, petition. Congress can neither establish an official " +
          "religion nor stop you from speaking your mind.",
      },
      {
        type: "story",
        text:
          "Amendments 2-3: the right to bear arms. No soldiers quartered in " +
          "your home without permission.",
      },
      {
        type: "story",
        text:
          "Amendments 4-5: no unreasonable searches (a warrant is required). " +
          "No double jeopardy. No self-incrimination. Due process is required.",
      },
      {
        type: "story",
        text:
          "Amendment 6: speedy public trial with a lawyer (Gideon v. " +
          "Wainwright, 1963). Amendment 7: civil jury trials. Amendment 8: no " +
          "cruel or unusual punishment.",
      },
      {
        type: "story",
        text:
          "Amendments 9-10: rights not listed are still retained. Powers not " +
          "given to the federal government belong to the states or the people.",
      },
      {
        type: "didyouknow",
        text:
          "'I plead the Fifth' comes from the 5th Amendment — the right not to " +
          "testify against yourself.",
      },
      { type: "check" },
    ],
    check: [
      {
        q: "Which amendment protects speech, religion, and the press?",
        options: ["1st", "2nd", "5th", "9th"],
        correct: 0,
        explanation:
          "The First Amendment bundles five freedoms: religion, speech, press, " +
          "assembly, and petition.",
      },
      {
        q: "What does 'pleading the Fifth' invoke?",
        options: [
          "The right to a lawyer",
          "The right not to testify against yourself",
          "The right to bear arms",
          "Protection from cruel punishment",
        ],
        correct: 1,
        explanation:
          "The 5th Amendment bars compelled self-incrimination.",
      },
      {
        q: "What do Amendments 9 and 10 protect?",
        options: [
          "Rights not listed, and powers not granted to the federal government",
          "The right to vote",
          "Presidential term limits",
          "Federal income tax",
        ],
        correct: 0,
        explanation:
          "The 9th retains unlisted rights; the 10th reserves unlisted powers " +
          "to the states or the people.",
      },
    ],
  },
  {
    id: 5,
    title: "Expanding Democracy",
    subtitle: "Amendments 11-27 — The story continues",
    collectible: { type: "founder", id: "douglass" },
    badge: "democracy-builder",
    beats: [
      {
        type: "story",
        text:
          "The Constitution is not frozen in 1787. The first 10 amendments " +
          "protected freedom. The next 17 expanded who gets to be free and who " +
          "gets a voice.",
      },
      {
        type: "story",
        text:
          "After the Civil War: the 13th abolished slavery (1865), the 14th " +
          "made anyone born in the US a citizen with 'equal protection,' and " +
          "the 15th said race cannot stop you from voting.",
      },
      {
        type: "story",
        text:
          "The 14th is the most important amendment after the Bill of Rights. " +
          "It was used to desegregate schools (Brown v. Board, 1954) and to " +
          "legalize same-sex marriage (Obergefell v. Hodges, 2015).",
      },
      {
        type: "story",
        text:
          "Progressive Era: income tax (16), direct election of senators (17), " +
          "women's suffrage (19). Women fought 72 years for the vote.",
      },
      {
        type: "story",
        text:
          "Later changes: presidential term limits (22), D.C. electoral votes " +
          "(23), no poll taxes (24), succession (25), voting age 18 (26), and " +
          "delayed pay raises (27).",
      },
      {
        type: "didyouknow",
        text:
          "Amendment 27 was proposed in 1789, the same year as the Bill of " +
          "Rights, but was not ratified until 1992.",
      },
      {
        type: "story",
        text:
          "The Constitution has lasted 230+ years because it can change. Each " +
          "amendment tells a story of people fighting for their rights. The " +
          "story is not over.",
      },
      { type: "check" },
    ],
    check: [
      {
        q: "Which amendment abolished slavery?",
        options: ["13th", "14th", "15th", "19th"],
        correct: 0,
        explanation: "The 13th Amendment (1865) ended slavery.",
      },
      {
        q: "Which amendment guarantees equal protection to all persons?",
        options: ["12th", "13th", "14th", "15th"],
        correct: 2,
        explanation:
          "The 14th Amendment's equal protection clause is the basis for Brown " +
          "v. Board and Obergefell.",
      },
      {
        q: "How long did women campaign for the vote before the 19th Amendment?",
        options: ["12 years", "30 years", "72 years", "150 years"],
        correct: 2,
        explanation:
          "From Seneca Falls (1848) to ratification (1920), the campaign ran " +
          "roughly 72 years.",
      },
    ],
  },
];

const badges = [
  { id: "we-the-people", name: "We the People", description: "Completed Chapter 1", icon: "scroll" },
  { id: "three-branches", name: "Three Branches", description: "Completed Chapter 2", icon: "capitol" },
  { id: "federalist", name: "Federalist", description: "Completed Chapter 3", icon: "quill" },
  { id: "rights-reader", name: "Rights Reader", description: "Completed Chapter 4", icon: "star" },
  { id: "democracy-builder", name: "Democracy Builder", description: "Completed Chapter 5", icon: "trophy" },
  { id: "quiz-whiz", name: "Quiz Whiz", description: "Earn 3 stars on any quiz", icon: "star" },
  { id: "stamp-collector", name: "Stamp Collector", description: "Read 10 amendments", icon: "stamp" },
  { id: "all-27", name: "All 27", description: "Read all 27 amendments", icon: "scroll" },
  { id: "journey-complete", name: "Journey Complete", description: "Finish all 5 chapters", icon: "trophy" },
];

const founders = [
  {
    id: "madison",
    name: "James Madison",
    role: '"Father of the Constitution"',
    lifespan: "1751-1836",
    bio:
      "Madison wrote much of the Constitution and the Bill of Rights. " +
      "Co-wrote the Federalist Papers. Fourth President.",
    color: "#1D4270",
  },
  {
    id: "washington",
    name: "George Washington",
    role: "Convention President, 1st President",
    lifespan: "1732-1799",
    bio:
      "Presided over the Convention. His presence gave the gathering " +
      "credibility. First President under the new Constitution.",
    color: "#B03A2E",
  },
  {
    id: "hamilton",
    name: "Alexander Hamilton",
    role: "Federalist Papers Author",
    lifespan: "1755-1804",
    bio:
      "Wrote most of the Federalist Papers (51 of 85). First Secretary of the " +
      "Treasury. Argued for a strong central government.",
    color: "#D9A23B",
  },
  {
    id: "franklin",
    name: "Benjamin Franklin",
    role: "Elder Statesman",
    lifespan: "1706-1790",
    bio:
      "At 81, the oldest delegate. Helped broker compromises and urged " +
      "support for the final document despite disagreements.",
    color: "#2E6B4F",
  },
  {
    id: "douglass",
    name: "Frederick Douglass",
    role: "Abolitionist & Amendment Advocate",
    lifespan: "1818-1895",
    bio:
      "His work helped create the Civil War amendments. His advocacy embodies " +
      "the Constitution's promise of freedom and equality.",
    color: "#0E2238",
  },
];

const quizzes = [
  {
    id: "constitution-iq",
    name: "Constitution I.Q.",
    icon: "star",
    questions: [
      {
        q: "How many articles are in the original Constitution?",
        options: ["5", "7", "10", "27"],
        correct: 1,
        explanation:
          "There are seven articles. The 27 is the number of amendments.",
      },
      {
        q: "Which branch MAKES laws?",
        options: [
          "Executive (President)",
          "Judicial (Courts)",
          "Legislative (Congress)",
          "The States",
        ],
        correct: 2,
        explanation:
          "Article I gives lawmaking power to Congress. The President enforces " +
          "laws and the courts interpret them.",
      },
      {
        q: "What fraction of states must ratify an amendment?",
        options: ["1/2", "2/3", "3/4", "All of them"],
        correct: 2,
        explanation:
          "Three-fourths of the states must ratify. Two-thirds of Congress is " +
          "the proposal threshold.",
      },
      {
        q: "What does the First Amendment protect?",
        options: [
          "Right to bear arms",
          "Speech, religion, press, assembly, petition",
          "Right to trial by jury",
          "Protection from cruel punishment",
        ],
        correct: 1,
        explanation:
          "The First Amendment covers five freedoms, all about expression and " +
          "belief.",
      },
      {
        q: "Who is called the 'Father of the Constitution'?",
        options: [
          "George Washington",
          "Thomas Jefferson",
          "James Madison",
          "Benjamin Franklin",
        ],
        correct: 2,
        explanation:
          "Madison's notes and drafts shaped the document, earning him the " +
          "title.",
      },
    ],
  },
  {
    id: "amendments-match",
    name: "Amendments Match",
    icon: "stamp",
    questions: [
      {
        q: "Which amendment abolished slavery?",
        options: ["13th", "14th", "15th", "19th"],
        correct: 0,
        explanation: "The 13th Amendment (1865) abolished slavery.",
      },
      {
        q: "Which gave women the right to vote?",
        options: ["15th", "17th", "19th", "26th"],
        correct: 2,
        explanation: "The 19th Amendment (1920) barred denying the vote by sex.",
      },
      {
        q: "Which sets presidential term limits?",
        options: ["20th", "22nd", "25th", "27th"],
        correct: 1,
        explanation:
          "The 22nd Amendment limits a President to two elected terms.",
      },
      {
        q: "Which lowered the voting age to 18?",
        options: ["24th", "25th", "26th", "27th"],
        correct: 2,
        explanation: "The 26th Amendment (1971) set the voting age at 18.",
      },
      {
        q: "Which says you cannot be tried twice for the same crime?",
        options: ["4th", "5th", "6th", "8th"],
        correct: 1,
        explanation:
          "The 5th Amendment bars double jeopardy, along with compelled " +
          "self-incrimination.",
      },
    ],
  },
];

const glossary = [
  { term: "Amendment", def: "A formal change to the Constitution. 27 have been ratified." },
  { term: "Anti-Federalist", def: "Opposed the Constitution; feared a too-powerful central government. Demanded a Bill of Rights." },
  { term: "Article", def: "A major numbered section of the Constitution (I-VII)." },
  { term: "Bill of Rights", def: "The first 10 amendments (1791), protecting individual freedoms from government power." },
  { term: "Checks and Balances", def: "Each branch can limit the others' power, preventing any one branch from dominating." },
  { term: "Congress", def: "The legislative branch: House of Representatives plus Senate. Makes federal laws." },
  { term: "Constitutional Convention", def: "The 1787 Philadelphia meeting where delegates wrote the Constitution." },
  { term: "Due Process", def: "Government must follow fair procedures before taking life, liberty, or property." },
  { term: "Electoral College", def: "The system for electing the President. Each state gets electors based on its representation." },
  { term: "Equal Protection", def: "14th Amendment rule that no state can deny 'equal protection of the laws.' A key civil rights tool." },
  { term: "Executive Branch", def: "Enforces laws, led by the President." },
  { term: "Federalist", def: "Supported the Constitution and a strong central government. Hamilton, Madison, and Jay wrote the Federalist Papers." },
  { term: "Federalist Papers", def: "85 essays arguing for ratification of the Constitution. Still studied today." },
  { term: "Framer", def: "One of the 55 delegates who wrote the Constitution at the 1787 Convention." },
  { term: "Great Compromise", def: "Created a two-house Congress: the House by population and the Senate with equal seats per state." },
  { term: "House of Representatives", def: "The Congress chamber where seats are based on state population. Members serve 2-year terms." },
  { term: "Impeachment", def: "The House charges officials with 'high crimes and misdemeanors'; the Senate holds the trial." },
  { term: "Judicial Branch", def: "Interprets laws: the Supreme Court and lower federal courts." },
  { term: "Judicial Review", def: "Courts can declare a law unconstitutional. Established by Marbury v. Madison (1803)." },
  { term: "Legislative Branch", def: "Makes laws: Congress (House and Senate)." },
  { term: "Preamble", def: "The opening statement, 'We the People...' It lists six goals of the Constitution." },
  { term: "President", def: "Head of the executive branch and commander-in-chief. Elected every 4 years via the Electoral College." },
  { term: "Ratification", def: "Official approval. The Constitution needed 9 of 13 states; amendments need 3/4 of the states." },
  { term: "Senate", def: "The Congress chamber where each state gets 2 senators regardless of population. 6-year terms." },
  { term: "Separation of Powers", def: "Government divided into three branches, each with its own job." },
  { term: "Suffrage", def: "The right to vote. Expanded by the 15th, 19th, and 26th Amendments." },
  { term: "Supremacy Clause", def: "Article VI: the Constitution and federal laws are the 'supreme Law of the Land,' above state laws." },
  { term: "Supreme Court", def: "The highest US court. Nine justices serve for life and decide whether laws follow the Constitution." },
  { term: "Veto", def: "The President's power to reject a bill. Congress can override with a two-thirds vote." },
];

export { chapters, badges, founders, quizzes, glossary };
