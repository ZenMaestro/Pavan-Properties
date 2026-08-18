'use client';

import React from 'react';
import { FileText, Shield, Landmark, CheckCircle } from 'lucide-react';

interface ApprovalBadgeProps {
  label: string;
  size?: 'sm' | 'md';
}

export const ApprovalBadge: React.FC<ApprovalBadgeProps> = ({
  label,
  size = 'md'
}) => {
  const isLp = label.toLowerCase().includes('lp no');
  const isRera = label.toLowerCase().includes('rera');
  const isBank = label.toLowerCase().includes('bank');

  const getIcon = () => {
    if (isLp) return FileText;
    if (isRera) return Shield;
    if (isBank) return Landmark;
    return CheckCircle;
  };

  const Icon = getIcon();

  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded bg-[#f4f0ea] text-[#142334] border border-[#eae3e0] ${sizeClass}`}>
      <Icon className="w-3 h-3 text-[#a67d64] shrink-0" />
      <span>{label}</span>
    </span>
  );
};
