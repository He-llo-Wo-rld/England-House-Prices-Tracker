import { RegionDetail } from "@/types/regions";

export const Header = ({ region }: { region: RegionDetail }) => {
  return (
    <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {region.name}
          </h1>
          <p className="text-xl text-gray-600">
            Regional Property Market Analysis
          </p>
        </div>
  );
};
