
const ErrorFallBack = () => {
  return (
    <div className="p-6 text-center">
      <h2>Something went wrong</h2>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );
};

export default ErrorFallBack;
