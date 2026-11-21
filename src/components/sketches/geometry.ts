// Build-time helpers for the research sketches. Nothing here ships to the browser.

/** Path for an open arrowhead at (tipX, tipY), pointing away from (fromX, fromY). */
export function arrowhead(tipX: number, tipY: number, fromX: number, fromY: number, size = 8): string {
  const angle = Math.atan2(tipY - fromY, tipX - fromX);
  const wing = (offset: number) => {
    const a = angle + Math.PI + offset;
    return `${(tipX + size * Math.cos(a)).toFixed(1)} ${(tipY + size * Math.sin(a)).toFixed(1)}`;
  };
  return `M${wing(0.5)} L${tipX} ${tipY} L${wing(-0.5)}`;
}

/** Check mark and cross glyphs centered on (cx, cy). */
export const check = (cx: number, cy: number) => `M${cx - 5} ${cy} L${cx - 1.5} ${cy + 4} L${cx + 5.5} ${cy - 4.5}`;
export const cross = (cx: number, cy: number) => `M${cx - 4.5} ${cy - 4.5} L${cx + 4.5} ${cy + 4.5} M${cx + 4.5} ${cy - 4.5} L${cx - 4.5} ${cy + 4.5}`;
