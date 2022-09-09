<script lang="ts">
  import { Howl, SoundSpriteDefinitions } from "howler";
  import { onDestroy } from "svelte";

  export let src: string;
  export let volume = 1;
  export let html5 = false;
  export let loop = false;
  export let preload = false;
  export let autoplay = false;
  export let mute = false;
  export let rate = 1;

  export let playing = false;
  export let stopped = false;

  const audio = new Howl({
    src: [src],
    volume,
    html5,
    loop,
    preload,
    autoplay,
    mute,
    rate,
  });

  $: stopped ? audio.stop() : playing ? audio.play() : audio.pause();
  $: audio.volume(volume);
  $: audio.loop(loop);
  $: audio.mute(mute);
  $: audio.rate(rate);

  onDestroy(() => {
    audio.stop();
  });
</script>

<style lang="scss">
  audio {
    display: none;
  }
</style>
