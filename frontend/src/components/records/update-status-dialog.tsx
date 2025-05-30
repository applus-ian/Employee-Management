import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef, useContext } from 'react';
import { ChevronsUpDown, Check, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AuthContext } from '@/context/AuthContext';
import { useCreateEmploymentStatusHistory } from '@/hooks/records/use-update-employment-status-history';
import { toast } from 'react-hot-toast';

interface UpdateStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: string;
}

const statuses = [
  'active',
  'terminated',
  'resigned',
  'inactive',
  'onboarding',
  'account creation',
  // TODO: Fetch statuses dynamically from backend (employment_status_histories)
];

export default function UpdateStatusDialog({ open, onOpenChange, employeeId }: UpdateStatusDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(AuthContext);
  const {
    mutate: createEmploymentStatusHistory,
    isPending: isMutating,
    error: mutationError,
  } = useCreateEmploymentStatusHistory();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  // Close popover when dialog closes to prevent overlay/focus trap issues
  useEffect(() => {
    if (!open) setDropdownOpen(false);
  }, [open]);

  // Keyboard navigation for dropdown
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setDropdownOpen(false);
      if (!dropdownRef.current) return;
      const items = Array.from(dropdownRef.current.querySelectorAll('.status-option')) as HTMLDivElement[];
      const current = document.activeElement;
      const idx = items.findIndex((el) => el === current);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = items[(idx + 1) % items.length] || items[0];
        next?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = items[(idx - 1 + items.length) % items.length] || items[items.length - 1];
        prev?.focus();
      } else if (e.key === 'Enter' && current && (current as HTMLElement).classList.contains('status-option')) {
        (current as HTMLElement).click();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dropdownOpen]);

  const handleConfirm = async () => {
    setError(null);
    if (!selectedStatus) {
      setError('Please select a status.');
      return;
    }
    if (!user) {
      setError('User not authenticated.');
      return;
    }
    setIsSubmitting(true);
    console.log(employeeId, selectedStatus, new Date().toISOString().slice(0, 10), remarks);
    createEmploymentStatusHistory(
      {
        employee_id: employeeId,
        status_set: selectedStatus,
        effective_date: new Date().toISOString().slice(0, 10),
        remarks,
      },
      {
        onSuccess: () => {
          setIsSubmitting(false);
          toast.success('Status updated successfully!');
          onOpenChange(false);
        },
        onError: () => {
          setIsSubmitting(false);
          setError('Failed to update status.');
          toast.error('Failed to update status.');
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center">
            <span className="text-[#EE7A2A] text-3xl font-lg text-center">Update Status</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">New Status</Label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="w-full border rounded-xl px-4 py-3 text-left bg-white hover:border-orange-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 flex items-center justify-between transition-all"
                onClick={() => setDropdownOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
              >
                {selectedStatus ? (
                  <span className="inline-flex items-center gap-2">
                    <Badge>{selectedStatus}</Badge>
                  </span>
                ) : (
                  'Select new status...'
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto transition-all animate-fade-in">
                  {statuses.map((status) => (
                    <div
                      key={status}
                      tabIndex={0}
                      className={`status-option px-4 py-2 hover:bg-orange-100 focus:bg-orange-100 cursor-pointer flex items-center gap-2 rounded transition-all outline-none ${selectedStatus === status ? 'font-semibold text-[#EE7A2A] bg-orange-50' : ''}`}
                      onClick={() => {
                        setSelectedStatus(status);
                        setDropdownOpen(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setSelectedStatus(status);
                          setDropdownOpen(false);
                        }
                      }}
                    >
                      {selectedStatus === status && <Check className="mr-2 h-4 w-4 text-[#EE7A2A]" />}
                      <Badge>{status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
            {mutationError && (
              <div className="text-red-500 text-xs mt-1">
                {mutationError instanceof Error ? mutationError.message : 'Failed to update status.'}
              </div>
            )}
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Remarks</Label>
            <Textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter remarks for the status change..."
              className="w-full rounded-xl border border-gray-300 hover:border-orange-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              rows={3}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onOpenChange(false);
            }}
            disabled={isSubmitting || isMutating}
            className="rounded-xl"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting || isMutating || !selectedStatus}
            className="bg-[#EE7A2A] text-white rounded-xl hover:bg-orange-600 flex items-center gap-2"
          >
            {(isSubmitting || isMutating) && <Loader2 className="animate-spin h-4 w-4" />}
            {isSubmitting || isMutating ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
