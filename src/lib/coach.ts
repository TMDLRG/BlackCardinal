/**
 * ORC and 5Ps Coaching Prompts
 * Context-aware prompts to guide founders through their sales process
 */

export type LeadStage = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'WON' | 'LOST';

export interface CoachingPrompt {
  title: string;
  prompt: string;
  framework: 'ORC' | '5Ps';
  stage: LeadStage | 'DEAL_CLOSE';
}

/**
 * ORC (Outcome, Role, Context) Prompts
 */
export const orcPrompts: Record<string, CoachingPrompt> = {
  NEW_LEAD: {
    title: 'Define Your Outcome',
    prompt:
      "What's your Outcome for this conversation? Be specific: Are you aiming to schedule a follow-up, understand their needs, or close a sale? Define it before you reach out.",
    framework: 'ORC',
    stage: 'NEW',
  },
  CONTACTED: {
    title: 'Clarify Your Role',
    prompt:
      "What Role are you playing in this conversation? Are you the expert guiding them, a peer who understands their challenges, or a mentor helping them see possibilities? Your role shapes your language.",
    framework: 'ORC',
    stage: 'CONTACTED',
  },
  QUALIFIED: {
    title: 'Understand the Context',
    prompt:
      "What's the Context (WORLD) for this lead?\n\nWHERE are they in their journey?\nOBSTACLES they might face?\nREALITY of their situation (budget, timeline, decision-makers)?\nLEVERAGE points you can use (pain points, aspirations)?\nDYNAMICS at play (urgency, competition)?",
    framework: 'ORC',
    stage: 'QUALIFIED',
  },
};

/**
 * 5Ps (Proper Preparation Prevents Poor Performance) Prompts
 */
export const fivePsPrompts: Record<string, CoachingPrompt> = {
  DEAL_PREP: {
    title: 'Proper Preparation Checklist',
    prompt:
      "Before closing this deal, review the 5Ps:\n\n✓ PROPER: Do you have the right product/service for their need?\n✓ PREPARATION: Have you done your research? Sample kit ready? Scripts rehearsed?\n✓ PREVENTS: Have you identified and addressed potential objections?\n✓ POOR: What could go wrong? How will you handle it?\n✓ PERFORMANCE: Are you ready to deliver peak performance in this conversation?",
    framework: '5Ps',
    stage: 'DEAL_CLOSE',
  },
};

/**
 * Get coaching prompt based on lead stage
 */
export function getCoachingPrompt(stage: LeadStage | 'DEAL_CLOSE'): CoachingPrompt | null {
  // Map stages to prompts
  const promptMap: Record<string, string> = {
    NEW: 'NEW_LEAD',
    CONTACTED: 'CONTACTED',
    QUALIFIED: 'QUALIFIED',
    DEAL_CLOSE: 'DEAL_PREP',
  };

  const promptKey = promptMap[stage];
  if (!promptKey) return null;

  return orcPrompts[promptKey] || fivePsPrompts[promptKey] || null;
}

/**
 * Get all prompts for a complete ORC/5Ps library
 */
export function getAllPrompts(): CoachingPrompt[] {
  return [...Object.values(orcPrompts), ...Object.values(fivePsPrompts)];
}

/**
 * Motivational quotes for dashboard
 */
export const motivationalPrompts = [
  "You know how to sell. You know how to read people. That's 80%. The other 20% is structure—this platform gives you that.",
  "Proper Preparation Prevents Poor Performance. Review your 5Ps before every conversation.",
  "ORC isn't just a framework—it's a way of thinking. Apply it to every interaction.",
  "Your first sale is proof of concept. Your tenth is momentum. Your fiftieth is a business.",
  "The roster isn't just recognition—it's accountability to your fellow founders and yourself.",
];

/**
 * Get random motivational prompt
 */
export function getMotivationalPrompt(): string {
  return motivationalPrompts[Math.floor(Math.random() * motivationalPrompts.length)];
}

