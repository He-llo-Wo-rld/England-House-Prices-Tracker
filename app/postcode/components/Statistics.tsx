import { PostcodeData } from "@/types/postcode"
import { formatPrice } from "@/utils/formatters"

export const Statistics = ({ data }: { data: PostcodeData }) => {
    return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
             <div className="bg-white rounded-lg shadow p-6">
               <h3 className="text-sm font-medium text-gray-500">Average Price</h3>
               <p className="text-2xl font-bold text-gray-900">
                 {formatPrice(data.statistics.averagePrice)}
               </p>
               <p className="text-sm text-gray-600">
                 {data.statistics.vsRegion > 0 ? "+" : ""}
                 {data.statistics.vsRegion}% vs region avg
               </p>
             </div>
   
             <div className="bg-white rounded-lg shadow p-6">
               <h3 className="text-sm font-medium text-gray-500">Price Range</h3>
               <p className="text-2xl font-bold text-gray-900">
                 {data.statistics.priceRange}
               </p>
               <p className="text-sm text-gray-600">Min to max</p>
             </div>
   
             <div className="bg-white rounded-lg shadow p-6">
               <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
               <p className="text-2xl font-bold text-gray-900">
                 {data.statistics.totalSales}
               </p>
               <p className="text-sm text-gray-600">Properties sold</p>
             </div>
   
             <div className="bg-white rounded-lg shadow p-6">
               <h3 className="text-sm font-medium text-gray-500">Median Price</h3>
               <p className="text-2xl font-bold text-gray-900">
                 {formatPrice(data.statistics.medianPrice)}
               </p>
               <p className="text-sm text-gray-600">Middle value</p>
             </div>
           </div>)}