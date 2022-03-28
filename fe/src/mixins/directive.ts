let scrollTop = 0

export const focus = {
  mounted: (el: HTMLAnchorElement) => {
    el.onfocus = (ev: any) => {
      scrollTop = window.pageYOffset
    }
  }
}

export const blur = {
  mounted: (el: HTMLAnchorElement) => {
    el.onblur = (ev: Event) => {
      window.scrollTo(0, scrollTop)
    }
  }
}
