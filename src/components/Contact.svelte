<script lang="ts">
    import confetti from "canvas-confetti";

    function copyEmail() {
        navigator.clipboard.writeText("vishwajeet@example.com"); // Placeholder
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#06b6d4", "#a855f7", "#ffffff"],
        });
    }
</script>

<section
    class="min-h-[80vh] flex flex-col items-center justify-center bg-black text-white relative"
>
    <h2
        class="text-[10vw] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800 text-center select-none"
    >
        LET'S TALK
    </h2>

    <button
        class="mt-10 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:scale-110 active:scale-95 transition-transform"
        on:click={copyEmail}
    >
        Copy Email
    </button>

    <div class="absolute bottom-10 text-gray-500 font-mono text-xs">
        System Status: ONLINE // Region: IND
    </div>
</section>
