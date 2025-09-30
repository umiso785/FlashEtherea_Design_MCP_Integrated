import { type User, type InsertUser, type FileNode, type InsertFile, type UpdateFile } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllFiles(): Promise<FileNode[]>;
  getFile(id: string): Promise<FileNode | undefined>;
  createFile(file: InsertFile): Promise<FileNode>;
  updateFile(id: string, updates: UpdateFile): Promise<FileNode | undefined>;
  deleteFile(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private files: Map<string, FileNode>;

  constructor() {
    this.users = new Map();
    this.files = new Map();
    this.initializeDefaultFiles();
  }

  private initializeDefaultFiles() {
    const defaultFiles: FileNode[] = [
      { id: "root", name: "root", type: "folder", parentId: null },
      { id: ".git", name: ".git", type: "folder", parentId: "root" },
      { id: "api", name: "api", type: "folder", parentId: "root" },
      { id: "docs", name: "docs", type: "folder", parentId: "root" },
      { id: "frontend", name: "frontend", type: "folder", parentId: "root" },
      { id: "index.js", name: "index.js", type: "file", parentId: "frontend", content: `function greet(name) {\n  console.log(\`Hello, \${name}!\`);\n}\n\ngreet("World");\n` },
      { id: "app.js", name: "app.js", type: "file", parentId: "frontend", content: `// App.js\nconsole.log("App started");\n` },
      { id: "styles.css", name: "styles.css", type: "file", parentId: "frontend", content: `body {\n  margin: 0;\n  padding: 0;\n}\n` },
      { id: "README.md", name: "README.md", type: "file", parentId: "root", content: `# Project\n\nWelcome to your project!\n` },
    ];

    defaultFiles.forEach(file => {
      this.files.set(file.id, file);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllFiles(): Promise<FileNode[]> {
    return Array.from(this.files.values());
  }

  async getFile(id: string): Promise<FileNode | undefined> {
    return this.files.get(id);
  }

  async createFile(insertFile: InsertFile): Promise<FileNode> {
    if (insertFile.parentId && insertFile.parentId !== "root") {
      const parent = this.files.get(insertFile.parentId);
      if (!parent) {
        throw new Error("Parent folder not found");
      }
      if (parent.type !== "folder") {
        throw new Error("Parent must be a folder");
      }
    }

    const id = randomUUID();
    const file: FileNode = { ...insertFile, id };
    this.files.set(id, file);
    return file;
  }

  async updateFile(id: string, updates: UpdateFile): Promise<FileNode | undefined> {
    const file = this.files.get(id);
    if (!file) return undefined;

    const updatedFile: FileNode = { ...file, ...updates };
    this.files.set(id, updatedFile);
    return updatedFile;
  }

  async deleteFile(id: string): Promise<boolean> {
    if (id === "root") {
      throw new Error("Cannot delete root folder");
    }

    const file = this.files.get(id);
    if (!file) return false;

    if (file.type === "folder") {
      const children = Array.from(this.files.values()).filter(
        f => f.parentId === id
      );
      for (const child of children) {
        await this.deleteFile(child.id);
      }
    }

    return this.files.delete(id);
  }
}

export const storage = new MemStorage();
