'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  PROPOSITION_TABLES,
  groupsFromRow4,
  type PropositionTableConfig,
} from '@/lib/customer-database-propositions-config'

function PropositionTable({ config }: { config: PropositionTableConfig }) {
  const groups = groupsFromRow4(config.row4)
  const leafHeaders = config.row5
  const bodyRows = Array.from({ length: config.demoRowCount }, (_, i) => i + 1)

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-300 shadow-sm">
      <table className="min-w-max w-full border-collapse text-xs">
        <thead>
          <tr>
            {groups.map((g, idx) => {
              const isSno = idx === 0 && g.label === 'S.No.'
              if (isSno) {
                return (
                  <th
                    key={`g-${idx}`}
                    rowSpan={2}
                    className="border border-slate-400 bg-[#1e4d6b] text-white font-semibold px-2 py-2 text-center align-middle min-w-[3rem]"
                  >
                    {g.label}
                  </th>
                )
              }
              return (
                <th
                  key={`g-${idx}`}
                  colSpan={g.colspan}
                  className="border border-slate-400 bg-[#34A0A4] text-white font-semibold px-2 py-2 text-center align-middle"
                >
                  {g.label}
                </th>
              )
            })}
          </tr>
          <tr>
            {leafHeaders.slice(1).map((text, i) => (
              <th
                key={`h2-${i}`}
                className="border border-slate-400 bg-[#d4ece9] text-slate-900 font-medium px-2 py-2 text-left align-top max-w-[14rem] whitespace-pre-line leading-snug"
              >
                {text || '—'}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((n) => (
            <tr key={n} className={n % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="border border-slate-300 px-2 py-1.5 text-center font-medium text-slate-800">
                {n}
              </td>
              {leafHeaders.slice(1).map((_, colIdx) => (
                <td
                  key={colIdx}
                  className="border border-slate-300 px-2 py-1.5 text-slate-700 text-center"
                >
                  xx
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PropositionAccordionItem({
  config,
  defaultOpen,
}: {
  config: PropositionTableConfig
  defaultOpen: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-lg border border-slate-300 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left bg-gradient-to-r from-[#1e4d6b] to-[#34A0A4] text-white font-semibold text-sm hover:opacity-95 transition-opacity"
        aria-expanded={open}
      >
        <span>{config.sheetTitle}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      {open && (
        <div className="p-4 bg-slate-50/80 border-t border-slate-200">
          <PropositionTable config={config} />
        </div>
      )}
    </div>
  )
}

export function CustomerDatabasePropositions() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-800 bg-[#1e3a5f] px-4 py-3 text-white shadow">
        <p className="text-sm font-semibold leading-snug">
          Europe High-Speed Data Acquisition (DAQ) Systems Market — Customer Database
        </p>
        <p className="mt-1 text-xs text-slate-200 leading-relaxed">
          Verified directory and insight on customers (framework aligned with CMI sample workbook — demo values shown
          as &quot;xx&quot;).
        </p>
      </div>

      <div className="space-y-3">
        {PROPOSITION_TABLES.map((cfg: PropositionTableConfig, index) => (
          <PropositionAccordionItem key={cfg.id} config={cfg} defaultOpen={index === 0} />
        ))}
      </div>
    </div>
  )
}
