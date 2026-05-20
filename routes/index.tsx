export default function Home() {
  // 1. Category Data Array
  const categories = [
    { name: "Eyeglasses", img: "/categories/eyeglasses.webp", link: "/products", badge: null },
    { name: "Sunglasses", img: "/categories/sunglasses.webp", link: "/products", badge: null },
    { name: "Special Power", img: "/categories/special.webp", link: "/products", badge: null },
    { name: "Contact Lenses", img: "/categories/contacts.webp", link: "/products", badge: null },
    { name: "Kids Glasses", img: "/categories/kids.webp", link: "/products", badge: null },
    { name: "Sale", img: "/categories/sale.webp", link: "/products", badge: "60% OFF" },
  ];

  // 2. Eyeglasses Shape Data Array
  const eyeShapes = [
    { name: "Rectangle", img: "/shapes/rectangle.webp", link: "/products?category=eyeglasses&shape=rectangle" },
    { name: "Cateye", img: "/shapes/cateye.webp", link: "/products?category=eyeglasses&shape=cateye" },
    { name: "Aviator", img: "/shapes/aviator.webp", link: "/products?category=eyeglasses&shape=aviator" },
    { name: "Geometric", img: "/shapes/geometric.webp", link: "/products?category=eyeglasses&shape=geometric" },
    { name: "Round", img: "/shapes/round.webp", link: "/products?category=eyeglasses&shape=round" },
    { name: "Clubmaster", img: "/shapes/clubmaster.webp", link: "/products?category=eyeglasses&shape=clubmaster" },
    { name: "Square", img: "/shapes/square.webp", link: "/products?category=eyeglasses&shape=square" },
  ];

  // 3. Sunglasses Shape Data Array
  const sunShapes = [
    { name: "Aviator", img: "/shapes/sun-aviator.webp", link: "/products?category=sunglasses&shape=aviator" },
    { name: "Round", img: "/shapes/sun-round.webp", link: "/products?category=sunglasses&shape=round" },
    { name: "Rectangle", img: "/shapes/sun-rectangle.webp", link: "/products?category=sunglasses&shape=rectangle" },
    { name: "Cat Eye", img: "/shapes/sun-cateye.webp", link: "/products?category=sunglasses&shape=cateye" },
    { name: "Geometric", img: "/shapes/sun-geometric.webp", link: "/products?category=sunglasses&shape=geometric" },
    { name: "Clubmaster", img: "/shapes/sun-clubmaster.webp", link: "/products?category=sunglasses&shape=clubmaster" },
  ];

  // 4. Eye Check Up Promos Array
  const checkupPromos = [
    {
      title: "Free Check-Up Days",
      subtitle: "Walk-in every Mon & Tue for a complimentary Eye Check-Up.",
      img: "/promos/store-checkup.webp",
      link: "/stores",
    },
    {
      title: "Free Student Eye Check-Up",
      subtitle: "Complimentary Eye Check-Up everyday. Valid Student ID required.",
      img: "/promos/student-checkup.webp",
      link: "/stores?promo=student",
    },
  ];

  return (
    <div class="w-full pb-20 relative bg-[#000042]">
      
      {/* --- FOOLPROOF INLINE CSS MESH GRADIENT --- */}
      <style>{`
        .bg-vibrant-mesh {
          background-color: #000042;
          background-image: 
            radial-gradient(at 0% 0%, rgba(239, 68, 68, 0.6) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(37, 99, 235, 0.7) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(217, 70, 239, 0.5) 0px, transparent 60%),
            radial-gradient(at 0% 100%, rgba(29, 78, 216, 0.8) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(220, 38, 38, 0.6) 0px, transparent 50%);
          background-size: 200% 200%;
          animation: meshWave 12s ease infinite;
        }
        @keyframes meshWave {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* --- Fixed Background Layer --- */}
      <div class="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-vibrant-mesh"></div>

      {/* --- Sticky Left WhatsApp Banner --- */}
      <a
        href="https://wa.me/918801422414?text=Hi! I am visiting your website and have a question."
        target="_blank"
        class="fixed left-0 top-1/2 -translate-y-1/2 z-[999] flex flex-col items-center justify-center gap-2 md:gap-3 bg-[#25D366] text-white px-1.5 py-3 md:px-2 md:py-5 rounded-r-xl shadow-2xl hover:bg-[#1fad53] hover:pr-4 md:hover:pr-4 transition-all duration-300 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 1.742 6.136L0 24l6.002-1.573A11.9 11.9 0 0 0 11.944 24c6.602 0 12.056-5.418 12.056-12S18.546 0 11.944 0zm6.236 17.21c-.244.692-1.42 1.272-1.956 1.32-.505.045-1.15.176-3.66-1.026-3.04-1.455-4.996-4.664-5.144-4.86-.148-.196-1.228-1.636-1.228-3.12 0-1.484.772-2.216 1.04-2.508.268-.292.584-.364.776-.364.192 0 .384-.004.552-.004.18 0 .42.068.66.644.252.604.812 1.984.884 2.132.072.148.12.324.024.52-.096.196-.148.316-.296.488-.148.172-.312.368-.44.496-.144.148-.296.312-.124.612.172.3.764 1.268 1.632 2.044 1.12.996 2.064 1.304 2.364 1.452.3.148.476.124.656-.076.18-.2.772-.896.976-1.2.204-.304.408-.252.684-.148.276.104 1.74.82 2.04.972.3.148.54.224.756.364.216.14.308.796-.06 1.312z"/>
        </svg>
        <div class="flex flex-col items-center font-black text-[10px] md:text-sm tracking-widest leading-tight mt-1">
          <span>C</span><span>H</span><span>A</span><span>T</span>
          <div class="h-1.5 md:h-2"></div>
          <span>W</span><span>I</span><span>T</span><span>H</span>
          <div class="h-1.5 md:h-2"></div>
          <span>U</span><span>S</span>
        </div>
      </a>

      {/* --- Sticky Right Banner (ABHISHEK DOA) --- */}
      <div class="fixed right-0 top-1/2 -translate-y-1/2 z-[999] flex flex-col items-center justify-center bg-blue-600 text-white px-1.5 py-3 md:px-2 md:py-5 rounded-l-xl shadow-2xl hover:bg-blue-700 hover:pl-4 md:hover:pl-4 transition-all duration-300 cursor-pointer group">
        <div class="flex flex-col items-center font-black text-[10px] md:text-sm tracking-widest leading-tight">
          <span>A</span><span>B</span><span>H</span><span>I</span><span>S</span><span>H</span><span>E</span><span>K</span>
          <div class="h-1.5 md:h-3"></div> 
          <span>D</span><span>O</span><span>A</span>
        </div>
      </div>

      {/* --- Full-Bleed Translucent Hero Section (FIXED SPACING) --- */}
      {/* Changed min-h-[75vh] to natural vertical padding (py-16 md:py-24) so it scales perfectly */}
      <section class="w-full flex flex-col items-center justify-center text-center p-6 py-16 md:py-24 bg-white/20 backdrop-blur-md relative border-b border-white/10">
        <div class="max-w-4xl mx-auto flex flex-col items-center">
            <span class="bg-white/90 text-blue-700 border border-blue-200 px-4 py-1.5 rounded-full text-xs font-bold mb-8 tracking-wide uppercase shadow-sm">
                Try Before You Buy
            </span>
            <h1 class="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 text-white leading-[1.1]">
                Find your perfect frame. <br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
                Instantly.
                </span>
            </h1>
            <p class="text-lg md:text-xl text-gray-100 max-w-2xl mb-12 font-medium leading-relaxed">
                Skip the showroom. Use our premium 3D WebGL augmented reality engine to see how our frames look on your face right now.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a href="/tryon" class="bg-white text-[#000042] px-10 py-5 rounded-xl font-bold text-base hover:bg-gray-100 transition shadow-xl hover:-translate-y-1 text-center">
                Live 3D Try-On
                </a>
                <a href="/products" class="bg-white/10 backdrop-blur border-2 border-white/20 text-white px-10 py-5 rounded-xl font-bold text-base hover:bg-white/20 transition hover:-translate-y-1 shadow-sm text-center">
                Browse Catalog
                </a>
            </div>
        </div>
      </section>

      {/* --- Main Content Container (White pull-up card) --- */}
      {/* REMOVED -mt-12 completely so it naturally flows right below the hero text without overlapping */}
      <div class="max-w-5xl mx-auto px-4 relative bg-white rounded-t-[40px] pt-12 shadow-[0_-10px_40px_rgba(0,0,0,0.15)]">
          
          {/* --- Top Categories Section --- */}
          <section class="pb-6">
            <h2 class="text-2xl font-extrabold text-[#000042] mb-8 tracking-tight">Top Categories</h2>
            <div class="flex gap-4 overflow-x-auto pb-4 snap-x" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {categories.map((cat) => (
                <a href={cat.link} class="flex flex-col items-center gap-4 min-w-[110px] sm:min-w-[130px] snap-start group cursor-pointer">
                  <div class="w-full aspect-[4/3] bg-[#F5F5F7] rounded-3xl flex items-center justify-center p-3 relative group-hover:bg-[#EBEBEF] transition duration-300 border border-transparent hover:border-gray-200 shadow-sm">
                    <img src={cat.img} alt={cat.name} class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-300" />
                    {cat.badge && (
                      <span class="absolute -bottom-2.5 bg-blue-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-lg z-10 whitespace-nowrap tracking-wide">
                        {cat.badge}
                      </span>
                    )}
                  </div>
                  <span class="text-[13px] font-semibold text-gray-700 group-hover:text-[#000042] transition text-center">
                    {cat.name}
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* --- Get the perfect shape - Eyeglasses --- */}
          <section class="pt-8 pb-6 border-t border-gray-100 mt-2">
            <h2 class="text-2xl font-extrabold text-[#000042] mb-10 tracking-tight">Get the perfect shape - Eyeglasses</h2>
            <div class="flex gap-6 overflow-x-auto pb-4 snap-x" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {eyeShapes.map((shape) => (
                <a href={shape.link} class="flex flex-col items-center gap-4 min-w-[100px] sm:min-w-[120px] snap-start group cursor-pointer">
                  <div class="w-24 h-24 sm:w-32 sm:h-32 bg-[#F5F5F7] rounded-full flex items-center justify-center p-4 relative group-hover:bg-[#EBEBEF] transition duration-300 border border-transparent hover:border-gray-200 shadow-inner">
                    <img src={shape.img} alt={shape.name} class="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition duration-300" />
                  </div>
                  <span class="text-[14px] font-bold text-gray-800 group-hover:text-[#000042] transition text-center leading-tight">
                    {shape.name}
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* --- Get the perfect shape - Sunglasses --- */}
          <section class="pt-8 pb-10 border-t border-gray-100">
            <h2 class="text-2xl font-extrabold text-[#000042] mb-10 tracking-tight">Get the perfect shape - Sunglasses</h2>
            <div class="flex gap-6 overflow-x-auto pb-4 snap-x" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {sunShapes.map((shape) => (
                <a href={shape.link} class="flex flex-col items-center gap-4 min-w-[100px] sm:min-w-[120px] snap-start group cursor-pointer">
                  <div class="w-24 h-24 sm:w-32 sm:h-32 bg-[#F5F5F7] rounded-full flex items-center justify-center p-4 relative group-hover:bg-[#EBEBEF] transition duration-300 border border-transparent hover:border-gray-200 shadow-inner">
                    <img src={shape.img} alt={shape.name} class="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition duration-300" />
                  </div>
                  <span class="text-[14px] font-bold text-gray-800 group-hover:text-[#000042] transition text-center leading-tight">
                    {shape.name}
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* --- Get a FREE Eye Check Up Section --- */}
          <section class="pt-12 pb-16 border-t border-gray-100 rounded-[40px] bg-gray-50/50 -mx-4 px-4 mb-4">
            <div class="max-w-5xl mx-auto">
                <h2 class="text-3xl font-extrabold text-[#000042] mb-12 tracking-tight text-center md:text-left">Get a FREE Eye Check Up</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {checkupPromos.map((promo) => (
                    <a href={promo.link} class="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group flex flex-col h-full hover:-translate-y-1">
                    <div class="w-full h-60 sm:h-64 overflow-hidden bg-gray-100">
                        <img src={promo.img} alt={promo.title} class="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                    </div>
                    <div class="p-8 flex flex-col flex-grow justify-between">
                        <div>
                        <h3 class="text-2xl font-bold text-[#000042] mb-3">{promo.title}</h3>
                        <p class="text-base text-gray-600 font-medium leading-relaxed">{promo.subtitle}</p>
                        </div>
                        <div class="flex justify-end mt-8">
                        <div class="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#000042] group-hover:border-[#000042] group-hover:text-white transition duration-300 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </div>
                        </div>
                    </div>
                    </a>
                ))}
                </div>
            </div>
          </section>
      </div>
    </div>
  );
}