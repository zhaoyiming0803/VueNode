let scrollTop: number = 0;

export const focus = {
	bind: (el: any) => {
		el.onfocus = (ev: any) => {
			console.log(1);
			scrollTop = window.pageYOffset;
		}
	}
};

export const blur = {
	bind: (el: any) => {
		el.onblur = (ev: any) => {
			console.log(2);
			window.scrollTo(0, scrollTop);
		}
	}
}