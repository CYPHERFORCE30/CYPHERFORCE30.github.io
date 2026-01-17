<script lang="ts">
    import { T, useThrelte } from "@threlte/core";

    const { size } = useThrelte();
</script>

<!-- Orthographic Camera (1 Unit = 1 Pixel) -->
<!-- zoom={1} ensures 1:1 mapping if configured correctly via args -->
<T.OrthographicCamera
    makeDefault
    position={[0, 0, 100]}
    zoom={1}
    args={[
        $size.width / -2,
        $size.width / 2,
        $size.height / 2,
        $size.height / -2,
        0.1,
        1000,
    ]}
    on:create={({ ref }) => {
        // Update frustum manually on resize if needed, but 'args' usually react to $size
        ref.left = $size.width / -2;
        ref.right = $size.width / 2;
        ref.top = $size.height / 2;
        ref.bottom = $size.height / -2;
        ref.updateProjectionMatrix();
    }}
>
    <!-- Brighter lighting for Ortho -->
    <T.AmbientLight intensity={1.0} />
    <T.DirectionalLight position={[10, 20, 10]} intensity={2} />
</T.OrthographicCamera>
