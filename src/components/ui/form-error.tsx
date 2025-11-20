interface Props {
  message?: string;
}

export const FormError = ({ message }: Props) => {
  if (!message) {
    return null;
  }

  return <p className="text-destructive bg-destructive/10 rounded-md px-3 py-2">{message}</p>;
};
