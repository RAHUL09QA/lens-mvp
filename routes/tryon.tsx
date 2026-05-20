import VirtualTryOn from "../islands/VirtualTryOn.tsx";

export default function TryOnPage() {
  return (
    <div class="max-w-5xl mx-auto px-4 py-12 flex flex-col items-center">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-2">Live AR Try-On</h1>
        <p class="text-gray-600">
          Please allow camera permissions to see the frames on your face in real-time.
        </p>
      </div>
      
      {/* This imports and mounts the heavy AR camera logic only on this specific page */}
      <VirtualTryOn /> 
    </div>
  );
}