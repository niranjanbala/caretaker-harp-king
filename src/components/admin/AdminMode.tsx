'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { BarChart3, Users, Settings, List, Vote, LogOut } from 'lucide-react';

export default function AdminMode() {
  const [activeTab, setActiveTab] = useState<'queue' | 'polls' | 'analytics'>('queue');
  const { requests, polls, analytics, totalClaps, lockAdmin } = useAppStore();

  const handleLogout = () => {
    lockAdmin();
  };

  const tabs = [
    {
      id: 'queue' as const,
      label: 'Request Queue',
      icon: List,
      count: requests.filter(r => r.status === 'pending').length,
    },
    {
      id: 'polls' as const,
      label: 'Polls',
      icon: Vote,
      count: polls.length,
    },
    {
      id: 'analytics' as const,
      label: 'Analytics',
      icon: BarChart3,
      count: null,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Admin Dashboard</h1>
          <p className="text-base-content/70">Manage requests, polls, and view analytics</p>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-ghost btn-sm gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Stats Overview */}
      <div className="stats shadow bg-base-200 w-full">
        <div className="stat">
          <div className="stat-figure text-primary">
            <List className="w-8 h-8" />
          </div>
          <div className="stat-title">Pending Requests</div>
          <div className="stat-value text-primary">
            {requests.filter(r => r.status === 'pending').length}
          </div>
          <div className="stat-desc">
            {requests.filter(r => r.status === 'played').length} completed
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <Vote className="w-8 h-8" />
          </div>
          <div className="stat-title">Active Polls</div>
          <div className="stat-value text-secondary">
            {polls.filter(p => p.isActive).length}
          </div>
          <div className="stat-desc">{polls.length} total polls</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <Users className="w-8 h-8" />
          </div>
          <div className="stat-title">Total Claps</div>
          <div className="stat-value text-accent">{totalClaps}</div>
          <div className="stat-desc">Audience engagement</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-info">
            <BarChart3 className="w-8 h-8" />
          </div>
          <div className="stat-title">Most Requested</div>
          <div className="stat-value text-info">
            {Object.keys(analytics.mostRequested).length}
          </div>
          <div className="stat-desc">Unique songs</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tabs tabs-boxed bg-base-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab gap-2 ${
                activeTab === tab.id ? 'tab-active' : ''
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {tab.count !== null && tab.count > 0 && (
                <div className="badge badge-primary badge-sm">
                  {tab.count}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[60vh]">
        {activeTab === 'queue' && (
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Request Queue Management</h2>
              <p className="text-base-content/70">
                Manage song requests, reorder queue, and update status
              </p>
              <div className="mt-4">
                {requests.length === 0 ? (
                  <div className="text-center py-8 text-base-content/50">
                    No requests yet
                  </div>
                ) : (
                  <div className="space-y-2">
                    {requests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                        <div>
                          <div className="font-medium">{request.song.title}</div>
                          <div className="text-sm text-base-content/70">
                            by {request.song.artist}
                            {request.requesterName && ` • Requested by ${request.requesterName}`}
                          </div>
                        </div>
                        <div className="badge badge-outline">
                          {request.status}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'polls' && (
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Poll Management</h2>
              <p className="text-base-content/70">
                Create and manage audience polls
              </p>
              <div className="mt-4">
                {polls.length === 0 ? (
                  <div className="text-center py-8 text-base-content/50">
                    No polls created yet
                  </div>
                ) : (
                  <div className="space-y-4">
                    {polls.map((poll) => (
                      <div key={poll.id} className="p-4 bg-base-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{poll.question}</h3>
                          <div className={`badge ${poll.isActive ? 'badge-success' : 'badge-neutral'}`}>
                            {poll.isActive ? 'Active' : 'Closed'}
                          </div>
                        </div>
                        <div className="text-sm text-base-content/70">
                          {poll.totalVotes} total votes
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title">Most Requested Songs</h2>
                <div className="space-y-2">
                  {Object.entries(analytics.mostRequested)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([song, count]) => (
                      <div key={song} className="flex justify-between items-center">
                        <span className="text-sm">{song}</span>
                        <div className="badge badge-primary">{count}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title">Category Stats</h2>
                <div className="space-y-2">
                  {Object.entries(analytics.categoryStats).map(([category, count]) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-sm">{category}</span>
                      <div className="badge badge-secondary">{count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}