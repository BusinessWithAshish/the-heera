// Everything on the home page that the owner may want to swap: photos and words.
// To change a photo, either replace the file in public/images/home/ (keep the same
// name), or put a new file there and change the path below. Tall photos work best
// for the banner strips; a dark, close-up, sparkly shot looks most like the design.

export const home = {
  announcement: "The Heera enters a new chapter.  Coming soon.",

  hero: {
    // Six tall strips side by side. Phones show the first three.
    images: [
      { src: "/images/home/hero-1.webp", alt: "Crystal mesh bucket bag up close" },
      { src: "/images/home/hero-2.webp", alt: "Pearl flap bag with beaded tassels" },
      { src: "/images/home/hero-3.webp", alt: "Gold crystal heart bag" },
      { src: "/images/home/hero-4.webp", alt: "Stardust mini bag held in hand" },
      { src: "/images/home/hero-5.webp", alt: "Black satin heels with a crystal brooch" },
      { src: "/images/home/hero-6.webp", alt: "Black crystal bucket bag" },
    ],
    title: "Coming",
    script: "Soon",
    subtitle: "This is just the beginning.",
    button: { label: "Shop the collection", href: "/shop" },
  },

  // The strip of four promises under the banner. Keep these true.
  promises: [
    { icon: "gem", title: "Designed with intention", body: "Every piece, uniquely crafted" },
    { icon: "sparkles", title: "Premium details", body: "Sewn by hand, crystal by crystal" },
    { icon: "bag", title: "Made to stand out", body: "For everyday & special moments" },
    { icon: "truck", title: "Free shipping", body: "Anywhere in India" },
  ],

  glamour: {
    image: { src: "/images/home/glamour.webp", alt: "Pearl Me Up bag carried with a black outfit" },
    title: "Everyday glamour",
    body: "Pieces that move with you, shine with you.",
    button: { label: "Explore", href: "/shop/bags" },
  },
} as const;
