import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { Upload, FileSpreadsheet, AlertCircle, ArrowLeft } from 'lucide-react';

export default function ExcelAnalysis() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setFileName(file.name);
    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

        if (jsonData.length > 0) {
          const headers = jsonData[0];
          const rows = jsonData.slice(1).map(row => {
            const obj = {};
            headers.forEach((header, i) => {
              obj[header || 'Col_' + i] = row[i];
            });
            return obj;
          });
          setData(rows);
        } else {
          setError('Fisierul este gol sau nu contine date valide.');
        }
      } catch (err) {
        console.error(err);
        setError('Eroare la procesarea fisierului. Asigura-te ca este un format Excel (.xlsx, .xls) sau CSV valid.');
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Inapoi la Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <FileSpreadsheet className="w-8 h-8 text-emerald-400" />
            Analiza Excel Modele
          </h1>
          <p className="text-slate-400">
            Incarca raportul Excel pentru a vizualiza si analiza rapid performanta modelelor.
          </p>
        </div>

        {!data.length ? (
          <div className="border-2 border-dashed border-slate-700 rounded-2xl p-12 text-center hover:border-emerald-500/50 transition-colors bg-slate-900/50">
            {isLoading ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-300">Se proceseaza fisierul...</p>
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Trage fisierul Excel aici</h3>
                <p className="text-slate-400 mb-6">sau click pentru a selecta (.xlsx, .xls, .csv)</p>
                <label className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors">
                  <FileSpreadsheet className="w-5 h-5" />
                  Selecteaza Fisier
                  <input 
                    type="file" 
                    accept=".xlsx,.xls,.csv" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                  />
                </label>
                {error && (
                  <div className="mt-6 flex items-center justify-center gap-2 text-red-400 bg-red-950/30 border border-red-500/30 p-4 rounded-lg max-w-md mx-auto">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
                <div>
                  <p className="font-medium text-white">{fileName}</p>
                  <p className="text-sm text-slate-400">{data.length} randuri procesate</p>
                </div>
              </div>
              <button 
                onClick={() => { setData([]); setFileName(''); }}
                className="text-sm text-slate-400 hover:text-white underline"
              >
                Incarca alt fisier
              </button>
            </div>

            <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
              <div className="overflow-x-auto max-h-[600px]">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-900/80 text-slate-300 uppercase text-xs sticky top-0 z-10">
                    <tr>
                      {data.length > 0 && Object.keys(data[0]).map((key, i) => (
                        <th key={i} className="px-6 py-4 font-semibold whitespace-nowrap">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {data.slice(0, 100).map((row, rowIndex) => (
                      <tr key={rowIndex} className="hover:bg-slate-700/30 transition-colors">
                        {Object.values(row).map((val, colIndex) => (
                          <td key={colIndex} className="px-6 py-3 text-slate-300 whitespace-nowrap">
                            {val !== undefined && val !== null ? String(val) : '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {data.length > 100 && (
                <div className="p-4 text-center text-sm text-slate-400 border-t border-slate-700 bg-slate-900/50">
                  Se afiseaza doar primele 100 de randuri pentru performanta optima. Total: {data.length} randuri.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
