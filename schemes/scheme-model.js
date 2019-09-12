const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    remove,
    update
};


function find() {
    return db('schemes')
}

function findById(id){
    return db('schemes').where('id', id).first();
}

function findSteps(id){
    return db('schemes')
        .join('steps', 'schemes.id', 'steps.id')
        .where({ scheme_id: id })
        .select('schemes.id', 'scheme_name', 'step_number')
        .then(steps =>{
            return steps;
        })
}

// function add(scheme) {
//     return db('schemes')
//         .insert(scheme)
// }

function add(scheme) {
    return db('schemes')
        .insert(scheme, 'id')
        .then(([id]) => {
            return findById(id); // why when we use id[0] it returns an error
        });
}


function update(changes, id) {
    return db('schemes')
        .where({id})
        .update(changes)
        .then(res => {
            return findById(id);
        });
}

// function remove(id) {
//     return db('schemes')
//         .where('id', id)
//         .del();
// }

function remove(id) {
    const r = findById(id);
    if(r) {
        db('schemes').where({ id }).del();
        return r; // ?????????
    }
    else return null;
}