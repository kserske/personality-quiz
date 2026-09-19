import { PersonalityKey } from "./personalities";

export interface Allocation {
  type: PersonalityKey;
  weight: number; // 1 for a pure answer, 0.5 for each half of a split answer
}

export interface Option {
  letter: string;
  text: string;
  allocations: Allocation[]; // weights always sum to exactly 1
}

export interface Question {
  id: number;
  emoji: string;
  title: string;
  prompt: string;
  options: Option[];
}

function pure(type: PersonalityKey): Allocation[] {
  return [{ type, weight: 1 }];
}

function split(a: PersonalityKey, b: PersonalityKey): Allocation[] {
  return [
    { type: a, weight: 0.5 },
    { type: b, weight: 0.5 },
  ];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    emoji: "☀️",
    title: "The First Morning",
    prompt:
      "It's your first day. You arrive 30 minutes early, but your buddy isn't here yet and you're still waiting to collect your staff pass and IT equipment.\n\nWhat do you do while you wait?",
    options: [
      { letter: "A", text: "Check the schedule and mentally plan how you want your first day to go.", allocations: pure("navigator") },
      { letter: "B", text: "Look around, see what's happening, and figure out what you can get started on.", allocations: split("firefighter", "chameleon") },
      { letter: "C", text: "Start chatting with whoever's nearby. \u201cHey, I'm new here \u2014 are you from HRSC?\u201d", allocations: pure("connector") },
      { letter: "D", text: "Browse the onboarding information and start figuring out how everything works.", allocations: split("detective", "maverick") },
    ],
  },
  {
    id: 2,
    emoji: "💬",
    title: "The Message",
    prompt:
      "At 10:17am, your RO sends you:\n\n\u201cHi. Can we have a quick chat?\u201d\n\nYour immediate reaction is\u2026",
    options: [
      { letter: "A", text: "\u201cSure! Let's find out what's happening.\u201d", allocations: pure("firefighter") },
      { letter: "B", text: "\u201cOf course. Anything you'd like me to prepare?\u201d", allocations: split("navigator", "detective") },
      { letter: "C", text: "Wonder what it's about and mentally review your last 48 hours.", allocations: pure("detective") },
      { letter: "D", text: "\u201cSure, I'm free now.\u201d Then walk over and read the situation when you get there.", allocations: split("chameleon", "maverick") },
    ],
  },
  {
    id: 3,
    emoji: "🍜",
    title: "Lunch",
    prompt: "It's your first day.\n\nIt is time to go for lunch.\n\nWhat happens?",
    options: [
      { letter: "A", text: "\u201cAnyone going for lunch?\u201d", allocations: pure("connector") },
      { letter: "B", text: "You've already researched three nearby places.", allocations: split("navigator", "detective") },
      { letter: "C", text: "Wait and see what everyone else normally does.", allocations: pure("chameleon") },
      { letter: "D", text: "Wander outside and see what looks good.", allocations: split("maverick", "firefighter") },
    ],
  },
  {
    id: 4,
    emoji: "🫠",
    title: "Meeting Confusion",
    prompt:
      "You're attending an onboarding session at 2pm.\n\nSomeone uses an acronym you've never heard before.\n\nEveryone else appears to understand.\n\nWhat do you do?",
    options: [
      { letter: "A", text: "Ask immediately: \u201cSorry, what does that stand for?\u201d", allocations: split("firefighter", "detective") },
      { letter: "B", text: "Write it down so you can look it up later.", allocations: pure("navigator") },
      { letter: "C", text: "Quietly message the colleague beside you.", allocations: split("connector", "chameleon") },
      { letter: "D", text: "Try to work out what it means from the conversation.", allocations: split("detective", "maverick") },
    ],
  },
  {
    id: 5,
    emoji: "🔥",
    title: "The Deadline",
    prompt:
      "It's 3pm.\n\nDirector Carolyn suddenly tasks your team with finishing an urgent piece of work by the end of the day.\n\nWhat's your instinct?",
    options: [
      { letter: "A", text: "Work out what absolutely needs to be done and start immediately.", allocations: pure("firefighter") },
      { letter: "B", text: "Break the work into tasks, owners and timings.", allocations: pure("navigator") },
      { letter: "C", text: "Get everyone together: \u201cOkay, who can help with what?\u201d", allocations: split("connector", "chameleon") },
      { letter: "D", text: "Look for a shortcut or completely different way of solving the problem.", allocations: split("maverick", "detective") },
    ],
  },
  {
    id: 6,
    emoji: "📊",
    title: "The Mysterious File",
    prompt:
      "Your team needs all hands on deck to beat the deadline and sends you an Excel file called:\n\nFINAL_v6_Project A_updated_Director_v2.xlsx\n\nWhat's your first thought?",
    options: [
      { letter: "A", text: "\u201cI need to understand how we got here.\u201d", allocations: pure("detective") },
      { letter: "B", text: "Rename it properly immediately.", allocations: split("navigator", "maverick") },
      { letter: "C", text: "Ask the sender which version is actually final.", allocations: split("connector", "firefighter") },
      { letter: "D", text: "Open it. If it works, it works.", allocations: split("firefighter", "chameleon") },
    ],
  },
  {
    id: 7,
    emoji: "😬",
    title: "The Mistake",
    prompt:
      "You realise you've made a mistake on something you've already sent to Director Carolyn at 5:29pm.\n\nWhat do you do first?",
    options: [
      { letter: "A", text: "Tell Director Carolyn and fix it immediately.", allocations: pure("firefighter") },
      { letter: "B", text: "Work out exactly what went wrong before doing anything.", allocations: split("detective", "navigator") },
      { letter: "C", text: "Ask a trusted colleague how they'd handle it.", allocations: split("connector", "chameleon") },
      { letter: "D", text: "Fix it \u2014 and while you're there, improve the process that caused it.", allocations: pure("maverick") },
    ],
  },
  {
    id: 8,
    emoji: "💡",
    title: "The Open Brief",
    prompt:
      "Your RO gives you a new task and says:\n\n\u201cThere isn't really a template for this. Just use your judgement and come up with a good way to do it.\u201d\n\nWhat's your first instinct?",
    options: [
      { letter: "A", text: "\u201cYES. Finally \u2014 I can do this my way.\u201d", allocations: pure("maverick") },
      { letter: "B", text: "\u201cBefore I start, what exactly are we trying to achieve?\u201d", allocations: split("detective", "navigator") },
      { letter: "C", text: "\u201cHave you done something like this before? What worked for you?\u201d", allocations: pure("connector") },
      { letter: "D", text: "Start putting something together and refine it as you figure things out.", allocations: split("firefighter", "chameleon") },
    ],
  },
  {
    id: 9,
    emoji: "👋",
    title: "The New Colleague",
    prompt:
      "Fast-forward one year.\n\nYou're no longer the newcomer.\n\nA nervous-looking new employee arrives and sits near you.\n\nWhat are you most likely to do?",
    options: [
      { letter: "A", text: "Introduce yourself and invite them for coffee or lunch.", allocations: pure("connector") },
      { letter: "B", text: "Give them the practical things you wish someone had told you.", allocations: split("firefighter", "navigator") },
      { letter: "C", text: "Ask about their background and what they'll be working on.", allocations: split("detective", "chameleon") },
      { letter: "D", text: "Take them on your unofficial tour and show them things that aren't in the onboarding guide.", allocations: split("maverick", "connector") },
    ],
  },
  {
    id: 10,
    emoji: "☕",
    title: "The Ultimate Workplace Question",
    prompt:
      "You've just sat down and started doing some serious work.\n\nA colleague suddenly announces:\n\n\u201cThere's food in the pantry.\u201d\n\nWhat do you do?",
    options: [
      { letter: "A", text: "Finish what you're doing first. The food isn't going anywhere.", allocations: pure("navigator") },
      { letter: "B", text: "\u201cWhat food?\u201d I require more information.", allocations: pure("detective") },
      { letter: "C", text: "Tell everyone around you. Nobody gets left behind.", allocations: split("connector", "chameleon") },
      { letter: "D", text: "You're already halfway to the pantry.", allocations: split("firefighter", "maverick") },
    ],
  },
];
