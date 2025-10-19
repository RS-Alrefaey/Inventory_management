type ButtonProps = {
  text: string;
  action?: () => void;
};

const Button = ({ text, action }: ButtonProps) => {
  return (
    <>
      <button
        onClick={action}
        className="hover:cursor-pointer rounded-3xl bg-blue-900 dark:bg-purple-400 px-6 py-2 font-semibold text-white"
      >
        {text}
      </button>
    </>
  );
};

export default Button;
