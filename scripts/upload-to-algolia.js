const algoliasearch = require('algoliasearch');
const fs = require('fs');
const path = require('path');

// Algolia configuration
const ALGOLIA_APP_ID = 'MH2OFHTWPG';
const ALGOLIA_ADMIN_KEY = '1a6035ba25f1e3b05397ac6d65cf48f2';

async function uploadSongsToAlgolia() {
  try {
    console.log('🔍 Initializing Algolia client...');
    
    // Initialize Algolia client (v4 API)
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
    const index = client.initIndex('caretaker_harp_king_songs');

    // Load songs data
    const songsPath = path.join(__dirname, '..', 'src', 'data', 'songs.json');
    const songsData = JSON.parse(fs.readFileSync(songsPath, 'utf8'));

    console.log(`📚 Loaded ${songsData.length} songs from local data`);

    // Transform songs for Algolia
    const algoliaObjects = songsData.map(song => ({
      objectID: song.id,
      title: song.title,
      artist: song.artist,
      year: song.year || null,
      category: song.category,
      subcategory: song.subcategory || null,
      // Additional searchable fields
      searchableText: `${song.title} ${song.artist} ${song.category} ${song.subcategory || ''}`.toLowerCase(),
      // For faceted search
      _tags: [song.category, song.subcategory].filter(Boolean),
      // For sorting and ranking
      popularity: Math.floor(Math.random() * 100), // Mock popularity score
      duration: song.year ? `${2 + (song.year % 4)}:${(song.year % 60).toString().padStart(2, '0')}` : '3:45',
    }));

    console.log('📤 Uploading songs to Algolia...');

    // Clear existing data first
    await index.clearObjects();
    console.log('🗑️ Cleared existing Algolia index');

    // Upload to Algolia
    const { objectIDs } = await index.saveObjects(algoliaObjects);
    console.log(`✅ Uploaded ${objectIDs.length} songs to Algolia`);

    // Configure search settings
    await index.setSettings({
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
        'desc(popularity)',
        'desc(year)'
      ],
      highlightPreTag: '<mark class="bg-purple-500/30 text-purple-200">',
      highlightPostTag: '</mark>',
      snippetEllipsisText: '…',
      hitsPerPage: 20,
      maxValuesPerFacet: 100,
      attributesToHighlight: ['title', 'artist'],
      attributesToSnippet: ['title:15', 'artist:15'],
      removeWordsIfNoResults: 'allOptional',
      minWordSizefor1Typo: 4,
      minWordSizefor2Typos: 8,
      allowTyposOnNumericTokens: false,
      ignorePlurals: true,
      advancedSyntax: true,
      queryLanguages: ['en'],
    });

    console.log('⚙️ Algolia search settings configured');

    // Test search
    const testResults = await index.search('Beatles', { hitsPerPage: 5 });
    console.log(`🧪 Test search for "Beatles": ${testResults.nbHits} results found`);

    console.log('🎉 Algolia setup completed successfully!');
    console.log(`🔗 Index URL: https://www.algolia.com/apps/${ALGOLIA_APP_ID}/explorer/browse/caretaker_harp_king_songs`);

  } catch (error) {
    console.error('❌ Error setting up Algolia:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  uploadSongsToAlgolia();
}

module.exports = { uploadSongsToAlgolia };