/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
    function uniqueHashTags(acc, word) {
        return acc.concat(acc.indexOf(word) == -1 ? word : []);
    }
    return hashtags.map(word => word.toLowerCase()).reduce(uniqueHashTags, []).join(', ');
};
