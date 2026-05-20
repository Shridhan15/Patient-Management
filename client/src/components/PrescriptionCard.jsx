import React from "react";

const PrescriptionCard = ({ visit }) => {
  return (
    <div className="card p-2 md:p-4 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all bg-white">
      <div>
        {/* Visit Badge Header (Now including Time) */}
        <div className="flex justify-between items-start border-b border-slate-100  mb-2">
          <div className="flex justify-between items-start  border-slate-100  mb-2">
            <div>
              <span className="text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-wider">
                Clinical Visit
              </span>
              {/* Dynamic Authoring Doctor Mention */}
              <p className="text-xs font-semibold text-slate-700 mt-0.5">
                🩺 {visit.doctorId?.name || "Unknown Doctor"} (
                {visit.doctorId?.specialization})
              </p>
              <p className="text-[11px] md:text-xs text-slate-400 mt-0.5 font-medium">
                🗓️{" "}
                {new Date(visit.visitDate).toLocaleString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Medical Specifics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-2 text-xs md:text-sm">
          <div>
            <p className="text-slate-400 font-semibold text-[10px] md:text-xs uppercase tracking-wider mb-1">
              Symptoms
            </p>
            <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 whitespace-pre-wrap line-clamp-3">
              {visit.symptoms}
            </p>
          </div>
          <div>
            <p className="text-slate-400 font-semibold text-[10px] md:text-xs uppercase tracking-wider mb-1">
              Diagnosis
            </p>
            <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 whitespace-pre-wrap line-clamp-3">
              {visit.diagnosis}
            </p>
          </div>
        </div>

        {/* Dynamic Pharmacology Subtable */}
        <div className="border border-slate-100 rounded-lg overflow-x-auto mb-4 w-full">
          <table className="w-full text-left text-xs md:text-sm min-w-[280px]">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-[10px] md:text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="px-3 py-2">Rx Medication</th>
                <th className="px-3 py-2">Dosage</th>
                <th className="px-3 py-2">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {visit.medicines.map((med, index) => (
                <tr key={index} className="hover:bg-slate-50/40">
                  <td className="px-3 py-2.5 font-bold text-slate-800 truncate max-w-[120px] md:max-w-[150px]">
                    {med.name}
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] md:text-xs font-mono font-bold text-slate-600 whitespace-nowrap">
                      {med.dosage}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-slate-500 text-[11px] md:text-xs whitespace-nowrap">
                    {med.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Footer Details */}
      <div className="space-y-2 mt-auto pt-2 border-t border-slate-50">
        {visit.instructions && (
          <div className="text-[11px] md:text-xs bg-amber-50/40 border border-amber-100 p-2.5 rounded-lg text-slate-600">
            <span className="font-bold text-amber-800">💡 Advice:</span>{" "}
            {visit.instructions}
          </div>
        )}

        {visit.followUpDate && (
          <div className="text-[10px] md:text-[11px] text-right font-medium text-emerald-600">
            🔄 Follow-up Scheduled:{" "}
            {new Date(visit.followUpDate).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionCard;
