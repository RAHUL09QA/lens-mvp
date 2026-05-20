import { useEffect, useRef, useState } from "preact/hooks";
import { FaceLandmarker, FilesetResolver } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/+esm";

export default function VirtualTryOn() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Hidden canvas used for the initial face detection and cropping processing
  const processingCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [faceShape, setFaceShape] = useState<string>("Analyzing...");
  const [mode, setMode] = useState<"video" | "image">("video");
  
  
  const [activeFrameUrl, setActiveFrameUrl] = useState("/frames/frame1.webp"); 
  const glassesImgRef = useRef<HTMLImageElement | null>(null);
  
  // deno-lint-ignore no-explicit-any
  const faceLandmarkerRef = useRef<any>(null);

  // Flow 1: Read the frame ID from the URL parameter (e.g., ?frame=3)
  useEffect(() => {
    const urlParams = new URLSearchParams(globalThis.location.search);
    const frameId = urlParams.get("frame") || "1";
    setActiveFrameUrl(`/frames/frame${frameId}.webp`);
  }, []);

  // Preload the glasses image whenever the active frame state changes
  useEffect(() => {
    const img = new Image();
    img.src = activeFrameUrl;
    img.onload = () => { glassesImgRef.current = img; };
  }, [activeFrameUrl]);

  // Main Effect to Initialize MediaPipe and manage Video Loop
  useEffect(() => {
    let animationFrameId: number;

    const initializeEngine = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );
      
      faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          delegate: "GPU"
        },
        runningMode: "VIDEO", 
      });

      startCamera();
    };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            if (canvasRef.current) {
              canvasRef.current.width = videoRef.current!.videoWidth;
              canvasRef.current.height = videoRef.current!.videoHeight;
            }
            setIsLoaded(true);
            setMode("video");
            renderVideoLoop();
          };
        }
      } catch (err) {
        console.error("Camera access denied", err);
        setIsLoaded(true); // Still load UI so they can use Photo Upload
      }
    };

    const renderVideoLoop = () => {
      if (mode !== "video" || !videoRef.current || !canvasRef.current || !faceLandmarkerRef.current) return;
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const results = faceLandmarkerRef.current.detectForVideo(video, performance.now());
      drawGlassesAndMesh(results, canvas, ctx);
      
      animationFrameId = requestAnimationFrame(renderVideoLoop);
    };

    initializeEngine();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [mode]);

  // NEW: Intelligent Cropping & Face Selection Engine
  const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (file && faceLandmarkerRef.current) {
      // Show loading indicator during heavy processing phase
      setIsProcessing(true);
      
      // Stop live camera to save resources
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const originalImageDataUrl = e.target?.result as string;
        
        // Load raw image to process it
        const originalImg = new Image();
        originalImg.src = originalImageDataUrl;
        
        originalImg.onload = async () => {
          if (!processingCanvasRef.current || !canvasRef.current) return;
          const procCanvas = processingCanvasRef.current;
          const procCtx = procCanvas.getContext("2d");
          if (!procCtx) return;

          // Initialize processing canvas with full image data
          procCanvas.width = originalImg.naturalWidth;
          procCanvas.height = originalImg.naturalHeight;
          procCtx.drawImage(originalImg, 0, 0);

          // Phase 1: AI Detect landmarks on raw raw uncropped image data
          await faceLandmarkerRef.current.setOptions({ runningMode: "IMAGE" });
          const results = faceLandmarkerRef.current.detect(procCanvas);
          
          if (results.faceLandmarks && results.faceLandmarks.length > 0) {
            const landmarks = results.faceLandmarks[0];

            // 1. Calculate bounding box of the face contour
            let minX = 1, minY = 1, maxX = 0, maxY = 0;
            landmarks.forEach((lm: { x: number, y: number }) => {
              if (lm.x < minX) minX = lm.x;
              if (lm.y < minY) minY = lm.y;
              if (lm.x > maxX) maxX = lm.x;
              if (lm.y > maxY) maxY = lm.y;
            });

            // 2. Convert normalized (0-1) coordinates to pixel coordinates
            const imgW = originalImg.naturalWidth;
            const imgH = originalImg.naturalHeight;
            let cropX = minX * imgW;
            let cropY = minY * imgH;
            let cropW = (maxX - minX) * imgW;
            let cropH = (maxY - minY) * imgH;

            // 3. APPLY INTELLIGENT PADDING (Crucial for a clean shot)
            // Add roughly 30% width padding on each side for hair/glasses arms
            const xPadding = cropW * 0.3;
            // Add extra top padding for forehead height (MediaPipe contour stops at brow line)
            const yPaddingTop = cropH * 0.5; 
            const yPaddingBottom = cropH * 0.1;

            cropX -= xPadding;
            cropY -= yPaddingTop;
            cropW += (xPadding * 2);
            cropH += (yPaddingTop + yPaddingBottom);

            // 4. Ensure we don't crop outside image boundaries
            cropX = Math.max(0, cropX);
            cropY = Math.max(0, cropY);
            cropW = Math.min(imgW - cropX, cropW);
            cropH = Math.min(imgH - cropY, cropH);

            // Phase 2: Perform the "Zoom & Crop" Operation on the processing canvas
            // We set the main viewport canvas dimensions to standardized proportions (Standard Portrait/Square)
            const targetCanvas = canvasRef.current;
            const targetCtx = targetCanvas.getContext("2d");
            if (!targetCtx) return;
            
            // Standardizing the viewport ensures math remains accurate
            targetCanvas.width = 600; 
            targetCanvas.height = 800; // 3:4 Aspect Ratio standardized viewport
            
            targetCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
            
            // This is the core magic: Drawing a specific SUB-SECTION of the source image 
            // into the full destination canvas context (SourceX, SourceY, SourceW, SourceH, DestX, DestY, DestW, DestH)
            targetCtx.drawImage(
              originalImg, 
              cropX, cropY, cropW, cropH, // Source sub-rect
              0, 0, targetCanvas.width, targetCanvas.height // Fill full destination viewport
            );

                        
            setMode("image");
            
            // Phase 4: Run AI Shape Prediction and Virtual Try-On on the final finalized Viewport context
            setTimeout(async () => {
              await faceLandmarkerRef.current.setOptions({ runningMode: "IMAGE" });
              // Detect landmarks again, but on the normalized cropped image sitting on the main canvas
              const croppedResults = faceLandmarkerRef.current.detect(targetCanvas);
              
              // Draw prediction mesh and glasses onto the cropped standard viewport context
              drawGlassesAndMesh(croppedResults, targetCanvas, targetCtx);
              setIsProcessing(false);
              setIsLoaded(true);
            }, 100);

          } else {
            console.error("No face detected in upload.");
            setIsProcessing(false);
            globalThis.alert("Face not detected. Please upload a clear forward-facing photo.");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Shared pseudo-3D drawing logic with High-Tech Face Mesh Overlay
  // deno-lint-ignore no-explicit-any
  const drawGlassesAndMesh = (results: any, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    if (results.faceLandmarks && results.faceLandmarks.length > 0) {
      const landmarks = results.faceLandmarks[0];
      
      const faceHeight = Math.abs(landmarks[10].y - landmarks[152].y);
      const faceWidth = Math.abs(landmarks[234].x - landmarks[454].x);
      const ratio = faceWidth / faceHeight;
      const detectedShape = ratio > 0.85 ? "Round / Square" : "Oval / Long";
      setFaceShape(detectedShape);

      // Flow 2: If using upload consulting mode, auto-switch to a suitable frame style
      if (mode === "image") {
        if (ratio > 0.85 && !activeFrameUrl.includes("frame3.webp")) {
          setActiveFrameUrl("/frames/frame3.webp"); // Aviators look best on round faces
        } else if (ratio <= 0.85 && !activeFrameUrl.includes("frame1.webp")) {
          setActiveFrameUrl("/frames/frame1.webp"); // Round frames balance long faces
        }
      }

      // --- HIGH-TECH SCI-FI FACE MESH ---
      ctx.strokeStyle = "rgba(6, 182, 212, 0.4)"; // Neon Cyan
      ctx.lineWidth = 1;

      const drawPath = (indices: number[], close = false) => {
        ctx.beginPath();
        indices.forEach((idx, i) => {
          const pt = landmarks[idx];
          if (i === 0) ctx.moveTo(pt.x * canvas.width, pt.y * canvas.height);
          else ctx.lineTo(pt.x * canvas.width, pt.y * canvas.height);
        });
        if (close) ctx.closePath();
        ctx.stroke();
      };
      // Key structural wireframes
      drawPath([10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109], true);
      drawPath([168, 6, 197, 195, 5], false); // Nose
      drawPath([33, 160, 158, 133, 153, 144], true); // Left eye contour
      drawPath([263, 387, 385, 362, 380, 373], true); // Right eye contour

      // Focal nodes
      ctx.fillStyle = "rgba(6, 182, 212, 0.8)";
      [10, 152, 234, 454, 168, 33, 263].forEach(idx => {
        const pt = landmarks[idx];
        ctx.beginPath(); ctx.arc(pt.x * canvas.width, pt.y * canvas.height, 3, 0, 2 * Math.PI); ctx.fill();
      });
      // --- END MESH ---

      // --- CANVAS GLASSES OVERLAY ENGINE (Pseudo-3D) ---
      if (glassesImgRef.current) {
        const leftEye = landmarks[33];
        const rightEye = landmarks[263];
        const noseBridge = landmarks[168];

        const dx = rightEye.x - leftEye.x;
        const dy = rightEye.y - leftEye.y;
        const angle = Math.atan2(dy, dx);

        const leftCheek = landmarks[234];
        const rightCheek = landmarks[454];
        const distToLeft = Math.abs(noseBridge.x - leftCheek.x);
        const distToRight = Math.abs(rightCheek.x - noseBridge.x);
        const turnRatio = distToLeft / (distToLeft + distToRight);
        const yawScale = Math.cos((turnRatio - 0.5) * Math.PI * 0.6); 

        const pixelFaceWidth = faceWidth * canvas.width;
        // Adjusted scaling multiplier for zoomed face shots (slightly smaller than wide video shots)
        const glassesWidth = pixelFaceWidth * 1.05; 
        const glassesHeight = glassesWidth * (glassesImgRef.current.height / glassesImgRef.current.width);

        const centerX = noseBridge.x * canvas.width;
        const centerY = noseBridge.y * canvas.height;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        ctx.scale(yawScale, 1.0);
        const perspectiveXOffset = (turnRatio - 0.5) * (glassesWidth * 0.15);
        ctx.drawImage(
          glassesImgRef.current, 
          (-glassesWidth / 2) + perspectiveXOffset, 
          -glassesHeight / 2, 
          glassesWidth, 
          glassesHeight
        );
        ctx.restore();
      }
    } else if (mode === "video") {
      setFaceShape("Searching for face...");
    }
  };

  return (
    <div class="flex flex-col items-center gap-6 p-4 w-full">
      
      {/* Hidden processing canvas used for initial full-image face detection and cropping context */}
      <canvas ref={processingCanvasRef} class="hidden" />

      {/* Control Panel */}
      <div class="flex gap-4 mb-2 items-center">
        <label class="cursor-pointer bg-blue-50 text-blue-700 px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-100 transition border border-blue-200">
          📸 Step 1: Upload Photo for Diagnostic
          <input type="file" accept="image/*" class="hidden" onChange={handleFileUpload} />
        </label>
        
        {mode === "image" && (
          <button 
            type="button"
            onClick={() => globalThis.location.reload()} 
            class="text-gray-600 px-3 py-2 text-sm hover:text-gray-900 transition"
          >
            ← Back to Live Camera
          </button>
        )}
      </div>

      {/* AR Viewport */}
      <div class="relative w-full max-w-md bg-gray-100 rounded-xl overflow-hidden aspect-[3/4] shadow-xl border border-gray-200 flex items-center justify-center">
        
        {/* Diagnostic/Loading State */}
        {(!isLoaded || isProcessing) && (
          <div class="absolute inset-0 flex flex-col items-center justify-center text-gray-500 font-medium z-20 bg-gray-50">
            <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            {isProcessing ? "AI Detecting & Cropping..." : "Initializing..."}
          </div>
        )}
        
        <video 
          ref={videoRef} 
          class={`absolute w-full h-full object-cover scale-x-[-1] ${mode === "video" ? "block" : "hidden"}`} 
          playsInline 
          muted 
        />
        
        {/* The main viewport canvas where the FINAL normalized/cropped shot and AR overlays are rendered */}
        <canvas 
          ref={canvasRef} 
          class={`absolute top-0 left-0 w-full h-full object-cover z-10 ${mode === "video" ? "scale-x-[-1] pointer-events-none" : ""}`} 
        />
      </div>

      {/* Prediction Output & Call-To-Action (Flow Step 2 & 3) */}
      {isLoaded && (
        <div class="w-full max-w-md bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center z-20">
          <p class="text-sm text-gray-500 uppercase tracking-wider mb-2 font-bold">Prathima Diagnostic</p>
          <p class="text-lg font-medium text-gray-900 mb-6">Predicted Shape: {faceShape}</p>
          
          <a 
            href="https://wa.me/918639388873?text=Hi, I ran the Lenskart diagnostic via photo upload. I'm Oval/Long and want pricing for Frame #1. The Aviator." 
            target="_blank"
            class="block w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition"
          >
            Send Diagnostic to WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}