import React from "react";

const PrescriptionCard = ({ date, diagnosis, medicines }) => {
  return (
    <div className="relative pl-8 pb-8 border-l-2 border-slate-200 last:border-l-0">
      {/* Timeline Dot */}
      <div className="absolute -left-[9px] top-0 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-sm"></div>

      <div className="card hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
              {date}
            </span>
            <h5 className="text-lg font-bold text-slate-800 mt-1">
              {diagnosis}
            </h5>
          </div>
          <button className="text-slate-400 hover:text-emerald-600">
            <span>🖨️</span>
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Prescribed Medicines
          </p>
          <div className="grid grid-cols-1 gap-2">
            {medicines.map((med, index) => (
              <div
                key={index}
                className="flex justify-between p-2 bg-slate-50 rounded-lg text-sm"
              >
                <span className="font-medium text-slate-700">{med.name}</span>
                <span className="text-slate-500 italic">
                  {med.dosage} — {med.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionCard;
