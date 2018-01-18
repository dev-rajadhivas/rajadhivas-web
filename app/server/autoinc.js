autoInc = function(name) {
    var result = Counters.findAndModify({
        query: { id: name },
        update: { $inc: { seq: 1 } },
        upsert: true,
        new: true
    });
    var seq = (result.seq) ? result.seq : ((result.value) ? result.value.seq : false)
    return seq;
}
