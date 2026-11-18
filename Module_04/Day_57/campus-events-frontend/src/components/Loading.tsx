
interface LoadingProps {
  message?: string;
}

export default function Loading({
  message = 'Loading events...',
}: LoadingProps) {
  return (
    <div className="loading-message" role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
