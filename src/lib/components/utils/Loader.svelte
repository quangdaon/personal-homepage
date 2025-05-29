<svg viewBox="0 0 100 100" width="100" height="100">
  <circle
    cx="50"
    cy="50"
    r="40"
    fill="none"
    stroke="#fff"
    stroke-width="10"
    stroke-linecap="round"
  >
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 50 50"
      to="360 50 50"
      dur="1s"
      repeatCount="indefinite"
    />
    <animate
      attributeName="stroke-dasharray"
      values="200 50;50 200;200 50"
      dur="2s"
      repeatCount="indefinite"
    />
  </circle>
</svg>

<style>
	svg {
    height: 1em;
		width: 1em;
    aspect-ratio: 1;
	}
</style>
