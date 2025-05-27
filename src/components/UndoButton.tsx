interface Props {
  undoHandler: () => void;
  disabled: boolean;
}

const UndoButton = ({ undoHandler, disabled }: Props) => {
  return (
    <button
      onClick={undoHandler}
      disabled={disabled}
      className={`inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm shadow-sm 
                  transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${disabled 
                    ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed' 
                    : 'bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-500 active:scale-95'
                  }`}
    >
      <svg 
        className="w-4 h-4 mr-2" 
        fill="currentColor" 
        viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          fillRule="evenodd" 
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
          clipRule="evenodd" 
        />
      </svg>
      Undo
    </button>
  );
};

export default UndoButton;
