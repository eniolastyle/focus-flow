import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Star, Timer, Heart, ArrowRight, LayoutDashboard } from 'lucide-react';

interface FlowCompleteProps {
  duration: number; // in minutes
  onStartAnother: () => void;
  onBackToDashboard: () => void;
  plantType: string;
}

export default function FlowComplete({
  duration,
  onStartAnother,
  onBackToDashboard,
  plantType,
}: FlowCompleteProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Confetti celebration animation using HTML5 canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create organic green leaves falling particles list
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
      sway: number;
      swaySpeed: number;
    }> = [];

    const leafColors = [
      '#4a654f', // sage dark
      '#8daa91', // sage medium
      '#b0ceb4', // sage light
      '#d5e5ef', // sky soft
      '#b9c9d3', // slate soft
    ];

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height - 50,
        size: Math.random() * 10 + 6,
        speed: Math.random() * 1.5 + 1.2,
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 1.5 - 0.75,
        sway: Math.random() * 2 * Math.PI,
        swaySpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const drawLeaf = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      angle: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate((angle * Math.PI) / 180);
      c.fillStyle = color;

      // Draw beautiful pointed leaf path
      c.beginPath();
      c.moveTo(0, -size);
      c.quadraticCurveTo(size / 2, -size / 2, size / 3, size);
      c.quadraticCurveTo(0, size * 1.2, -size / 3, size);
      c.quadraticCurveTo(-size / 2, -size / 2, 0, -size);
      c.closePath();
      c.fill();

      // Soft white centerline
      c.strokeStyle = 'rgba(255,255,255,0.2)';
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(0, -size);
      c.lineTo(0, size);
      c.stroke();

      c.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speed;
        p.rotation += p.rotationSpeed;
        p.sway += p.swaySpeed;
        
        // Horizontal drift simulating a gentle breeze
        const currentX = p.x + Math.sin(p.sway) * 15;

        drawLeaf(ctx, currentX, p.y, p.size, p.color, p.rotation);

        // Recycle particles once off screen
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center px-6 py-12 select-none overflow-hidden">
      {/* Background Leaves Layer Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[60]" />

      <div className="max-w-[1140px] w-full flex flex-col items-center z-10">
        
        {/* Success Header and celebration text */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h2 className="font-sans text-3xl md:text-4px font-bold text-primary mb-2">
            Flow Complete
          </h2>
          <p className="font-sans text-base md:text-lg text-secondary">
            A moment of serenity, achieved.
          </p>
        </motion.div>

        {/* Grown plant showcase centerpiece */}
        <div className="relative w-full max-w-sm aspect-square flex items-center justify-center mb-10">
          <div className="absolute inset-0 bg-primary-container/10 rounded-full blur-3xl animate-pulse"></div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.0, ease: "easeOut" }}
            className="z-10 flex flex-col items-center"
          >
            {/* The hotlinked professional grown succulent mockup */}
            <img
              alt="Beautiful lush green grown plant"
              className="w-56 h-56 md:w-64 md:h-64 object-cover rounded-3xl shadow-lg border border-primary-container/40 hover:scale-103 transition-transform duration-500 filter"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI6Lc8tWho1PDwvCHkppf6ulsPI-GFZfyuXDHeey_DY1M0z-sifAR9MZK4W_Cmu8EbXHV_sdsOmU0_Z0DkSxpYETvGeFjOvj-H1iXOmzpSW2Uy8G0QlobRVEtyqcYFVNEjtkW31LHufSFTmk63OynzNihhAnZulu00Tzh046TU8dO0rX9d9ZR1xcNLoAO6Tzw3wzNsTcnHnZaVN4HJNeLWEnMpV07mzKOanDaoEIIMwRdQJWm30EmGSIeURDDYnFOEp00RMVkfd41F"
              referrerPolicy="no-referrer"
            />
            
            {/* Level up premium badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-4 bg-surface-container/90 backdrop-blur-md border border-primary-container/30 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm"
            >
              <Star className="h-4 w-4 text-primary fill-primary" />
              <span className="text-[10px] tracking-widest font-extrabold text-primary uppercase">
                Grown: {plantType}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Dynamic Statistics cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-12">
          
          <div className="bg-surface-container-lowest/75 backdrop-blur-md border border-outline-variant/20 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm">
            <Timer className="h-8 w-8 text-primary mb-2" />
            <p className="font-sans text-lg font-bold text-on-surface">
              {duration} Minutes Focused
            </p>
            <p className="text-[10px] tracking-wider font-semibold text-secondary mt-1 uppercase">
              TOTAL DURATION
            </p>
          </div>

          <div className="bg-surface-container-lowest/75 backdrop-blur-md border border-outline-variant/20 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm">
            <Heart className="h-8 w-8 text-rose-500/80 mb-2" />
            <p className="font-sans text-lg font-bold text-on-surface">
              1 Plant Added to your Garden
            </p>
            <p className="text-[10px] tracking-wider font-semibold text-secondary mt-1 uppercase">
              GROWTH REWARD
            </p>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
          <button
            onClick={onStartAnother}
            className="flex-1 bg-primary text-on-primary py-4 px-6 rounded-xl font-sans text-sm font-semibold hover:opacity-90 active:scale-97 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            Start Another Flow
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={onBackToDashboard}
            className="flex-1 bg-secondary-container text-on-secondary-container py-4 px-6 rounded-xl font-sans text-sm font-semibold hover:bg-surface-container active:scale-97 transition-all border border-outline-variant/30 cursor-pointer flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="h-4 w-4" />
            Back to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}
