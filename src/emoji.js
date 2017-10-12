export default class extends HTMLElement {
	static get observedAttributes() {
		return ['type']
	}

	attributeChangedCallback(name, prev, next) {
		if (name === 'type') {
			const shadowroot = this.attachShadow({mode: 'open'})
			let emoji
			switch (next) {
				case 'baby':
					emoji = '👶'
					break
				case 'white-right-pointing-backhand-index':
					emoji = '👉'
					break
				default:
					emoji = '☕'
					break
			}
			shadowroot.innerHTML = `<style>:host {margin: 0 0.5rem}</style>${emoji}`
		}
	}
}
