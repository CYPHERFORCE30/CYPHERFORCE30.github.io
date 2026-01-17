<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

    let textRef: HTMLElement;
    let container: HTMLElement;

    onMount(() => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const targetText =
            "I am a creative developer exploring the frontiers of web technology, merging physics, 3D, and design to build immersive digital experiences.";

        // Hacker Text Effect on Scroll
        gsap.to(textRef, {
            scrollTrigger: {
                trigger: container,
                start: "top 80%",
                end: "center center",
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const len = Math.floor(progress * targetText.length);
                    let output = "";
                    for (let i = 0; i < targetText.length; i++) {
                        if (i < len) {
                            output += targetText[i];
                        } else {
                            output +=
                                chars[Math.floor(Math.random() * chars.length)];
                        }
                    }
                    textRef.innerText = output;
                },
            },
        });
    });
</script>

<section
    bind:this={container}
    class="min-h-screen flex items-center justify-center bg-black text-white px-8 py-20 relative overflow-hidden"
>
    <div class="max-w-4xl w-full relative z-10">
        <h2
            class="text-xs font-mono text-cyan-500 mb-4 tracking-[0.5em] uppercase"
        >
            About Protocol
        </h2>
        <p
            bind:this={textRef}
            class="text-3xl md:text-5xl font-bold leading-tight font-mono text-gray-300 min-h-[200px]"
        >
            Loading data stream...
        </p>
    </div>

    <!-- Abstract Wireframe BG (CSS for now) -->
    <div
        class="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-cyan-500/20 rounded-full animate-spin-slow pointer-events-none opacity-20"
    ></div>
</section>
