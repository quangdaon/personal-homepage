<script lang="ts">
  interface Props {
    open?: boolean;
    children: () => any;
    onClosed: () => void;
  }

  let {open = false, children, onClosed}: Props = $props();


</script>

<!-- TODO: Migrate to <dialog> if they ever fix the discrepancy between oepn vs .showModal -->

{#if open}
<div class="wrapper" >
  <div class="content">
    <button class="close" onclick={() => onClosed()} >&times;</button>
    {@render children()}
  </div>
</div>
{/if}

<style lang="scss">
  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(#000, 0.7);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .close {
float: right;
font-size: 2em; 
color: inherit;
background: none;
border: none;
  }

  .content {
    max-width: 60vw;
    margin: auto;
    padding: 1em;
    background: #000;
  }
</style>