"use client";

const ErrorBoundary = ({ error, reset }) => {
  return (
    <div>
      {error.message}
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default ErrorBoundary;
