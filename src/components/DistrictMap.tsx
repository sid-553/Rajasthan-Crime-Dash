import React from 'react';

export function DistrictMap() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Crime Heatmap by District</h3>
      <div className="relative aspect-video bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&q=80&w=1000"
            alt="Rajasthan Map"
            className="object-cover w-full h-full opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20"></div>
        </div>
        {/* Interactive map points would go here in a real implementation */}
        <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-lg shadow-lg">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">High Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Medium Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Low Risk</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}