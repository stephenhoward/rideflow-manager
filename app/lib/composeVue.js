
composeVue = (wrapper, component_name, component) => {
    let wrapped = Object.assign({},wrapper);

    if ( typeof wrapper == 'string' ) {
        wrapper = require(wrapper);
    }
    if ( typeof component == 'string' ) {
        component = require(component);
    }

    if ( ! ( 'components' in wrapped ) ) {
        wrapped.components = {};
    }

    wrapped.components[ component_name ] = component;

    return wrapped;
};

module.exports = composeVue;