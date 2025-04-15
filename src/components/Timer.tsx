interface TimerProps {
  timeRemaining: number;
}

export default function Timer({ timeRemaining }: TimerProps) {
  const getTimerColor = () => {
    if (timeRemaining <= 10) return 'text-red-500';
    if (timeRemaining <= 20) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className={`text-2xl font-bold ${getTimerColor()}`}>
      {timeRemaining}s
    </div>
  );
} 