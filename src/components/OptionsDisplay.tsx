interface OptionsDisplayProps {
  options: string[];
  selectedWords: (string | undefined)[];
  onWordSelect: (word: string, blankId: number) => void;
}

export default function OptionsDisplay({ options, selectedWords, onWordSelect }: OptionsDisplayProps) {
  const availableOptions = options.filter(option => !selectedWords.includes(option));

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Available Options:</h3>
      <div className="flex flex-wrap gap-2">
        {availableOptions.map((option, index) => (
          <button
            key={index}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            onClick={() => onWordSelect(option, index + 1)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
} 