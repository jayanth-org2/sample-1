// Critical Code Quality Problems

// 1. Race condition
let counter = 0;

async function incrementCounter() {
    const currentValue = counter; // Bug: Race condition - value can change between read and write
    await someAsyncOperation();
    counter = currentValue + 1;
}

// 2. Memory leak with event listeners
function addEventListeners() {
    const button = document.getElementById('button');
    button.addEventListener('click', handleClick);
    // Bug: Event listener never removed, causing memory leak
}

// 3. Improper resource cleanup
function readFile(path) {
    const fs = require('fs');
    const stream = fs.createReadStream(path);
    stream.on('data', (chunk) => {
        console.log(chunk);
    });
    // Bug: Stream never closed, resource leak
}

// 4. Deadlock potential
class ResourceManager {
    constructor() {
        this.resourceA = new Lock();
        this.resourceB = new Lock();
    }
    
    async method1() {
        await this.resourceA.acquire();
        await this.resourceB.acquire(); // Bug: Potential deadlock with method2
        // ... use resources
        this.resourceB.release();
        this.resourceA.release();
    }
    
    async method2() {
        await this.resourceB.acquire();
        await this.resourceA.acquire(); // Bug: Potential deadlock with method1
        // ... use resources
        this.resourceA.release();
        this.resourceB.release();
    }
}

// 5. Memory leak with closures
function createDataProcessor() {
    const largeData = new Array(1000000).fill(0); // Bug: Large array kept in closure
    return function processData(input) {
        return input.map(item => item + largeData[0]);
    };
}

// 6. Improper error handling in async context
async function processBatch(items) {
    const results = [];
    for (const item of items) {
        try {
            const result = await processItem(item);
            results.push(result);
        } catch (error) {
            // Bug: Error swallowed, processing continues
        }
    }
    return results;
}

// 7. Resource exhaustion
function createConnections() {
    const connections = [];
    for (let i = 0; i < 10000; i++) {
        connections.push(createDatabaseConnection()); // Bug: No limit on connections
    }
    return connections;
}

// 8. Improper timeout handling
function fetchWithTimeout(url, timeout) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Timeout'));
        }, timeout);
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                clearTimeout(timer); // Bug: Timer not cleared on success
                resolve(data);
            })
            .catch(error => {
                clearTimeout(timer); // Bug: Timer not cleared on error
                reject(error);
            });
    });
}

// 9. Memory leak with intervals
function startPeriodicTask() {
    const interval = setInterval(() => {
        performTask();
    }, 1000);
    // Bug: Interval never cleared, runs forever
}

// 10. Improper promise handling
function processData(data) {
    return new Promise((resolve, reject) => {
        if (data.length === 0) {
            reject(new Error('Empty data'));
        }
        // Bug: Promise never resolved for valid data
    });
}

// 11. Resource leak with file handles
function readMultipleFiles(filePaths) {
    const fileHandles = [];
    for (const path of filePaths) {
        const handle = fs.openSync(path, 'r'); // Bug: File handles never closed
        fileHandles.push(handle);
    }
    return fileHandles;
}

// 12. Improper cleanup in finally block
async function processWithCleanup() {
    let resource = null;
    try {
        resource = acquireResource();
        await processResource(resource);
    } finally {
        if (resource) {
            resource.release(); // Bug: release() might be async but not awaited
        }
    }
}

// 13. Memory leak with DOM references
class Component {
    constructor() {
        this.element = document.getElementById('my-element');
        this.element.addEventListener('click', this.handleClick.bind(this));
    }
    
    destroy() {
        // Bug: Event listener not removed, DOM reference not cleared
    }
}

// 14. Improper error propagation
async function handleRequest(request) {
    try {
        const result = await processRequest(request);
        return result;
    } catch (error) {
        console.log('Error occurred:', error.message); // Bug: Error logged but not propagated
        return null;
    }
}

// 15. Resource contention
class Cache {
    constructor() {
        this.data = new Map();
    }
    
    async get(key) {
        if (this.data.has(key)) {
            return this.data.get(key);
        }
        
        const value = await fetchValue(key);
        this.data.set(key, value); // Bug: No size limit, can grow indefinitely
        return value;
    }
}

// 16. Improper async operation cancellation
function startLongRunningTask() {
    const controller = new AbortController();
    const signal = controller.signal;
    
    fetch('/api/long-task', { signal })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            if (error.name === 'AbortError') {
                console.log('Task cancelled');
            }
        });
    
    // Bug: Controller never used to cancel the request
}

// 17. Memory leak with timers
function scheduleTask(task, delay) {
    const timer = setTimeout(() => {
        task();
    }, delay);
    // Bug: Timer reference not stored, cannot be cancelled
}

// 18. Improper resource pooling
class ConnectionPool {
    constructor() {
        this.connections = [];
        this.maxConnections = 10;
    }
    
    async getConnection() {
        if (this.connections.length < this.maxConnections) {
            const connection = await createConnection();
            this.connections.push(connection);
            return connection;
        }
        // Bug: No waiting mechanism, throws error when pool is full
        throw new Error('No available connections');
    }
}

// 19. Improper cleanup in error scenarios
async function processWithResources() {
    const resources = [];
    try {
        for (let i = 0; i < 5; i++) {
            const resource = await acquireResource();
            resources.push(resource);
            await processResource(resource);
        }
    } catch (error) {
        // Bug: Resources not cleaned up on error
        throw error;
    }
}

// 20. Memory leak with callbacks
function registerCallback(callback) {
    globalEventEmitter.on('event', callback);
    // Bug: Callback never unregistered, causing memory leak
} 