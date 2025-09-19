import { useState } from "react"

type ArtistDetails = {
  name: string
  genre: string
  description: string
  youtube?: string
}

const artistsData: Record<string, ArtistDetails[]> = {
  Rock: [
    { name: "Led Zeppelin", genre: "Rock", description: "Legendary British rock band.", youtube: "https://www.youtube.com/embed/qW4K7Xq1E9w" },
    { name: "Queen", genre: "Rock", description: "Iconic British band.", youtube: "https://www.youtube.com/embed/fJ9rUzIMcZQ" },
    { name: "AC/DC", genre: "Rock", description: "Australian rock band.", youtube: "https://www.youtube.com/embed/pAgnJDJN4VA" },
    { name: "Pink Floyd", genre: "Rock", description: "Progressive rock band.", youtube: "https://www.youtube.com/embed/_FrOQC-zEog" },
    { name: "Nirvana", genre: "Rock", description: "Grunge band from the 90s.", youtube: "https://www.youtube.com/embed/hTWKbfoikeg" },
    { name: "Foo Fighters", genre: "Rock", description: "American rock band.", youtube: "https://www.youtube.com/embed/0m3s0vg2d1g" },
    { name: "Metallica", genre: "Rock", description: "Heavy metal band.", youtube: "https://www.youtube.com/embed/CD-E-LDc384" },
    { name: "Guns N' Roses", genre: "Rock", description: "Famous for Sweet Child O' Mine.", youtube: "https://www.youtube.com/embed/1w7OgIMMRc4" },
    { name: "The Beatles", genre: "Rock", description: "British rock pioneers.", youtube: "https://www.youtube.com/embed/45cYwDMibGo" },
    { name: "Aerosmith", genre: "Rock", description: "American rock band.", youtube: "https://www.youtube.com/embed/4E8ok5JxyP4" },
  ],
  Pop: [
    { name: "Michael Jackson", genre: "Pop", description: "King of Pop.", youtube: "https://www.youtube.com/embed/sOnqjkJTMaA" },
    { name: "Madonna", genre: "Pop", description: "Queen of Pop.", youtube: "https://www.youtube.com/embed/s__rX_WL100" },
    { name: "Britney Spears", genre: "Pop", description: "2000s pop icon.", youtube: "https://www.youtube.com/embed/CevxZvSJLk8" },
    { name: "Beyoncé", genre: "Pop", description: "Queen B.", youtube: "https://www.youtube.com/embed/ViwtNLUqkMY" },
    { name: "Taylor Swift", genre: "Pop", description: "Singer-songwriter.", youtube: "https://www.youtube.com/embed/tCXGJQYZ9JA" },
    { name: "Ariana Grande", genre: "Pop", description: "Pop superstar.", youtube: "https://www.youtube.com/embed/kHLHSlExFis" },
    { name: "Justin Timberlake", genre: "Pop", description: "Singer and actor.", youtube: "https://www.youtube.com/embed/s3Q80mk7bxE" },
    { name: "Lady Gaga", genre: "Pop", description: "Poker Face singer.", youtube: "https://www.youtube.com/embed/bESGLojNYSo" },
    { name: "Rihanna", genre: "Pop", description: "Barbadian singer.", youtube: "https://www.youtube.com/embed/e2V2d0n4J1k" },
    { name: "Ed Sheeran", genre: "Pop", description: "Singer-songwriter.", youtube: "https://www.youtube.com/embed/JGwWNGJdvx8" },
  ],
  Jazz: [
    { name: "Miles Davis", genre: "Jazz", description: "Legendary jazz trumpeter.", youtube: "https://www.youtube.com/embed/zqNTltOGh5c" },
    { name: "John Coltrane", genre: "Jazz", description: "Jazz saxophonist.", youtube: "https://www.youtube.com/embed/SrO4U4qXKwE" },
    { name: "Duke Ellington", genre: "Jazz", description: "Jazz composer and pianist.", youtube: "https://www.youtube.com/embed/7p1w8z3yz90" },
    { name: "Louis Armstrong", genre: "Jazz", description: "Famous jazz trumpeter.", youtube: "https://www.youtube.com/embed/HJ4-dcFij0k" },
    { name: "Ella Fitzgerald", genre: "Jazz", description: "Queen of Jazz vocals.", youtube: "https://www.youtube.com/embed/IJ5XnyX9k0o" },
    { name: "Charlie Parker", genre: "Jazz", description: "Influential saxophonist.", youtube: "https://www.youtube.com/embed/8YbswxKhOfA" },
    { name: "Thelonious Monk", genre: "Jazz", description: "Jazz pianist and composer.", youtube: "https://www.youtube.com/embed/1OYd0OLq6kg" },
    { name: "Billie Holiday", genre: "Jazz", description: "Legendary jazz singer.", youtube: "https://www.youtube.com/embed/Y_1kF_hgkoA" },
    { name: "Chet Baker", genre: "Jazz", description: "Trumpeter and vocalist.", youtube: "https://www.youtube.com/embed/0bfj3rtJxMI" },
    { name: "Stan Getz", genre: "Jazz", description: "Famous tenor saxophonist.", youtube: "https://www.youtube.com/embed/7k5h0Nvj6vY" },
  ],
  Classical: [
    { name: "Ludwig van Beethoven", genre: "Classical", description: "German composer.", youtube: "https://www.youtube.com/embed/_4IRMYuE1hI" },
    { name: "Wolfgang Amadeus Mozart", genre: "Classical", description: "Austrian composer.", youtube: "https://www.youtube.com/embed/RcX1XrGozd0" },
    { name: "Johann Sebastian Bach", genre: "Classical", description: "Baroque composer.", youtube: "https://www.youtube.com/embed/ho9rZjlsyYY" },
    { name: "Frédéric Chopin", genre: "Classical", description: "Romantic composer.", youtube: "https://www.youtube.com/embed/9E6b3swbnWg" },
    { name: "Pyotr Ilyich Tchaikovsky", genre: "Classical", description: "Russian composer.", youtube: "https://www.youtube.com/embed/2I9U6fdx0Fo" },
    { name: "Antonio Vivaldi", genre: "Classical", description: "Baroque composer.", youtube: "https://www.youtube.com/embed/-4kTei0XrCs" },
    { name: "Johannes Brahms", genre: "Classical", description: "Romantic composer.", youtube: "https://www.youtube.com/embed/cs5x2GZ_Ji4" },
    { name: "Franz Schubert", genre: "Classical", description: "Austrian composer.", youtube: "https://www.youtube.com/embed/LQFytTn3iQ4" },
    { name: "Gustav Mahler", genre: "Classical", description: "Romantic composer.", youtube: "https://www.youtube.com/embed/TP5-LK0t6hg" },
    { name: "Igor Stravinsky", genre: "Classical", description: "Russian composer.", youtube: "https://www.youtube.com/embed/3K6PlsBD7dk" },
  ],
}

const Music = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [selectedArtist, setSelectedArtist] = useState<ArtistDetails | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Music Explorer</h1>

      {/* Genres */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {Object.keys(artistsData).map((genre) => (
          <button
            key={genre}
            onClick={() => { setSelectedGenre(genre); setSelectedArtist(null) }}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              selectedGenre === genre ? "bg-indigo-600 text-white shadow-lg scale-105" : "bg-indigo-200 text-gray-800 hover:bg-indigo-300"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Artists */}
      {selectedGenre && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6 w-full max-w-6xl">
          {artistsData[selectedGenre]?.map((artist) => (
            <div
              key={artist.name}
              onClick={() => setSelectedArtist(artist)}
              className="cursor-pointer bg-white rounded-2xl shadow-lg p-4 hover:scale-105 transition transform"
            >
              <h2 className="text-xl font-bold text-gray-800">{artist.name}</h2>
              <p className="text-gray-500 mt-1">{artist.genre}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedArtist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl relative">
            <button
              className="absolute top-4 right-4 text-gray-600 font-bold text-xl"
              onClick={() => setSelectedArtist(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedArtist.name}</h2>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Genre:</span> {selectedArtist.genre}</p>
            <p className="text-gray-700 mb-4">{selectedArtist.description}</p>
            {selectedArtist.youtube && (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-64 rounded-lg"
                  src={selectedArtist.youtube}
                  title={selectedArtist.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Music
