'use client';

import { useEffect, useMemo, useState } from 'react';
import { Lesson, Exercise, Reflection } from '@/lib/bootcamp/content';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type LessonProgress = Record<string, boolean>;
type ExerciseResponses = Record<string, { response: string; completedAt?: string }>;

type WeekModuleProps = {
  weekNumber: number;
  totalWeeks: number;
  lessons: Lesson[];
  exercises: Exercise[];
  reflection: Reflection;
  initialLessonProgress: LessonProgress;
  initialExercises: ExerciseResponses;
  initialReflection?: string;
  initialWeekCompleted?: boolean;
  readOnly?: boolean;
  testMode?: boolean;
};

export function WeekModule({
  weekNumber,
  totalWeeks,
  lessons,
  exercises,
  reflection,
  initialLessonProgress,
  initialExercises,
  initialReflection,
  initialWeekCompleted = false,
  readOnly = false,
  testMode = false,
}: WeekModuleProps) {
  type StoredWeekState = {
    lessonProgress: LessonProgress;
    exercises: ExerciseResponses;
    reflection: string;
    weekCompleted: boolean;
    updatedAt: string;
  };

  const [lessonProgress, setLessonProgress] = useState<LessonProgress>(initialLessonProgress);
  const [persistedExercises, setPersistedExercises] = useState<ExerciseResponses>(initialExercises);
  const [exerciseResponses, setExerciseResponses] = useState<Record<string, string>>(() => {
    const starter: Record<string, string> = {};
    for (const exercise of exercises) {
      starter[exercise.id] = initialExercises[exercise.id]?.response ?? '';
    }
    return starter;
  });
  const [exerciseStatuses, setExerciseStatuses] = useState<Record<string, 'idle' | 'saving' | 'saved' | 'error'>>(
    () => {
      const starter: Record<string, 'idle' | 'saving' | 'saved' | 'error'> = {};
      for (const exercise of exercises) {
        starter[exercise.id] = initialExercises[exercise.id]?.response ? 'saved' : 'idle';
      }
      return starter;
    },
  );

  const [reflectionValue, setReflectionValue] = useState(initialReflection || '');
  const [reflectionStatus, setReflectionStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>(
    initialReflection ? 'saved' : 'idle',
  );
  const [weekCompletionStatus, setWeekCompletionStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>(
    initialWeekCompleted ? 'saved' : 'idle',
  );
  const storageKey = testMode ? `bootcamp-week-${weekNumber}-test` : null;

  const computeStatuses = (responses: ExerciseResponses) =>
    exercises.reduce<Record<string, 'idle' | 'saving' | 'saved' | 'error'>>((acc, exercise) => {
      acc[exercise.id] = responses[exercise.id]?.response ? 'saved' : 'idle';
      return acc;
    }, {});

  const persistLocalState = (partial: Partial<StoredWeekState>) => {
    if (!storageKey) return;
    try {
      const raw = localStorage.getItem(storageKey);
      let stored: StoredWeekState | null = null;
      if (raw) {
        try {
          stored = JSON.parse(raw) as StoredWeekState;
        } catch {
          stored = null;
        }
      }

      const base: StoredWeekState = {
        lessonProgress,
        exercises: persistedExercises,
        reflection: reflectionValue,
        weekCompleted: weekCompletionStatus === 'saved',
        updatedAt: new Date().toISOString(),
      };

      const next: StoredWeekState = {
        lessonProgress: partial.lessonProgress ?? stored?.lessonProgress ?? base.lessonProgress,
        exercises: partial.exercises ?? stored?.exercises ?? base.exercises,
        reflection: partial.reflection ?? stored?.reflection ?? base.reflection,
        weekCompleted:
          typeof partial.weekCompleted === 'boolean'
            ? partial.weekCompleted
            : stored?.weekCompleted ?? base.weekCompleted,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Silent failure in test mode keeps UI responsive
    }
  };

  useEffect(() => {
    if (testMode) return;
    setLessonProgress(initialLessonProgress);
  }, [initialLessonProgress, testMode]);

  useEffect(() => {
    if (testMode) return;
    setPersistedExercises(initialExercises);
    setExerciseResponses(() => {
      const starter: Record<string, string> = {};
      for (const exercise of exercises) {
        starter[exercise.id] = initialExercises[exercise.id]?.response ?? '';
      }
      return starter;
    });
  }, [initialExercises, exercises, testMode]);

  useEffect(() => {
    if (testMode) return;
    setReflectionValue(initialReflection || '');
    setReflectionStatus(initialReflection ? 'saved' : 'idle');
    setWeekCompletionStatus(initialWeekCompleted ? 'saved' : 'idle');
  }, [initialReflection, initialWeekCompleted, testMode]);

  useEffect(() => {
    if (!storageKey) return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const stored = JSON.parse(raw) as StoredWeekState;
      const storedLessonProgress = stored.lessonProgress ?? {};
      const storedExercises = stored.exercises ?? {};
      const storedReflection = stored.reflection ?? '';
      const storedWeekComplete = Boolean(stored.weekCompleted);

      const mergedLessonProgress = {
        ...initialLessonProgress,
        ...storedLessonProgress,
      };

      const mergedExercises = {
        ...initialExercises,
        ...storedExercises,
      };

      setLessonProgress(mergedLessonProgress);
      setPersistedExercises(mergedExercises);
      setExerciseResponses(() => {
        const starter: Record<string, string> = {};
        for (const exercise of exercises) {
          starter[exercise.id] = mergedExercises[exercise.id]?.response ?? '';
        }
        return starter;
      });
      setExerciseStatuses(computeStatuses(mergedExercises));

      const resolvedReflection = storedReflection || initialReflection || '';
      setReflectionValue(resolvedReflection);
      setReflectionStatus(resolvedReflection ? 'saved' : 'idle');

      const isWeekCompleted = storedWeekComplete || initialWeekCompleted;
      setWeekCompletionStatus(isWeekCompleted ? 'saved' : 'idle');

      persistLocalState({
        lessonProgress: mergedLessonProgress,
        exercises: mergedExercises,
        reflection: resolvedReflection,
        weekCompleted: isWeekCompleted,
      });
    } catch {
      // Ignore malformed storage
    }
  }, [
    storageKey,
    exercises,
    initialExercises,
    initialLessonProgress,
    initialReflection,
    initialWeekCompleted,
  ]);

  useEffect(() => {
    if (readOnly || testMode) return;
    // Ensure week record exists
    fetch(`/api/bootcamp/week/${weekNumber}`, {
      method: 'POST',
    }).catch(() => {
      // No-op: handled in UI when saving
    });
  }, [weekNumber, readOnly]);

  const lessonsCompleted = useMemo(
    () => lessons.filter((lesson) => lessonProgress[lesson.id]).length,
    [lessons, lessonProgress],
  );

  const allLessonsComplete = lessons.every((lesson) => lessonProgress[lesson.id]);
  const allExercisesComplete = exercises.every((exercise) => {
    const response = persistedExercises[exercise.id]?.response || exerciseResponses[exercise.id];
    return (response?.trim().length ?? 0) > 0;
  });
  const allExercisesSaved = exercises.every((exercise) => exerciseStatuses[exercise.id] === 'saved');
  const hasReflectionContent = (reflectionValue?.trim().length ?? 0) > 0;
  const canCompleteWeek = allLessonsComplete && allExercisesComplete && allExercisesSaved && (reflectionStatus === 'saved' || hasReflectionContent);

  const toggleLesson = async (lessonId: string) => {
    if (readOnly) return;
    const updated = {
      ...lessonProgress,
      [lessonId]: true,
    };
    const previous = lessonProgress;
    setLessonProgress(updated);

    try {
      await fetch(`/api/bootcamp/week/${weekNumber}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonProgress: updated,
        }),
      });
      if (testMode) {
        persistLocalState({ lessonProgress: updated });
      }
    } catch (error) {
      // Roll back
      setLessonProgress(previous);
      if (testMode) {
        persistLocalState({ lessonProgress: previous });
      }
    }
  };

  const handleExerciseSave = async (exerciseId: string) => {
    if (readOnly) return;
    setExerciseStatuses((prev) => ({ ...prev, [exerciseId]: 'saving' }));

    const updated = {
      ...persistedExercises,
      ...Object.entries(exerciseResponses).reduce<Record<string, { response: string; completedAt?: string }>>(
        (acc, [id, response]) => {
          acc[id] = {
            response,
            completedAt: response ? new Date().toISOString() : undefined,
          };
          return acc;
        },
        {},
      ),
    };

    try {
      await fetch(`/api/bootcamp/week/${weekNumber}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          exercisesComplete: updated,
        }),
      });
      setPersistedExercises(updated);
      setExerciseStatuses((prev) => ({ ...prev, [exerciseId]: 'saved' }));
      if (testMode) {
        persistLocalState({ exercises: updated });
      }
    } catch (error) {
      setExerciseStatuses((prev) => ({ ...prev, [exerciseId]: 'error' }));
      if (testMode) {
        persistLocalState({ exercises: updated });
      }
    }
  };

  const handleReflectionSave = async () => {
    if (readOnly) return;
    setReflectionStatus('saving');

    try {
      await fetch('/api/bootcamp/reflection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weekNumber,
          content: reflectionValue,
        }),
      });
      setReflectionStatus('saved');
      if (testMode) {
        persistLocalState({ reflection: reflectionValue });
      }
    } catch (error) {
      setReflectionStatus('error');
      if (testMode) {
        persistLocalState({ reflection: reflectionValue });
      }
    }
  };

  const handleCompleteWeek = async () => {
    if (readOnly || !canCompleteWeek) return;
    setWeekCompletionStatus('saving');

    try {
      await fetch(`/api/bootcamp/week/${weekNumber}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completedAt: new Date().toISOString(),
        }),
      });
      const isFinalWeek = weekNumber >= totalWeeks;
      await fetch('/api/bootcamp/enrollment', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentWeek: isFinalWeek ? weekNumber : weekNumber + 1,
          completed: isFinalWeek,
          completedAt: isFinalWeek ? new Date().toISOString() : undefined,
        }),
      });
      setWeekCompletionStatus('saved');
      if (testMode) {
        persistLocalState({ weekCompleted: true });
      }
    } catch (error) {
      setWeekCompletionStatus('error');
      if (testMode) {
        persistLocalState({ weekCompleted: false });
      }
    }
  };

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <header>
          <p className="text-sm font-semibold uppercase tracking-wide text-mute">
            Lessons ({lessonsCompleted}/{lessons.length} complete)
          </p>
        </header>

        <div className="space-y-6">
          {lessons.map((lesson) => {
            const isCompleted = lessonProgress[lesson.id];
            return (
              <article key={lesson.id} className="space-y-4 rounded-xl border border-border bg-background/70 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-ink">{lesson.title}</h3>
                    {lesson.keyTakeaways && (
                      <ul className="mt-3 space-y-1 rounded-lg bg-oat/20 p-3 text-sm text-mute">
                        {lesson.keyTakeaways.map((takeaway) => (
                          <li key={takeaway} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-ember" />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {!readOnly && (
                    <Button
                      size="sm"
                      variant={isCompleted ? 'outline' : 'default'}
                      onClick={() => toggleLesson(lesson.id)}
                      disabled={isCompleted}
                    >
                      {isCompleted ? 'Completed' : 'Mark Complete'}
                    </Button>
                  )}
                </div>

                <div className="space-y-3 text-sm leading-relaxed text-mute">
                  {lesson.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <header>
          <p className="text-sm font-semibold uppercase tracking-wide text-mute">Exercises</p>
        </header>

        <div className="space-y-6">
          {exercises.map((exercise) => {
            const status = exerciseStatuses[exercise.id] ?? 'idle';
            return (
              <article key={exercise.id} className="space-y-4 rounded-xl border border-border bg-card/60 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{exercise.title}</h3>
                    <p className="mt-2 text-sm text-mute">{exercise.prompt}</p>
                    {exercise.helper && <p className="mt-2 text-xs text-ember">{exercise.helper}</p>}
                  </div>
                </div>

                <Textarea
                  rows={6}
                  value={exerciseResponses[exercise.id] ?? ''}
                  disabled={readOnly}
                  placeholder={exercise.placeholder}
                  onChange={(event) =>
                    setExerciseResponses((prev) => ({
                      ...prev,
                      [exercise.id]: event.target.value,
                    }))
                  }
                />

                {!readOnly && (
                  <div className="flex items-center justify-between">
                    <Button
                      size="sm"
                      onClick={() => handleExerciseSave(exercise.id)}
                      disabled={status === 'saving'}
                    >
                      {status === 'saving' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save Exercise
                    </Button>
                    <p
                      className={cn('text-xs font-medium', {
                        'text-muted-foreground': status === 'idle',
                        'text-green-600': status === 'saved',
                        'text-destructive': status === 'error',
                      })}
                    >
                      {status === 'saved'
                        ? 'Saved'
                        : status === 'error'
                          ? 'Save failed. Try again.'
                          : status === 'saving'
                            ? 'Saving...'
                            : 'Not saved yet'}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-background/70 p-6">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-mute">Weekly Reflection</p>
          <p className="text-sm text-mute">{reflection.prompt}</p>
        </header>
        <Textarea
          rows={5}
          value={reflectionValue}
          onChange={(event) => setReflectionValue(event.target.value)}
          placeholder={reflection.placeholder}
          disabled={readOnly}
        />
        {!readOnly && (
          <div className="flex items-center justify-between">
            <Button size="sm" onClick={handleReflectionSave} disabled={reflectionStatus === 'saving'}>
              {reflectionStatus === 'saving' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Reflection
            </Button>
            <p
              className={cn('text-xs font-medium', {
                'text-muted-foreground': reflectionStatus === 'idle',
                'text-green-600': reflectionStatus === 'saved',
                'text-destructive': reflectionStatus === 'error',
              })}
            >
              {reflectionStatus === 'saved'
                ? 'Saved'
                : reflectionStatus === 'error'
                  ? 'Save failed. Try again.'
                  : reflectionStatus === 'saving'
                    ? 'Saving...'
                    : 'Not saved yet'}
            </p>
          </div>
        )}
      </section>

      {!readOnly && (
        <section className="rounded-2xl border border-ink/20 bg-ink/5 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-ink">Mark Week Complete</h3>
              <p className="text-sm text-mute">
                You can complete the week once all lessons, exercises, and the reflection are saved.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="default"
                size="lg"
                disabled={!canCompleteWeek || weekCompletionStatus === 'saving' || weekCompletionStatus === 'saved'}
                onClick={handleCompleteWeek}
              >
                {weekCompletionStatus === 'saving' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {weekCompletionStatus === 'saved' ? 'Week Completed' : 'Complete Week'}
              </Button>
              <p
                className={cn('text-xs font-medium', {
                  'text-muted-foreground': weekCompletionStatus === 'idle',
                  'text-green-600': weekCompletionStatus === 'saved',
                  'text-destructive': weekCompletionStatus === 'error',
                })}
              >
                {weekCompletionStatus === 'saved'
                  ? 'Progress recorded'
                  : weekCompletionStatus === 'error'
                    ? 'Save failed. Try again.'
                    : canCompleteWeek
                      ? 'Ready to submit'
                      : 'Complete all items first'}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

