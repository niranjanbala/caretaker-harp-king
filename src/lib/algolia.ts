import algoliasearch from 'algoliasearch';
import { Song } from '@/types';

// Algolia configuration
const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || 'MH2OFHTWPG';
const ALGOLIA_SEARCH_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || 'f060130fcc0fdd98989ef15ede022955';

// Initialize Algolia client
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
const songsIndex = client.initIndex('caretaker_harp_king_songs');

export class AlgoliaService {
  // Upload songs to Algolia index
  static async uploadSongs(songs: Song[]): Promise<void> {
    try {
      // Transform songs for Algolia
      const algoliaObjects = songs.map(song => ({
        objectID: song.id,
        title: song.title,
        artist: song.artist,
        year: song.year,
        category: song.category,
        subcategory: song.subcategory,
        // Additional searchable fields
        searchableText: `${song.title} ${song.artist} ${song.category} ${song.subcategory || ''}`.toLowerCase(),
        // For faceted search
        _tags: [song.category, song.subcategory].filter(Boolean),
      }));

      // Upload to Algolia
      const { objectIDs } = await songsIndex.saveObjects(algoliaObjects);
      console.log(`✅ Uploaded ${objectIDs.length} songs to Algolia`);

      // Configure search settings
      await songsIndex.setSettings({
        searchableAttributes: [
          'title',
          'artist',
          'category',
          'subcategory',
          'searchableText'
        ],
        attributesForFaceting: [
          'category',
          'subcategory',
          'year'
        ],
        customRanking: [
          'desc(year)' // Prefer newer songs
        ],
        highlightPreTag: '<mark class="bg-purple-500/30 text-purple-200">',
        highlightPostTag: '</mark>',
        snippetEllipsisText: '…',
        hitsPerPage: 20,
      });

      console.log('✅ Algolia search settings configured');
    } catch (error) {
      console.error('❌ Error uploading to Algolia:', error);
      throw error;
    }
  }

  // Search songs using Algolia
  static async searchSongs(query: string, filters?: {
    category?: string;
    year?: number;
  }): Promise<{
    hits: Array<Song & { _highlightResult: any }>;
    nbHits: number;
    processingTimeMS: number;
  }> {
    try {
      let algoliaFilters = '';
      
      if (filters?.category && filters.category !== 'All') {
        algoliaFilters += `category:"${filters.category}"`;
      }
      
      if (filters?.year) {
        algoliaFilters += algoliaFilters ? ` AND year:${filters.year}` : `year:${filters.year}`;
      }

      const searchResults = await songsIndex.search(query, {
        filters: algoliaFilters,
        hitsPerPage: 20,
        attributesToHighlight: ['title', 'artist'],
        attributesToSnippet: ['title:15', 'artist:15'],
      });

      return {
        hits: searchResults.hits as any,
        nbHits: searchResults.nbHits,
        processingTimeMS: searchResults.processingTimeMS,
      };
    } catch (error) {
      console.error('❌ Algolia search error:', error);
      throw error;
    }
  }

  // Get search suggestions
  static async getSuggestions(query: string): Promise<string[]> {
    try {
      if (query.length < 2) return [];

      const results = await songsIndex.search(query, {
        hitsPerPage: 5,
        attributesToRetrieve: ['title', 'artist'],
      });

      const suggestions = new Set<string>();
      
      results.hits.forEach((hit: any) => {
        suggestions.add(hit.title);
        suggestions.add(hit.artist);
      });

      return Array.from(suggestions).slice(0, 5);
    } catch (error) {
      console.error('❌ Error getting suggestions:', error);
      return [];
    }
  }

  // Get popular searches based on analytics
  static async getPopularSearches(): Promise<string[]> {
    try {
      // Get most popular artists and songs
      const results = await songsIndex.search('', {
        hitsPerPage: 100,
        attributesToRetrieve: ['artist', 'title', 'category'],
      });

      const artistCounts = new Map<string, number>();
      const categoryCounts = new Map<string, number>();

      results.hits.forEach((hit: any) => {
        artistCounts.set(hit.artist, (artistCounts.get(hit.artist) || 0) + 1);
        categoryCounts.set(hit.category, (categoryCounts.get(hit.category) || 0) + 1);
      });

      const popularArtists = Array.from(artistCounts.entries())
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([artist]) => artist);

      const popularCategories = Array.from(categoryCounts.entries())
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([category]) => category);

      return [...popularArtists, ...popularCategories];
    } catch (error) {
      console.error('❌ Error getting popular searches:', error);
      return ['Beatles', 'Pink Floyd', 'Bob Dylan', 'Bollywood', 'Western'];
    }
  }

  // Analytics for search
  static async trackSearch(query: string, resultCount: number): Promise<void> {
    try {
      // In a real app, you'd send this to your analytics service
      console.log(`🔍 Search: "${query}" - ${resultCount} results`);
    } catch (error) {
      console.error('❌ Error tracking search:', error);
    }
  }

  // Clear index (for development)
  static async clearIndex(): Promise<void> {
    try {
      await songsIndex.clearObjects();
      console.log('🗑️ Algolia index cleared');
    } catch (error) {
      console.error('❌ Error clearing index:', error);
      throw error;
    }
  }

  // Get index stats
  static async getIndexStats(): Promise<{
    nbRecords: number;
    dataSize: number;
    fileSize: number;
  }> {
    try {
      const stats = await songsIndex.getSettings();
      return {
        nbRecords: 0, // Would need to call a different API
        dataSize: 0,
        fileSize: 0,
      };
    } catch (error) {
      console.error('❌ Error getting index stats:', error);
      return { nbRecords: 0, dataSize: 0, fileSize: 0 };
    }
  }
}

// Initialize Algolia with song data
export async function initializeAlgolia(): Promise<void> {
  try {
    // Load songs from our JSON data
    const response = await fetch('/data/songs.json');
    if (!response.ok) {
      throw new Error('Failed to load songs data');
    }

    const songs: Song[] = await response.json();
    
    // Upload to Algolia
    await AlgoliaService.uploadSongs(songs);
    
    console.log('🎉 Algolia initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Algolia:', error);
    // Fallback to local search if Algolia fails
    console.log('🔄 Falling back to local search');
  }
}

export { songsIndex, client };