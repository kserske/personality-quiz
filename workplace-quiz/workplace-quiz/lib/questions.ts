import { PersonalityKey } from "./personalities";

export interface Option {
  letter: string;
  text: string;
  type: PersonalityKey;
}

export interface Question {
  id: number;
  emoji: string;
  title: string;
  prompt: string;
  options: Option[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    emoji: "☀️",
    title: "The First Morning",
    prompt:
      "It's your first day. You arrive 30 minutes early, but your buddy isn't here yet and you're still waiting to collect your staff pass and IT equipment.\n\nWhat do you do while you wait?",
    options: [
      { letter: "A", text: "Check the schedule and mentally plan how you want your first day to go.", type: "navigator" },
      { letter: "B", text: "Look around and think, \u201cOkay, what can I get sorted while I'm waiting?\u201d", type: "firefighter" },
      { letter: "C", text: "Start chatting with whoever's nearby. \u201cHey, I'm new here \u2014 are you from HRSC?\u201d", type: "connector" },
      { letter: "D", text: "Look through the onboarding information and start figuring out how things work.", type: "detective" },
      { letter: "E", text: "Have a look around the office and see what catches your attention.", type: "maverick" },
      { letter: "F", text: "Take a moment to observe what's happening around you and follow the flow.", type: "chameleon" },
    ],
  },
  {
    id: 2,
    emoji: "💬",
    title: "The Message",
    prompt:
      "At 10:17am, your RO sends you:\n\n\u201cHi. Can we have a quick chat?\u201d\n\nYour immediate reaction is\u2026",
    options: [
      { letter: "A", text: "Sure! Let's find out what's happening.", type: "firefighter" },
      { letter: "B", text: "\u201cOf course. Anything you'd like me to prepare?\u201d", type: "navigator" },
      { letter: "C", text: "Wonder what it's about and mentally review your last 48 hours.", type: "detective" },
      { letter: "D", text: "Ask your colleague: \u201cEh\u2026 do you know what this is about?\u201d", type: "connector" },
      { letter: "E", text: "Reply yes and read the supervisor's tone when you meet.", type: "chameleon" },
      { letter: "F", text: "\u201cSure, I'm free now.\u201d Walk straight over.", type: "maverick" },
    ],
  },
  {
    id: 3,
    emoji: "🍜",
    title: "Lunch",
    prompt: "It's your first day.\n\nIt is time to go for lunch.\n\nWhat happens?",
    options: [
      { letter: "A", text: "Ask the group: \u201cAnyone going for lunch?\u201d", type: "connector" },
      { letter: "B", text: "You've already researched three nearby places.", type: "navigator" },
      { letter: "C", text: "Wait and see what everyone else normally does.", type: "chameleon" },
      { letter: "D", text: "Wander outside and see what looks good.", type: "maverick" },
      { letter: "E", text: "Ask: \u201cWhere does everyone normally eat around here?\u201d", type: "detective" },
      { letter: "F", text: "Food is food. Pick somewhere and let's go.", type: "firefighter" },
    ],
  },
  {
    id: 4,
    emoji: "🫠",
    title: "Meeting Confusion",
    prompt:
      "You're attending an onboarding session at 2pm.\n\nSomeone uses an acronym you've never heard before.\n\nEveryone else appears to understand.\n\nWhat do you do?",
    options: [
      { letter: "A", text: "Ask immediately: \u201cSorry, what does that stand for?\u201d", type: "firefighter" },
      { letter: "B", text: "Write it down and look it up afterwards.", type: "navigator" },
      { letter: "C", text: "Try to work out its meaning from the rest of the conversation.", type: "detective" },
      { letter: "D", text: "Quietly message the colleague beside you.", type: "connector" },
      { letter: "E", text: "Keep listening. You'll probably figure it out eventually.", type: "chameleon" },
      { letter: "F", text: "Decide that if nobody can explain it simply, maybe we need a better acronym.", type: "maverick" },
    ],
  },
  {
    id: 5,
    emoji: "🔥",
    title: "The Deadline",
    prompt:
      "It's 3pm.\n\nDirector Carolyn calls your team suddenly and has tasked your team to finish an urgent piece of work by the end of the day.\n\nWhat's your instinct?",
    options: [
      { letter: "A", text: "Work out what absolutely needs to be done and start immediately.", type: "firefighter" },
      { letter: "B", text: "Break the work into tasks, owners and timings.", type: "navigator" },
      { letter: "C", text: "Get everyone together: \u201cOkay, who can help with what?\u201d", type: "connector" },
      { letter: "D", text: "First establish what happened and what the actual requirements are.", type: "detective" },
      { letter: "E", text: "Adapt to whatever role the team needs you to take.", type: "chameleon" },
      { letter: "F", text: "Look for a shortcut or completely different way of solving the problem.", type: "maverick" },
    ],
  },
  {
    id: 6,
    emoji: "📊",
    title: "The Mysterious File",
    prompt:
      "Your team needs all hands on deck to beat the deadline and sends you an Excel file called:\n\nFINAL_v6_Project A_updated_Director_v2.xlsx\n\nWhat's your first thought?",
    options: [
      { letter: "A", text: "\u201cI need to understand how we got here.\u201d", type: "detective" },
      { letter: "B", text: "Rename it properly immediately.", type: "navigator" },
      { letter: "C", text: "Ask the sender which version is actually final.", type: "connector" },
      { letter: "D", text: "Open it. If it works, it works.", type: "firefighter" },
      { letter: "E", text: "This appears to be normal here. Accept your new reality.", type: "chameleon" },
      { letter: "F", text: "\u201cWe need a better system.\u201d", type: "maverick" },
    ],
  },
  {
    id: 7,
    emoji: "😬",
    title: "The Mistake",
    prompt:
      "You realise you've made a mistake on something you've already sent to Director Carolyn at 5.29pm.\n\nWhat do you do first?",
    options: [
      { letter: "A", text: "Tell Director Carolyn and fix it immediately.", type: "firefighter" },
      { letter: "B", text: "Work out exactly what went wrong before doing anything.", type: "detective" },
      { letter: "C", text: "Correct it, document what happened and make sure it can't happen again.", type: "navigator" },
      { letter: "D", text: "Ask a trusted colleague how they'd handle it.", type: "connector" },
      { letter: "E", text: "Assess how serious it actually is before reacting.", type: "chameleon" },
      { letter: "F", text: "Fix it \u2014 and while you're there, improve the whole process that caused it.", type: "maverick" },
    ],
  },
  {
    id: 8,
    emoji: "💡",
    title: "The Open Brief",
    prompt:
      "Your RO gives you a new task and says:\n\n\u201cThere isn't really a template for this. Just use your judgement and come up with a good way to do it.\u201d\n\nWhat's your first instinct?",
    options: [
      { letter: "A", text: "\u201cYES. Finally \u2014 I can do this my way.\u201d", type: "maverick" },
      { letter: "B", text: "\u201cBefore I start, what exactly are we trying to achieve?\u201d", type: "detective" },
      { letter: "C", text: "Ask a colleague: \u201cHave you done something like this before? What worked for you?\u201d", type: "connector" },
      { letter: "D", text: "Turn the task into a clear plan with steps, milestones and a timeline.", type: "navigator" },
      { letter: "E", text: "Start putting something together and refine it as you figure things out.", type: "firefighter" },
      { letter: "F", text: "Think about who will be using or receiving the final product, then adapt your approach accordingly.", type: "chameleon" },
    ],
  },
  {
    id: 9,
    emoji: "👋",
    title: "The New Colleague",
    prompt:
      "Fast-forward one year.\n\nYou're no longer the newcomer.\n\nA nervous-looking new employee arrives and sits near you.\n\nWhat are you most likely to do?",
    options: [
      { letter: "A", text: "Introduce yourself and invite them for coffee or lunch.", type: "connector" },
      { letter: "B", text: "Give them the practical things you wish someone had told you.", type: "firefighter" },
      { letter: "C", text: "Send them useful links, guides and information.", type: "navigator" },
      { letter: "D", text: "Ask about their background and what they'll be working on.", type: "detective" },
      { letter: "E", text: "Give them some space first and check in when they seem settled.", type: "chameleon" },
      { letter: "F", text: "Take them on your unofficial tour and show them all the things not in the onboarding guide.", type: "maverick" },
    ],
  },
  {
    id: 10,
    emoji: "☕",
    title: "The Ultimate Workplace Question",
    prompt:
      "You've just sat down and started doing some serious work.\n\nA colleague suddenly announces:\n\n\u201cThere's food in the pantry.\u201d\n\nWhat do you do?",
    options: [
      { letter: "A", text: "Finish what you're doing first. The food isn't going anywhere.", type: "navigator" },
      { letter: "B", text: "\u201cWhat food?\u201d I require more information.", type: "detective" },
      { letter: "C", text: "Tell everyone around you. Nobody gets left behind.", type: "connector" },
      { letter: "D", text: "You're already halfway to the pantry.", type: "firefighter" },
      { letter: "E", text: "Observe whether other people are getting up. If they move, you move.", type: "chameleon" },
      { letter: "F", text: "Go investigate. Worst-case scenario, you've had a walk.", type: "maverick" },
    ],
  },
];
