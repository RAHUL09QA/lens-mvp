import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Prathima Eye Care Centre  | Try Before You Buy</title>
        
        {/* --- ADDED THIS LINE FOR YOUR FAVICON --- */}
        <link rel="icon" href="/logo.svg" type="image/x-icon" />
        
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="bg-gray-50 text-gray-900 font-sans antialiased flex flex-col min-h-screen">
        {/* Minimal Navbar */}
        <header class="bg-white shadow-sm sticky top-0 z-50">
          {/* ADDED 'gap-2' here to force a strict separation between logo and nav */}
          <div class="max-w-5xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between gap-2">
            
            {/* Logo: Scaled down to text-base on super small phones, text-xl on normal mobiles */}
            <a href="/" class="text-base sm:text-xl md:text-2xl font-black tracking-tighter shrink-0">
              PRATHIMA<span class="text-blue-600">OPTICALS</span>
            </a>
            
            {/* Nav Container: Reduced mobile gap to gap-1.5 to save space */}
            <nav class="flex items-center gap-1.5 sm:gap-3 md:gap-6 shrink-0">
              
              {/* Clickable Owner Contact Number */}
              <a 
                href="tel:+918801422414" 
                class="flex items-center gap-1 text-gray-800 hover:text-[#25D366] font-extrabold text-[10px] sm:text-[11px] md:text-sm tracking-wide transition-colors"
              >
                {/* Green Phone Circle SVG (Scaled down slightly more for mobile) */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#25D366]">
                  <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd" />
                </svg>
                <span class="whitespace-nowrap">+91 8801422414</span>
              </a>

              {/* AR Try-On Link (Added a subtle background on mobile so it looks like a distinct button) */}
              <a href="/tryon" class="bg-gray-100 md:bg-transparent px-2 py-1 md:p-0 rounded text-[10px] sm:text-xs md:text-base hover:text-blue-600 transition font-bold whitespace-nowrap">
                AR Try-On
              </a>

            </nav>
          </div>
        </header>
        {/* Main Content Area */}
        <main class="flex-grow">
          <Component />
        </main>

        {/* Lean Footer */}
        <footer class="bg-gray-900 text-gray-400 py-8 text-center text-sm">
          <p>© WarpX Built for speed.</p>
        </footer>
      </body>
    </html>
  );
}