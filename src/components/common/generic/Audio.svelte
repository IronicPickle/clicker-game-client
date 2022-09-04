<script lang="ts">
  export let src: string;
  export let type = "/audio/mp3";
  export let volume = 1;
  export let playbackRate = 1;
  export let autoplay = true;
  export let loop = false;

  export let playing = false;

  let audioElement: HTMLAudioElement | undefined;

  $: {
    if (audioElement) {
      if (playing) {
        audioElement.load();
        audioElement.play();
      } else audioElement.pause();
    }
  }

  $: {
    if (audioElement) {
      audioElement.defaultPlaybackRate = playbackRate;
      audioElement.playbackRate = playbackRate;
    }
  }

  let currentTime = 0;
  let duration = 0;

  $: {
    const buffer = 0.1 * playbackRate;
    if (currentTime > duration - buffer && playing && audioElement && loop) {
      audioElement.currentTime = 0;
      audioElement.play();
    }
  }

  $: {
    if (audioElement) audioElement.volume = volume;
  }
</script>

<audio bind:currentTime bind:duration bind:this={audioElement} {src} {type} {autoplay} {loop} />

<style lang="scss">
  audio {
    display: none;
  }
</style>
