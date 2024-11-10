// scripts/package-extension.js

const fs = require('fs')
const path = require('path')
const archiver = require('archiver')

// Make sure the public/extension directory exists
const extensionDir = path.join(process.cwd(), 'public', 'extension')
if (!fs.existsSync(extensionDir)) {
  fs.mkdirSync(extensionDir, { recursive: true })
}

// Create a write stream for the zip file
const output = fs.createWriteStream(path.join(extensionDir, 'youtube-ad-timer.zip'))
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
})

output.on('close', () => {
  console.log('Extension packaged successfully!')
  console.log('Total bytes:', archive.pointer())
})

archive.on('error', (err) => {
  throw err
})

// Pipe archive data to the file
archive.pipe(output)

// Add the extension files
const extensionSrcDir = path.join(process.cwd(), 'extension') // Your extension source directory
archive.directory(extensionSrcDir, false)

// Finalize the archive
archive.finalize()