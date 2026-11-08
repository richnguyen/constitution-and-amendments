// Constitution Quest — Content Data
// Accurate public-domain U.S. Constitution content.

const preamble = {
  title: "The Preamble",
  original:
    "We the People of the United States, in Order to form a more perfect Union, " +
    "establish Justice, insure domestic Tranquility, provide for the common " +
    "defence, promote the general Welfare, and secure the Blessings of Liberty to " +
    "ourselves and our Posterity, do ordain and establish this Constitution for " +
    "the United States of America.",
  plain:
    "The Constitution's mission statement. Six goals: unity, justice, peace, " +
    "defense, welfare, and liberty. The opening words matter most — power comes " +
    "from citizens, not from the states.",
  why:
    '"We the People" was radical in 1787. It said ordinary citizens, not state ' +
    "governments, created this government.",
};

const articles = [
  {
    id: 1,
    title: "Article I — The Legislative Branch",
    summary:
      "Creates Congress (House + Senate) to make federal laws. Powers include " +
      "taxing, borrowing, regulating commerce, declaring war, and passing " +
      "'necessary and proper' laws.",
    original:
      "All legislative Powers herein granted shall be vested in a Congress of the " +
      "United States, which shall consist of a Senate and House of Representatives. " +
      "The House of Representatives shall be composed of Members chosen every " +
      "second Year by the People of the several States. The Senate of the United " +
      "States shall be composed of two Senators from each State, chosen by the " +
      "Legislature thereof, for six Years. The Congress shall have Power To lay and " +
      "collect Taxes, Duties, Imposts and Excises, to pay the Debts and provide for " +
      "the common Defence and general Welfare of the United States. To regulate " +
      "Commerce with foreign Nations, and among the several States. To declare War. " +
      "To make all Laws which shall be necessary and proper for carrying into " +
      "Execution the foregoing Powers.",
    plain:
      "Congress is the law-making branch, split into two chambers. The House " +
      "represents people (seats by population, 2-year terms). The Senate " +
      "represents states equally (2 each, 6-year terms). Article I lists Congress's " +
      "powers, including the elastic 'necessary and proper' clause that lets it " +
      "stretch to meet new situations.",
    keyQuote:
      "All legislative Powers herein granted shall be vested in a Congress of the " +
      "United States, which shall consist of a Senate and House of Representatives.",
    why:
      "Congress sits first because the Framers expected it to be the most powerful " +
      "branch — closest to the people.",
  },
  {
    id: 2,
    title: "Article II — The Executive Branch",
    summary:
      "Establishes the President to enforce laws. Commander-in-chief, veto power, " +
      "treaties (with Senate approval), appoints officials.",
    original:
      "The executive Power shall be vested in a President of the United States of " +
      "America. He shall hold his Office during the Term of four Years. The " +
      "President shall be Commander in Chief of the Army and Navy of the United " +
      "States. He shall have Power, by and with the Advice and Consent of the " +
      "Senate, to make Treaties, provided two thirds of the Senators present " +
      "concur. He shall nominate, and by and with the Advice and Consent of the " +
      "Senate, shall appoint Ambassadors, other public Ministers and Consuls, " +
      "Judges of the supreme Court. He shall take Care that the Laws be faithfully " +
      "executed.",
    plain:
      "The President runs the executive branch, which carries out the laws " +
      "Congress passes. The President commands the military, negotiates treaties, " +
      "and appoints judges and officials — but the Senate must approve treaties and " +
      "appointments. The President serves a 4-year term.",
    keyQuote:
      "The executive Power shall be vested in a President of the United States of " +
      "America.",
    why:
      "The Framers feared a king, so they paired a single executive with checks " +
      "(Senate consent, the veto override) rather than trusting one person.",
  },
  {
    id: 3,
    title: "Article III — The Judicial Branch",
    summary:
      "Creates the Supreme Court and allows lower federal courts. Judges serve for " +
      "life. Judicial review established in Marbury v. Madison (1803).",
    original:
      "The judicial Power of the United States, shall be vested in one supreme " +
      "Court, and in such inferior Courts as the Congress may from time to time " +
      "ordain and establish. The Judges, both of the supreme and inferior Courts, " +
      "shall hold their Offices during good Behaviour. The judicial Power shall " +
      "extend to all Cases, in Law and Equity, arising under this Constitution, the " +
      "Laws of the United States, and Treaties made, or which shall be made, under " +
      "their Authority.",
    plain:
      "The judicial branch interprets the laws. It has one Supreme Court, plus " +
      "whatever lower courts Congress creates. Federal judges serve for life, so " +
      "they can rule without worrying about elections. The courts' power to declare " +
      "a law unconstitutional — judicial review — was set in Marbury v. Madison.",
    keyQuote:
      "The judicial Power of the United States, shall be vested in one supreme " +
      "Court.",
    why:
      "Life tenure is a trade-off: judges are never elected, but they also never " +
      "face pressure to rule a certain way to keep their jobs.",
  },
  {
    id: 4,
    title: "Article IV — The States",
    summary:
      "States respect each other's laws (full faith and credit). Citizens have the " +
      "same rights in any state. The federal government protects states.",
    original:
      "Full Faith and Credit shall be given in each State to the public Acts, " +
      "Records, and judicial Proceedings of every other State. The Citizens of each " +
      "State shall be entitled to all Privileges and Immunities of Citizens in the " +
      "several States. The United States shall guarantee to every State in this " +
      "Union a Republican Form of Government, and shall protect each of them " +
      "against Invasion.",
    plain:
      "Article IV is about how states deal with each other. A marriage or contract " +
      "valid in one state is honored in the others. You keep your rights when you " +
      "travel or move. And the federal government promises to protect every state " +
      "and keep its government democratic.",
    keyQuote:
      "Full Faith and Credit shall be given in each State to the public Acts, " +
      "Records, and judicial Proceedings of every other State.",
    why:
      "Without it, crossing a state line could put your marriage, driver's " +
      "license, or court rulings in limbo.",
  },
  {
    id: 5,
    title: "Article V — Amendment Process",
    summary:
      "Amendments proposed by 2/3 of Congress (or a convention of states), " +
      "ratified by 3/4 of state legislatures. Deliberately hard.",
    original:
      "The Congress, whenever two thirds of both Houses shall deem it necessary, " +
      "shall propose Amendments to this Constitution, when ratified by the " +
      "Legislatures of three fourths of the several States, or by Conventions in " +
      "three fourths thereof, as the one or the other Mode of Ratification may be " +
      "proposed by the Congress.",
    plain:
      "Changing the Constitution takes two steps. First, two-thirds of Congress " +
      "must propose an amendment. Then three-fourths of the states must ratify it. " +
      "That's a high bar — only 27 amendments have passed since 1787, including ten " +
      "in one burst (the Bill of Rights).",
    keyQuote:
      "The Congress, whenever two thirds of both Houses shall deem it necessary, " +
      "shall propose Amendments to this Constitution.",
    why:
      "The Framers wanted stability, not easy revisals. Two-thirds plus " +
      "three-fourths means an amendment needs broad national agreement.",
  },
  {
    id: 6,
    title: "Article VI — Supreme Law of the Land",
    summary:
      "The Constitution and federal laws are the 'supreme Law of the Land.' No " +
      "religious test for public office. The new government's debts are valid.",
    original:
      "This Constitution, and the Laws of the United States which shall be made in " +
      "Pursuance thereof, and all Treaties made, or which shall be made, under the " +
      "Authority of the United States, shall be the supreme Law of the Land; and " +
      "the Judges in every State shall be bound thereby. The Senators and " +
      "Representatives before mentioned, and the Members of the several State " +
      "Legislatures, and all executive and judicial Officers, shall be bound by " +
      "Oath or Affirmation, to support this Constitution; but no religious Test " +
      "shall ever be required as a Qualification to any Office or public Trust " +
      "under the United States.",
    plain:
      "Where federal and state law conflict, federal wins — that's the Supremacy " +
      "Clause. Article VI also says public officials must swear to support the " +
      "Constitution, but no religious test can stop someone from holding office.",
    keyQuote:
      "This Constitution, and the Laws of the United States... shall be the " +
      "supreme Law of the Land.",
    why:
      "The no-religious-test rule was ahead of its time. In 1787, most states still " +
      "required officials to be Protestant Christians.",
  },
  {
    id: 7,
    title: "Article VII — Ratification",
    summary:
      "Nine of thirteen states needed to ratify. Went into effect in 1788 when New " +
      "Hampshire became the ninth state.",
    original:
      "The Ratification of the Conventions of nine States, shall be sufficient for " +
      "the Establishment of this Constitution between the States so ratifying the " +
      "Same. Done in Convention by the Unanimous Consent of the States present the " +
      "Seventeenth Day of September in the Year of our Lord one thousand seven " +
      "hundred and Eighty seven.",
    plain:
      "The Constitution wasn't approved by the old Congress or by state " +
      "legislatures. It was submitted to special state conventions, and just nine " +
      "of the thirteen states needed to say yes. New Hampshire's vote in June 1788 " +
      "put it over the top.",
    keyQuote:
      "The Ratification of the Conventions of nine States, shall be sufficient for " +
      "the Establishment of this Constitution.",
    why:
      "Requiring only nine of thirteen was a gamble. It meant the document could " +
      "take effect without Virginia and New York — the largest states.",
  },
];

export { preamble, articles };
