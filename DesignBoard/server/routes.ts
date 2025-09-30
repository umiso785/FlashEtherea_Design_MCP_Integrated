import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFileSchema, updateFileSchema, type FileNode } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/files", async (_req, res) => {
    try {
      const files = await storage.getAllFiles();
      const fileMap = new Map(files.map(f => [f.id, { ...f, children: [] as FileNode[] }]));
      
      const roots: FileNode[] = [];
      fileMap.forEach((file) => {
        if (file.parentId && fileMap.has(file.parentId)) {
          fileMap.get(file.parentId)!.children!.push(file);
        } else if (!file.parentId || file.parentId === "root") {
          if (file.id !== "root") {
            roots.push(file);
          }
        } else {
          if (file.id !== "root") {
            roots.push(file);
          }
        }
      });

      res.json(roots);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/files/:id", async (req, res) => {
    try {
      const file = await storage.getFile(req.params.id);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      res.json(file);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/files", async (req, res) => {
    try {
      const data = insertFileSchema.parse(req.body);
      const file = await storage.createFile(data);
      res.status(201).json(file);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/files/:id", async (req, res) => {
    try {
      const data = updateFileSchema.parse(req.body);
      const file = await storage.updateFile(req.params.id, data);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      res.json(file);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/files/:id", async (req, res) => {
    try {
      const success = await storage.deleteFile(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "File not found" });
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
