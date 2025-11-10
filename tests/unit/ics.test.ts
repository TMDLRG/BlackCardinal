import { describe, it, expect } from 'vitest';
import { generateICS, getCalendarLinks } from '@/lib/ics';

describe('ICS Generator', () => {
  const testEvent = {
    title: 'Founding 50 Orientation Call',
    description: 'Welcome call to get started with the program',
    location: 'Virtual - Zoom',
    startTime: new Date('2025-12-15T14:00:00Z'),
    endTime: new Date('2025-12-15T15:00:00Z'),
    organizer: {
      name: 'BlackCardinal Team',
      email: 'team@blackcardinal.com',
    },
  };

  it('should generate valid ICS file content', () => {
    const ics = generateICS(testEvent);

    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('END:VCALENDAR');
    expect(ics).toContain('BEGIN:VEVENT');
    expect(ics).toContain('END:VEVENT');
    expect(ics).toContain('VERSION:2.0');
  });

  it('should include event title', () => {
    const ics = generateICS(testEvent);

    expect(ics).toContain('SUMMARY:Founding 50 Orientation Call');
  });

  it('should include event description', () => {
    const ics = generateICS(testEvent);

    expect(ics).toContain('DESCRIPTION:Welcome call to get started with the program');
  });

  it('should include event location', () => {
    const ics = generateICS(testEvent);

    expect(ics).toContain('LOCATION:Virtual - Zoom');
  });

  it('should include organizer information', () => {
    const ics = generateICS(testEvent);

    expect(ics).toContain('ORGANIZER');
    expect(ics).toContain('BlackCardinal Team');
    expect(ics).toContain('team@blackcardinal.com');
  });

  it('should format dates correctly', () => {
    const ics = generateICS(testEvent);

    // Check for ISO-style dates without dashes and colons
    expect(ics).toContain('DTSTART:20251215T140000Z');
    expect(ics).toContain('DTEND:20251215T150000Z');
  });

  it('should escape special characters', () => {
    const eventWithSpecialChars = {
      ...testEvent,
      title: 'Test: Event; With, Special\\Characters',
      description: 'Line 1\nLine 2',
    };

    const ics = generateICS(eventWithSpecialChars);

    // Special characters should be escaped
    expect(ics).toContain('\\;'); // Semicolon escaped
    expect(ics).toContain('\\,'); // Comma escaped
    expect(ics).toContain('\\n'); // Newline escaped
  });

  it('should generate Google Calendar link', () => {
    const links = getCalendarLinks(testEvent);

    expect(links.google).toContain('https://calendar.google.com');
    expect(links.google).toContain('action=TEMPLATE');
    expect(links.google).toContain('Founding+50+Orientation+Call');
  });

  it('should generate Outlook link', () => {
    const links = getCalendarLinks(testEvent);

    expect(links.outlook).toContain('https://outlook.live.com');
    expect(links.outlook).toContain('subject=Founding');
  });
});

