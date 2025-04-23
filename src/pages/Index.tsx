
import StatusDisplay from '../components/StatusDisplay';
import WeightsDisplay from '../components/WeightsDisplay';

const Index = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md space-y-6">
        <StatusDisplay />
        <WeightsDisplay />
      </div>
    </div>
  );
};

export default Index;
