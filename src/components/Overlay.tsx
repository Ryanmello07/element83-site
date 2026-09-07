/**
 * Consolidated atmosphere overlay (design §7): a single fixed compositing
 * layer (z-60, pointer-events-none) holding vignette + scanlines, with the
 * film grain as a steps()-flickered pseudo-element. Sits above content but
 * below splash (z-100) and modals/tooltips (z-80).
 */
export function Overlay() {
  return (
    <div className="overlay" aria-hidden="true">
      <div className="overlay-vignette" />
      <div className="overlay-scanlines" />
    </div>
  );
}
