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
				case 'construction':
					emoji = '👷'
					break
				default:
					emoji = '☕'
					break
			}
			shadowroot.textContent = emoji
		}
	}
}
