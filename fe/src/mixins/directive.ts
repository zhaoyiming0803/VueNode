let scrollTop: number = 0

export const focus = {
	mounted: (el: any) => {
		el.onfocus = (ev: any) => {
			scrollTop = window.pageYOffset
		}
	}
}

export const blur = {
	mounted: (el: any) => {
		el.onblur = (ev: any) => {
			window.scrollTo(0, scrollTop)
		}
	}
}