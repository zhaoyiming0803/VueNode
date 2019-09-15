let scrollTop: number = 0;

export const focus = {
	bind: (el: any) => {
		el.onfocus = (ev: any) => {
			scrollTop = window.pageYOffset;
		}
	}
};

export const blur = {
	bind: (el: any) => {
		el.onblur = (ev: any) => {
			window.scrollTo(0, scrollTop);
		}
	}
}