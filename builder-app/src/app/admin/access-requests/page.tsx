'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Check,
  X,
  Loader2,
  Lock,
  Unlock,
  Building2,
  Mail,
  Calendar,
  ExternalLink,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AccessRequest {
  id: string;
  projectId: string;
  companyName: string | null;
  email: string;
  reason: string | null;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function AdminAccessRequestsPage() {
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/access-requests');
      if (res.ok) {
        const json = await res.json();
        setRequests(json.requests || []);
      }
    } catch (err) {
      console.error('Failed to load requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id: string) => {
    if (!window.confirm('Approve edit access for this user and unlock their project?')) return;
    setActionId(id);
    try {
      const res = await fetch(`/api/admin/access-requests/${id}/approve`, {
        method: 'POST',
      });
      if (res.ok) {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
        );
      }
    } catch (err) {
      console.error('Approval failed:', err);
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Admin
            </Link>
            <div className="h-3.5 w-px bg-neutral-800" />
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800/60">
              Admin Access Queue
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Edit Access Requests</h1>
          <p className="text-xs text-neutral-400">
            Review and approve requests from clients wishing to unlock their read-only website into the full CMS Studio editor.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchRequests}
          disabled={loading}
          className="border-neutral-800 bg-neutral-900 text-neutral-300 text-xs"
        >
          Refresh Queue
        </Button>
      </div>

      {/* Requests Table */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-12 text-center text-xs text-neutral-400 flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-emerald-400" /> Loading access requests...
          </div>
        ) : requests.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <ShieldCheck className="h-8 w-8 text-neutral-600 mx-auto" />
            <h3 className="text-sm font-semibold text-white">No Pending Access Requests</h3>
            <p className="text-xs text-neutral-400">All client access requests have been processed.</p>
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 border-b border-neutral-800 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              <tr>
                <th className="p-4">Company / Organization</th>
                <th className="p-4">Requester Email</th>
                <th className="p-4">Reason / Notes</th>
                <th className="p-4">Status</th>
                <th className="p-4">Project Link</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-neutral-900/80 transition-colors">
                  <td className="p-4 font-semibold text-white flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-neutral-400" />
                    {req.companyName || 'Unnamed Entity'}
                  </td>
                  <td className="p-4 text-neutral-300">{req.email}</td>
                  <td className="p-4 text-neutral-400 max-w-xs truncate">{req.reason || '—'}</td>
                  <td className="p-4">
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded text-[10px] font-semibold',
                        req.status === 'approved'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                          : req.status === 'rejected'
                          ? 'bg-red-950 text-red-400 border border-red-800/60'
                          : 'bg-amber-950 text-amber-400 border border-amber-800/60',
                      )}
                    >
                      {req.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link
                      href={`/project/${req.projectId}`}
                      target="_blank"
                      className="text-emerald-400 hover:underline flex items-center gap-1 font-mono"
                    >
                      View Site <ExternalLink className="h-3 w-3" />
                    </Link>
                  </td>
                  <td className="p-4 text-right">
                    {req.status === 'pending' ? (
                      <Button
                        size="sm"
                        onClick={() => handleApprove(req.id)}
                        disabled={actionId === req.id}
                        className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-xs h-7 px-3"
                      >
                        {actionId === req.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <>
                            <Unlock className="mr-1 h-3 w-3" /> Approve Access
                          </>
                        )}
                      </Button>
                    ) : (
                      <span className="text-[11px] text-neutral-500 font-medium">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
