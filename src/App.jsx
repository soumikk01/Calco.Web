import { useState } from 'react';
import { Award, BookOpen, TrendingUp, ClipboardList } from 'lucide-react';

function App() {
  const [oddSgpa, setOddSgpa] = useState('');
  const [oddSubjects, setOddSubjects] = useState('');
  const [evenSgpa, setEvenSgpa] = useState('');
  const [evenSubjects, setEvenSubjects] = useState('');
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const oddSgpaNum = parseFloat(oddSgpa);
    const oddSubjectsNum = parseInt(oddSubjects);
    const evenSgpaNum = parseFloat(evenSgpa);
    const evenSubjectsNum = parseInt(evenSubjects);

    // Validation: Check if inputs are valid numbers and within realistic ranges
    // SGPA must be between 0 and 10
    // Subjects must be between 1 and 15
    if (
      isNaN(oddSgpaNum) || oddSgpaNum < 0.75 || oddSgpaNum > 10 ||
      isNaN(oddSubjectsNum) || oddSubjectsNum <= 0 || oddSubjectsNum > 15 ||
      isNaN(evenSgpaNum) || evenSgpaNum < 0.75 || evenSgpaNum > 10 ||
      isNaN(evenSubjectsNum) || evenSubjectsNum <= 0 || evenSubjectsNum > 15
    ) {
      setResults({ error: true });
      return;
    }

    // Step 1: Calculate YGPA (Simple average of both SGPAs)
    const totalSubjects = oddSubjectsNum + evenSubjectsNum;

    // YGPA = (Odd Sem SGPA + Even Sem SGPA) / 2
    const ygpa = (oddSgpaNum + evenSgpaNum) / 2;

    // Step 2: Convert each SGPA to percentage using MAKAUT formula
    // Clamp percentage to 0 if SGPA is less than 0.75 to avoid negative values
    const oddPercentage = Math.max(0, (oddSgpaNum - 0.75) * 10);
    const evenPercentage = Math.max(0, (evenSgpaNum - 0.75) * 10);

    // Step 3: Calculate obtained marks for each semester
    const oddObtainedMarks = oddSubjectsNum * 100 * (oddPercentage / 100);
    const evenObtainedMarks = evenSubjectsNum * 100 * (evenPercentage / 100);
    const totalObtainedMarks = Math.round(oddObtainedMarks + evenObtainedMarks);

    // Step 4: Calculate total marks and overall percentage
    const totalMarks = totalSubjects * 100;
    const overallPercentage = (totalObtainedMarks / totalMarks) * 100;

    setResults({
      ygpa: ygpa.toFixed(2),
      totalMarks,
      obtainedMarks: totalObtainedMarks,
      percentage: overallPercentage.toFixed(2),
      error: false
    });
  };

  const handleReset = () => {
    setOddSgpa('');
    setOddSubjects('');
    setEvenSgpa('');
    setEvenSubjects('');
    setResults(null);
  };

  const gradeScale = [
    { grade: '6.25', percentage: '55%' },
    { grade: '6.75', percentage: '60%' },
    { grade: '7.25', percentage: '65%' },
    { grade: '7.75', percentage: '70%' },
    { grade: '8.25', percentage: '75%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-slate-300 py-8 px-4 relative overflow-hidden">
      {/* Animated Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <header className="text-center animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="transition-transform duration-300 hover:scale-110">
              <img
                src="/calco-logo.png"
                alt="Calco - MAKAUT Yearly Marks Calculator Logo"
                className="w-28 h-28 object-contain drop-shadow-2xl"
              />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-br from-black via-gray-900 to-gray-700 bg-clip-text text-transparent drop-shadow-lg underline decoration-4 decoration-black underline-offset-8 animate-underline-pulse">
              Calco
            </h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            MAKAUT Yearly Marks Calculator
          </h2>
          <p className="text-gray-600">
            SGPA to Total Marks, Obtained Marks & Percentage
          </p>
        </header>

        {/* Description Card */}
        <div className="glass border border-white/50 rounded-3xl p-6 shadow-xl transition-transform duration-300 hover:scale-[1.02]">
          <p className="text-gray-700 mb-4">
            This tool helps you calculate your yearly aggregate marks based on your semester grades.
          </p>
          <div className="flex items-start gap-2">
            <Award className="w-5 h-5 text-slate-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-800 mb-2">Applicable for scholarships:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>
                  <a href="https://svmcm.wb.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline transition-colors">
                    Swami Vivekananda Scholarship
                  </a>
                </li>
                <li>
                  <a href="https://oasis.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline transition-colors">
                    OASIS Scholarship
                  </a>
                </li>
                <li>
                  <a href="https://wbmdfcscholarship.in/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline transition-colors">
                    Aikashree Scholarship
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Info Section - How it works */}
        <div className="glass border border-white/50 rounded-3xl p-6 shadow-xl transition-transform duration-300 hover:scale-[1.02]">
          <div className="flex items-start gap-3">
            <BookOpen className="w-6 h-6 text-slate-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">How it works</h3>
              <p className="text-gray-700">
                Enter your <span className="font-semibold text-slate-800">ODD semester SGPA</span> and <span className="font-semibold text-slate-800">number of subjects including theory and practical</span>, then enter your <span className="font-semibold text-slate-800">EVEN semester SGPA</span> and <span className="font-semibold text-slate-800">number of subjects including theory and practical</span>. Click <span className="font-semibold text-slate-800">Calculate</span> to get your yearly aggregate marks, obtained marks and overall percentage.
              </p>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-xl border-2 border-white/50 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ring-1 ring-white/40 animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-slate-700" />
            <h3 className="text-2xl font-bold text-gray-800">Calculate Your Marks</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Odd Semester */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-center text-gray-700 mb-3">Odd Sem</h4>
              <div>
                <label htmlFor="oddSgpa" className="block text-sm font-medium text-gray-700 mb-2">SGPA</label>
                <input
                  id="oddSgpa"
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  placeholder="0.00"
                  value={oddSgpa}
                  onChange={(e) => setOddSgpa(e.target.value)}
                  className="w-full px-4 py-3 text-xl font-bold text-slate-800 text-center bg-sky-100/30 backdrop-blur-md border border-sky-200/50 rounded-2xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50 focus:outline-none transition-all duration-300 placeholder-slate-400"
                />
              </div>
              <div>
                <label htmlFor="oddSubjects" className="block text-sm font-medium text-gray-700 mb-2">No of Subjects</label>
                <input
                  id="oddSubjects"
                  type="number"
                  min="1"
                  max="15"
                  placeholder="0"
                  value={oddSubjects}
                  onChange={(e) => setOddSubjects(e.target.value)}
                  className="w-full px-4 py-3 text-xl font-bold text-slate-800 text-center bg-sky-100/30 backdrop-blur-md border border-sky-200/50 rounded-2xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50 focus:outline-none transition-all duration-300 placeholder-slate-400"
                />
              </div>
            </div>

            {/* Even Semester */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-center text-gray-700 mb-3">Even Sem</h4>
              <div>
                <label htmlFor="evenSgpa" className="block text-sm font-medium text-gray-700 mb-2">SGPA</label>
                <input
                  id="evenSgpa"
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  placeholder="0.00"
                  value={evenSgpa}
                  onChange={(e) => setEvenSgpa(e.target.value)}
                  className="w-full px-4 py-3 text-xl font-bold text-slate-800 text-center bg-sky-100/30 backdrop-blur-md border border-sky-200/50 rounded-2xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50 focus:outline-none transition-all duration-300 placeholder-slate-400"
                />
              </div>
              <div>
                <label htmlFor="evenSubjects" className="block text-sm font-medium text-gray-700 mb-2">No of Subjects</label>
                <input
                  id="evenSubjects"
                  type="number"
                  min="1"
                  max="15"
                  placeholder="0"
                  value={evenSubjects}
                  onChange={(e) => setEvenSubjects(e.target.value)}
                  className="w-full px-4 py-3 text-xl font-bold text-slate-800 text-center bg-sky-100/30 backdrop-blur-md border border-sky-200/50 rounded-2xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50 focus:outline-none transition-all duration-300 placeholder-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleCalculate}
              className="px-8 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Calculate
            </button>
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-gradient-to-r from-slate-400 to-slate-500 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results Card */}
        {results && (
          <div className="glass border-2 border-slate-400 rounded-3xl p-8 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <ClipboardList className="w-8 h-8 text-slate-700" />
              <h3 className="text-2xl font-bold text-center text-gray-800">Your Results</h3>
            </div>
            {results.error ? (
              <div className="text-center">
                <p className="text-4xl font-bold text-red-600 animate-pulse">Invalid !</p>
                <p className="text-gray-600 mt-2">
                  Please check your inputs:<br />
                  SGPA must be 0.75-10<br />
                  Subjects must be 1-15
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Marks */}
                <div className="space-y-6">
                  <div>
                    <p className="text-lg text-gray-700 mb-2 font-medium">Your Total Marks</p>
                    <div className="bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-xl border-2 border-white/50 rounded-2xl p-5 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ring-1 ring-white/40">
                      <p className="text-4xl font-bold text-slate-700 text-center drop-shadow-sm">{results.totalMarks}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg text-gray-700 mb-2 font-medium">Your Obtained Marks</p>
                    <div className="bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-xl border-2 border-white/50 rounded-2xl p-5 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ring-1 ring-white/40">
                      <p className="text-4xl font-bold text-slate-700 text-center drop-shadow-sm">{results.obtainedMarks}</p>
                    </div>
                  </div>
                </div>

                {/* Right Column: YGPA & Percentage */}
                <div className="space-y-6">
                  <div>
                    <p className="text-lg text-gray-700 mb-2 font-medium">YGPA</p>
                    <div className="bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-xl border-2 border-white/50 rounded-2xl p-5 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ring-1 ring-white/40">
                      <p className="text-4xl font-bold text-slate-700 text-center drop-shadow-sm">{results.ygpa}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg text-gray-700 mb-2 font-medium">Overall Percentage</p>
                    <div className="bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-xl border-2 border-white/50 rounded-2xl p-5 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ring-1 ring-white/40">
                      <p className="text-4xl font-bold text-slate-700 text-center drop-shadow-sm">{results.percentage}%</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Grade Table */}
        <div className="glass border border-white/50 rounded-3xl p-6 shadow-xl transition-transform duration-300 hover:scale-[1.02]">
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-6">
            MAKAUT 10 Point Scale
          </h3>
          <div className="overflow-hidden rounded-2xl">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-600 to-slate-700 text-white">
                  <th className="py-3 px-6 text-left font-semibold">Grade Point</th>
                  <th className="py-3 px-6 text-left font-semibold">Percentage</th>
                </tr>
              </thead>
              <tbody className="glass-table">
                {gradeScale.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 last:border-0 transition-colors duration-300 hover:bg-slate-50"
                  >
                    <td className="py-3 px-6 text-gray-800">{row.grade}</td>
                    <td className="py-3 px-6 text-gray-800">{row.percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-6">
          <p className="text-gray-600">
            © 2025 Calco. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
