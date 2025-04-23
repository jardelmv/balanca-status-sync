
import StatusDisplay from '../components/StatusDisplay';
import WeightsDisplay from '../components/WeightsDisplay';

const Index = () => {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <StatusDisplay />
      <WeightsDisplay />
    </div>
  );
};

export default Index;
