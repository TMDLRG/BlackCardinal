'use client';

type CanvasPDFExportProps = {
  onDownloadJSON: () => void;
  onPrint: () => void;
};

export function CanvasPDFExport({ onDownloadJSON, onPrint }: CanvasPDFExportProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        className="rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-ink transition hover:bg-oat"
        onClick={onDownloadJSON}
      >
        Download JSON
      </button>
      <button
        type="button"
        className="rounded-md border border-ink bg-ink px-4 py-2 text-sm font-semibold text-background transition hover:bg-ink/90"
        onClick={onPrint}
      >
        Print / Export PDF
      </button>
    </div>
  );
}

