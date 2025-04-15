interface NextButtonProps {
  isEnabled: boolean;
  onClick: () => void;
}

export default function NextButton({ isEnabled, onClick }: NextButtonProps) {
  return (
    <button
      className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
        isEnabled
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
      }`}
      onClick={onClick}
      disabled={!isEnabled}
    >
      Next Question
    </button>
  );
} 