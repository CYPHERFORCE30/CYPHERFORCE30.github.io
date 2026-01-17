<script lang="ts">
    import { Canvas } from "@threlte/core";
    import Scene from "./Scene.svelte";
</script>

<div class="w-full h-screen relative overflow-hidden bg-gray-950">
    <!-- Canvas Container: 
         - touch-action-none: prevents browser zoom/scroll handling? NO.
         - We want SCROLL. 
         - pointer-events-none on mobile means NO interaction with canvas, clicks pass through (or default scroll happens).
         - md:pointer-events-auto enables interaction on desktop. 
    -->
    <div
        class="absolute inset-0 z-0 pointer-events-none md:pointer-events-auto"
    >
        <Canvas>
            <Scene />
        </Canvas>
    </div>

    <div
        class="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
    >
        <h1
            class="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 select-none text-center drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        >
            VISHWAJEET PAWAR
        </h1>
        <h2
            class="mt-4 text-xl md:text-2xl font-mono text-gray-300 tracking-[0.3em] uppercase opacity-80 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 text-center"
        >
            Creative Developer <span class="text-cyan-500">///</span> UI/UX Architect
        </h2>

        <div
            class="absolute bottom-10 animate-bounce text-gray-500 font-mono text-xs flex flex-col items-center gap-2"
        >
            <span class="rotate-90 origin-center translate-y-2">SCROLL</span>
            <div
                class="w-[1px] h-16 bg-gradient-to-b from-transparent to-cyan-500"
            ></div>
        </div>
    </div>
</div>
