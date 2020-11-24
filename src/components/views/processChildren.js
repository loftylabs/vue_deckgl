export default (children) => {
    let tempChild;
    
    children.forEach(child => {
        // TODO: To add support for Slotted Layers, we will need to change this to a return type of {} with a map key and maybe a layers key which points to an Array.
        if(child.$options._componentTag === 'Mapbox'){
            tempChild = child
        }
    });
    return tempChild
}
