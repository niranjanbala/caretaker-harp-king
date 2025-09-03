import Dexie, { Table } from 'dexie';
import { Song, SongRequest, Poll, UserFingerprint } from '@/types';

export class CaretakerHarpKingDB extends Dexie {
  songs!: Table<Song>;
  requests!: Table<SongRequest>;
  polls!: Table<Poll>;
  userFingerprints!: Table<UserFingerprint>;

  constructor() {
    super('CaretakerHarpKingDB');
    
    this.version(1).stores({
      songs: 'id, title, artist, category, subcategory, year',
      requests: 'id, songId, timestamp, status, claps',
      polls: 'id, createdAt, isActive',
      userFingerprints: 'id, requestCount, lastRequest'
    });
  }
}

export const db = new CaretakerHarpKingDB();

// Database utility functions
export class DatabaseService {
  // Song operations
  static async getAllSongs(): Promise<Song[]> {
    return await db.songs.toArray();
  }

  static async addSongs(songs: Song[]): Promise<void> {
    await db.songs.bulkPut(songs);
  }

  static async getSongsByCategory(category: string): Promise<Song[]> {
    return await db.songs.where('category').equals(category).toArray();
  }

  static async searchSongs(query: string): Promise<Song[]> {
    const lowerQuery = query.toLowerCase();
    return await db.songs.filter(song => 
      song.title.toLowerCase().includes(lowerQuery) ||
      song.artist.toLowerCase().includes(lowerQuery)
    ).toArray();
  }

  // Request operations
  static async getAllRequests(): Promise<SongRequest[]> {
    return await db.requests.orderBy('timestamp').toArray();
  }

  static async addRequest(request: SongRequest): Promise<void> {
    await db.requests.add(request);
  }

  static async updateRequest(id: string, updates: Partial<SongRequest>): Promise<void> {
    await db.requests.update(id, updates);
  }

  static async deleteRequest(id: string): Promise<void> {
    await db.requests.delete(id);
  }

  static async getRequestsByStatus(status: SongRequest['status']): Promise<SongRequest[]> {
    return await db.requests.where('status').equals(status).toArray();
  }

  // Poll operations
  static async getAllPolls(): Promise<Poll[]> {
    return await db.polls.orderBy('createdAt').reverse().toArray();
  }

  static async addPoll(poll: Poll): Promise<void> {
    await db.polls.add(poll);
  }

  static async updatePoll(id: string, updates: Partial<Poll>): Promise<void> {
    await db.polls.update(id, updates);
  }

  static async getActivePoll(): Promise<Poll | undefined> {
    return await db.polls.where('isActive').equals(1).first();
  }

  // User fingerprint operations
  static async getUserFingerprint(id: string): Promise<UserFingerprint | undefined> {
    return await db.userFingerprints.get(id);
  }

  static async updateUserFingerprint(fingerprint: UserFingerprint): Promise<void> {
    await db.userFingerprints.put(fingerprint);
  }

  // Analytics operations
  static async getMostRequestedSongs(limit: number = 10): Promise<Array<{song: Song, count: number}>> {
    const requests = await db.requests.toArray();
    const songCounts = new Map<string, number>();
    
    requests.forEach(request => {
      const count = songCounts.get(request.songId) || 0;
      songCounts.set(request.songId, count + 1);
    });

    const sortedSongs = Array.from(songCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit);

    const result = [];
    for (const [songId, count] of sortedSongs) {
      const song = await db.songs.get(songId);
      if (song) {
        result.push({ song, count });
      }
    }

    return result;
  }

  static async getCategoryStats(): Promise<Record<string, number>> {
    const requests = await db.requests.toArray();
    const stats: Record<string, number> = {};

    for (const request of requests) {
      const song = await db.songs.get(request.songId);
      if (song) {
        stats[song.category] = (stats[song.category] || 0) + 1;
      }
    }

    return stats;
  }

  // Data initialization
  static async initializeData(): Promise<void> {
    try {
      // Check if songs are already loaded
      const songCount = await db.songs.count();
      if (songCount > 0) {
        console.log('Songs already loaded in database');
        return;
      }

      // Load songs from JSON file
      const response = await fetch('/data/songs.json');
      if (!response.ok) {
        throw new Error('Failed to load songs data');
      }

      const songs: Song[] = await response.json();
      await this.addSongs(songs);
      
      console.log(`Loaded ${songs.length} songs into database`);
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  // Backup and restore
  static async exportData(): Promise<string> {
    const data = {
      songs: await db.songs.toArray(),
      requests: await db.requests.toArray(),
      polls: await db.polls.toArray(),
      userFingerprints: await db.userFingerprints.toArray(),
      exportDate: new Date().toISOString(),
    };

    return JSON.stringify(data, null, 2);
  }

  static async importData(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData);
      
      await db.transaction('rw', [db.songs, db.requests, db.polls, db.userFingerprints], async () => {
        if (data.songs) await db.songs.bulkPut(data.songs);
        if (data.requests) await db.requests.bulkPut(data.requests);
        if (data.polls) await db.polls.bulkPut(data.polls);
        if (data.userFingerprints) await db.userFingerprints.bulkPut(data.userFingerprints);
      });

      console.log('Data imported successfully');
    } catch (error) {
      console.error('Error importing data:', error);
      throw error;
    }
  }

  // Clear all data
  static async clearAllData(): Promise<void> {
    await db.transaction('rw', [db.songs, db.requests, db.polls, db.userFingerprints], async () => {
      await db.songs.clear();
      await db.requests.clear();
      await db.polls.clear();
      await db.userFingerprints.clear();
    });
    
    console.log('All data cleared from database');
  }
}

// Initialize database when module loads
if (typeof window !== 'undefined') {
  DatabaseService.initializeData().catch(console.error);
}