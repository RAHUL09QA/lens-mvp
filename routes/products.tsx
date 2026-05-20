export default function Products() {
    const frames = [
      { id: 1, name: "The Architect", shape: "Round", price: "$120", img: "/frames/frame1.webp" },
      { id: 2, name: "The Executive", shape: "Square", price: "$145", img: "/frames/frame2.webp" },
      { id: 3, name: "The Aviator", shape: "Aviator", price: "$95", img: "/frames/frame3.webp" },
    ];
  
    return (
      <div class="max-w-5xl mx-auto px-4 py-12">
        <h1 class="text-3xl font-bold mb-8">Browse Collection</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          {frames.map((frame) => (
            <div key={frame.id} class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
              {/* Note: Ensure you have placeholder .webp images in your static/frames folder, 
                otherwise these will show as broken links.
              */}
              <div class="h-64 bg-gray-50 flex items-center justify-center p-6">
                <img src={frame.img} alt={frame.name} class="w-full object-contain group-hover:scale-105 transition" />
              </div>
              <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-bold text-lg">{frame.name}</h3>
                  <span class="font-medium text-gray-900">{frame.price}</span>
                </div>
                <p class="text-sm text-gray-500 mb-6">Best for: {frame.shape} faces</p>
                <a 
                  href={`/tryon?frame=${frame.id}`} 
                  class="block w-full text-center bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition"
                >
                  Try On
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }