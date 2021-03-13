<script>
export let data;
export let area;
export let color;
export let width;
export let height;

let country = ''

</script>

<p>{country}</p>
<svg viewBox="0 0 {width} {height}">
	<g>
		{#each data as d,i}
			<path d={area(d)} fill={color(i)}
            on:mouseover={() => country = d.key}
            />
		{/each}
	</g>
</svg>