import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data.json');

// Ensure DB exists
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ servers: [], profiles: [] }));
}

export const db = {
    read: () => {
        if (!fs.existsSync(DB_PATH)) {
            fs.writeFileSync(DB_PATH, JSON.stringify({ servers: [], profiles: [] }));
        }
        const content = fs.readFileSync(DB_PATH, 'utf-8');
        try {
            return JSON.parse(content);
        } catch (e) {
            return { servers: [], profiles: [] };
        }
    },
    write: (data: any) => {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    }
}
