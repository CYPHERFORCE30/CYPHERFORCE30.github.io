<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";

    let counter = 0;
    let overlay: HTMLDivElement;
    let textRef: HTMLDivElement;

    onMount(() => {
        // Counter Animation
        const interval = setInterval(() => {
            if (counter < 100) {
                counter += Math.floor(Math.random() * 5) + 1;
                if (counter > 100) counter = 100;
            } else {
                clearInterval(interval);
                reveal();
            }
        }, 30);

        const reveal = () => {
            const tl = gsap.timeline();
            tl.to(textRef, { opacity: 0, duration: 0.5 }).to(overlay, {
                height: 0,
                duration: 1.5,
                ease: "power4.inOut",
                delay: 0.2,
            });
        };
    });
</script>

<div
    bind:this={overlay}
    class="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden"
>
    <div bind:this={textRef} class="text-9xl font-bold text-white font-mono">
        {counter}%
    </div>
</div>
