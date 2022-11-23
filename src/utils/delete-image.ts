import express from 'express';
import fs from 'fs';
export const deleteImage = (req: express.Request) => {
    if (req.file) {
        console.log('req.file', req.file, req.file.path);
        fs.unlink(req.file.path, (err) => {
            console.log('file deleted', err);
        })
    }
}