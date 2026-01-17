<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";

    let cursor: HTMLDivElement;
    let follower: HTMLDivElement;

    onMount(() => {
        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out",
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "slow(0.7,0.7,false)",
            });
        };

        window.addEventListener("mousemove", moveCursor);

        // Hover Magnetism
        const links = document.querySelectorAll("a, button");
        links.forEach((link) => {
            link.addEventListener("mouseenter", () => {
                gsap.to(cursor, { scale: 0, duration: 0.2 });
                gsap.to(follower, {
                    scale: 3,
                    backgroundColor: "rgba(6,182,212,0.1)",
                    mixBlendMode: "difference",
                    duration: 0.3,
                });
            });
            link.addEventListener("mouseleave", () => {
                gsap.to(cursor, { scale: 1, duration: 0.2 });
                gsap.to(follower, {
                    scale: 1,
                    backgroundColor: "transparent",
                    mixBlendMode: "normal",
                    duration: 0.3,
                });
            });
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    });
</script>

<div
    bind:this={cursor}
    class="fixed top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
></div>
<div
    bind:this={follower}
    class="fixed top-0 left-0 w-8 h-8 border border-cyan-400/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hidden md:block"
></div>
