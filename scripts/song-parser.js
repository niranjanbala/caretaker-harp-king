const fs = require('fs');
const path = require('path');

// Parse the song data from the PDF content we extracted earlier
const songData = `
Western 
Instrumental  
Setlist 
A 
 Another brick in the wall - Pink Floyd (1979) 
 Annie's Song - John Denver (1974) 
Caretaker Harp King is a very unique 
Music Style invented by Susmith Louise in 2013. 
Performing Harmonica, Guitar, Vocals, Shakers, 
Cymbals, Ghungroo , Percussive elements etc all 
together by a Single man in a same time is the 
Strong Suit of Caretaker Harp King.  
Also all the tones you listen in this music is 
created 100% Live & Natural  
(without any tech backings & Loopers) 
Thanks for Enjoying my Little Music...

 All I Have To Do Is Dream - Everly brothers 
(1958) 
 Amazing Grace - John Newton (1772) 
 A Thousand Years - Christina Perry (2011) 
 Achy Breaky Heart - Billy Ray Cyrus (1992) 
B 
 Believer - Imagine Dragons (2017) 
 Brown girl in the ring - Boney m (1978) 
 Bella Ciao - Italian folk song (1943) 
 Beat it - Michael Jackson (1982) 
 Blues Music Jamming in key of  G 
 Blowin' in the wind - Bob dylan (1963) 
 Boulevard of  Broken Dreams - Greenday 
(2004) 

 Besame mucho - Consuelo Velázquez (1940) 
 Bad moon rising - CCR (1969) 
 Born To Touch Your Feelings - Scorpions             
(1995) 
C 
 Can't help falling in love - Elvis Presley 
(1961) 
 Cheri Cheri Lady - Modern Talking (1985) 
Country roads - John Denver (1971) 
 Coming back to life - Pink Floyd (1994) 
 Count on me - Bruno Mars (2011) 
D 
Despacito - Luis Fonsi ft. Daddy Yankee (2017) 
Don't Worry, Be Happy - Bobby McFerrin (1988) 

Darling Clementine - American folk (1884) 
F 
Faded - Alan Walker (2015) 
Felicita - Al Bano & Romina Power (1982) Berlin 
movie (2023) 
h 
Hotel California - Eagles (1977) 
Have you ever seen the rain - CCR (1971) 
I 
It's My Life - Bon Jovi (2000) 
Imagine - John Lennon (1971) 

I Just Called to Say I Love You - Stevie Wonder 
(1984) 
I have a dream - Abba (1979) 
If  you wanna be happy - Jimmy Soul (1963) 
J 
Jamaica farewell - Harry belafonte (1957) 
K 
Knokin' on heaven's door - Bob dylan (1973) 
L 
Lady - Kenny Rogers (1980) 
Let it be - Beatles (1970) 
Let it be me - The Everly Brothers (1960) 
Leaving on a Jet plane - John Denver (1969) 

Love me tender - Elvis Presley (1956) 
La Kukarache (Mexican folk song -1910) 
M 
My heart will go on - Celine Dion (Titanic - 1997) 
Mr. Tambourine man - Bob Dylan (1965) 
Mary Ann - Caribbean folk song (1945) 
My life Going on - Cecelia krull (Money heist - 
2017) 
N 
No Woman No Cry - Bob Marley (1974) 
O 
Oh Carol - Neil sedaka (1959) 
Oh Susana - Stephen foster (1848) 

Ode to joy - Ludwig van Beethoven 
P 
Perfect - Ed Sheeran (2017) 
People are Strange - The Doors (1967) 
R 
Rivers of  Babylon - Boney m (1978) 
Right Here Waiting For You - Richard Marx 
(1989) 
Red red wine - Neil diamond (1967) 
Riders on the storm - The Doors (1971) 
Red river valley - Cowboy Song (1928) 
S 

Smell like teen spirit - Nirvana (1991) 
Scientist - Coldplay (2002) 
Summer wines - Nancy Sinatra (1961) 
Stand by me - Ben E King (1961) 
Sweet Caroline - Neil Diamond (1969) 
Scarborough fair - Simon & Garfunkel (1968) 
Spring - Antonio Vivaldi (1725) 
T 
The man who sold the world - David Bowie, 
Nirvana (1970,1995) 
Three Little Birds - Bob Marley (1977) 
The Moon Represents My Heart - Teresa Teng 
(1977) 
The house of  rising sun - The animals (1961) 

U 
Until I Found You - Stephen Sanchez (2021) 
W 
We will rock you - Queen (1977) 
Wavin' Flag - K'naan (2009) 
Wonderful tonight - Eric Clapton (1977) 
What a wonderful world - Louis Armstrong 
(1967) 
Who'll stop the rain - CCR (1970) 
We shall overcome - Pete Seeger (1963) 
y 
You are my sunshine - Jimmie Davis (1940) 

Western singing 
Setlist 
Don't look back in anger - Oasis (1995) 
I wanna hold your hand - Beatles (1963) 
Three Little Birds - Bob Marley (1977) 
Wish you were here - Pink Floyd (1975) 
Who'll stop the  - CCR (1970) 
Words - Bee Gees (1968) 
Guitar Solos 
My heart will go on - Celine Dion (1997) 

Another brick in the wall - Pink Floyd (1979) 
Fur Elise 
Can't help falling in love  
Summer wines 
Love story - Francis Lai 
Sara - Bob Dylan 
Harmonica Solos 
Another brick in the wall - Pink Floyd (1979) 
When saints go marching in 
Bollywood 
Setlist 
  

Ajeeb Dastan Hai Yeh - Lata Mangeshkar 
 (Dil    Apna Aur Preet Parai - 1960) 
Aashiyan - Barfi (2022) 
Ae Mere Humsafar - Qayamat Se Qayamat Tak 
(1988) 
Aa Chalke Tujhe - Kishore Kumar (Door Gagan 
Ki Chhaon Mein) 
Beege Hont Tere - Murder (2004) 
Beegi Beegi Si Hai - James (Gangster - 2006) 
Chalte Chalte - Kishore Kumar (Chalte Chalte - 
1976) 
Dum Maro Dum - Hare Rama Hare Krishna 
(1971) 
Give Me Some Sunshine - Three Idiots (2009) 
Hai Apna Dil - Bees Saal Baad (1962) 
Har Gadi Badal - Kal Ho Na Ho (2003) 
Hotonse Chu lo tum - Jagjit Singh ( Prem Geeth 
- 1981) Gazal 

Hum Honge Kamyab (2013) 
Iam a Disco Dancer - Disco Dancer (1982) 
Kuch Kuch Hota Hai - Udit Narayan Alka Yagnik 
(1998) 
Kya Mujhe Pyar Hai - KK (Woh Lamhe - 2006) 
Kwhaja Mere Kwhaja - AR Rehman (Jodhaa 
Akbar - 2008) 
Mere Sapno ki - Aradhana (1969) 
O re Piya - Rahat Fateh Ali Khan (Aaja Nachle - 
2007) 
Papa Kehte Hai - Qayamat Se Qayamat tak 
(1988) 
Piyu Bole - Parineetha (2005) 
Sason Ki Mala Pe - Nusrat Fateh Ali Khan 
(1979) Qawwali 
Tujhe Dekha To Ye - Latha Mangeshkar, Kumar 
Sanu ( Dilwale Dulhaniya Le Jayenge - 1995) 
Teri Deewani - Kailash Kher (2007) 
Yeh Dosti - Kishore Kumar (Sholey - 1975) 

Zara Zara - Bombay Jayashri (2001) 
Kannada Setlist 
Bombay Helutaie - Rajakumara (2017) Tribute 
to Puneeth Rajkumar 
Malayalam 
Setlist 
 Chekkele - Avial (2008)  
 CID Moosa Theme (2003) - 90s Kids                
Nostalgia 
 Omal Kanmani - Naran (2005)  
 Tharaka Pennale - Folk Song (2018) 

 Vanchippattu (Kerala Boat race Song) 
Tamil Setlist 
Enadhuyire - Bheema (2008) 
Vaseegara - Minnale (2001) 
Kids Setlist 
Baby Shark 
London Bridge is falling down  
Mary had a little lamb  
Row row row your boat 
Twinkle twinkle 

Christmas Setlist 
Feliz Navidad 
Jingle Bells 
Mary's boy child 
Silent night 
We wish you a merry Christmas  
I just call to say I love you 
`;

function parseSongs() {
  console.log('🎵 Parsing song data...');
  
  const songs = [];
  let currentCategory = '';
  let currentSubcategory = '';
  let songId = 1;

  const lines = songData.split('\n').map(line => line.trim()).filter(line => line);
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip description text
    if (line.includes('Caretaker Harp King is a very unique') || 
        line.includes('Music Style invented') ||
        line.includes('Performing Harmonica') ||
        line.includes('Thanks for Enjoying')) {
      continue;
    }
    
    // Detect categories
    if (line === 'Western' || line === 'Bollywood' || line === 'Christmas') {
      currentCategory = line;
      currentSubcategory = '';
      continue;
    }
    
    if (line === 'Kannada Setlist' || line === 'Malayalam' || line === 'Tamil Setlist') {
      currentCategory = 'Regional';
      currentSubcategory = line.replace(' Setlist', '');
      continue;
    }
    
    if (line === 'Kids Setlist') {
      currentCategory = 'Kids';
      currentSubcategory = '';
      continue;
    }
    
    // Detect subcategories
    if (line === 'Instrumental' || line === 'singing' || line === 'Guitar Solos' || line === 'Harmonica Solos') {
      currentSubcategory = line;
      continue;
    }
    
    if (line === 'Setlist') {
      continue;
    }
    
    // Skip single letters (alphabetical sections)
    if (line.length === 1 && line.match(/[A-Z]/)) {
      continue;
    }
    
    // Parse song entries
    if (line.includes(' - ') && currentCategory) {
      const song = parseSongLine(line, currentCategory, currentSubcategory, songId++);
      if (song) {
        songs.push(song);
      }
    }
  }
  
  console.log(`✅ Parsed ${songs.length} songs`);
  return songs;
}

function parseSongLine(line, category, subcategory, id) {
  // Remove leading bullet points
  line = line.replace(/^[•\s]*/, '');
  
  // Extract year from parentheses at the end
  const yearMatch = line.match(/\((\d{4})\)$/);
  const year = yearMatch ? parseInt(yearMatch[1]) : undefined;
  
  // Remove year from line
  if (yearMatch) {
    line = line.replace(/\s*\([^)]*\)$/, '');
  }
  
  // Split title and artist
  const parts = line.split(' - ');
  if (parts.length < 2) {
    return null; // Skip malformed entries
  }
  
  const title = parts[0].trim();
  const artist = parts.slice(1).join(' - ').trim();
  
  if (!title || !artist) {
    return null;
  }
  
  return {
    id: `song-${id}`,
    title,
    artist,
    year,
    category: category,
    subcategory: subcategory || undefined
  };
}

function buildSongsData() {
  const songs = parseSongs();
  
  // Ensure output directory exists
  const outputDir = path.join(__dirname, '..', 'src', 'data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write songs to file
  const outputPath = path.join(outputDir, 'songs.json');
  fs.writeFileSync(outputPath, JSON.stringify(songs, null, 2));
  
  console.log(`📁 Songs saved to: ${outputPath}`);
  
  // Print category breakdown
  const categoryStats = songs.reduce((acc, song) => {
    acc[song.category] = (acc[song.category] || 0) + 1;
    return acc;
  }, {});
  
  console.log('📊 Category breakdown:');
  Object.entries(categoryStats).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} songs`);
  });
  
  return songs;
}

// Run if called directly
if (require.main === module) {
  buildSongsData();
}

module.exports = { buildSongsData, parseSongs };