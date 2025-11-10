'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function PeopleLab() {
  return (
    <section className="space-y-8">
      <ModuleContainer
        title="Role Designer"
        description="Define a role by outcomes, guardrails, and collaboration. Generate a concise scorecard you can share with candidates or internal team members."
      >
        <RoleDesigner />
      </ModuleContainer>

      <ModuleContainer
        title="Job Description Builder"
        description="Expand the scorecard into a full job description with responsibilities, metrics, and culture signals."
      >
        <JobDescriptionBuilder />
      </ModuleContainer>

      <ModuleContainer
        title="Customer Persona Builder"
        description="Capture the emotional, functional, and social jobs-to-be-done for your core customer. Generate narrative insights you can plug into marketing."
      >
        <PersonaBuilder />
      </ModuleContainer>
    </section>
  );
}

function ModuleContainer({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur">
      <header className="mb-4 space-y-2">
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        <p className="text-sm text-mute">{description}</p>
      </header>
      {children}
    </article>
  );
}

function RoleDesigner() {
  const [roleName, setRoleName] = useState('');
  const [outcomes, setOutcomes] = useState('');
  const [dependencies, setDependencies] = useState('');
  const [metrics, setMetrics] = useState('');

  const scorecard = useMemo(() => {
    if (!roleName) return null;
    return [
      `Role: ${roleName}`,
      `Primary Outcomes:\n- ${outcomes.split('\n').filter(Boolean).join('\n- ') || 'Define 3 measurable outcomes.'}`,
      `Critical Dependencies:\n- ${dependencies.split('\n').filter(Boolean).join('\n- ') || 'Note key collaborators, tools, or inputs.'}`,
      `Success Metrics:\n- ${metrics.split('\n').filter(Boolean).join('\n- ') || 'Specify 3-5 metrics or checkpoints.'}`,
    ].join('\n\n');
  }, [roleName, outcomes, dependencies, metrics]);

  const handleCopy = async () => {
    if (!scorecard) return;
    try {
      await navigator.clipboard.writeText(scorecard);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-4">
      <Input value={roleName} onChange={(event) => setRoleName(event.target.value)} placeholder="Role name (e.g. Launch Operator)" />
      <Textarea
        rows={3}
        value={outcomes}
        onChange={(event) => setOutcomes(event.target.value)}
        placeholder="List the primary outcomes this role owns."
      />
      <Textarea
        rows={3}
        value={dependencies}
        onChange={(event) => setDependencies(event.target.value)}
        placeholder="List collaborators, tools, or decisions this role depends on."
      />
      <Textarea
        rows={3}
        value={metrics}
        onChange={(event) => setMetrics(event.target.value)}
        placeholder="List metrics or signals that prove success."
      />
      <Button onClick={handleCopy} disabled={!scorecard}>
        Copy Role Scorecard
      </Button>
      {scorecard && (
        <pre className="rounded-lg border border-border bg-background/70 p-4 text-xs text-ink whitespace-pre-wrap">
          {scorecard}
        </pre>
      )}
    </div>
  );
}

function JobDescriptionBuilder() {
  const [role, setRole] = useState('');
  const [mission, setMission] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [experience, setExperience] = useState('');
  const [culture, setCulture] = useState('');

  const jobDescription = useMemo(() => {
    if (!role) return null;
    return [
      `We are hiring a ${role} to ${mission || '[Articulate the mission for this role].'}`,
      '',
      'Key Responsibilities:',
      responsibilities
        ? responsibilities
            .split('\n')
            .filter(Boolean)
            .map((line) => `- ${line}`)
            .join('\n')
        : '- Describe 5-7 core responsibilities.',
      '',
      'Successful candidates will bring:',
      experience
        ? experience
            .split('\n')
            .filter(Boolean)
            .map((line) => `- ${line}`)
            .join('\n')
        : '- Outline experience, skills, or past wins.',
      '',
      'How we work:',
      culture
        ? culture
            .split('\n')
            .filter(Boolean)
            .map((line) => `- ${line}`)
            .join('\n')
        : '- Share rituals, communication styles, and your leadership commitments.',
    ].join('\n');
  }, [role, mission, responsibilities, experience, culture]);

  const handleCopy = async () => {
    if (!jobDescription) return;
    try {
      await navigator.clipboard.writeText(jobDescription);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-4">
      <Input value={role} onChange={(event) => setRole(event.target.value)} placeholder="Role title" />
      <Textarea
        rows={3}
        value={mission}
        onChange={(event) => setMission(event.target.value)}
        placeholder="Mission statement for this role."
      />
      <Textarea
        rows={4}
        value={responsibilities}
        onChange={(event) => setResponsibilities(event.target.value)}
        placeholder="List responsibilities (one per line)."
      />
      <Textarea
        rows={4}
        value={experience}
        onChange={(event) => setExperience(event.target.value)}
        placeholder="List relevant experience / skills (one per line)."
      />
      <Textarea
        rows={3}
        value={culture}
        onChange={(event) => setCulture(event.target.value)}
        placeholder="Share culture notes, rituals, and support structures."
      />
      <Button onClick={handleCopy} disabled={!jobDescription}>
        Copy Job Description
      </Button>
      {jobDescription && (
        <pre className="rounded-lg border border-border bg-background/70 p-4 text-xs text-ink whitespace-pre-wrap">
          {jobDescription}
        </pre>
      )}
    </div>
  );
}

function PersonaBuilder() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [functionalJobs, setFunctionalJobs] = useState('');
  const [emotionalJobs, setEmotionalJobs] = useState('');
  const [objections, setObjections] = useState('');
  const [proof, setProof] = useState('');

  const persona = useMemo(() => {
    if (!name) return null;
    return [
      `Persona: ${name}`,
      '',
      bio || '[Describe their context: role, environment, goals]',
      '',
      'Functional jobs they hire us to accomplish:',
      functionalJobs
        ? functionalJobs
            .split('\n')
            .filter(Boolean)
            .map((line) => `- ${line}`)
            .join('\n')
        : '- Document 3-4 functional jobs.',
      '',
      'Emotional / social jobs they care about:',
      emotionalJobs
        ? emotionalJobs
            .split('\n')
            .filter(Boolean)
            .map((line) => `- ${line}`)
            .join('\n')
        : '- Capture how they want to feel and be perceived.',
      '',
      'Primary objections:',
      objections
        ? objections
            .split('\n')
            .filter(Boolean)
            .map((line) => `- ${line}`)
            .join('\n')
        : '- List the reasons they hesitate or say no.',
      '',
      'Proof or guarantees they need:',
      proof
        ? proof
            .split('\n')
            .filter(Boolean)
            .map((line) => `- ${line}`)
            .join('\n')
        : '- Examples: case studies, demo, trial, community.',
    ].join('\n');
  }, [name, bio, functionalJobs, emotionalJobs, objections, proof]);

  const handleCopy = async () => {
    if (!persona) return;
    try {
      await navigator.clipboard.writeText(persona);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-4">
      <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Persona label (e.g. Growth-Minded Retailer)" />
      <Textarea
        rows={3}
        value={bio}
        onChange={(event) => setBio(event.target.value)}
        placeholder="Brief bio or snapshot of their world."
      />
      <Textarea
        rows={3}
        value={functionalJobs}
        onChange={(event) => setFunctionalJobs(event.target.value)}
        placeholder="Functional jobs (one per line)."
      />
      <Textarea
        rows={3}
        value={emotionalJobs}
        onChange={(event) => setEmotionalJobs(event.target.value)}
        placeholder="Emotional/social jobs (one per line)."
      />
      <Textarea
        rows={3}
        value={objections}
        onChange={(event) => setObjections(event.target.value)}
        placeholder="Primary objections (one per line)."
      />
      <Textarea
        rows={3}
        value={proof}
        onChange={(event) => setProof(event.target.value)}
        placeholder="Proof or assurances required (one per line)."
      />
      <Button onClick={handleCopy} disabled={!persona}>
        Copy Persona Profile
      </Button>
      {persona && (
        <pre className="rounded-lg border border-border bg-background/70 p-4 text-xs text-ink whitespace-pre-wrap">
          {persona}
        </pre>
      )}
    </div>
  );
}

