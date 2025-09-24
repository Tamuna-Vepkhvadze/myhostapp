

export interface Song {
  title: string
  youtubeId: string
}

export interface Artist {
  name: string
  description: string
  songs: Song[]
}

export interface Genre {
  name: string
  description: string
  coverImage: string
  artists: Artist[]
}

export const musicData: Genre[] = [
  {
    name: "Rock",
    description: "Feel the raw energy of electric guitars and powerful vocals with Rock, a genre that defined rebellion and passion.",
    coverImage: "https://images.unsplash.com/photo-1515634927130-9a6b7f8a9f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    artists: [
      {
        name: "Led Zeppelin",
        description: "Pioneers of hard rock, blending blues, folk, and mysticism into iconic anthems.",
        songs: [
          { title: "Stairway to Heaven", youtubeId: "QkF3oxziUI4" },
          { title: "Kashmir", youtubeId: "PD-MdiUm1_Y" },
          { title: "Immigrant Song", youtubeId: "mR1bX4IdfAg" },
          { title: "Whole Lotta Love", youtubeId: "ULR1y8WtXjI" },
          { title: "Black Dog", youtubeId: "2KPEHohJMuw" },
          { title: "Dazed and Confused", youtubeId: "w772GXG5LnE" },
          { title: "Ramble On", youtubeId: "LzGBQerkvWs" },
          { title: "Over the Hills and Far Away", youtubeId: "Am9gu4wkY9E" },
          { title: "Rock and Roll", youtubeId: "D2lSwosw9xY" },
          { title: "Good Times Bad Times", youtubeId: "TA9Rec1qAFQ" },
        ],
      },
      {
        name: "Queen",
        description: "Masters of theatrical rock, known for their genre-defying hits and Freddie Mercury's legendary voice.",
        songs: [
          { title: "Bohemian Rhapsody", youtubeId: "3gd8iBa5ag0" },
          { title: "We Will Rock You", youtubeId: "04854XqcfCY" },
          { title: "Don't Stop Me Now", youtubeId: "HgzGwKwLmgM" },
          { title: "Another One Bites the Dust", youtubeId: "rY0WxgSXdEE" },
          { title: "Somebody to Love", youtubeId: "kijpcUv-b8M" },
          { title: "Crazy Little Thing Called Love", youtubeId: "zO6D_BAuYCI" },
          { title: "Under Pressure", youtubeId: "a01QQZyl-_I" },
          { title: "Radio Ga Ga", youtubeId: "azdwsXLmrHE" },
          { title: "I Want to Break Free", youtubeId: "f4Mc-NYPHaQ" },
          { title: "The Show Must Go On", youtubeId: "t99KH0TR-J4" },
        ],
      },
    ],
  },
  {
    name: "Pop",
    description: "Dive into the catchy melodies and vibrant rhythms of Pop, where every song is a burst of joy and emotion.",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    artists: [
      {
        name: "Michael Jackson",
        description: "The King of Pop, whose innovative music and dance redefined global pop culture.",
        songs: [
          { title: "Billie Jean", youtubeId: "Zi_XLOBDo_Y" },
          { title: "Thriller", youtubeId: "rVX3aDlGPqM" },
          { title: "Beat It", youtubeId: "oRdxUFDoQe0" },
          { title: "Smooth Criminal", youtubeId: "h_D3VFfhvs4" },
          { title: "Bad", youtubeId: "Sd4SJVsTulc" },
          { title: "Man in the Mirror", youtubeId: "PivWY9wn5ps" },
          { title: "Black or White", youtubeId: "Ni1tg7_8aB8" },
          { title: "Remember the Time", youtubeId: "LeiFF0gvqcc" },
          { title: "Don't Stop 'Til You Get Enough", youtubeId: "yURRmWtbTbo" },
          { title: "Rock With You", youtubeId: "5X-Mrc2lJkY" },
        ],
      },
      {
        name: "Dua Lipa",
        description: "A modern pop icon, delivering infectious dance-pop anthems with bold energy.",
        songs: [
          { title: "Levitating", youtubeId: "TUVcZfQe-Kw" },
          { title: "Don't Start Now", youtubeId: "oygrmJFKYZY" },
          { title: "Physical", youtubeId: "9HDEHj2yzew" },
          { title: "Break My Heart", youtubeId: "jgh8owCuX78" },
          { title: "New Rules", youtubeId: "k2qgadSvNyU" },
          { title: "IDGAF", youtubeId: "Mg0AqBx1r_w" },
          { title: "Be the One", youtubeId: "mgI_pH8TOVY" },
          { title: "One Kiss", youtubeId: "DkeiKbqa02g" },
          { title: "Hotter Than Hell", youtubeId: "fEOyePhElr4" },
          { title: "Blow Your Mind", youtubeId: "ABkdx8G7D0o" },
        ],
      },
    ],
  },
  {
    name: "Jazz",
    description: "Immerse yourself in the soulful improvisation and smooth rhythms of Jazz, a timeless celebration of creativity.",
    coverImage: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    artists: [
      {
        name: "Miles Davis",
        description: "A jazz legend, revolutionizing the genre with his innovative trumpet and compositions.",
        songs: [
          { title: "So What", youtubeId: "ylXk1LBvIqU" },
          { title: "Freddie Freeloader", youtubeId: "ZZcuSBouhVA" },
          { title: "Blue in Green", youtubeId: "TLDflhhdPCg" },
          { title: "All Blues", youtubeId: "-488UORrfJ0" },
          { title: "Flamenco Sketches", youtubeId: "nTwp1sgUJrM" },
          { title: "Milestones", youtubeId: "k94zDsJ-JMU" },
          { title: "Nardis", youtubeId: "-hvS6ILqnUo" },
          { title: "Dig", youtubeId: "zQH022AoPEs" },
          { title: "Walkin'", youtubeId: "yGvRehV9bZU" },
          { title: "Seven Steps to Heaven", youtubeId: "Jq2XUoX6-TM" },
        ],
      },
      {
        name: "John Coltrane",
        description: "A saxophone virtuoso, whose spiritual and technical mastery reshaped jazz forever.",
        songs: [
          { title: "Giant Steps", youtubeId: "KwIC6B_dvW4" },
          { title: "Naima", youtubeId: "JV7RkpFNxmQ" },
          { title: "My Favorite Things", youtubeId: "JQvc-Gkwhow" },
          { title: "Cousin Mary", youtubeId: "HL1VaOnARYY" },
          { title: "Countdown", youtubeId: "RPS9nDFBeIE" },
          { title: "Impressions", youtubeId: "NACtkYkOHOA" },
          { title: "Moment's Notice", youtubeId: "gocGlRuW1bw" },
          { title: "Lazy Bird", youtubeId: "DAsUNTHRjaM" },
          { title: "Central Park West", youtubeId: "euE0wyRmyZs" },
          { title: "Equinox", youtubeId: "5m2HN2y0yV8" },
        ],
      },
    ],
  },
  {
    name: "Hip-Hop",
    description: "Experience the bold beats and lyrical storytelling of Hip-Hop, a voice for culture and revolution.",
    coverImage: "https://images.unsplash.com/photo-1517232115160-ff93364542dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    artists: [
      {
        name: "Eminem",
        description: "A lyrical genius, known for his raw emotion and rapid-fire delivery in hip-hop.",
        songs: [
          { title: "Lose Yourself", youtubeId: "_Yhyp-_hX2s" },
          { title: "Rap God", youtubeId: "Xb3Vq-PLzTg" },
          { title: "The Real Slim Shady", youtubeId: "eJO5HU_7_1w" },
          { title: "Without Me", youtubeId: "YVkUvmDQ3HY" },
          { title: "Not Afraid", youtubeId: "j5-yKhDd64s" },
          { title: "Love the Way You Lie", youtubeId: "uelHwf8o7_U" },
          { title: "Stan", youtubeId: "gOMhN-hfMtY" },
          { title: "Sing for the Moment", youtubeId: "6a2cVCRUHgk" },
          { title: "Mockingbird", youtubeId: "kffacxfA7G4" },
          { title: "Beautiful", youtubeId: "lgT1AidzRWM" },
        ],
      },
      {
        name: "Kendrick Lamar",
        description: "A poetic storyteller, weaving social commentary with intricate rhymes.",
        songs: [
          { title: "HUMBLE.", youtubeId: "tvTRZJ-4EyI" },
          { title: "DNA.", youtubeId: "NLZRYQMLDW4" },
          { title: "Alright", youtubeId: "Z-48u_uWMHY" },
          { title: "Swimming Pools", youtubeId: "dKKV3qfR0s0" },
          { title: "King Kunta", youtubeId: "up4FE0orJpw" },
          { title: "Money Trees", youtubeId: "cJZ7f6sO0WU" },
          { title: "Backseat Freestyle", youtubeId: "EZW7et3tPuQ" },
          { title: "Poetic Justice", youtubeId: "yyr2gEouEMM" },
          { title: "Loyalty", youtubeId: "v2BC2z9W6Ws" },
          { title: "The Blacker the Berry", youtubeId: "VdPtVZDspIY" },
        ],
      },
    ],
  },
  {
    name: "Classical",
    description: "Lose yourself in the elegant harmonies and timeless compositions of Classical music, a journey through history.",
    coverImage: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    artists: [
      {
        name: "Beethoven",
        description: "A titan of classical music, crafting symphonies that echo through centuries.",
        songs: [
          { title: "Symphony No.9", youtubeId: "rOjHhS5MtvA" },
          { title: "Moonlight Sonata", youtubeId: "4591dCHe_sE" },
          { title: "Fur Elise", youtubeId: "wfF0zHeU3Zs" },
          { title: "Pathetique Sonata", youtubeId: "SrcOcKYQX3c" },
          { title: "Symphony No.5", youtubeId: "fOk8Tm815lE" },
          { title: "Emperor Concerto", youtubeId: "kiW-QnQzN9Y" },
          { title: "Pastoral Symphony", youtubeId: "aW-7CqxhnAQ" },
          { title: "Piano Sonata No.14", youtubeId: "4591dCHe_sE" },
          { title: "Symphony No.6", youtubeId: "aW-7CqxhnAQ" },
          { title: "Egmont Overture", youtubeId: "8cEIlI6CZ7U" },
        ],
      },
      {
        name: "Mozart",
        description: "A prodigy whose elegant melodies and operas remain eternal masterpieces.",
        songs: [
          { title: "Eine kleine Nachtmusik", youtubeId: "oy2zDJPIgwc" },
          { title: "The Magic Flute", youtubeId: "YuBeBjqKSGQ" },
          { title: "Requiem", youtubeId: "Zi8vJ_lMxQI" },
          { title: "Piano Sonata No.16", youtubeId: "c9cQFvS--pA" },
          { title: "Symphony No.40", youtubeId: "JTc1mDieQI8" },
          { title: "Clarinet Concerto", youtubeId: "8OAp-Yb6fJk" },
          { title: "Don Giovanni", youtubeId: "XzuDDlyLX-s" },
          { title: "Ave Verum Corpus", youtubeId: "c5QfXjsoNe4" },
          { title: "Piano Concerto No.21", youtubeId: "V4iF2pwlyqg" },
          { title: "The Marriage of Figaro", youtubeId: "2Oel4P1Rz04" },
        ],
      },
    ],
  },
]