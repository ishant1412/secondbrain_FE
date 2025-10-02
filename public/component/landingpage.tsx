import React, { useState, useEffect, useRef } from 'react';
import { Brain, Sparkles, Zap, ArrowRight, Stars, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './loading';

interface MousePosition {
  x: number;
  y: number;
}

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  rotation: number;
}

const SecondBrainLanding: React.FC = () => {
  const[loading,setloading]= useState(false);
    const navigate = useNavigate()
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    const elements: FloatingElement[] = [];
    for (let i = 0; i < 20; i++) {
      elements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 2 + 1,
        rotation: Math.random() * 360,
      });
    }
    setFloatingElements(elements);

    const interval = setInterval(() => {
      setFloatingElements(prev => 
        prev.map(el => ({
          ...el,
          y: (el.y + el.speed * 0.1) % 100,
          rotation: (el.rotation + 0.5) % 360,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const cursorStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
      rgba(139, 92, 246, 0.15) 0%, 
      rgba(59, 130, 246, 0.1) 25%, 
      rgba(16, 185, 129, 0.05) 50%, 
      transparent 70%)`,
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden"
      style={cursorStyle}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute animate-pulse"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              opacity: element.opacity,
              transform: `rotate(${element.rotation}deg)`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-sm" />
          </div>
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-5xl mx-auto">
          
          {/* Logo/Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 scale-110" />
              <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-full">
                <Brain className="w-16 h-16 text-white animate-pulse" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-500 to-blue-500 bg-clip-text text-transparent mb-6 leading-tight">
            Your Second
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              Brain
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Unlock your mind's potential with AI-powered knowledge management. 
            Capture, connect, and create like never before.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            {[
              { icon: <Sparkles className="w-8 h-8" />, title: "Smart Connections", desc: "AI finds hidden links between your thoughts" },
              { icon: <Zap className="w-8 h-8" />, title: "Instant Recall", desc: "Search through your entire knowledge base instantly" },
              { icon: <Lightbulb className="w-8 h-8" />, title: "Creative Insights", desc: "Generate new ideas from your existing knowledge" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-purple-500/50"
              >
                <div className="text-purple-400 mb-4 group-hover:text-purple-300 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-bold text-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <div className="relative flex items-center space-x-3" tabIndex={0} onClick={()=>{
                 setloading(true);
                navigate("/signin");
                setloading(false);
              }}>{loading  && <LoadingSpinner></LoadingSpinner>}
               {!loading &&  <span>Get Started</span>}
                <ArrowRight className={`w-6 h-6 transition-transform duration-300 ${isHovering ? 'translate-x-2' : ''}`} />
              </div>
              
              {/* Animated particles on hover */}
              {isHovering && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full animate-ping"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: '2s',
                      }}
                    />
                  ))}
                </div>
              )}
            </button>
          </div>

          {/* Bottom decorative elements */}
          <div className="mt-16 flex justify-center space-x-8 opacity-30">
            <Stars className="w-8 h-8 text-purple-400 animate-pulse" />
            <div className="w-px h-8 bg-gradient-to-b from-purple-400 to-transparent" />
            <Stars className="w-8 h-8 text-blue-400 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default SecondBrainLanding;