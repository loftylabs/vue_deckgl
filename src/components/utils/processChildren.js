export default (children) => {
    let map = null
    let layers = []

    if(children === undefined){
        return map
    }

    children.forEach(child => {
        // TODO: To add support for Slotted Layers, we will need to change this to a return type of {} with a map key and maybe a layers key which points to an Array.
        if(child.$options._componentTag === 'Mapbox'){
            map = child
        }
        else if(child.baseLayerImplemented){
            layers.push(child)
        }
    });
    return {map, layers}
}
