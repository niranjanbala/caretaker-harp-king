'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Vote, CheckCircle, Clock, BarChart3, Users } from 'lucide-react';

export default function PollVoting() {
  const { activePoll, polls, vote } = useAppStore();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [hasVoted, setHasVoted] = useState<Record<string, boolean>>({});

  const handleVote = (pollId: string, option: string) => {
    if (hasVoted[pollId]) return;
    
    vote(pollId, option);
    setHasVoted(prev => ({ ...prev, [pollId]: true }));
    setSelectedOption('');

    // Show success message
    const toast = document.createElement('div');
    toast.className = 'toast toast-top toast-center';
    toast.innerHTML = `
      <div class="alert alert-success">
        <span>Vote submitted successfully!</span>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const getVotePercentage = (votes: number, total: number) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Active Poll */}
      {activePoll && (
        <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary rounded-full text-primary-content">
                <Vote className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-primary">Active Poll</h2>
                <p className="text-sm text-base-content/70">Vote now!</p>
              </div>
              <div className="ml-auto">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-base-content mb-4">
              {activePoll.question}
            </h3>

            {!hasVoted[activePoll.id] ? (
              <div className="space-y-3">
                {activePoll.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleVote(activePoll.id, option)}
                    className="w-full p-4 text-left bg-base-100 hover:bg-base-200 border border-base-300 rounded-lg transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      <div className="text-sm text-base-content/60">
                        {activePoll.votes[option]} votes
                      </div>
                    </div>
                  </button>
                ))}
                
                <div className="flex items-center gap-2 text-sm text-base-content/60 mt-4">
                  <Users className="w-4 h-4" />
                  <span>{activePoll.totalVotes} total votes</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="alert alert-success">
                  <CheckCircle className="w-5 h-5" />
                  <span>Thank you for voting!</span>
                </div>

                {/* Results */}
                <div className="space-y-2">
                  {activePoll.options
                    .sort((a, b) => activePoll.votes[b] - activePoll.votes[a])
                    .map((option) => {
                      const votes = activePoll.votes[option];
                      const percentage = getVotePercentage(votes, activePoll.totalVotes);
                      
                      return (
                        <div key={option} className="p-3 bg-base-100 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{option}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-base-content/60">
                                {votes} votes
                              </span>
                              <span className="font-bold text-primary">
                                {percentage}%
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-base-300 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>

                <div className="flex items-center gap-2 text-sm text-base-content/60">
                  <Users className="w-4 h-4" />
                  <span>{activePoll.totalVotes} total votes</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* No Active Poll */}
      {!activePoll && (
        <div className="card bg-base-100 shadow">
          <div className="card-body text-center py-12">
            <Vote className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-base-content/70 mb-2">
              No Active Polls
            </h3>
            <p className="text-base-content/50">
              Check back later for new polls from the performer
            </p>
          </div>
        </div>
      )}

      {/* Poll History */}
      {polls.length > 0 && (
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h3 className="card-title">
                <BarChart3 className="w-5 h-5" />
                Poll History
              </h3>
              <div className="badge badge-neutral">
                {polls.length} polls
              </div>
            </div>

            <div className="space-y-4">
              {polls
                .sort((a, b) => b.createdAt - a.createdAt)
                .slice(0, 5)
                .map((poll) => {
                  const winningOption = poll.options.reduce((a, b) => 
                    poll.votes[a] > poll.votes[b] ? a : b
                  );
                  
                  return (
                    <div
                      key={poll.id}
                      className={`p-4 rounded-lg border ${
                        poll.isActive 
                          ? 'border-primary bg-primary/5' 
                          : 'border-base-300 bg-base-200/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-base-content">
                          {poll.question}
                        </h4>
                        <div className={`badge badge-sm ${
                          poll.isActive ? 'badge-success' : 'badge-neutral'
                        }`}>
                          {poll.isActive ? 'Active' : 'Closed'}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-base-content/60 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(poll.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{poll.totalVotes} votes</span>
                        </div>
                      </div>

                      {poll.totalVotes > 0 && (
                        <div className="text-sm">
                          <span className="text-base-content/70">Winner: </span>
                          <span className="font-medium text-primary">
                            {winningOption}
                          </span>
                          <span className="text-base-content/60 ml-1">
                            ({poll.votes[winningOption]} votes)
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            {polls.length > 5 && (
              <div className="text-center mt-4">
                <button className="btn btn-ghost btn-sm">
                  View All Polls
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}