export type PersonalityKey =
  | "navigator"
  | "firefighter"
  | "connector"
  | "detective"
  | "maverick"
  | "chameleon";

export interface Personality {
  key: PersonalityKey;
  icon: string;
  name: string;
  coreTrait: string;
  secretThought: string;
  tagline: string;
  traits: string[];
  description: string;
  ability: { icon: string; name: string };
  watchOut: string;
  accent: string;
}

export const PERSONALITY_ORDER: PersonalityKey[] = [
  "navigator",
  "firefighter",
  "connector",
  "detective",
  "maverick",
  "chameleon",
];

export const PERSONALITIES: Record<PersonalityKey, Personality> = {
  navigator: {
    key: "navigator",
    icon: "🧭",
    name: "The Navigator",
    coreTrait: "Organised, prepared, dependable",
    secretThought: "There should be a plan for this.",
    tagline: "There's a plan for that.",
    traits: ["Reliable", "Prepared", "Structured", "Calm"],
    description:
      "You bring order to chaos. While everyone else is discussing what to do, you've probably already created the spreadsheet.",
    ability: { icon: "📋", name: "The Master Plan" },
    watchOut: "Not everything needs a spreadsheet.",
    accent: "#3E7C7C",
  },
  firefighter: {
    key: "firefighter",
    icon: "🔥",
    name: "The Firefighter",
    coreTrait: "Decisive, practical, calm under pressure",
    secretThought: "Okay, what needs to happen right now?",
    tagline: "Okay. What needs to happen?",
    traits: ["Decisive", "Practical", "Resilient", "Action-oriented"],
    description:
      "When something goes wrong, people look in your direction. You don't need perfect information \u2014 you need enough information to get moving.",
    ability: { icon: "🧯", name: "Crisis Mode" },
    watchOut: "Occasionally discovering the fire because you've already started putting it out.",
    accent: "#D64550",
  },
  connector: {
    key: "connector",
    icon: "🤝",
    name: "The Connector",
    coreTrait: "Social, collaborative, relationship-driven",
    secretThought: "I know someone who can help.",
    tagline: "I know someone.",
    traits: ["Collaborative", "Sociable", "Empathetic", "Helpful"],
    description:
      "Your superpower is people. Give it a few months and you'll somehow know someone in every corner of the organisation.",
    ability: { icon: "🕸️", name: "The Network" },
    watchOut: "A \u201cquick coffee\u201d becoming an hour.",
    accent: "#E7A33E",
  },
  detective: {
    key: "detective",
    icon: "🔍",
    name: "The Detective",
    coreTrait: "Curious, analytical, detail-oriented",
    secretThought: "Hang on\u2026 why?",
    tagline: "But why?",
    traits: ["Analytical", "Curious", "Thorough", "Thoughtful"],
    description:
      "You want to understand how things actually work. You're the person who notices the one detail everyone else missed.",
    ability: { icon: "🕵️", name: "One More Question" },
    watchOut: "The rabbit hole has a rabbit hole.",
    accent: "#5B6EE8",
  },
  maverick: {
    key: "maverick",
    icon: "🚀",
    name: "The Maverick",
    coreTrait: "Creative, adventurous, experimental",
    secretThought: "What if we tried something completely different?",
    tagline: "Hear me out\u2026",
    traits: ["Creative", "Independent", "Experimental", "Bold"],
    description:
      "Where others see \u201cthe way we've always done it,\u201d you see an invitation.",
    ability: { icon: "💡", name: "What If We\u2026?" },
    watchOut: "Your sentence beginning with \u201cThis might sound crazy\u2026\u201d",
    accent: "#C25EDB",
  },
  chameleon: {
    key: "chameleon",
    icon: "🦎",
    name: "The Chameleon",
    coreTrait: "Adaptable, observant, diplomatic",
    secretThought: "Let me see what's happening first.",
    tagline: "Let's see what we're dealing with.",
    traits: ["Adaptable", "Observant", "Diplomatic", "Flexible"],
    description:
      "You read situations well and adjust quickly. You don't necessarily need to be the loudest person in the room to understand what's going on.",
    ability: { icon: "🎭", name: "Read the Room" },
    watchOut: "Sometimes your own preference deserves to be heard too.",
    accent: "#3E8E5A",
  },
};
