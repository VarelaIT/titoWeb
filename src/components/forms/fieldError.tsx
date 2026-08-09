
export function FieldError({ errors }: { errors: unknown[] }) {
  const message = errors
    .map((error) =>
      typeof error === "string"
        ? error
        : (error as { message?: string } | undefined)?.message,
    )
    .find(Boolean);

  if (!message) return null;

  return <p className="w-full text-sm text-red-600">{message}</p>;
}
