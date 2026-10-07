export function handleScrollChange( selectEl, multi ) {
    let scrollParent = getScrollParent( selectEl )

    let handler = (event) => {
        multi.multipleSelect("close")
    }

    scrollParent.addEventListener( "scroll", handler )
    
    return ( remove ) => {
        if ( remove === false ) return scrollParent
        scrollParent.removeEventListener( 'scroll', handler )
    }
}

export function handlePositionChange( multi ) {
    let lastTop
    let reopenTimeout
    return setInterval(() => {
        let opt = multi.multipleSelect("getOptions")
        if ( !opt.isOpen ) return

        let r = multi.get( 0 ).getBoundingClientRect()
        if ( lastTop && r.top != lastTop ) {
            if ( reopenTimeout ) clearTimeout( reopenTimeout )

            let ul = multi.data( 'multipleSelect' )?.$drop?.find( 'ul' ).get( 0 )
            let scrollPos
            if ( ul ) scrollPos = ul.scrollTop;

            multi.multipleSelect("close")
            reopenTimeout = setTimeout( () => {
                multi.multipleSelect("open")
                let ul = multi.data( 'multipleSelect' )?.$drop?.find( 'ul' ).get( 0 )
                if ( ul && scrollPos ) ul.scrollTop = scrollPos;
            }, 100 )
        }
        lastTop = r.top
    }, 100)
}

function isScrollable(node: Element) {
    if ( !( node instanceof HTMLElement || node instanceof SVGElement ) ) return false

    let style = getComputedStyle(node)
    return /auto|scroll/.test( style['overflowX'] + style['overflowY'] )
}
  
export function getScrollParent(node: Element): Element {
    let currentParent = node.parentElement
    while (currentParent) {
        if (isScrollable(currentParent)) {
            return currentParent
        }
        currentParent = currentParent.parentElement
    }

    return document.scrollingElement || document.documentElement
}

function getOverlayContainer() {
    return document.getElementsByClassName( "cdk-overlay-container multi-select-container" )[ 0 ]
}

export function setContainerOpen( open: boolean, scrollContainer, cls ) {
    let cont = getOverlayContainer()
    if ( !cont ) return

    cont.classList.toggle( 'closed', !open )
    cont.classList.toggle( 'open', open )

    cont.classList.toggle( cls, open )

    if ( scrollContainer ) {
        if ( open ) {
            scrollContainer.addEventListener( 'scroll', preventAction )
            scrollContainer.addEventListener( 'mousewheel', preventAction )
            scrollContainer.addEventListener( 'touchmove', preventAction )
        }
        else {
            scrollContainer.removeEventListener( 'scroll', preventAction )
            scrollContainer.removeEventListener( 'mousewheel', preventAction )
            scrollContainer.removeEventListener( 'touchmove', preventAction )
        }
    }
}

function preventAction( e ) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

export function getContainerSelector() {
    let cont = getOverlayContainer()
    if ( !cont ) {
        let body = document.getElementsByTagName( 'body' )[ 0 ]

        let container = document.createElement( 'div' ) 
        container.classList.add( 'cdk-overlay-container', 'multi-select-container', 'closed' )
        body.appendChild( container ) 

        let backdrop = document.createElement( 'div' ) 
        backdrop.classList.add( 'cdk-overlay-backdrop' )
        backdrop.addEventListener( 'scroll', preventAction )
        backdrop.addEventListener( 'mousewheel', preventAction )
        backdrop.addEventListener( 'touchmove', preventAction )
        container.appendChild( backdrop )
    }

    return '.cdk-overlay-container.multi-select-container'
}

export function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}
