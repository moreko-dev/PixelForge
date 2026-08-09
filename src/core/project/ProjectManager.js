class ProjectManager {
    #name;

    constructor(name) {
        this.name = name;
    }

    set name(value) {
        if (!String(value).trim()) {
            throw new Error(`ProjectManager name is not valid -> [${value}]`);
        }
        this.#name = value;
    }

    get name() {
        return this.#name;
    }

    save() {}

    download() {}
}

export default ProjectManager;
