'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Records from '@/components/records/records';
import { NewEmployeeForm } from '@/components/records/create-form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import '@pathofdev/react-tag-Input/build/index.css';
import { cn } from '@/lib/utils';
import AdvancedFilterModal from '@/components/records/advance-filter';
import type { FilterValues } from '@/types/filter';

const navLinks = [{ name: 'Records', href: 'record' }];

export default function RecordsPage() {
  const [showForm, setShowForm] = useState(false);
  const [activePage, setActivePage] = useState('record');
  const [filters, setFilters] = useState<FilterValues | null>(null);

  // Clean, immutable filter apply handler
  const handleApplyFilter = (newFilters: FilterValues) => {
    setFilters({
      ...newFilters,
      department_id: newFilters.department_id,
    });
  };

  // Removes a filter value or entire filter key
  const removeFilter = (key: keyof FilterValues, value: string | number) => {
    setFilters((prev: FilterValues | null) => {
      if (!prev) return prev;

      const currentValues = prev[key];

      if (Array.isArray(currentValues)) {
        const updatedArray = currentValues.filter((item) => item !== value);
        if (updatedArray.length === 0) {
          // Remove the entire filter key if no values left
          const temp = { ...prev };
          delete temp[key];
          return Object.keys(temp).length === 0 ? null : temp;
        }
        return { ...prev, [key]: updatedArray };
      }

      // If not an array, remove the key entirely
      const temp = { ...prev };
      delete temp[key];
      return Object.keys(temp).length === 0 ? null : temp;
    });
  };

  return (
    <div className="flex flex-col w-full p-5">
      <nav className="bg-[#E8E8E8]">
        <h1 className="pb-2 text-3xl font-semibold tracking-tight first:mt-0">Records</h1>
        <div className="flex justify-between">
          <div className="order-1">
            <p className="text-gray-600 pb-8">Setup and manage Records</p>
          </div>
          <div className="order-2 pr-10"></div>
        </div>

        <ul className="flex gap-3 border-b border-gray-300 pb-0 w-full mb-4">
          {navLinks.map((link) => {
            const isActive = activePage === link.href;

            return (
              <li key={link.name} className="flex items-center justify-center pr-5">
                <button
                  onClick={() => setActivePage(link.href)}
                  className={cn(
                    'inline-block items-center transition-colors font-medium text-sm pb-2 text-gray-500 hover:text-[#EE7A2A]',
                    isActive && 'text-orange-600 border-b-2 border-orange-500',
                  )}
                >
                  {link.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="bg-white rounded-xl w-full p-5 shadow-sm">
        {!showForm ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Employee Records</h2>

            <div className="flex flex-wrap items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                <Select>
                  <SelectTrigger className="ml-2 px-3 py-1 rounded-md bg-white text-sm flex items-center gap-2">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent className="rounded-md bg-white shadow-md">
                    <SelectItem value="all_department">All Departments</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="ml-2 px-2 py-1 rounded-md bg-white text-sm flex items-center gap-2">
                    <SelectValue placeholder="All Positions" />
                  </SelectTrigger>
                  <SelectContent className="rounded-md bg-white shadow-md">
                    <SelectItem value="allposition">All Positions</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="recruiter">Recruiter</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="ml-2 px-2 py-1 rounded-md bg-white text-sm flex items-center gap-2">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-md bg-white shadow-md">
                    <SelectItem value="all_status">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                <AdvancedFilterModal onApplyFilter={handleApplyFilter} />
              </div>

              <div className="ml-auto">
                {!showForm && (
                  <Button
                    variant="outline"
                    className="text-orange-600 border-orange-400 bg-white hover:bg-orange-500 hover:text-white"
                    onClick={() => {
                      setShowForm(true);
                    }}
                  >
                    New Employee
                  </Button>
                )}
              </div>
            </div>

            {/* Filter chips + Clear Filters */}
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              {filters &&
                Object.entries(filters).map(([key, value]) => {
                  if (!value) return null;

                  if (Array.isArray(value)) {
                    return value.map((v) => (
                      <div key={`${key}-${v}`} className="flex items-center border rounded px-2 py-1 bg-gray-100">
                        <input
                          type="text"
                          readOnly
                          className="border-none bg-transparent focus:outline-none text-sm"
                          value={`${key}: ${v}`}
                        />
                        <button
                          onClick={() => removeFilter(key as keyof FilterValues, v)}
                          className="ml-1 text-red-500 hover:text-red-700"
                          type="button"
                          aria-label={`Remove filter ${key}: ${v}`}
                        >
                          &times;
                        </button>
                      </div>
                    ));
                  }

                  return (
                    <div key={key} className="flex items-center border rounded px-2 py-1 bg-gray-100">
                      <input
                        type="text"
                        readOnly
                        className="border-none bg-transparent focus:outline-none text-sm"
                        value={`${key}: ${value}`}
                      />
                      <button
                        onClick={() => removeFilter(key as keyof FilterValues, value as string | number)}
                        className="ml-1 text-red-500 hover:text-red-700"
                        type="button"
                        aria-label={`Remove filter ${key}`}
                      >
                        &times;
                      </button>
                    </div>
                  );
                })}
              {filters && (
                <Button variant="ghost" className="ml-4 text-sm text-red-600" onClick={() => setFilters(null)}>
                  Clear Filters
                </Button>
              )}
            </div>

            <Records />
          </div>
        ) : (
          <NewEmployeeForm onCancel={() => setShowForm(false)} />
        )}
      </div>
    </div>
  );
}
