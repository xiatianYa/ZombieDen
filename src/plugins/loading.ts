// @unocss-include

export function setupLoading() {
  const loading = `<div class="loader">
        <svg class="absolute" width="0" height="0">
            <defs>
                <linearGradient id="b" x1="0" y1="62" x2="0" y2="2" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#973BED"></stop>
                    <stop offset="1" stop-color="#007CFF"></stop>
                </linearGradient>
                <linearGradient id="c" x1="0" y1="64" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFC800"></stop>
                    <stop offset="1" stop-color="#F0F"></stop>
                    <animateTransform attributeName="gradientTransform" type="rotate"
                        values="0 32 32;-270 32 32;-540 32 32;-810 32 32;-1080 32 32" dur="8s"
                        keyTimes="0;0.125;0.25;0.375;0.5;0.625;0.75;0.875;1" repeatCount="indefinite">
                    </animateTransform>
                </linearGradient>
                <linearGradient id="d" x1="0" y1="62" x2="0" y2="2" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#00E0ED"></stop>
                    <stop offset="1" stop-color="#00DA72"></stop>
                </linearGradient>
            </defs>
        </svg>

        <!-- Letter Z -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360" d="M2 10H30V15L10 32H30V38H2V33L22 16H2V10Z" class="dash gradient-b" stroke-width="4"
                stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <!-- Letter O (new) -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360"
                d="M16 10C23 10 30 15 30 24C30 33 23 38 16 38C9 38 2 33 2 24C2 15 9 10 16 10ZM16 16C13 16 10 19 10 24C10 29 13 32 16 32C19 32 22 29 22 24C22 19 19 16 16 16Z"
                class="dash gradient-b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <!-- Letter M (new) -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360" d="M2 38V10H8L16 25L24 10H30V38H22V20L16 32L10 20V38H2Z" class="dash gradient-c"
                stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <!-- Letter B (new) -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360"
                d="M2 10H20C25 10 30 13 30 18C30 21 28 23 25 24C28 25 30 27 30 30C30 35 25 38 20 38H2V10ZM10 16V21H18C20 21 22 20 22 18.5C22 17 20 16 18 16H10ZM10 27V32H18C20 32 22 31 22 29.5C22 28 20 27 18 27H10Z"
                class="dash gradient-d" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <!-- Letter I (new) -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360" d="M2 10H30V16H20V32H30V38H2V32H12V16H2V10Z" class="dash gradient-b" stroke-width="4"
                stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <!-- Letter E -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360" d="M2 10H30V16H10V21H25V27H10V32H30V38H2V10Z" class="dash gradient-c"
                stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <!-- Letter D -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360"
                d="M2 10H20C25 10 30 15 30 24C30 33 25 38 20 38H2V10ZM10 16V32H18C21 32 22 28 22 24C22 20 21 16 18 16H10Z"
                class="dash gradient-d" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <!-- Letter E -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360" d="M2 10H30V16H10V21H25V27H10V32H30V38H2V10Z" class="dash gradient-c"
                stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <!-- Letter N (new) -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360" d="M2 38V10H10L22 28V10H30V38H22L10 20V38H2Z" class="dash gradient-c"
                stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        <div class="w-2"></div>
</div>
<style>
.loader {
position: fixed;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
background-color: #f0f0f0;
z-index: 999;
}

.loader svg {
margin: 0 5px;
width: 64px;
height: 64px;
}

.absolute {
position: absolute;
}

.inline-block {
display: inline-block;
}

.w-2 {
width: 0.5em;
}

/* Animations */
.dash {
animation:
dashArray 2s ease-in-out infinite,
dashOffset 2s linear infinite;
}

.spin {
animation:
spinDashArray 2s ease-in-out infinite,
spin 8s ease-in-out infinite,
dashOffset 2s linear infinite;
transform-origin: center;
}

@keyframes dashArray {
0% {
stroke-dasharray: 0 1 359 0;
}

50% {
stroke-dasharray: 0 359 1 0;
}

100% {
stroke-dasharray: 359 1 0 0;
}
}

@keyframes spinDashArray {
0% {
stroke-dasharray: 270 90;
}

50% {
stroke-dasharray: 0 360;
}

100% {
stroke-dasharray: 270 90;
}
}

@keyframes dashOffset {
0% {
stroke-dashoffset: 365;
}

100% {
stroke-dashoffset: 5;
}
}

@keyframes spin {
0% {
transform: rotate(0deg);
}

12.5%,
25% {
transform: rotate(270deg);
}

37.5%,
50% {
transform: rotate(540deg);
}

62.5%,
75% {
transform: rotate(810deg);
}

87.5%,
100% {
transform: rotate(1080deg);
}
}

/* Dégradés */
.gradient-b {
stroke: url(#b);
}

.gradient-c {
stroke: url(#c);
}

.gradient-d {
stroke: url(#d);
}
</style>`;

  const app = document.getElementById('app');

  if (app) {
    app.innerHTML = loading;
  }
}
