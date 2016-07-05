// Common:

export class List {
    items: Array<Object>;
    total: number;
    pages: number;
    size:  number;
    page:  number;
    badges: Array<string>;
    params: Object;

    constructor () {
        this.items = [];
        this.total = 0;
        this.pages = 0;
        this.size  = 10;
        this.page  = 1;
        this.badges = [] ;
        this.params = {};
    }
}

// Abstract: 