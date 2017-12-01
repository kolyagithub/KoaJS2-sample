function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

define('SCHEMA_TYPES', {
    0: 'text',
    1: 'number',
    2: 'date'
});
