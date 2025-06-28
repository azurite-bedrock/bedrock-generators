export class BlockJsonIO {
    private filePath: string;
    private data: Record<string, Record<string, unknown>> = {};

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    load(): void {
        const content = Deno.readTextFileSync(this.filePath);
        try {
            this.data = JSON.parse(content);
        } catch {
            this.data = {};
        }
    }

    save(): void {
        Deno.writeTextFileSync(this.filePath, JSON.stringify(this.data));
    }

    get(id: string): Record<string, unknown> | undefined {
        return this.data[id];
    }

    set(id: string, value: Record<string, unknown>): void {
        this.data[id] = value;
    }

    update(id: string, value: Partial<Record<string, unknown>>): void {
        if (!this.data[id]) this.data[id] = {};
        Object.assign(this.data[id], value);
    }

    delete(id: string): void {
        delete this.data[id];
    }

    getAll(): Record<string, Record<string, unknown>> {
        return { ...this.data };
    }
}
