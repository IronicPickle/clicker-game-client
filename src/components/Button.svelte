
<script lang="ts">
    import type {Color} from "../lib/types/generic"

    export let color: Color = "red"
</script>

<button style={`
    --color: ${color};
`}>
    <slot />
</button>

<style lang="scss" >
    button {
        background-color: var(--color);
    }
</style>