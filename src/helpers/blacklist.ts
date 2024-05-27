class Blacklist {
    private tokens: Set<string>;

    constructor() {
        this.tokens = new Set<string>();
    }

    add(token: string): void {
        this.tokens.add(token);
    }

    isBlacklisted(token: string): boolean {
        return this.tokens.has(token);
    }
}

const blacklist = new Blacklist();
export { blacklist };
