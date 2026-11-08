// Constitution Quest — The 27 Amendments
// Original text is public domain. Plain-language explanations are teen-tone.

const amendments = [
  {
    id: 1,
    year: 1791,
    title: "1st Amendment — Freedoms of Expression",
    summary:
      "Protects speech, religion, press, assembly, and the right to petition the " +
      "government.",
    original:
      "Congress shall make no law respecting an establishment of religion, or " +
      "prohibiting the free exercise thereof; or abridging the freedom of speech, " +
      "or of the press; or the right of the people peaceably to assemble, and to " +
      "petition the Government for a redress of grievances.",
    plain:
      "You can believe and worship (or not) as you choose. You can say what you " +
      "think, publish it, gather with others, and formally ask the government to " +
      "fix problems. Congress cannot stop any of that.",
    why:
      "Five freedoms in one sentence. It is the most litigated amendment and the " +
      "one most often tested in schools.",
  },
  {
    id: 2,
    year: 1791,
    title: "2nd Amendment — Right to Bear Arms",
    summary:
      "Protects the right to keep and bear arms in the context of a well-regulated " +
      "militia.",
    original:
      "A well regulated Militia, being necessary to the security of a free State, " +
      "the right of the people to keep and bear Arms, shall not be infringed.",
    plain:
      "The amendment ties gun ownership to state militias. Courts have debated for " +
      "decades whether it protects an individual right or only a collective, " +
      "militia-based one. Recent Supreme Court rulings treat it as an individual " +
      "right, while allowing some regulation.",
    why:
      "Its wording is the most contested in the Constitution — the opening clause " +
      "about militias and the second clause about 'the people' pull in different " +
      "directions.",
  },
  {
    id: 3,
    year: 1791,
    title: "3rd Amendment — No Quartering of Soldiers",
    summary:
      "The government cannot force you to house soldiers in peacetime without " +
      "your consent.",
    original:
      "No Soldier shall, in time of peace be quartered in any house, without the " +
      "consent of the Owner, nor in time of war, but in a manner to be prescribed " +
      "by law.",
    plain:
      "In peacetime, no soldier can stay in your home without your permission. In " +
      "wartime, only as Congress sets by law. It is the least-litigated amendment " +
      "— the Supreme Court has never decided a case based mainly on it.",
    why:
      "It answers a specific grievance from the Declaration of Independence about " +
      "British troops living in colonists' homes.",
  },
  {
    id: 4,
    year: 1791,
    title: "4th Amendment — Protection from Unreasonable Searches",
    summary:
      "Police need a warrant based on probable cause to search you or your " +
      "property.",
    original:
      "The right of the people to be secure in their persons, houses, papers, and " +
      "effects, against unreasonable searches and seizures, shall not be violated, " +
      "and no Warrants shall issue, but upon probable cause, supported by Oath or " +
      "affirmation, and particularly describing the place to be searched, and the " +
      "persons or things to be seized.",
    plain:
      "You have a right to privacy in your body, home, papers, and belongings. " +
      "Police generally need a warrant — approved by a judge, based on probable " +
      "cause, and naming exactly what they are looking for — before searching.",
    why:
      "It is the legal foundation for privacy debates about phones, GPS tracking, " +
      "and data collection.",
  },
  {
    id: 5,
    year: 1791,
    title: "5th Amendment — Rights of the Accused",
    summary:
      "Grand jury indictment, no double jeopardy, no self-incrimination, due " +
      "process, and just compensation for property taken.",
    original:
      "No person shall be held to answer for a capital, or otherwise infamous " +
      "crime, unless on a presentment or indictment of a Grand Jury, except in " +
      "cases arising in the land or naval forces. Nor shall any person be subject " +
      "for the same offence to be twice put in jeopardy of life or limb; nor shall " +
      "be compelled in any criminal case to be a witness against himself, nor be " +
      "deprived of life, liberty, or property, without due process of law; nor " +
      "shall private property be taken for public use, without just compensation.",
    plain:
      "Five protections for people accused of crimes: a grand jury must indict " +
      "you, you cannot be tried twice for the same crime, you cannot be forced to " +
      "testify against yourself, the government must follow fair procedures, and " +
      "it must pay you fairly if it takes your property.",
    why:
      "'Pleading the Fifth' comes from here. It is also the source of the Miranda " +
      "warning you see on TV.",
  },
  {
    id: 6,
    year: 1791,
    title: "6th Amendment — Right to a Fair Trial",
    summary:
      "Speedy and public trial, impartial jury, notice of charges, confrontation " +
      "of witnesses, and a lawyer.",
    original:
      "In all criminal prosecutions, the accused shall enjoy the right to a speedy " +
      "and public trial, by an impartial jury of the State and district wherein " +
      "the crime shall have been committed; to be informed of the nature and cause " +
      "of the accusation; to be confronted with the witnesses against him; to have " +
      "compulsory process for obtaining witnesses in his favor, and to have the " +
      "Assistance of Counsel for his defence.",
    plain:
      "If you are charged with a crime, you get a trial without long delays, open " +
      "to the public, decided by an unbiased jury. You must be told what you are " +
      "charged with, you can question the people accusing you, you can call your " +
      "own witnesses, and you get a lawyer.",
    why:
      "The right to a lawyer, even if you cannot afford one, comes from this " +
      "amendment (Gideon v. Wainwright, 1963).",
  },
  {
    id: 7,
    year: 1791,
    title: "7th Amendment — Jury Trials in Civil Cases",
    summary:
      "Guarantees a jury trial in federal civil cases involving more than twenty " +
      "dollars.",
    original:
      "In Suits at common law, where the value in controversy shall exceed twenty " +
      "dollars, the right of trial by jury shall be preserved, and no fact tried " +
      "by a jury, shall be otherwise re-examined in any Court of the United " +
      "States, than according to the rules of the common law.",
    plain:
      "Civil lawsuits — disputes between people or companies, not criminal " +
      "charges — also get juries in federal court. The twenty-dollar figure was " +
      "large in 1791; today it covers almost every case.",
    why:
      "It is the only amendment in the Bill of Rights that has never been applied " +
      "to the states.",
  },
  {
    id: 8,
    year: 1791,
    title: "8th Amendment — No Cruel or Unusual Punishment",
    summary:
      "Bans excessive bail, excessive fines, and cruel and unusual punishment.",
    original:
      "Excessive bail shall not be required, nor excessive fines imposed, nor " +
      "cruel and unusual punishments inflicted.",
    plain:
      "The government cannot set bail so high it works like a jail sentence, " +
      "cannot fine you out of existence, and cannot punish you in ways that are " +
      "brutal or wildly out of proportion to the crime.",
    why:
      "It is the basis for arguments about the death penalty and about prison " +
      "conditions.",
  },
  {
    id: 9,
    year: 1791,
    title: "9th Amendment — Rights Retained by the People",
    summary:
      "Listing some rights in the Constitution does not mean those are the only " +
      "rights people have.",
    original:
      "The enumeration in the Constitution, of certain rights, shall not be " +
      "construed to deny or disparage others retained by the people.",
    plain:
      "The Bill of Rights is not a complete list. Just because a right is not " +
      "written down does not mean the government can take it away. People keep " +
      "rights the Constitution never mentions.",
    why:
      "It answers the Federalist worry that listing rights would imply the " +
      "unlisted ones did not exist.",
  },
  {
    id: 10,
    year: 1791,
    title: "10th Amendment — Powers Reserved to the States",
    summary:
      "Powers not given to the federal government, and not forbidden to the " +
      "states, belong to the states or the people.",
    original:
      "The powers not delegated to the United States by the Constitution, nor " +
      "prohibited by it to the States, are reserved to the States respectively, or " +
      "to the people.",
    plain:
      "The federal government only has the powers the Constitution gives it. " +
      "Everything else — schools, local police, most licensing — belongs to the " +
      "states or to the people directly.",
    why:
      "It is the constitutional anchor for federalism and for arguments that " +
      "Washington has overreached.",
  },
  {
    id: 11,
    year: 1795,
    title: "11th Amendment — State Sovereign Immunity",
    summary:
      "Federal courts cannot hear lawsuits against a state brought by citizens of " +
      "another state or country.",
    original:
      "The Judicial power of the United States shall not be construed to extend " +
      "to any suit in law or equity, commenced or prosecuted against one of the " +
      "United States by Citizens of another State, or by Citizens or Subjects of " +
      "any Foreign State.",
    plain:
      "You generally cannot sue a state in federal court unless the state agrees. " +
      "It came after Chisholm v. Georgia (1793), when the Supreme Court let a " +
      "South Carolinian sue Georgia — and states were furious.",
    why:
      "It was the first amendment passed after the Bill of Rights, and it was a " +
      "direct reaction to a single Supreme Court decision.",
  },
  {
    id: 12,
    year: 1804,
    title: "12th Amendment — Separate Electoral Votes",
    summary:
      "Electors vote separately for President and Vice President.",
    original:
      "The Electors shall meet in their respective states, and vote by ballot for " +
      "President and Vice-President, one of whom, at least, shall not be an " +
      "inhabitant of the same state with themselves; they shall name in their " +
      "ballots the person voted for as President, and in distinct ballots the " +
      "person voted for as Vice-President.",
    plain:
      "Before 1804, electors cast two votes without saying which was for " +
      "President. That produced a tie in 1800 between Jefferson and his running " +
      "mate Burr. Now electors cast one vote for each office separately.",
    why:
      "It fixed a design flaw the Framers did not anticipate: political parties.",
  },
  {
    id: 13,
    year: 1865,
    title: "13th Amendment — Abolition of Slavery",
    summary:
      "Abolishes slavery and involuntary servitude except as punishment for a " +
      "crime.",
    original:
      "Neither slavery nor involuntary servitude, except as a punishment for crime " +
      "whereof the party shall have been duly convicted, shall exist within the " +
      "United States, or any place subject to their jurisdiction. Congress shall " +
      "have power to enforce this article by appropriate legislation.",
    plain:
      "Slavery is illegal everywhere in the United States. The only exception is " +
      "forced labor as punishment for a crime. Congress can pass laws to enforce " +
      "it.",
    why:
      "It is one of the three Reconstruction amendments, and the only one that " +
      "directly changes the text of the original Constitution's compromises.",
  },
  {
    id: 14,
    year: 1868,
    title: "14th Amendment — Equal Protection and Citizenship",
    summary:
      "Grants citizenship to all born or naturalized in the U.S., guarantees due " +
      "process and equal protection, and applies the Bill of Rights to the states.",
    original:
      "All persons born or naturalized in the United States, and subject to the " +
      "jurisdiction thereof, are citizens of the United States and of the State " +
      "wherein they reside. No State shall make or enforce any law which shall " +
      "abridge the privileges or immunities of citizens of the United States; nor " +
      "shall any State deprive any person of life, liberty, or property, without " +
      "due process of law; nor deny to any person within its jurisdiction the " +
      "equal protection of the laws.",
    plain:
      "Anyone born in the U.S. or who becomes a citizen is a citizen. States must " +
      "follow fair procedures and treat everyone equally under the law. This is " +
      "the amendment that made most of the Bill of Rights apply to state " +
      "governments, not just Congress.",
    why:
      "It is the most important amendment for civil rights. Brown v. Board, " +
      "Roe v. Wade, and Obergefell all rest on it.",
  },
  {
    id: 15,
    year: 1870,
    title: "15th Amendment — Voting Rights Regardless of Race",
    summary:
      "The right to vote cannot be denied because of race, color, or previous " +
      "condition of servitude.",
    original:
      "The right of citizens of the United States to vote shall not be denied or " +
      "abridged by the United States or by any State on account of race, color, or " +
      "previous condition of servitude. Congress shall have power to enforce this " +
      "article by appropriate legislation.",
    plain:
      "No government can stop you from voting because of your race or because you " +
      "were once enslaved. Congress can pass laws to enforce it.",
    why:
      "It was a promise, not a reality. Poll taxes, literacy tests, and violence " +
      "blocked Black voters for nearly a century until the Voting Rights Act of " +
      "1965.",
  },
  {
    id: 16,
    year: 1913,
    title: "16th Amendment — Federal Income Tax",
    summary:
      "Gives Congress the power to tax income.",
    original:
      "The Congress shall have power to lay and collect taxes on incomes, from " +
      "whatever source derived, without apportionment among the several States, " +
      "and without regard to any census or enumeration.",
    plain:
      "Congress can tax what people earn. Before this, the Supreme Court had " +
      "struck down an income tax as unconstitutional. This amendment made the " +
      "modern federal income tax possible.",
    why:
      "It funds most of the federal government. Without it, there is no Social " +
      "Security, Medicare, or federal military as we know them.",
  },
  {
    id: 17,
    year: 1913,
    title: "17th Amendment — Direct Election of Senators",
    summary:
      "Senators are elected by the people instead of by state legislatures.",
    original:
      "The Senate of the United States shall be composed of two Senators from " +
      "each State, elected by the people thereof, for six years; and each Senator " +
      "shall have one vote. The electors in each State shall have the " +
      "qualifications requisite for electors of the most numerous branch of the " +
      "State legislatures.",
    plain:
      "Before 1913, state legislatures chose senators. Now voters do. The change " +
      "was meant to reduce corruption in statehouse backrooms and make the Senate " +
      "more accountable to the public.",
    why:
      "It is the only amendment that changed how a whole branch of Congress is " +
      "selected.",
  },
  {
    id: 18,
    year: 1919,
    title: "18th Amendment — Prohibition",
    summary:
      "Banned the manufacture, sale, and transport of alcohol. Repealed in 1933.",
    original:
      "After one year from the ratification of this article the manufacture, sale, " +
      "or transportation of intoxicating liquors within, the importation thereof " +
      "into, or the exportation thereof from the United States and all territory " +
      "subject to the jurisdiction thereof for beverage purposes is hereby " +
      "prohibited.",
    plain:
      "Alcohol was banned nationwide. It did not work: illegal bars (speakeasies) " +
      "and organized crime exploded. The 21st Amendment repealed it in 1933.",
    why:
      "It is the only amendment ever repealed. It is the clearest lesson that " +
      "constitutional bans can fail when the public does not support them.",
  },
  {
    id: 19,
    year: 1920,
    title: "19th Amendment — Women's Suffrage",
    summary:
      "The right to vote cannot be denied because of sex.",
    original:
      "The right of citizens of the United States to vote shall not be denied or " +
      "abridged by the United States or by any State on account of sex. Congress " +
      "shall have power to enforce this article by appropriate legislation.",
    plain:
      "No government can stop you from voting because of your sex. It took " +
      "decades of organizing, marches, and lobbying to pass.",
    why:
      "It doubled the electorate. It was ratified in 1920, but many women of color " +
      "were still blocked by state laws until 1965.",
  },
  {
    id: 20,
    year: 1933,
    title: "20th Amendment — Lame Duck Sessions",
    summary:
      "Moves presidential inauguration to January 20 and congressional terms to " +
      "January 3.",
    original:
      "The terms of the President and Vice President shall end at noon on the 20th " +
      "day of January, and the terms of Senators and Representatives at noon on " +
      "the 3rd day of January, of the years in which such terms would have ended " +
      "if this article had not been ratified; and the terms of their successors " +
      "shall then begin.",
    plain:
      "Before this, a defeated President stayed in office until March 4 — four " +
      "months of 'lame duck' time. Now the new President takes office on January " +
      "20 and new members of Congress start January 3.",
    why:
      "It shortened the dangerous gap between election and transition, which " +
      "mattered during the Great Depression.",
  },
  {
    id: 21,
    year: 1933,
    title: "21st Amendment — Repeal of Prohibition",
    summary:
      "Repeals the 18th Amendment and lets states regulate alcohol.",
    original:
      "The eighteenth article of amendment to the Constitution of the United " +
      "States is hereby repealed. The transportation or importation into any " +
      "State, Territory, or possession of the United States for delivery or use " +
      "therein of intoxicating liquors, in violation of the laws thereof, is " +
      "hereby prohibited.",
    plain:
      "Prohibition is over. States get to set their own alcohol rules — which is " +
      "why drinking ages and liquor laws vary by state.",
    why:
      "It is the only amendment ratified by state conventions rather than " +
      "legislatures, because lawmakers feared the political cost.",
  },
  {
    id: 22,
    year: 1951,
    title: "22nd Amendment — Presidential Term Limits",
    summary:
      "Limits a President to two elected terms.",
    original:
      "No person shall be elected to the office of the President more than twice, " +
      "and no person who has held the office of President, or acted as President, " +
      "for more than two years of a term to which some other person was elected " +
      "President shall be elected to the office of the President more than once.",
    plain:
      "You can be elected President twice. If you took over mid-term and served " +
      "more than two years of someone else's term, you can only be elected once " +
      "more.",
    why:
      "It was a reaction to FDR winning four elections. Washington's two-term " +
      "precedent became law.",
  },
  {
    id: 23,
    year: 1961,
    title: "23rd Amendment — D.C. Electoral Votes",
    summary:
      "Gives Washington, D.C. electors in the Electoral College.",
    original:
      "The District constituting the seat of Government of the United States shall " +
      "appoint in such manner as the Congress may direct: A number of electors of " +
      "President and Vice President equal to the whole number of Senators and " +
      "Representatives in Congress to which the District would be entitled if it " +
      "were a State, but in no event more than the least populous State.",
    plain:
      "People in Washington, D.C. can vote for President. D.C. gets three " +
      "electors — the same as the smallest state — even though it is not a state " +
      "and has no voting members of Congress.",
    why:
      "It is a partial fix. D.C. residents still lack voting representation in " +
      "Congress.",
  },
  {
    id: 24,
    year: 1964,
    title: "24th Amendment — Abolition of Poll Taxes",
    summary:
      "Bans poll taxes as a condition for voting in federal elections.",
    original:
      "The right of citizens of the United States to vote in any primary or other " +
      "election for President or Vice President, for electors for President or " +
      "Vice President, or for Senator or Representative in Congress, shall not be " +
      "denied or abridged by the United States or any State by reason of failure " +
      "to pay any poll tax or other tax.",
    plain:
      "You cannot be charged a fee to vote in federal elections. Poll taxes had " +
      "been used for decades to keep poor Black voters and poor white voters away " +
      "from the polls.",
    why:
      "It closed a loophole the 15th Amendment left open for nearly a century.",
  },
  {
    id: 25,
    year: 1967,
    title: "25th Amendment — Presidential Succession",
    summary:
      "Sets rules for presidential disability, succession, and filling a vacant " +
      "Vice Presidency.",
    original:
      "In case of the removal of the President from office or of his death or " +
      "resignation, the Vice President shall become President. Whenever the " +
      "President transmits to the President pro tempore of the Senate and the " +
      "Speaker of the House of Representatives his written declaration that he is " +
      "unable to discharge the powers and duties of his office, and until he " +
      "transmits to them a written declaration to the contrary, such powers and " +
      "duties shall be discharged by the Vice President as Acting President.",
    plain:
      "If the President dies, resigns, or is removed, the Vice President becomes " +
      "President. If the President is temporarily unable to serve, they can hand " +
      "power to the Vice President in writing and take it back the same way. The " +
      "President also nominates a new Vice President if that office is empty, with " +
      "Congress's approval.",
    why:
      "It was ratified after JFK's assassination, when the country realized the " +
      "rules for a disabled President were dangerously vague.",
  },
  {
    id: 26,
    year: 1971,
    title: "26th Amendment — Voting Age 18",
    summary:
      "Lowers the voting age to 18 in all elections.",
    original:
      "The right of citizens of the United States, who are eighteen years of age " +
      "or older, to vote shall not be denied or abridged by the United States or " +
      "by any State on account of age.",
    plain:
      "If you are 18 or older, you can vote. Before this, most states set the age " +
      "at 21 — even though 18-year-olds could be drafted to fight in Vietnam.",
    why:
      "It was ratified in 100 days, the fastest of any amendment. 'Old enough to " +
      "fight, old enough to vote' was the slogan.",
  },
  {
    id: 27,
    year: 1992,
    title: "27th Amendment — Congressional Pay Raises",
    summary:
      "Any pay raise for Congress cannot take effect until after the next election.",
    original:
      "No law, varying the compensation for the services of the Senators and " +
      "Representatives, shall take effect, until an election of Representatives " +
      "shall have intervened.",
    plain:
      "Congress can raise its own pay, but the raise cannot kick in until after " +
      "voters have had a chance to react at the polls.",
    why:
      "It was proposed in 1789 with the Bill of Rights and sat unratified for 202 " +
      "years — the longest wait of any amendment.",
  },
];

export { amendments };
