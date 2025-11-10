/**
 * ICS (iCalendar) file generator
 * Generates .ics files for calendar appointments
 */

interface ICSEvent {
  title: string;
  description?: string;
  location?: string;
  startTime: Date;
  endTime: Date;
  organizer?: {
    name: string;
    email: string;
  };
}

export function generateICS(event: ICSEvent): string {
  const { title, description, location, startTime, endTime, organizer } = event;

  // Format dates to ICS format (YYYYMMDDTHHMMSSZ)
  const formatDate = (date: Date): string => {
    return date
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '');
  };

  // Generate unique identifier
  const uid = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}@blackcardinal.com`;

  // Build ICS content
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//BlackCardinal//Founding 50 Platform//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(startTime)}`,
    `DTEND:${formatDate(endTime)}`,
    `SUMMARY:${escapeICS(title)}`,
  ];

  if (description) {
    lines.push(`DESCRIPTION:${escapeICS(description)}`);
  }

  if (location) {
    lines.push(`LOCATION:${escapeICS(location)}`);
  }

  if (organizer) {
    lines.push(`ORGANIZER;CN=${escapeICS(organizer.name)}:MAILTO:${organizer.email}`);
  }

  lines.push('STATUS:CONFIRMED');
  lines.push('SEQUENCE:0');
  lines.push('END:VEVENT');
  lines.push('END:VCALENDAR');

  return lines.join('\r\n');
}

/**
 * Escape special characters for ICS format
 */
function escapeICS(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Generate calendar link URLs for popular services
 */
export function getCalendarLinks(event: ICSEvent) {
  const { title, description, location, startTime, endTime } = event;

  // Google Calendar
  const googleStart = startTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const googleEnd = endTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const googleUrl = new URL('https://calendar.google.com/calendar/render');
  googleUrl.searchParams.set('action', 'TEMPLATE');
  googleUrl.searchParams.set('text', title);
  googleUrl.searchParams.set('dates', `${googleStart}/${googleEnd}`);
  if (description) googleUrl.searchParams.set('details', description);
  if (location) googleUrl.searchParams.set('location', location);

  // Outlook.com
  const outlookUrl = new URL('https://outlook.live.com/calendar/0/deeplink/compose');
  outlookUrl.searchParams.set('subject', title);
  outlookUrl.searchParams.set('startdt', startTime.toISOString());
  outlookUrl.searchParams.set('enddt', endTime.toISOString());
  if (description) outlookUrl.searchParams.set('body', description);
  if (location) outlookUrl.searchParams.set('location', location);

  return {
    google: googleUrl.toString(),
    outlook: outlookUrl.toString(),
  };
}

