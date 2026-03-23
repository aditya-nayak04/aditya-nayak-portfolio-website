tailwind.config = {
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        navy: { 50:'#f0f4f9', 100:'#d9e3f0', 200:'#b3c7e1', 300:'#7fa4cb', 400:'#4f7cac', 500:'#2d5a8e', 600:'#1e3f6b', 700:'#152d4e', 800:'#0f1f36', 900:'#0a1520' },
        slate2: { 50:'#f8fafc', 100:'#f1f5f9', 200:'#e2e8f0', 300:'#cbd5e1', 400:'#94a3b8', 500:'#64748b', 600:'#475569', 700:'#334155', 800:'#1e293b', 900:'#0f172a' }
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-right': 'slideRight 0.8s ease forwards',
      },
      keyframes: {
        fadeUp: { '0%': { opacity:'0', transform:'translateY(28px)' }, '100%': { opacity:'1', transform:'translateY(0)' } },
        fadeIn: { '0%': { opacity:'0' }, '100%': { opacity:'1' } },
        slideRight: { '0%': { opacity:'0', transform:'translateX(-24px)' }, '100%': { opacity:'1', transform:'translateX(0)' } },
      }
    }
  }
};
