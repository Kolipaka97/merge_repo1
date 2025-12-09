import React, { useState } from 'react';
import { ProjectInput } from '../types';
import { Rocket, Briefcase, DollarSign, Clock, FileText } from 'lucide-react';

interface Props {
  onSubmit: (data: ProjectInput) => void;
  isLoading: boolean;
}

export const ProjectForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [data, setData] = useState<ProjectInput>({
    name: '',
    description: '',
    industry: '',
    budget: '',
    timeline: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Rocket className="w-6 h-6 text-indigo-600" />
          New Analysis
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Enter your project details to begin the feasibility study.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 flex-1 overflow-y-auto pr-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. Eco-Friendly Coffee Chain"
            value={data.name}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Industry / Sector</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              name="industry"
              required
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              placeholder="e.g. Food & Beverage"
              value={data.industry}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Budget</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="budget"
                required
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                placeholder="e.g. $50,000"
                value={data.budget}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Timeline</label>
            <div className="relative">
              <Clock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="timeline"
                required
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                placeholder="e.g. 6 months"
                value={data.timeline}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Project Description</label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <textarea
              name="description"
              required
              rows={6}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
              placeholder="Describe your idea in detail. What is the goal? Who is the target audience?"
              value={data.description}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium text-lg transition-all shadow-md ${
              isLoading
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:transform active:scale-[0.98]'
            }`}
          >
            {isLoading ? 'Processing...' : 'Analyze Feasibility'}
          </button>
        </div>
      </form>
    </div>
  );
};
