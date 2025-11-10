import { describe, it, expect } from 'vitest';
import { getCoachingPrompt, getAllPrompts, getMotivationalPrompt } from '@/lib/coach';

describe('Coaching Prompts', () => {
  describe('getCoachingPrompt', () => {
    it('should return ORC prompt for NEW lead', () => {
      const prompt = getCoachingPrompt('NEW');

      expect(prompt).toBeDefined();
      expect(prompt?.framework).toBe('ORC');
      expect(prompt?.stage).toBe('NEW');
      expect(prompt?.prompt).toContain('Outcome');
    });

    it('should return ORC prompt for CONTACTED lead', () => {
      const prompt = getCoachingPrompt('CONTACTED');

      expect(prompt).toBeDefined();
      expect(prompt?.framework).toBe('ORC');
      expect(prompt?.stage).toBe('CONTACTED');
      expect(prompt?.prompt).toContain('Role');
    });

    it('should return ORC prompt for QUALIFIED lead', () => {
      const prompt = getCoachingPrompt('QUALIFIED');

      expect(prompt).toBeDefined();
      expect(prompt?.framework).toBe('ORC');
      expect(prompt?.stage).toBe('QUALIFIED');
      expect(prompt?.prompt).toContain('Context');
    });

    it('should return 5Ps prompt for DEAL_CLOSE', () => {
      const prompt = getCoachingPrompt('DEAL_CLOSE');

      expect(prompt).toBeDefined();
      expect(prompt?.framework).toBe('5Ps');
      expect(prompt?.prompt).toContain('5Ps');
    });

    it('should return null for stages without prompts', () => {
      const prompt = getCoachingPrompt('WON');

      expect(prompt).toBeNull();
    });
  });

  describe('getAllPrompts', () => {
    it('should return all available prompts', () => {
      const prompts = getAllPrompts();

      expect(prompts.length).toBeGreaterThan(0);
      expect(prompts.every((p) => p.title && p.prompt && p.framework)).toBe(true);
    });

    it('should include both ORC and 5Ps prompts', () => {
      const prompts = getAllPrompts();

      const orcPrompts = prompts.filter((p) => p.framework === 'ORC');
      const fivePsPrompts = prompts.filter((p) => p.framework === '5Ps');

      expect(orcPrompts.length).toBeGreaterThan(0);
      expect(fivePsPrompts.length).toBeGreaterThan(0);
    });
  });

  describe('getMotivationalPrompt', () => {
    it('should return a motivational prompt', () => {
      const prompt = getMotivationalPrompt();

      expect(prompt).toBeDefined();
      expect(typeof prompt).toBe('string');
      expect(prompt.length).toBeGreaterThan(0);
    });

    it('should return different prompts on multiple calls', () => {
      const prompts = new Set();
      
      // Call 20 times - should get at least 2 different prompts
      for (let i = 0; i < 20; i++) {
        prompts.add(getMotivationalPrompt());
      }

      expect(prompts.size).toBeGreaterThan(1);
    });
  });
});

