'use client';

import React from 'react';
import { CheckCircle2, Shield, Landmark, FileText } from 'lucide-react';

interface ApprovalBadgeProps {
  label: string;
  variant?: 'emerald' | 'amber' | 'slate';
  size?: 'sm' | 'md';
}

export const ApprovalBadge: React.FC<ApprovalBadgeProps> = ({
  label,
  variant = 'emerald',
  size = 'md'
}) => {
  const isLp = label.toLowerCase().includes('lp no');
  const isRera = label.toLowerCase().includes('rera');
  const isBank = label.toLowerCase().includes('bank');

  const getIcon = () => {
    if (isLp) return FileText;
    if (isBank) return Landmark;
    if (isRera) return Shield;
    return CheckCircle2;
  };

  const Icon = getIcon();

  const baseClasses = 'inline-flex items-center gap-1.5 font-semibold rounded-lg transition-all';
  
  const sizeClasses = size === 'sm' 
    ? 'px-2.5 py-1 text-[11px]' 
    : 'px-3 py-1.5 text-xs';

  const colorClasses = isLp
    ? 'bg-gunmetal-900 text-rodeo-300 border border-rodeo-400/40 shadow-sm shadow-amber-950'
    : isRera
    ? 'bg-gunmetal-800 text-platinum-200 border border-platinum-400/30'
    : isBank
    ? 'bg-blue-950/60 text-blue-300 border border-blue-500/40'
    : 'bg-slate-800/80 text-slate-200 border border-slate-700';

  return (
    <span className={`${baseClasses} ${sizeClasses} ${colorClasses}`}>
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{label}</span>
    </span>
  );
};
