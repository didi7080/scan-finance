export default function confetti() {
  if (typeof window === "undefined") return;
  const colors = ["#D4A017", "#FFD966", "#FFCC33", "#B8860B", "#22c55e"];
  const count = 60;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.style.cssText = `
      position: fixed;
      top: -10px;
      left: ${Math.random() * 100}vw;
      width: ${4 + Math.random() * 6}px;
      height: ${4 + Math.random() * 6}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
      z-index: 9999;
      pointer-events: none;
      animation: confetti-fall ${1.5 + Math.random() * 2}s linear forwards;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }

  if (!document.getElementById("confetti-style")) {
    const style = document.createElement("style");
    style.id = "confetti-style";
    style.textContent = `
      @keyframes confetti-fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(${360 + Math.random() * 360}deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}
