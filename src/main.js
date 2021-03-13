import App from './App.svelte';

const url = 'https://raw.githubusercontent.com/fndvit/covid-vaccination-tracker/main/app/public/data.json';

fetch(url)
  .then((res) => res.json())
  .then((json) => {
	const data = json;
    const app = new App({
      target: document.body,
      props: {
		data: data
		/*You can also pass each object in 'data' as an individual prop.
		For example:
			meta: data.meta,
			menu: data.menu,
			content: data.content
			
			OR

			data:{...data}
		*/
      }
	});
});

// const app = new App({target: document.body})

export default app;


