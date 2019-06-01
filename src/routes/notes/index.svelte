<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`notes.json`).then(r => r.json()).then(notes => {
			return { notes };
		});
	}
</script>

<script>
	export let notes;

	function fetchData(method = 'GET', data = {}) {
		// Default options are marked with *
			return fetch(`notes.json`, {
					method: method, // *GET, POST, PUT, DELETE, etc.
					mode: 'cors', // no-cors, cors, *same-origin
					cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
					credentials: 'same-origin', // include, *same-origin, omit
					headers: {
							'Content-Type': 'application/json',
					},
					redirect: 'follow', // manual, *follow, error
					referrer: 'no-referrer', // no-referrer, *client
					body: JSON.stringify(data), // body data type must match "Content-Type" header
			}); // parses JSON response into native Javascript objects 
	}

	var updateTimeout;

	function fetchNotes() {
		fetch(`notes.json`)
			.then(r => r.json())
			.then(n => {
				notes = n;
			});	
	}

	function createNote() {
		fetchData('POST', {'text': ''})
			.then(r => r.json())
			.then( n => {
				notes = n;
			});		
	}

	function updateNote(e) {
		clearTimeout(updateTimeout);
		updateTimeout = setTimeout(() => {
			fetchData('PATCH', {
				'id': e.target.parentNode.parentNode.parentNode.id,
				'text': e.target.value
			})
			.then(n => {
				fetchNotes();
			});					
		}, 200);
	}

	function deleteNote(e) {
		fetchData('DELETE', {'id': e.target.parentNode.parentNode.id})
			.then(n => {
				fetchNotes();
			});					
	}
	

</script>

<style>
	.container {
		display: flex;
		flex-direction: row;					
	}
	.container div:nth-child(1) {
		flex: 11;
	}
	.container div:nth-child(2) {
		margin: 5px;
		flex: 1;
	}
</style>

<svelte:head>
	<title>Notes</title>
  <meta name="description" content="Sample notes application">
  <meta name="keywords" content="notes,javascript,sample">
  <meta name="author" content="Daniel Persson">
	<script src="//cdn.muicss.com/mui-0.9.41/js/mui.min.js" defer></script>    
</svelte:head>

<h1>Notes</h1>

{#each notes as note}
	<div id="{note.id}" class="container">
		<div>
			<div class="mui-textfield">				
				<input aria-label="Note field" on:keyup="{updateNote}" type="text" placeholder="Note text" value="{note.text}">
			</div>
		</div>
		<div>
			<button on:click="{deleteNote}" class="right mui-btn mui-btn--primary mui-btn--raised">Delete</button>
		</div>
	</div>
{/each}
<button on:click="{createNote}" class="mui-btn mui-btn--primary mui-btn--raised">Add new note</button>

<link href="//cdn.muicss.com/mui-0.9.41/css/mui.min.css" rel="stylesheet" type="text/css" />
