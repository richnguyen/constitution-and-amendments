// Constitution Quest — Content Data
// Accurate public-domain U.S. Constitution content

const DATA = (() => {

const preamble = {
  title: "The Preamble",
  original: "We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.",
  plain: "The Constitution's mission statement. 'We the People' — not 'We the States' — shows government power comes from citizens. Six goals: unity, justice, peace, defense, welfare, liberty.",
  why: '"We the People" was radical in 1787 — it said ordinary citizens, not state governments, created this government.'
};

const articles = [
  {id:1, title:"Article I — The Legislative Branch",
   summary:"Creates Congress (House + Senate) to make federal laws. Powers: taxing, borrowing, commerce, declaring war, 'necessary and proper' laws.",
   keyQuote:"All legislative Powers herein granted shall be vested in a Congress of the United States, which shall consist of a Senate and House of Representatives."},
  {id:2, title:"Article II — The Executive Branch",
   summary:"Establishes the President to enforce laws. Commander-in-chief, veto power, treaties (with Senate approval), appoints officials.",
   keyQuote:"The executive Power shall be vested in a President of the United States of America."},
  {id:3, title:"Article III — The Judicial Branch",
   summary:"Creates Supreme Court and allows lower federal courts. Judges serve for life. Judicial review established in Marbury v. Madison (1803).",
   keyQuote:"The judicial Power of the United States, shall be vested in one supreme Court."},
  {id:4, title:"Article IV — The States",
   summary:"States respect each other's laws (full faith and credit). Citizens have same rights in any state. Federal government protects states.",
   keyQuote:"Full Faith and Credit shall be given in each State to the public Acts, Records, and judicial Proceedings of every other State."},
  {id:5, title:"Article V — Amendment Process",
   summary:"Amendments proposed by 2/3 of Congress, ratified by 3/4 of states. Only 27 of thousands proposed have passed.",
   keyQuote:"The Congress, whenever two thirds of both Houses shall deem it necessary, shall propose Amendments to this Constitution."},
  {id:6, title:"Article VI — Supremacy",
   summary:"Constitution and federal laws are the 'supreme Law of the Land.' No religious test required for public office.",
   keyQuote:"This Constitution... shall be the supreme Law of the Land."},
  {id:7, title:"Article VII — Ratification",
   summary:"Constitution took effect after 9 of 13 states ratified. New Hampshire was 9th on June 21, 1788.",
   keyQuote:"The Ratification of the Conventions of nine States, shall be sufficient for the Establishment of this Constitution."}
];

const amendments = [
  {id:1,  year:1791, title:"Religion, Speech, Press, Assembly, Petition",
   summary:"Congress can't establish a religion or stop religious practice. Can't stop free speech, press, peaceful assembly, or petitioning."},
  {id:2,  year:1791, title:"Right to Bear Arms",
   summary:"A well-regulated militia being necessary, the people's right to keep and bear arms shall not be infringed."},
  {id:3,  year:1791, title:"Quartering Soldiers",
   summary:"In peacetime, soldiers can't stay in a private home without permission."},
  {id:4,  year:1791, title:"Search and Seizure",
   summary:"No unreasonable searches without a warrant based on probable cause. Warrants must describe what's searched for."},
  {id:5,  year:1791, title:"Rights of the Accused",
   summary:"Grand jury for serious crimes. No double jeopardy. No self-incrimination. Due process required. Fair compensation for taken property."},
  {id:6,  year:1791, title:"Right to a Fair Trial",
   summary:"Speedy public trial by impartial jury. Right to know charges, confront witnesses, call witnesses, and have a lawyer."},
  {id:7,  year:1791, title:"Civil Jury Trials",
   summary:"Right to jury in civil cases over $20. Jury facts can't be re-examined by another court."},
  {id:8,  year:1791, title:"Cruel and Unusual Punishment",
   summary:"Excessive bail, fines, and cruel/unusual punishments forbidden."},
  {id:9,  year:1791, title:"Unenumerated Rights",
   summary:"Listing certain rights doesn't mean people don't have other rights."},
  {id:10, year:1791, title:"Powers Reserved to States and People",
   summary:"Powers not given to the federal government, nor forbidden to states, belong to states or the people."},
  {id:11, year:1795, title:"Suits Against States",
   summary:"Federal courts can't hear lawsuits against a state by citizens of another state or foreign country."},
  {id:12, year:1804, title:"Electoral College Reform",
   summary:"Electors cast separate votes for President and VP. No majority: House picks President, Senate picks VP."},
  {id:13, year:1865, title:"Abolition of Slavery",
   summary:"Neither slavery nor involuntary servitude allowed in the US, except as punishment for a crime."},
  {id:14, year:1868, title:"Citizenship, Due Process, Equal Protection",
   summary:"Anyone born or naturalized in the US is a citizen. States can't deny due process or equal protection. Most-litigated amendment."},
  {id:15, year:1870, title:"Voting Rights — Race",
   summary:"Vote can't be denied based on race, color, or previous servitude."},
  {id:16, year:1913, title:"Income Tax",
   summary:"Congress can collect income taxes without apportioning among states by population."},
  {id:17, year:1913, title:"Direct Election of Senators",
   summary:"Senators elected directly by the people, not chosen by state legislatures."},
  {id:18, year:1919, title:"Prohibition",
   summary:"Manufacture, sale, and transport of alcohol banned."},
  {id:19, year:1920, title:"Women's Suffrage",
   summary:"Vote can't be denied based on sex."},
  {id:20, year:1933, title:"Presidential Terms / Lame Duck",
   summary:"Presidential terms end Jan 20. Congress meets in January. VP becomes President if President-elect dies."},
  {id:21, year:1933, title:"Repeal of Prohibition",
   summary:"Repeals 18th Amendment. Alcohol legal again. States can regulate it."},
  {id:22, year:1951, title:"Presidential Term Limits",
   summary:"No one elected President more than twice. VP serving over 2 years can be elected once more."},
  {id:23, year:1961, title:"D.C. Electoral Votes",
   summary:"Washington D.C. gets 3 Electoral College votes."},
  {id:24, year:1964, title:"Abolition of Poll Tax",
   summary:"Vote can't be denied for failing to pay a poll tax."},
  {id:25, year:1967, title:"Presidential Succession",
   summary:"If President dies/resigns, VP becomes President. President can temporarily hand power to VP."},
  {id:26, year:1971, title:"Voting Age — 18",
   summary:"Vote can't be denied to citizens 18 or older."},
  {id:27, year:1992, title:"Congressional Pay Raises",
   summary:"Pay changes can't take effect until after the next House election."}
];

const chapters = [
  {id:1, title:"We the People", subtitle:"Why the Constitution exists",
   beats:[
     {type:"story", text:"After independence in 1776, the Articles of Confederation were too weak — Congress couldn't tax, raise an army, or enforce laws. States acted like 13 separate countries."},
     {type:"story", text:"In 1786, Shays' Rebellion — armed farmers shutting down courts — showed the government couldn't keep order. Something had to change."},
     {type:"story", text:"In summer 1787, 55 delegates gathered at Philadelphia's Independence Hall. Windows shut (secret!), sweating through the heat, arguing for months. The result: a brand-new Constitution."},
     {type:"didyouknow", text:"Benjamin Franklin was 81 at the Convention — the oldest delegate. He needed help walking and speaking, but his wit kept the debates going."},
     {type:"story", text:"The Preamble starts with 'We the People' — not 'We the States.' That was intentional. Government power comes from citizens, not states. Six goals: unity, justice, peace, defense, welfare, liberty."},
     {type:"check"}
   ], collectible:{type:"founder", id:"madison"}, badge:"we-the-people"},
  {id:2, title:"Three Branches", subtitle:"Articles I-III — How power is divided",
   beats:[
     {type:"story", text:"The Framers feared giving anyone too much power. Solution: split government into three branches that check each other."},
     {type:"story", text:"Article I creates Congress — the legislative branch that MAKES laws. House by population, Senate two per state (the Great Compromise settled this)."},
     {type:"story", text:"Article II creates the President — the executive branch that ENFORCES laws. President commands the military, can veto bills, appoints judges."},
     {type:"story", text:"Article III creates the Supreme Court — the judicial branch that INTERPRETS laws. Judges serve for life. Marbury v. Madison (1803) gave the Court judicial review."},
     {type:"didyouknow", text:"The Constitution doesn't say the Supreme Court has judicial review. The Court claimed that power in Marbury v. Madison — and nobody successfully challenged it."},
     {type:"story", text:"Checks and balances: Congress makes laws, President can veto, Congress can override (2/3 vote), Supreme Court can strike down laws. No one branch dominates."},
     {type:"check"}
   ], collectible:{type:"founder", id:"washington"}, badge:"three-branches"},
  {id:3, title:"The Union and Change", subtitle:"Articles IV-VII — States, amendments, ratification",
   beats:[
     {type:"story", text:"Article IV: states must respect each other's laws. A marriage valid in one state is valid in all. Federal government protects states from invasion."},
     {type:"story", text:"Article V: amend by 2/3 of Congress, ratify by 3/4 of states. Deliberately hard — only 27 amendments in 230+ years."},
     {type:"story", text:"Article VI: Supremacy Clause — Constitution and federal laws are the 'supreme Law of the Land.' No religious test required for office."},
     {type:"story", text:"Article VII: 9 of 13 states needed to ratify. Federalists (pro-Constitution) vs Anti-Federalists (feared too much power). The Federalist Papers — 85 essays — argued the case."},
     {type:"didyouknow", text:"The Federalist Papers were written under the fake name 'Publius.' Back then they were opinion columns in New York newspapers."},
     {type:"story", text:"New Hampshire became the 9th state on June 21, 1788. The Constitution was law. But Anti-Federalists won a key promise: a Bill of Rights would be added immediately."},
     {type:"check"}
   ], collectible:{type:"founder", id:"hamilton"}, badge:"federalist"},
  {id:4, title:"The Bill of Rights", subtitle:"Amendments 1-10 — Your freedoms",
   beats:[
     {type:"story", text:"Many people worried: 'Where are our rights?' Madison thought a Bill of Rights wasn't needed, but promised to add one to win ratification."},
     {type:"story", text:"Amendment 1: five core freedoms — religion, speech, press, assembly, petition. Congress can't establish an official religion or stop you from speaking your mind."},
     {type:"story", text:"Amendments 2-3: right to bear arms. No soldiers quartered in your home without permission."},
     {type:"story", text:"Amendments 4-5: no unreasonable searches (warrant required). No double jeopardy. No self-incrimination. Due process required."},
     {type:"story", text:"Amendment 6: speedy public trial with a lawyer (Gideon v. Wainwright, 1963). Amendment 7: civil jury trials. Amendment 8: no cruel/unusual punishment."},
     {type:"story", text:"Amendments 9-10: rights not listed are retained. Powers not given to federal government belong to states or the people."},
     {type:"didyouknow", text:"'I plead the Fifth' comes from the 5th Amendment — the right not to testify against yourself. In some situations you must formally invoke it."},
     {type:"check"}
   ], collectible:{type:"stamp", id:"bill-of-rights"}, badge:"rights-reader"},
  {id:5, title:"Expanding Democracy", subtitle:"Amendments 11-27 — The story continues",
   beats:[
     {type:"story", text:"The Constitution isn't frozen in 1787. The first 10 amendments protected freedom. The next 17 expanded who gets to be free and who gets a voice."},
     {type:"story", text:"After the Civil War: Amendment 13 abolished slavery (1865). Amendment 14 made everyone born in the US a citizen with 'equal protection.' Amendment 15 said race can't stop you from voting."},
     {type:"story", text:"The 14th Amendment is the most important after the Bill of Rights. Used to desegregate schools (Brown v. Board, 1954), legalize same-sex marriage (Obergefell v. Hodges, 2015), and more."},
     {type:"story", text:"Progressive Era: income tax (16), direct election of senators (17), women's suffrage (19). Women fought 72 years for the vote."},
     {type:"story", text:"Later changes: presidential term limits (22), D.C. votes (23), no poll taxes (24), succession (25), voting age 18 (26), delayed pay raises (27)."},
     {type:"didyouknow", text:"Amendment 27 was proposed in 1789 — same year as the Bill of Rights — but wasn't ratified until 1992. A college student campaigned for it in the 1980s."},
     {type:"story", text:"The Constitution has lasted 230+ years because it can change. Each amendment tells a story of people fighting for their rights. The story isn't over."},
     {type:"check"}
   ], collectible:{type:"founder", id:"douglass"}, badge:"democracy-builder"}
];

const badges = [
  {id:"we-the-people",     name:"We the People",      description:"Completed Chapter 1", icon:"scroll"},
  {id:"three-branches",    name:"Three Branches",     description:"Completed Chapter 2", icon:"capitol"},
  {id:"federalist",        name:"Federalist",         description:"Completed Chapter 3", icon:"quill"},
  {id:"rights-reader",     name:"Rights Reader",      description:"Completed Chapter 4", icon:"star"},
  {id:"democracy-builder", name:"Democracy Builder",  description:"Completed Chapter 5", icon:"trophy"},
  {id:"quiz-whiz",         name:"Quiz Whiz",          description:"3 stars on any quiz", icon:"star"},
  {id:"stamp-collector",   name:"Stamp Collector",    description:"Read 10 amendments", icon:"stamp"},
  {id:"all-27",            name:"All 27",             description:"Read all 27 amendments", icon:"scroll"},
  {id:"journey-complete",  name:"Journey Complete",   description:"Finish all 5 chapters", icon:"trophy"}
];

const founders = [
  {id:"madison",    name:"James Madison",      role:'"Father of the Constitution"', lifespan:"1751-1836", bio:"Madison wrote much of the Constitution and the Bill of Rights. Co-wrote the Federalist Papers. 4th President.", color:"#1D4270"},
  {id:"washington", name:"George Washington",  role:"Convention President, 1st President", lifespan:"1732-1799", bio:"Presided over the Convention. His presence gave the gathering credibility. First President under the new Constitution.", color:"#B03A2E"},
  {id:"hamilton",   name:"Alexander Hamilton", role:"Federalist Papers Author", lifespan:"1755-1804", bio:"Wrote most of the Federalist Papers (51 of 85). First Secretary of the Treasury. Argued for strong central government.", color:"#D9A23B"},
  {id:"franklin",   name:"Benjamin Franklin",  role:"Elder Statesman", lifespan:"1706-1790", bio:"At 81, the oldest delegate. Helped broker compromises and urged support for the final document despite disagreements.", color:"#2E6B4F"},
  {id:"douglass",   name:"Frederick Douglass", role:"Abolitionist & Amendment Advocate", lifespan:"1818-1895", bio:"His work helped create the Civil War amendments. His advocacy embodies the Constitution's promise of freedom and equality.", color:"#0E2238"}
];

const quizzes = [
  {id:"constitution-iq", name:"Constitution I.Q.", icon:"star",
   questions:[
     {q:"How many articles in the original Constitution?", options:["5","7","10","27"], correct:1},
     {q:"Which branch MAKES laws?", options:["Executive (President)","Judicial (Courts)","Legislative (Congress)","The States"], correct:2},
     {q:"What fraction of states must ratify an amendment?", options:["1/2","2/3","3/4","All of them"], correct:2},
     {q:"What does the First Amendment protect?", options:["Right to bear arms","Speech, religion, press, assembly, petition","Right to trial by jury","Protection from cruel punishment"], correct:1},
     {q:"Who is the 'Father of the Constitution'?", options:["George Washington","Thomas Jefferson","James Madison","Benjamin Franklin"], correct:2}
   ]},
  {id:"amendments-match", name:"Amendments Match", icon:"stamp",
   questions:[
     {q:"Which amendment abolished slavery?", options:["13th","14th","15th","19th"], correct:0},
     {q:"Which gave women the right to vote?", options:["15th","17th","19th","26th"], correct:2},
     {q:"Which sets presidential term limits (2 terms)?", options:["20th","22nd","25th","27th"], correct:1},
     {q:"Which lowered the voting age to 18?", options:["24th","25th","26th","27th"], correct:2},
     {q:"Which says you can't be tried twice for the same crime?", options:["4th","5th","6th","8th"], correct:1}
   ]}
];

const glossary = [
  {term:"Amendment", def:"A formal change to the Constitution. 27 ratified."},
  {term:"Anti-Federalist", def:"Opposed the Constitution; feared too-powerful central government. Demanded a Bill of Rights."},
  {term:"Article", def:"A major numbered section of the Constitution (I-VII)."},
  {term:"Bill of Rights", def:"First 10 amendments (1791) protecting individual freedoms from government power."},
  {term:"Checks and Balances", def:"Each branch can limit the others' power — preventing any one branch from dominating."},
  {term:"Congress", def:"Legislative branch: House of Representatives + Senate. Makes federal laws."},
  {term:"Constitutional Convention", def:"1787 Philadelphia meeting where delegates wrote the Constitution."},
  {term:"Due Process", def:"Government must follow fair procedures before taking life, liberty, or property."},
  {term:"Electoral College", def:"System for electing the President. Each state gets electors based on representation."},
  {term:"Equal Protection", def:"14th Amendment: no state can deny 'equal protection of the laws.' Key civil rights tool."},
  {term:"Executive Branch", def:"Enforces laws — led by the President."},
  {term:"Federalist", def:"Supported the Constitution and strong central government. Hamilton, Madison, Jay wrote the Federalist Papers."},
  {term:"Federalist Papers", def:"85 essays arguing for ratification of the Constitution. Still studied today."},
  {term:"Framer", def:"One of 55 delegates who wrote the Constitution at the 1787 Convention."},
  {term:"Great Compromise", def:"Created two-house Congress: House by population (big states happy), Senate equal per state (small states happy)."},
  {term:"House of Representatives", def:"Congress chamber where seats are based on state population. Members serve 2-year terms."},
  {term:"Impeachment", def:"House charges officials with 'high crimes and misdemeanors.' Senate holds the trial."},
  {term:"Judicial Branch", def:"Interprets laws — the Supreme Court and lower federal courts."},
  {term:"Judicial Review", def:"Courts can declare a law unconstitutional. Established by Marbury v. Madison (1803)."},
  {term:"Legislative Branch", def:"Makes laws — Congress (House + Senate)."},
  {term:"Preamble", def:"Opening statement: 'We the People...' Lists six goals of the Constitution."},
  {term:"President", def:"Head of the executive branch, commander-in-chief. Elected every 4 years via Electoral College."},
  {term:"Ratification", def:"Official approval. Constitution needed 9/13 states. Amendments need 3/4 of states."},
  {term:"Senate", def:"Congress chamber where each state gets 2 senators regardless of population. 6-year terms."},
  {term:"Separation of Powers", def:"Government divided into three branches — legislative, executive, judicial — each with its own job."},
  {term:"Supremacy Clause", def:"Article VI: Constitution and federal laws are the 'supreme Law of the Land' — above state laws."},
  {term:"Supreme Court", def:"Highest US court. Nine justices serve for life. Decides if laws follow the Constitution."},
  {term:"Suffrage", def:"The right to vote. Expanded by the 15th, 19th, and 26th Amendments."},
  {term:"Veto", def:"President's power to reject a bill. Congress can override with 2/3 vote."}
];

return { preamble, articles, amendments, chapters, badges, founders, quizzes, glossary };
})();
