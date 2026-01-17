<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import Lenis from "lenis";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  import { Flip } from "gsap/dist/Flip";
  import MagneticCursor from "../components/MagneticCursor.svelte";
  import Preloader from "../components/Preloader.svelte";

  gsap.registerPlugin(ScrollTrigger, Flip);

  onMount(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  });
</script>

<Preloader />
<MagneticCursor />

<div
  class="antialiased text-gray-100 bg-gray-950 min-h-screen selection:bg-cyan-500 selection:text-white cursor-none"
>
  <slot />
</div>
