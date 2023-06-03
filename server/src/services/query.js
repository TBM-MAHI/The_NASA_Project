const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_LIMIT_NUMBER = 0;

let skip;

function getPagination(query) {
    let { page, limit } = query;
    page = Math.abs(page) || DEFAULT_PAGE_NUMBER; 
    limit = Math.abs(limit) || DEFAULT_LIMIT_NUMBER; 
    skip = (page - 1) * limit;
    return {
        skip,
        limit
    }
}

module.exports = {
    getPagination
}